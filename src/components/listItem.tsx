import React, {useState} from 'react';
import {View, Text, MarginModifiers, Incubator} from 'react-native-ui-lib';
import {StyleSheet} from "react-native";
import {IconButton} from "./iconButton";
import {Icon} from "./icon";
const {TextField} = Incubator;

type Props = MarginModifiers & {
    label?: string;
    onPress?: PureFunc;
};


const ListItem= (props: { title: any; text: any; iconName: string, iconSize: number, iconColor: string, iconPress:any}) => {
    return (
            <View style={ListStyle.item}>
                <View style={ListStyle.textBlock}>
                <Text style={ListStyle.itemTitle}  marginL-10>{ props.title }</Text>
                <Text style={ListStyle.itemText} marginL-10>{ props.text }</Text>
                </View>
                <Icon onPress={props.iconPress} name={props.iconName} size={props.iconSize} color={props.iconColor}></Icon>
            </View>
    );
}

const ListStyle = StyleSheet.create({
    container: {
        margin: 0,
    },
    item: {
        borderRadius: 16,
        backgroundColor: '#37373d',
        marginBottom: 6,
        marginHorizontal: 12,
        padding: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textBlock: {
        maxWidth: '80%',
    },
    itemText: {
        fontSize: 14,
        border: 'none',
        color:'#b0b0b0',
    },
    itemTitle: {
        fontSize: 16,
        border: 'none',
        color:'#e1e1e1',
    }
});

export default ListItem;