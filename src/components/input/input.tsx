import React, {useState} from 'react';
import {View, Text, MarginModifiers, Incubator} from 'react-native-ui-lib';
const {TextField} = Incubator;

type Props = MarginModifiers & {
    label?: string;
    onPress?: PureFunc;
};

export const InputField= (props: any) => {
    let placeholder = props.placeholder;
    if (props.required) {
        placeholder += '*';
    }
    return (
        <TextField
            placeholder={placeholder}
            floatingPlaceholder
            enableErrors
            validate={props.required}
            // validationMessage={['Обязательное поле']}
            maxLength={props.maxLength}
            color={'white'}
            labelColor={'white'}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
/>
    );
}

