import React, {useEffect, useMemo, useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native-ui-lib';
import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react';
import { useAppearance } from '../../utils/hooks';
import { randomStr } from '../../utils/help';
import { ListItem } from '../../components/listItem';
import { useServices } from '../../services';

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
    const [count, setCount] = useState(0);

    const getSearch = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/search/');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getSearchCount = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/search/count/');
            const json = await response.json();
            setCount(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSearch();
    }, []);

    const pushForm = () => navio.push('SearchForm');
    return (
        <View flex bg-bgColor>
            <Text marginV-s3  white>Всего: 10</Text>
            <Button marginV-s3 marginH-s10 label={'Добавить'} onPress={pushForm}></Button>
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
