//add or edit user
//name
//login
//password
//roles

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
import {getNavio} from "../navigation";
import {Alert, TextInput} from "react-native";
import {Picker} from "@react-native-picker/picker";


export const UserForm: React.FC = observer(() => {
    useAppearance(); // for Dark Mode
    const navigation = useNavigation();
    const {t, navio} = useServices();
    // const {ui} = useStores();

    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    const roles = [
        { label: 'Select a role', value: '' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
    ];

    // Methods
    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, login, password, role: selectedRole }),
            });
            const data = await response.json();
            console.log(data);

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

    const push = () => navio.push('UserList');
    // Start
    useEffect(() => {
        configureUI();
    }, []);

    // UI Methods
    const configureUI = () => {
        navigation.setOptions({});
    };

    // UI Methods
//admin can assign roles, for user this field is hidden
    //can admin change password?
    return (<View flex bg-bgColor>
        <Formik initialValues={{email: ''}}
                onSubmit={values => console.log(values)}>
            <Section title={'Редактирование'}>
                <InputField placeholder={'Имя'} value={name}
                            onChangeText={(text: React.SetStateAction<string>) => {
                                setName(text);
                            }} />
                <InputField placeholder={'Логин'}  value={login}
                            onChangeText={(text: React.SetStateAction<string>) => setLogin(text)} />
                {/*<Text>Change password (link)</Text>*/}
                <InputField placeholder={'Password'}  value={password}
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

                <Button marginV-s4 label={'Сохранить'}  onPress={handleSubmit} />
                {/*text - forgot password?*/}
            </Section>
        </Formik>
    </View>);
});
