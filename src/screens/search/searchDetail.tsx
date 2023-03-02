import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {Section} from '../../components/section';
import {useAppearance} from '../../utils/hooks';
import {DetailText} from "../../components/detailText";
import {Button, Colors} from "react-native-ui-lib";
import {useServices} from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";

// @ts-ignore
export const SearchDetail: React.FC = observer(({route}) => {
    useAppearance();
    const navigation = useNavigation();
    const searchItem = route.params.item;
    const {navio} = useServices();

    const [role, setRole] = useState<String>('user');

    const getRole = async () => {
        const userRole= await AsyncStorage.getItem('role') ?? '';
        setRole(userRole)
    }

    useEffect(() => {
        getRole()
        configureUI();
    }, []);

    const handleDelete = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/search/' + searchItem.id, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Request failed');
            }
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    const pushForm = () => {
        const parsedBirthday = new Date(Date.parse(searchItem.birthday.replace(/\./g, '/')));
        const parsedLostdate = new Date(Date.parse(searchItem.lostdate.replace(/\./g, '/')));
        const updatedSearchItem = {...searchItem, birthday: parsedBirthday, lostdate: parsedLostdate};
        navio.push('SearchForm', {updatedSearchItem});
    };

    const pushManagement = () => {
        const searchId = searchItem.id;
        navio.push('SearchManagment', {searchId});
    }
    const configureUI = () => {
        navigation.setOptions({});
    };

    return (
        <ScrollView>
            <Section title={searchItem.name}>
                <View>
                    <Button label={'К поиску'} onPress={pushManagement}></Button>
                </View>
                <View style={{padding: 16}}>
                    <DetailText title={'Дата обращения'} value={searchItem.lostdate}></DetailText>
                    <DetailText title={'Дата рождения'} value={searchItem.birthday}></DetailText>
                    <DetailText title={'Дата пропажи'} value={searchItem.lostdate}></DetailText>
                    <DetailText title={'Место пропажи'} value={searchItem.place}></DetailText>
                    <DetailText title={'Обстоятельства пропажи'} value={searchItem.circumstances}></DetailText>
                    <DetailText title={'Одежда'} value={searchItem.clothes}></DetailText>
                    <DetailText title={'Внешность'} value={searchItem.appearance}></DetailText>
                    <DetailText title={'Особые признаки'} value={searchItem.special}></DetailText>
                </View>
                { (role === 'admin' || role === 'manager') &&
                    <View style={detailStyle.buttonContainer}>
                        <Button label={'Изменить'} style={detailStyle.flexButton} onPress={pushForm}></Button>
                        <Button label={'Удалить'} backgroundColor={'#f6637e'} style={detailStyle.flexButton} onPress={handleDelete}></Button>
                    </View>
                }
                <Button label={'Скачать ориентировку'}></Button>
            </Section>
        </ScrollView>
    );
});

const detailStyle = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 10
    },
    flexButton: {
        flex: 1,
        marginHorizontal: 4
    }
});
