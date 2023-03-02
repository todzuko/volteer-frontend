import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

export const MapScreen = () => {
    const mapUrl = 'https://nakarte.me/#m=13/57.11760/65.58924&l=T&r=57.153534/65.542274/Tyumen%20(%D0%A2%D1%8E%D0%BC%D0%B5%D0%BD%D1%8C)';
    // 'https://nakarte.me/#m=10/55.7532/37.6225&l=Osm';

    return (
        <View style={styles.container}>
            <WebView source={{ uri: mapUrl }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

