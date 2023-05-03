import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, {Marker, Polygon, Polyline} from 'react-native-maps';
import {Button, Image, Picker} from "react-native-ui-lib";
import * as Location from 'expo-location';
import {useServices} from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const MapScreen = () => {
    const polygonRef = useRef(null);
    const polygonsRef = useRef([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState(groups[0]);
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
    const [mapCenter, serMapCenter] = useState({
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

    type Group = {
        id: string
        name: string,
        users: object[],
        color: string,
    };
    const {navio} = useServices();
    const getGroups = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/groups/');
            const json = await response.json();
            console.log(json);
            setGroups(json);
        } catch (error) {
        }
    };

    const getPolygons = async () => {
        try {
            //get user role if not managaer or admin, get group polygons. else - all
            let url = 'http://192.168.1.103:3000/polygons/';
            if (role !== 'admin' || role !== 'manager') {
                let userGroup = getUserGroup()
                url += 'group/' + userGroup.id;
            }
                const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            setGroups(json);
        } catch (error) {
        }
    };

    const getUserGroup = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/groups/search/'+ searchItem.id + '/user/' + userId);
            const json = await response.json();
            console.log(json);
            setGroups(json);
        } catch (error) {
        }
    };

    const [markerCoords, setMarkerCoords] = useState(polygonsCoords);
    const [isEditing, setIsEditing] = useState(false);

    const onMarkerDrag = (polygonIndex: number, markerIndex: number, newCoords: { latitude: number; longitude: number; }) => {
        const newPolygonsCoords = polygonsCoords.map((polygon, i) => {
            if (i !== polygonIndex) {
                // This is not the polygon we're updating, so return it unchanged
                return polygon;
            }

            // This is the polygon we're updating, so create a copy and update the marker coordinates
            const newPolygon = [...polygon];
            newPolygon[markerIndex] = newCoords;
            return newPolygon;
        });

        setPolygonsCoords(newPolygonsCoords);
        setMarkerCoords(newPolygonsCoords);
    };

    const onPolygonPress = (e, polygonIndex) => {
        if (!isEditing) {
            return;
        }
        const { coordinate } = e.nativeEvent;
        const newPolygonsCoords = [...polygonsCoords];
        const polygonCoords = newPolygonsCoords[polygonIndex];
        const deltaX = coordinate.latitude - polygonCoords[0].latitude;
        const deltaY = coordinate.longitude - polygonCoords[0].longitude;
        const newMarkerCoords = polygonCoords.map((coords) => ({
            latitude: coords.latitude + deltaX,
            longitude: coords.longitude + deltaY,
        }));
        newPolygonsCoords[polygonIndex] = newMarkerCoords;
        setPolygonsCoords(newPolygonsCoords);
    };

    const onMapPanDrag = (e) => {
        if (!isEditing) {
            return;
        }
        const { coordinate } = e.nativeEvent;
        // const newPolygonCoords = [...polygonCoords];
        // const deltaX = coordinate.latitude - newPolygonCoords[0].latitude;
        // const deltaY = coordinate.longitude - newPolygonCoords[0].longitude;
        // for (let i = 0; i < newPolygonCoords.length; i++) {
        //     newPolygonCoords[i] = {
        //         latitude: newPolygonCoords[i].latitude + deltaX,
        //         longitude: newPolygonCoords[i].longitude + deltaY,
        //     };
        // }
        // setPolygonCoords(newPolygonCoords);
        // setMarkerCoords(newPolygonCoords);
    };

    function handleAddPolygon(selectedGroup: { id: string; name: string; users: object[]; color: string; }) {
        const size = 0.006;
        const distance = size / 2;
        let newPolygon = [
            { latitude: mapCenter.latitude + distance/2, longitude: mapCenter.longitude + distance },
            { latitude: mapCenter.latitude - distance/2, longitude: mapCenter.longitude + distance },
            { latitude: mapCenter.latitude - distance/2, longitude: mapCenter.longitude - distance },
            { latitude: mapCenter.latitude + distance/2, longitude: mapCenter.longitude - distance },
        ];
        let polygons = polygonsCoords;
        polygons.push(newPolygon)
        setPolygonsCoords(polygons)
        setMarkerCoords(polygons)
    }

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    function getPolygonColor(opacity: number): string {
        let hex = selectedGroup === undefined || selectedGroup.color === undefined ? '#33f693' : selectedGroup.color;
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r},${g},${b},${opacity})`;
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={mapCenter}
                scrollEnabled={!isEditing}
// onPanDrag
                onPanDrag={onMapPanDrag}
            >
                {polygonsCoords.map((coords, index) => (
                    <Polygon
                        key={index}
                        coordinates={coords}
                        fillColor={getPolygonColor(0.7)}
                        strokeWidth={2}
                        strokeColor={'#c7c9f0'}
                        // onPress={onPolygonPress}
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

            <View style={styles.buttonContainer}>

                <Picker
                    selectedValue={selectedGroup}
                    onValueChange={(itemValue: React.SetStateAction<{ id: string; name: string; users: object[]; color: string; }>, itemIndex: any) =>
                        setSelectedGroup(itemValue)
                    }>
                    {groups.map(group => (
                        <Picker.Item label={group.name} value={group.id} key={group.id} />
                    ))}
                </Picker>
                <Button label="Add" onPress={() => handleAddPolygon(selectedGroup)} />

                <Button onPress={toggleEditing}>
                    <Text>{isEditing ? 'Done' : 'Edit'}</Text>
                </Button>
                <Button onPress={toggleModal}>
                    <Text>Add polygons</Text>
                </Button>
                <Button>
                    <Text>Delete</Text>
                </Button>
                <Button>
                    <Text>Start</Text>
                </Button>
                <Button>
                    <Text>Finish</Text>
                </Button>
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
        bottom: 30,
        left: 20,
        backgroundColor: "transparent",
    },
    button: {
        backgroundColor: 'white',

        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
    },
});
