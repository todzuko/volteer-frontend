import React, {useState} from 'react';
import {View, Text, MarginModifiers, Incubator} from 'react-native-ui-lib';
const {TextField} = Incubator;

type Props = MarginModifiers & {
    label?: string;
    onPress?: PureFunc;
};

export const InputField= (props: any) => {
    return (
        <TextField
            placeholder={props.placeholder}
            floatingPlaceholder
            enableErrors
            // validate={'required'}
            // validationMessage={['Обязательное поле']}
            //showCharCounter
            maxLength={props.maxLength}
            color={'white'}
            labelColor={'white'}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
/>
    );
}

