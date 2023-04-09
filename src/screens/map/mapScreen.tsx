import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, {Marker, Polygon, Polyline} from 'react-native-maps';
import {Button, Image} from "react-native-ui-lib";
import * as Location from 'expo-location';


export const MapScreen = () => {
    const polygonRef = useRef(null);
    const [polygonCoords, setPolygonCoords] = useState([
        { latitude: 57.1525259, longitude: 65.5611431 },
        { latitude: 57.1496386, longitude: 65.551646 },
        { latitude: 57.147555, longitude: 65.558339 },
        { latitude: 57.1521849, longitude: 65.5681232 },
    ]);

    const [location, setLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    useEffect(() => {
        getLocationAsync();
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


    const [markerCoords, setMarkerCoords] = useState(polygonCoords);
    const [isEditing, setIsEditing] = useState(false);

    const onMarkerDrag = (index, newCoords) => {
        const newPolygonCoords = [...polygonCoords];
        newPolygonCoords[index] = newCoords;
        setPolygonCoords(newPolygonCoords);
        setMarkerCoords(newPolygonCoords);
    };

    const onPolygonPress = (e) => {
        if (!isEditing) {
            return;
        }
        const { coordinate } = e.nativeEvent;
        const newMarkerCoords = [...markerCoords];
        const newPolygonCoords = [...polygonCoords];
        const deltaX = coordinate.latitude - newPolygonCoords[0].latitude;
        const deltaY = coordinate.longitude - newPolygonCoords[0].longitude;
        for (let i = 0; i < newPolygonCoords.length; i++) {
            newPolygonCoords[i] = {
                latitude: newPolygonCoords[i].latitude + deltaX,
                longitude: newPolygonCoords[i].longitude + deltaY,
            };
            newMarkerCoords[i] = newPolygonCoords[i];
        }
        setPolygonCoords(newPolygonCoords);
        setMarkerCoords(newMarkerCoords);
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

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }



    // @ts-ignore
    // @ts-ignore
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 57.1553,
                    longitude: 65.5619,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                scrollEnabled={!isEditing}
// onPanDrag
                onPanDrag={onMapPanDrag}
            >
                <Polygon coordinates={polygonCoords}
                         fillColor="rgba(0, 255, 0, 0.5)"
                         strokeWidth={2}
                         strokeColor={'#c7c9f0'}
                         onPress={onPolygonPress} />
                {markerCoords.map((markerCoord, index) => (
                    <Marker
                        coordinate={markerCoord}
                        key={index}
                        draggable={isEditing}
                        onDrag={(e) => onMarkerDrag(index, e.nativeEvent.coordinate)}
                    >
                        {/*<Image*/}
                        {/*    source={require('./../../../assets/icons/ellipse.png')}*/}
                        {/*    style={{ width: 16, height: 16, opacity: 0.7 }}*/}
                        {/*    sizeMode="contain"*/}
                        {/*/>*/}
                    </Marker>
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
                <Button onPress={toggleEditing}>
                    <Text>Edit</Text>
                </Button>
                <Button>
                    <Text>Add polygons</Text>
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
