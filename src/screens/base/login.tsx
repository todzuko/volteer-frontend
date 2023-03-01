import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {Button} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';
import {Main} from './main';

import {services, useServices} from '../../services';
 import {useStores} from '../../stores';
import {Section} from '../../components/section';
import {DefaultButton} from '../../components/button';
import {useAppearance} from '../../utils/hooks';
import {InputField, TextInput} from "../../components/input";
import {Form} from "formik";
import { Formik } from 'formik';
import {getNavio} from "../navigation";


export const Login: React.FC = observer(() => {
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

    return (<View flex bg-bgColor>
        <Button marginV-s1 marginH-s5 label={'Список'} onPress={push} />
        <Formik initialValues={{email: ''}}
                onSubmit={values => console.log(values)}>
            <Section title={t.do('section.volteer.login')}>
                <InputField placeholder={'Логин'}/>
                <InputField placeholder={'Пароль'}/>
                <Button marginV-s4 label={'Войти'} onPress={ () => {}}/>
                {/*text - forgot password?*/}
            </Section>
        </Formik>
    </View>);
});
