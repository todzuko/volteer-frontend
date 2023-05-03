import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {observer} from "mobx-react";
import {useServices} from "../../services";


// @ts-ignore
export const GroupsModal: React.FC = observer(({route, isVisible, onSelectGroup }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const searchId= route.params.searchId;
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

    useEffect(() => {
        getGroups();
    }, []);

    return (
        <Modal isVisible={isVisible}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Select a Group</Text>
                {groups.map(group => (
                    <TouchableOpacity
                        key={group}
                        style={styles.groupButton}
                        onPress={() => onSelectGroup(group)}
                    >
                        <Text>{group}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    groupButton: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});

