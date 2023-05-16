import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, {Marker, Polygon, Polyline} from 'react-native-maps';
import {Button, Image, Picker} from "react-native-ui-lib";
import * as Location from 'expo-location';
import {useServices} from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupModal } from '../../components/input/groupModal';
import observer from "mobx-react";



// @ts-ignore
export const MapScreen = ({route}) => {
    const polygonRef = useRef(null);
    const polygonsRef = useRef([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState(groups[0]);
    const [selectedColor, setSelectedColor] = useState('#121255');
    const searchId= route.params.searchId;
    const [polygonsCoords, setPolygonsCoords] = useState([
        [
            { latitude: 57.1525259, longitude: 65.5611431 },
            { latitude: 57.1496386, longitude: 65.551646 },
            { latitude: 57.147555, longitude: 65.558339 },
            { latitude: 57.1521849, longitude: 65.5681232 },
        ],
        [
            { latitude: 57.149977, longitude: 65.577986 },
            { latitude: 57.147553, longitude: 65.573245 },
            { latitude: 57.144388, longitude: 65.57987 },
            { latitude: 57.145588, longitude: 65.58476},
        ],
    ]);
    const [polygons, setPolygons] = useState([
        {
            coords: [
                {latitude: 57.1525259, longitude: 65.5611431},
                {latitude: 57.1496386, longitude: 65.551646},
                {latitude: 57.147555, longitude: 65.558339},
                {latitude: 57.1521849, longitude: 65.5681232},
            ],
            color: '#121212',
        },
        {
            coords: [
                {latitude: 57.149977, longitude: 65.577986},
                {latitude: 57.147553, longitude: 65.573245},
                {latitude: 57.144388, longitude: 65.57987},
                {latitude: 57.145588, longitude: 65.58476},
            ],
            color: '#685004',
        },
    ]);
    const [mapCenter,  setMapCenter] = useState({
        latitude: 57.1553,
        longitude: 65.5619,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    })
    const [location, setLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [role, setRole] = useState<String>('user');
    const [userId, setUserId] = useState<String>('');

    const getRole = async () => {
        const userRole= await AsyncStorage.getItem('role') ?? '';
        const currentId = await AsyncStorage.getItem('id') ?? '';
        setUserId(currentId)
        setRole(userRole)
    }
    useEffect(() => {
        getLocationAsync();
        getGroups();
        getRole();
    }, []);

    const getLocationAsync = async () => {
        Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 10 },
            (location) => {
                // @ts-ignore
                setLocation(location);
                if (!isActive) {
                    return;
                }
                // @ts-ignore
                setRouteCoordinates((prevRouteCoordinates) => [
                    ...prevRouteCoordinates,
                    {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    },
                ]);
            }
        );
    };
    const handleRegionChange = (region: { latitude: any; longitude: any; }) => {
        const { latitude, longitude } = region;
        setMapCenter({ latitude, longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 });
    };
    type Group = {
        id: string
        name: string,
        users: object[],
        color: string,
    };
    const {navio} = useServices();
    const getGroups = async () => {
        try {
            const response = await fetch(`http://192.168.1.103:3000/groups/search/${searchId}`);
            const json = await response.json();
            setGroups(json);
        } catch (error) {
        }
    };

    const getPolygons = async () => {
        try {
            //get user role if not managaer or admin, get group polygons. else - all
            let url = 'http://192.168.1.103:3000/polygons/search/' + searchId;
            // if (role !== 'admin' || role !== 'manager') {
            //     let userGroup = getUserGroup()
            //     url += 'group/' + userGroup.id;
            // }
                const response = await fetch(url);
            const json = await response.json();
        } catch (error) {
        }
    };

    // const getUserGroup = async () => {
    //     try {
    //         const response = await fetch('http://192.168.1.103:3000/groups/search/'+ searchItem.id + '/user/' + userId);
    //         const json = await response.json();
    //         setGroups(json);
    //     } catch (error) {
    //     }
    // };

    const [markerCoords, setMarkerCoords] = useState(polygons.map(obj => obj.coords));
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const onMarkerDrag = (polygonIndex: number, markerIndex: number, newCoords: { latitude: number; longitude: number; }) => {
        const newPolygons = polygons.map((polygon, i) => {
            if (i !== polygonIndex) {
                // This is not the polygon we're updating, so return it unchanged
                return polygon;
            }

            // This is the polygon we're updating, so create a copy and update the marker coordinates
            const newCoordsArray = [...polygon.coords];
            newCoordsArray[markerIndex] = newCoords;
            const newPolygon = {...polygon, coords: newCoordsArray};
            return newPolygon;
        });

        setPolygons(newPolygons);
    };

    const onPolygonPress = (e, polygonIndex) => {
        if (!isEditing) {
            return;
        }
        const { coordinate } = e.nativeEvent;
        const newPolygons = [...polygons];
        const polygon = newPolygons[polygonIndex];
        const deltaX = coordinate.latitude - polygon.coords[0].latitude;
        const deltaY = coordinate.longitude - polygon.coords[0].longitude;
        const newCoords = polygon.coords.map((coords) => ({
            latitude: coords.latitude + deltaX,
            longitude: coords.longitude + deltaY,
        }));
        newPolygons[polygonIndex] = {
            ...polygon,
            coords: newCoords,
        };
        setPolygons(newPolygons);
    };

    const getGroupColor = async (groupId: string): Promise<string> => {
        try {
            const response = await fetch('http://192.168.1.103:3000/groups/' + groupId);
            const json = await response.json()
            return json.color;
        } catch (error) {
            return ''; // or some default color value
        }
    };


    async function handleAddPolygon(selectedGroup: { id?: string; name?: string; users?: object[]; color?: string; value?: any; }) {
        console.log('selected');
        let color = await getGroupColor(selectedGroup.value);
        const size = 0.006;
        const distance = size / 2;
        let newPolygon =
            {
                coords: [
                    {latitude: mapCenter.latitude + distance / 2, longitude: mapCenter.longitude + distance},
                    {latitude: mapCenter.latitude - distance / 2, longitude: mapCenter.longitude + distance},
                    {latitude: mapCenter.latitude - distance / 2, longitude: mapCenter.longitude - distance},
                    {latitude: mapCenter.latitude + distance / 2, longitude: mapCenter.longitude - distance},
                ],
                color: color
            };
        let allPolygons = polygons;
        allPolygons.push(newPolygon)
        setPolygons(allPolygons)
        setMarkerCoords(allPolygons.map(obj => obj.coords))
    }
    const handleRemovePolygon = (index) => {
        const newCoords = [...polygonsCoords];
        newCoords.splice(index, 1);
        setPolygonsCoords(newCoords);

        const newPolygons = [...polygons];
        newPolygons.splice(index, 1);
        setPolygons(newPolygons);

        const newMarkers = [...markerCoords];
        newMarkers.splice(index, 1);
        setPolygons(newMarkers);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }
    const toggleActive = () => {
        setIsActive(!isActive);
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handlePick = (group: React.SetStateAction<{ id: string; name: string; users: object[]; color: string; }>) => {
        console.log('selected');
        setSelectedGroup(group);
        handleAddPolygon(selectedGroup).then(r => {});
    }

    function hexToRgbA(hex){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.5)';
        }
        throw new Error('Bad Hex');
    }
    const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(null);

    const handleMapDrag = (event) => {
        if (selectedPolygonIndex !== null) {
            const { longitudeDelta, latitudeDelta } = event;
            const newCoords = polygonsCoords[selectedPolygonIndex].map(({ latitude, longitude }) => {
                return {
                    latitude: latitude + latitudeDelta,
                    longitude: longitude + longitudeDelta,
                };
            });
            setPolygonsCoords((prev) => {
                const newPolygons = [...prev];
                newPolygons[selectedPolygonIndex] = newCoords;
                return newPolygons;
            });
        }
    };

    const handleDelete = () => {
        toggleDeleting();
    }

    const toggleDeleting = () => {
        setIsDeleting(!isDeleting)
    }
    // @ts-ignore
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={mapCenter}
                scrollEnabled={!isEditing}
                onRegionChange={handleRegionChange}
            >
                {polygons.map((coords, index) => (
                    <Polygon
                        key={index}
                        coordinates={coords['coords']}
                        fillColor={hexToRgbA(coords['color'])}
                        strokeWidth={2}
                        strokeColor={coords['color']}
                        // onDragEnd={(event) => {
                        //     const newCoords = [...polygonsCoords];
                        //     newCoords[index] = event.nativeEvent.coordinate;
                        //     setPolygonsCoords(newCoords);
                        // }}
                        tappable={true}
                        // onLongPress={() => {console.log('!!!!!!')}}
                        onPress={() => {
                            console.log('pressed polygon');
                            if (isDeleting) {
                                handleRemovePolygon(index)
                                //delete from polygons
                                //delete from polygons coords
                                setIsDeleting(false)
                            }
                        }
                    }
                    />
                ))}

                {markerCoords.map((polygonMarkers) => (
                        polygonMarkers.map((polygonMarker) => (
                            <Marker
                                coordinate={polygonMarker}
                                draggable={isEditing}
                                 onDrag={(e) => onMarkerDrag(markerCoords.indexOf(polygonMarkers), polygonMarkers.indexOf(polygonMarker), e.nativeEvent.coordinate)}
                            >
                                <Image
                                    source={require('./../../../assets/icons/ellipse.png')}
                                    style={{width: 10, height: 10, opacity: 0.7}}
                                    sizeMode="contain"
                                />
                            </Marker>
                        ))
                ))}
                <Polyline
                    coordinates={routeCoordinates}
                    strokeColor="#FF0000"
                    strokeWidth={3}
                />
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                    />
                )}
            </MapView>

            <View>

                {isEditing &&
                <View style={styles.buttonContainer}>
<View>
                    <Button style={[styles.button, isEditing && styles.buttonActive]} onPress={toggleEditing}>
                        <Text>{isEditing ? 'Done' : 'Edit'}</Text>
                    </Button>
                    <Button  style={[styles.button, isDeleting && styles.buttonActive]} onPress={handleDelete}>
                        <Text>Delete</Text>
                    </Button>
</View>
                    <GroupModal data={groups} onPick={handlePick}></GroupModal>
                    {/*<Button onPress={toggleModal}>*/}
                    {/*    <Text>Add polygons</Text>*/}
                    {/*</Button>*/}
                    {/*<Button>*/}
                    {/*    <Text>Delete</Text>*/}
                    {/*</Button>*/}
                </View>}
                {!isEditing &&
                <View style={[styles.buttonContainer, !isEditing && styles.buttonContainerDisable]}>
                    <Button onPress={toggleEditing}>
                        <Text>{isEditing ? 'Done' : 'Edit'}</Text>
                    </Button>
                    <Button onPress={toggleActive}>
                        <Text>{isActive ? 'Finish' : 'Start'}</Text>
                    </Button>
                </View>
                }

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    marker: {
        height: 10,
        width:10,
        color: 'red'
    },
    buttonContainer: {
        flex: 1,
        flexDirection:'row',
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: "transparent",
        height: 90,
    },
    buttonContainerDisable: {
        height: 40
    },
    buttonText: {
        color: 'black',
    },
    button: {
        marginBottom: 5
    },
   buttonActive: {
        backgroundColor: '#636394',
        buttonText: '#a3a3af',
        color: '#a3a3af',
    }
});
