import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {Section} from '../../components/section';
import {useAppearance} from '../../utils/hooks';
import {Button, Colors} from "react-native-ui-lib";
import {useServices} from "../../services";
import {InputModalBlock} from "../../components/input/inputModalBlock";

// @ts-ignore
export const SearchManagment: React.FC = observer(({route}) => {
    useAppearance();
    const navigation = useNavigation();
    const [groups, setGroups] = useState<Group[]>([]);
    const [color, setColor] = useState('#FFFFFF');
    const searchId= route.params.searchId;
    type Group = {
        id: string
        name: string,
        users: object[],
        color: string,
    };

    const addGroup = () => {
        const newGroup: Group = {
            id: '0',
            name: 'Новая группа',
            users: [],
            color: "#000000"
        };
        setGroups([...groups, newGroup]);
    };

    const {navio} = useServices();
    useEffect(() => {
        configureUI();
    }, []);
    const configureUI = () => {
        navigation.setOptions({});
    };

    const getGroups = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/groups/search/' + searchId);
            const json = await response.json();
            setGroups(json);
        } catch (error) {
        }
    };

    useEffect(() => {
        getGroups();
    }, []);

    const pushMap = () => {
        navio.push('MapScreen', {searchId});
    }

//get groups and pass each one to dropdown
    return (
        <ScrollView>
            <Section title={'Группы'}>
                <View>
                    <Button marginB-s4 label={'К карте'} onPress={pushMap}></Button>
                </View>
                    {groups.map((group) => (
                        <InputModalBlock key={group.id} group={group} searchId={searchId} ></InputModalBlock>
                    ))}

                <View style={detailStyle.buttonContainer}>
                    <Button label={'+'} onPress={addGroup}></Button>
                </View>
            </Section>
        </ScrollView>
    );
});

const detailStyle = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
