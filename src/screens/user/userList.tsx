import React, {useMemo} from 'react';
import {Button, Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';

import {useAppearance} from '../../utils/hooks';
import {randomStr} from '../../utils/help';
import {StyleSheet} from "react-native";
import ListItem from "../../components/listItem";
import {useNavigation} from "@react-navigation/native";
import {useServices} from "../../services";

export const UserList: React.FC = observer(() => {
    useAppearance();

    const DATA = useMemo(
        () =>
            Array.from({length: 10}).map((v, ndx) => ({
                title: `Item ${ndx}`,
                text: 'item text here',
                description: randomStr(100),
                name: 'UserName',
                email: 'email',
                index: 1,
            })),
        [],
    );

    return (
        <View flex bg-bgColor>
            <Text>Всего: 10</Text>
            <Button marginV-s3 marginH-s10 label={'Добавить'}></Button>
            <FlashList
                contentInsetAdjustmentBehavior="always"
                data={DATA}
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

    const push = () => navio.push('UserForm');
    return (
        <View>
            <Button label={'test'} onPress={push}></Button>
            <ListItem text={item.text} title={item.title} iconName={'pencil'} iconSize={22} iconColor={'#448180'}
                      iconPress={push}/>
        </View>
    );
};
