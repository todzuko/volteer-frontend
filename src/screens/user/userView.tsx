//add or edit user
//name
//login
//password
//roles

import React, {useEffect} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {Button} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {services, useServices} from '../../services';
import {useAppearance} from '../../utils/hooks';
import {FlatList} from "react-native";


export const UserView: React.FC = observer(() => {
    useAppearance(); // for Dark Mode
    const navigation = useNavigation();
    const {t, navio} = useServices();

    const push = () => navio.push('UserList');
    // Start
    useEffect(() => {
        configureUI();
    }, []);

    // UI Methods
    const configureUI = () => {
        navigation.setOptions({});
    };

    return (<View flex bg-bgColor>
       <Text>Name:</Text><Text>props.name</Text>
       <Text>Login:</Text><Text>props.name</Text>
       <Text>Roles:</Text>
        <FlatList
            data={[
                {key: 'Новичок'},
                {key: 'Управляющий'},
            ]}
            renderItem={({item}) => <Text >{item.key}</Text>}
        />
        <ul></ul>
    </View>);
});
