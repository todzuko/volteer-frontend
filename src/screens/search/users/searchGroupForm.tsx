import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {Button} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';

import {services, useServices} from '../../../services';
import {Section} from '../../../components/section';
import {useAppearance} from '../../../utils/hooks';
import {InputField, TextInput} from "../../../components/input";
import { Formik } from 'formik';


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
        <Button marginV-s1 label={'push screen'} onPress={push} />
        <Formik initialValues={{email: ''}}
                onSubmit={values => console.log(values)}>
            <Section title={t.do('section.volteer.searchForm')}>
                <InputField placeholder={'ФИО пропавшего'}/>
                <InputField type={date} label={'Дата рождения'}/>
                <InputField placeholder={'Даты пропажи'}/>
                <InputField placeholder={'Место'}/>
                <InputField placeholder={'Обстоятельства пропажи'}/>
                <InputField placeholder={'Одежда'}/>
                <InputField placeholder={'Внешность'}/>
                <InputField placeholder={'Особые приметы'}/>
                <InputField type={"photo, multiple"} placeholder={'Фото'}/>
                <Button marginV-s4 label={'Сохранить'} onPress={ () => {}}/>
                {/*text - forgot password?*/}
            </Section>
        </Formik>
    </View>);
});
