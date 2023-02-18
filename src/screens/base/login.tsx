import React, { useState, useEffect} from 'react';
import {Button, Text} from 'react-native-ui-lib';
import {InputField} from "../../components/input/input";
import { View } from 'react-native-ui-lib';
import {observer} from "mobx-react";
import { AppRoot } from '../navigation';
import {getNavigationTheme} from "../../utils/designSystem";

export const Login: React.FC = observer(() => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log(data); // do something with the response data
            if (data.error) {
                setError(data.error);
            } else {
                // set the user's login state to true
                setLoggedIn(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loggedIn) {
        // show the protected routes if the user is logged in
        return (
            <AppRoot navigationContainerProps={{theme: getNavigationTheme()}} />
        );
    } else {
        // show the login form if the user is not logged in
        return (
            <View bg-bgColor flex paddingH-s5 paddingT-s10>
                <View marginT-s10 paddingT-s10>
                </View>
                <View marginT-s10 paddingT-s10></View>
                <InputField
                    placeholder='Логин'
                    value={login}
                    onChangeText={setLogin}
                />
                <InputField
                    placeholder='Пароль'
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Button label='Войти' onPress={handleLogin} />
                <Text marginT-s5 style={{'color': '#e14b4b'}}>{error}</Text>
            </View>
        );
    }

});
