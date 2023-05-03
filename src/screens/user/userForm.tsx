import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {Button} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {services, useServices} from '../../services';
import {Section} from '../../components/section';
import {useAppearance} from '../../utils/hooks';
import {InputField} from "../../components/input/input";
import { Formik } from 'formik';
import {Alert, StyleSheet, TextInput} from "react-native";
import {Picker} from "@react-native-picker/picker";

// @ts-ignore
export const UserForm: React.FC = observer(({ route }) => {
    useAppearance(); // for Dark Mode
    const navigation = useNavigation();
    const { t, navio } = useServices();

    const user =  route?.params?.item ?? {
        name: '',
        login: '',
        password: '',
        role: '',
    };
    const [name, setName] = useState(user.name);
    const [login, setLogin] = useState(user.login);
    const [password, setPassword] = useState(user.password);
    const [selectedRole, setSelectedRole] = useState(user.role);
    const [title, setTitle] = useState('Добавлеие');

    const roles = [
        { label: 'Select a role', value: '' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
    ];

    useEffect(() => {
        if (route?.params?.item) {
            setTitle('Редактирование');
        }
    }, []);

    const handleSubmit = async () => {
        try {
            const url = user ? `http://192.168.1.103:3000/users/${user._id}` : 'http://192.168.1.103:3000/users/';
            const method = user ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, login, password, role: selectedRole }),
            });
            const data = await response.json();

            Alert.alert(
                'Success',
                'Your data was successfully submitted.',
                [
                    { text: 'OK', onPress: () => {} },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/users/' + user.id, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Request failed');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    const push = () => navio.push('UserList');

    const configureUI = () => {
        navigation.setOptions({});
    };

    return (
        <View flex bg-bgColor>
            {/*use formik to validate stuff and not send form before validation is true*/}
            <Section title={title}>
                <InputField placeholder={'Имя'} value={name}
                            required={true}
                            onChangeText={(text: React.SetStateAction<string>) => {
                                setName(text);
                            }} />
                <InputField placeholder={'Логин'}  value={login}
                            required={true}
                            onChangeText={(text: React.SetStateAction<string>) => setLogin(text)} />
                <InputField placeholder={'Password'}  value={password}
                            required={true}
                            onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                            secureTextEntry={true} />
                <Text>Roles:</Text>
                <Picker
                    selectedValue={selectedRole}
                    onValueChange={role => setSelectedRole(role)}
                >
                    {roles.map(role => (
                        <Picker.Item key={role.value} label={role.label} value={role.value} />
                    ))}
                </Picker>
                <Button marginV-s4 marginH-s1 label={'Сохранить'} onPress={handleSubmit} />
                <View style={detailStyle.buttonContainer}>
                    <Button label={'Изменить'} style={detailStyle.flexButton} onPress={handleSubmit}></Button>
                    <Button label={'Удалить'} backgroundColor={'#f6637e'} style={detailStyle.flexButton} onPress={handleDelete}></Button>
                </View>
            </Section>
        </View>
    );
});


const detailStyle = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
    },
    flexButton: {
        flex: 1,
        marginHorizontal: 4
    }
});

