import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {Button} from "react-native-ui-lib";
import {useServices} from "../../services";

interface Props {
    options: any[];
    onSelection: (selectedOptions: string[]) => void;
    selected: any[];
}

const OptionSelector = (props: Props) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        setSelectedOptions(props.selected.map(selectedId => {
            const selectedOption = props.options.find(option => option['_id'] === selectedId);
            return selectedOption ? selectedOption['_id'] : '';
        }));
    }, []);

    const handleOptionPress = (option: string) => {
        let newSelectedOptions;
        if (selectedOptions.includes(option)) {
            newSelectedOptions = selectedOptions.filter(selectedOption => selectedOption !== option);
        } else {
            newSelectedOptions = [...selectedOptions, option];
        }
        setSelectedOptions(newSelectedOptions);
        props.onSelection(newSelectedOptions);
    };

    return (
        <View>
            <ScrollView style={styles.optionContainer} nestedScrollEnabled={true}>
                {props.options.map((option, index) => {
                    return (
                        <TouchableOpacity
                            key={option['_id']}
                            style={[
                                styles.option,
                                selectedOptions.includes(option['_id']) ? styles.selectedOption : {},
                            ]}
                            onPress={() => handleOptionPress(option['_id'])}
                        >
                            <Text style={styles.optionText}>{option['name']}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    optionContainer: {
        height: 200,
        backgroundColor: '#2b2b2d',
        padding: 6,
        borderRadius: 10,
        marginVertical: 2
    },
    option: {
        marginVertical: 3,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#444449',
        borderRadius: 8,
    },
    selectedOption: {
        backgroundColor: '#444449'
    },
    optionText: {
        textAlign: 'center',
        color: '#c9c9c9'
    },
    saveButton: {
        marginTop: 20,
        paddingVertical: 10,
        textAlign: 'center',
        color: 'white'
    }
});

export default OptionSelector;