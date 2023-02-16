import React, {useState} from 'react';
import {ActionSheet, View, Text, Button} from 'react-native-ui-lib';

interface Props {
    allUsers: string[];
    selectedUsers: string[];
    onSave: (selectedUsers: string[]) => void;
}

const EditUserGroup = (props: Props) => {
    const [selectedUserIndices, setSelectedUserIndices] = useState<number[]>([]);

    const options = props.allUsers.map((user, index) => ({
        label: user,
        onPress: () => {
            const newSelectedUserIndices = [...selectedUserIndices];
            if (selectedUserIndices.includes(index)) {
                newSelectedUserIndices.splice(selectedUserIndices.indexOf(index), 1);
            } else {
                newSelectedUserIndices.push(index);
            }
            setSelectedUserIndices(newSelectedUserIndices);
        },
    }));

    return (
        <ActionSheet
            title={'Select Users'}
            message={'Select the users you want to add to the group'}
            options={options.map((option, index) => (
                <View key={index} style={[
                    {padding: 10, backgroundColor: 'white'},
                    selectedUserIndices.includes(index) && {backgroundColor: 'lightgray'}
                ]}>
                    <Text>{option.label}</Text>
                </View>
            ))}
            cancelButtonIndex={props.allUsers.length}
            onPress={(index: number) => {
                if (index === props.allUsers.length) {
                    const selectedUsers = selectedUserIndices.map(
                        (selectedUserIndex) => props.allUsers[selectedUserIndex]
                    );
                    props.onSave(selectedUsers);
                }
            }}
            visible/>
    );
};

export default EditUserGroup;
