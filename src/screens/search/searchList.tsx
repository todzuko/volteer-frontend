import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react';
import { useAppearance } from '../../utils/hooks';
import { randomStr } from '../../utils/help';
import { ListItem } from '../../components/listItem';
import { useServices } from '../../services';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SearchList: React.FC = observer(() => {
    useAppearance();
    const {navio} = useServices();

    type Search = {
        // id: string
        name: string,
        birthday: string,
        lostdate: string,
        place: string,
        circumstances: string,
        clothes: string,
        appearance: string,
        special: string,
        // photos: string
    };

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Search[]>([]);
    const [role, setRole] = useState<String>('user');

    const getSearch = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/search/');
            const json = await response.json();
            // console.log(json);
            setData(json);
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getRole = async () => {
        const userRole = await AsyncStorage.getItem('role') ?? '';
        setRole(userRole)
    }

    useEffect(() => {
        getRole()
        getSearch();
    }, []);

    const pushForm = () => navio.push('SearchForm');
    return (
        <View flex bg-bgColor>
            <Text white>Всего: 10</Text>
            {(role === 'admin' || role === 'manager') &&
                <Button marginV-s3 marginH-s10 label={'Добавить'} onPress={pushForm}></Button>
            }
            <FlashList
                contentInsetAdjustmentBehavior="always"
                data={data}
                renderItem={({item}) => <Item item={item}/>}
                estimatedItemSize={300}
            />
        </View>
    );
});

const Item = ({item}: any) => {
    useAppearance();
    // @ts-ignore

    const {navio} = useServices();

    const handlePress = () => {
        navio.push('SearchDetail', {item})
    };
    return (
        <TouchableOpacity onPress={handlePress}>
            <ListItem text={item.lostdate + ' ' + item.place} title={item.name}/>
        </TouchableOpacity>
    );
};
