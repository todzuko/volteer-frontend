import React from 'react';
import {View, Text, MarginModifiers} from 'react-native-ui-lib';
import {StyleSheet} from "react-native";

type Props = MarginModifiers & {
    title?: string;
    value?: string;
};

export const DetailText: React.FC<Props> = ({title, value, ...modifiers}) => {
    return (
        <View style={detailStyle.section} {...modifiers} >
            <Text style={detailStyle.title}>{title}</Text>
            <Text _whiteText>{value ?? '—'}</Text>
        </View>
    );
};

const detailStyle = StyleSheet.create({
    section: {
        paddingBottom: 10,
        marginBottom: 4,
        borderBottomWidth: 0.5,
        borderBottomColor: '#363636',
        paddingLeft: 4,
    },
    title: {
        fontSize: 14,
        color: '#777777',
    },
});
