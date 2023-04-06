import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import {Image} from "react-native-ui-lib";


export const MapScreen = () => {
    const polygonRef = useRef(null);
    const [polygonCoords, setPolygonCoords] = useState([
        { latitude: 37.8025259, longitude: -122.4311431 },
        { latitude: 37.7896386, longitude: -122.421646 },
        { latitude: 37.7897555, longitude: -122.448339 },
        { latitude: 37.8021849, longitude: -122.4381232 },
    ]);

    const [markerCoords, setMarkerCoords] = useState(polygonCoords);

    const onMarkerDrag = (index, newCoords) => {
        const newPolygonCoords = [...polygonCoords];
        newPolygonCoords[index] = newCoords;
        setPolygonCoords(newPolygonCoords);
        setMarkerCoords(newPolygonCoords);
    };

    const onPolygonPress = (e) => {
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

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 37.7988376,
                longitude: -122.4347368,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }}
            // onPanDrag={onMapPanDrag}
        >
            <Polygon coordinates={polygonCoords}
                     fillColor="rgba(0, 255, 0, 0.5)"
                     strokeWidth={2}
                     onPress={onPolygonPress} />
            {markerCoords.map((markerCoord, index) => (
                <Marker
                    coordinate={markerCoord}
                    key={index}
                    draggable
                    onDrag={(e) => onMarkerDrag(index, e.nativeEvent.coordinate)}
                    // image={require('./../../../assets/icons/ellipse.png')}
                    // style={{ width: 5, height: 5 }}
                >
                <Image
                    source={require('./../../../assets/icons/ellipse.png')}
                    style={{ width: 26, height: 26, opacity: 0.7 }}
                    sizeMode="contain"
                />
                </Marker>
            ))}
        </MapView>
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
    }
});
