import React, {useState} from 'react';
import {View, Text, MarginModifiers, Incubator} from 'react-native-ui-lib';
const {TextField} = Incubator;

type Props = MarginModifiers & {
    label?: string;
    onPress?: PureFunc;
};


export const TextInput: React.FC<Props> = ({label, onPress, ...modifiers}) => {
    // @ts-ignore
    // @ts-ignore
    return (
        <View {...modifiers}>

            <TextField
                // value={this.state.value}
                // onChangeText={(value: any) => this.setState({value})}
                label="Email"
                placeholder="Enter email"
                enableErrors
                validationMessage={['Email is required', 'Email is invalid']}
                // validationMessagePosition={}
                validate={['required', 'email']}
                validateOnChange
                onChangeValidity={(isValid: boolean) => console.warn('validity changed:', isValid, Date.now())}
                marginB-s4
            />

        </View>
    );
};


export const InputField: React.FC<Props> = () => {
    return (
        <TextField
            placeholder={'Placeholder'}
            floatingPlaceholder
            onChangeText={() => console.log('changed')}
            enableErrors
            // validate={['required', 'email', (value) => value.length > 6]}
            validationMessage={['Field is required']}
            showCharCounter
            maxLength={30}
            color={'white'}
            labelColor={'white'}
        />
    );
}

