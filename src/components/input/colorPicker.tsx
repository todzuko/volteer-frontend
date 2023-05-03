import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const colors = [
    '#7e1f1f',
    '#983085',
    '#482594',
    '#1c458d',
    '#02cbbb',
    '#3fa15c',
    '#bbbd5b',
    '#c07f32',
    '#b987af',
    '#80b4b0',
    '#74729d',
    '#d58484',
];

// @ts-ignore
export const ColorPicker = ({ selectedColor, onSelectColor }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.colorBox, { backgroundColor: selectedColor }]}
                onPress={() => setModalVisible(true)}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >

                <View style={styles.modalContainer}>
                <TouchableOpacity
                    style={styles.modalBackground}
                    onPress={() => setModalVisible(false)}
                >
                </TouchableOpacity>
                    <View style={styles.modalContent}>
                        {colors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.colorBox, { backgroundColor: color }]}
                                onPress={() => {
                                    onSelectColor(color);
                                    setModalVisible(false);
                                }}
                            />
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    colorBox: {
        width: 40,
        height: 40,
        borderRadius: 25,
        margin: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        zIndex:121212,
    },
    modalContent: {
        backgroundColor: '#2f2f33',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingBottom: 60
    },
});
