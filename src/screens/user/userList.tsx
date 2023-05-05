import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';

import {useAppearance} from '../../utils/hooks';
import {randomStr} from '../../utils/help';
import {ListIconItem} from "../../components/listItem";
import {useNavigation} from "@react-navigation/native";
import {useServices} from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserList: React.FC = observer(() => {
    useAppearance();
    const {navio} = useServices();

    type User = {
        // id: string
        name: string;
        role: string;
    };

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<User[]>([]);


    const getUsers = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt');
            const response = await fetch('http://192.168.1.103:3000/users/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getUsers();
    }, []);

    const pushForm = () => navio.push('UserForm');
    return (
        <View flex bg-bgColor>
            {/*<Text>Всего: 10</Text>*/}
            <Button marginV-s3 marginH-s10 label={'Добавить'} onPress={pushForm}></Button>
            <FlashList
                contentInsetAdjustmentBehavior="always"
                data={data}
                renderItem={({item}) => <Item item={item}/>}
                // ListHeaderComponent={ListHeader}
                estimatedItemSize={300}
            />
        </View>
    );
});

const Item = ({item}: any) => {
    useAppearance();
    // @ts-ignore

    const navigation = useNavigation();
    const {t, navio} = useServices();
    // const {ui} = useStores();

    // State

    // Methods

    const pushForm = () => navio.push('UserForm', {item});
    return (
        <View>
            <ListIconItem text={item.role} title={item.name} iconName={'pencil'} iconSize={22} iconColor={'#939393'}
                      iconPress={ pushForm }/>
        </View>
    );
};
