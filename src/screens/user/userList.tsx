import React, {useMemo} from 'react';
import {Button, Text, View} from 'react-native-ui-lib';
import {FlashList} from '@shopify/flash-list';
import {observer} from 'mobx-react';

import {useAppearance} from '../../utils/hooks';
import {randomStr} from '../../utils/help';
import {DefaultButton} from "../../components/button";

export const UserList: React.FC = observer(() => {
    useAppearance();

    const DATA = useMemo(
        () =>
            Array.from({length: 10}).map((v, ndx) => ({
                title: `Item ${ndx}`,
                description: randomStr(100),
                name: 'UserName',
                email: 'email',
            })),
        [],
    );

    return (
        <View flex bg-bgColor>
            <FlashList
                contentInsetAdjustmentBehavior="always"
                data={DATA}
                renderItem={({item}) => <ListItem item={item} />}
                ListHeaderComponent={ListHeader}
                estimatedItemSize={300}
            />
        </View>
    );
});

const ListItem = ({item}: any) => {
    useAppearance();

    return (
        <View padding-s2 bg-bgColor>
            <Text textColor text50R>
                {item.title}
            </Text>
            <Text textColor text70R>
                {item.description}
            </Text>
            <Button label={'edit'}></Button>
            <Button label={'delete'}></Button>
        </View>
    );
};

const ListHeader = () => {
    useAppearance();

    return (
        <View padding-s2 bg-bgColor>
            <Text text50M textColor>
                FlashList by Shopify
            </Text>
        </View>
    );
};
