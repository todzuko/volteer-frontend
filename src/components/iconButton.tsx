import {Button, View} from "react-native-ui-lib";
import {Icon} from "./icon";
import {StyleSheet, TouchableHighlight} from "react-native";
import React from "react";


export const IconButton = (props:{name: string, size: number, color: string, press:any}) => {
    return(
        <TouchableHighlight style={IconStyle.container} onPress={props.press}>
            <View style={IconStyle.icon}>
                <Icon name={props.name} size={props.size} color={props.color}></Icon>
            </View>
        </TouchableHighlight>
    )
}

const IconStyle = StyleSheet.create({
    container: {
        margin: 4,
        padding: 12,
        justifyContent:'center',
        borderRadius: 35,
    },
    icon: {
    }
});