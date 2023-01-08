import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '../services';
// import {useStores} from '../stores';
import {Section} from '../components/section';
import {DefaultButton} from '../components/button';
import {useAppearance} from '../utils/hooks';
import {InputField, TextInput} from "../components/input";
import {Form} from "formik";
import { Formik } from 'formik';

export type Props = {
    type?: 'push';
};

export const Login: NavioScreen<Props> = observer(({type = 'push'}) => {
    useAppearance(); // for Dark Mode
    const navigation = useNavigation();
    const {t, navio} = useServices();
    // const {ui} = useStores();

    // State

    // Methods
    const push = () => navio.push('Example', {type: 'push'});
    // Start
    useEffect(() => {
        configureUI();
    }, []);

    // UI Methods
    const configureUI = () => {
        navigation.setOptions({});
    };

    // UI Methods

    return (
    <View flex bg-bgColor>
        <Formik initialValues={{email: ''}}
                onSubmit={values => console.log(values)}>
            {/*<Section title={t.do('section.volteer.login')}>*/}
            <InputField/>
            <DefaultButton marginV-s1 label={'Login'} onPress={()=>{}}/>
            {/*</Section>*/}
        </Formik>
    </View>
)
    ;
});

Login.options = props => ({
    headerBackTitleStyle: false,
    title: `${services.t.do('example.title')} ${(props?.route?.params as Props)?.type ?? ''}`,
});
