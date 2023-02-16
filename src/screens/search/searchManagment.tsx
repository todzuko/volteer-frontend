import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {Section} from '../../components/section';
import {useAppearance} from '../../utils/hooks';
import {Button, Colors} from "react-native-ui-lib";
import {useServices} from "../../services";
import {InputModalBlock} from "../../components/input/inputModalBlock";
import {OptionSheet} from "../../components/input/optionSheet";
import {IconButton} from "../../components/iconButton";
import EditUserGroup from "../../components/input/editUserGroup";

// @ts-ignore
export const SearchManagment: React.FC = observer(({route}) => {
    useAppearance();
    const navigation = useNavigation();
    const [groups, setGroups] = useState<Group[]>([]);
    const searchId= route.params.searchId;
    type Group = {
        id: string
        title: string,
        users: object[],
        color: string,
    };
    const {navio} = useServices();
    useEffect(() => {
        configureUI();
    }, []);
    const configureUI = () => {
        navigation.setOptions({});
    };
    const sampleUsers2 = [
        {'name': "John Doe"},
        {'name': "Jane Doe"},
        {'name': "Jim Smith"}
    ];
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

//get groups and pass each one to dropdown
    return (
        <ScrollView>
            <Section title={'Группы'}>
                {/*need to do so that color of each group would be displayed at the group name as a tag or something*/}
                <View>
                    <Button marginB-s4 label={'К карте'}></Button>
                </View>
                    {groups.map((group) => (
                        <InputModalBlock title={'title'} group={group}></InputModalBlock>
                    ))}

                <View style={detailStyle.buttonContainer}>
                    {/*<Button label={'Изменить группы'} style={detailStyle.flexButton} onPress={()=>{}}></Button>*/}
                    <Button label={'+'} onPress={()=>{}}></Button>
                </View>
                {/*edit group on long press (there's rn component for such thing*/}
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
