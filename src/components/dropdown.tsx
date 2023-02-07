import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Line from "react-native-ui-lib/src/components/timeline/Line";

interface Props {
    title: string;
    members: string[];
}

export const Dropdown: React.FC<Props> = ({title, members}) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={DropdownStyle.container}>
            <TouchableOpacity style={DropdownStyle.titleContainer} onPress={() => setIsVisible(!isVisible)}>
                <Text style={DropdownStyle.title}>{title}</Text>
                <Text style={DropdownStyle.arrow}>
                    {isVisible ? '▲' : '▼'}
                </Text>
            </TouchableOpacity>

            {isVisible && (
                <View>
                    <View style={DropdownStyle.line}></View>
                    {members.map((member) => (
                        <Text style={DropdownStyle.member} key={member}>
                            {member}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
};

const DropdownStyle = StyleSheet.create({
    container: {
        margin: 0,
        fontSize: 14,
        color: '#b0b0b0',
        borderRadius: 16,
        backgroundColor: '#37373d',
        marginBottom: 6,
        marginHorizontal: 12,
        padding: 16,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        color: '#e1e1e1',
    },
    member: {
        fontSize: 14,
        color: '#b0b0b0',
        marginTop: 2,
    },
    arrow: {
        width: 20,
        height: 15,
        color: '#606060',
    },
    line: {
        height: 1,
        backgroundColor: '#444444',
        width: '100%',
        marginBottom: 4,
        marginTop: 8
    },});
