//add or edit user
//name
//login
//password
//roles

import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {Button} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '../../services';
import {useStores} from '../../stores';
import {Section} from '../../components/section';
import {DefaultButton} from '../../components/button';
import {useAppearance} from '../../utils/hooks';
import {InputField, TextInput} from "../../components/input";
import {Form} from "formik";
import { Formik } from 'formik';
import {getNavio} from "../navigation";


export const UserForm: React.FC = observer(() => {
    useAppearance(); // for Dark Mode
    const navigation = useNavigation();
    const {t, navio} = useServices();
    // const {ui} = useStores();

    // State

    // Methods

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
                <InputField placeholder={'Имя'}/>
                <InputField placeholder={'Логин'}/>
                <Text>Change password (link)</Text>
                {/*<InputField placeholder={'Password'}/>*/}
                <Button marginV-s4 label={'Сохранить'} onPress={ () => {}}/>
                {/*text - forgot password?*/}
            </Section>
        </Formik>
    </View>);
});
