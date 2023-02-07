import React, {useState} from 'react';
import {View, Text, MarginModifiers, Incubator, DateTimePicker} from 'react-native-ui-lib';
import {StyleSheet} from "react-native";

const {TextField} = Incubator;

type Props = MarginModifiers & {
    label?: string;
    onPress?: PureFunc;
};

export const DateTimeInput = (props: any) => {
    return (
        <DateTimePicker
            placeholder={props.label}
            floatingPlaceholder
            value={props.value}
            onChange={props.onChange}
            mode={props.mode}
            color={'white'}
            labelColor={'white'}
            style={{fontSize: 14}}
        />
    );
}

