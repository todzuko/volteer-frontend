import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native-ui-lib';
import {Alert, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {InputField} from "./input";
import {IconButton} from "../iconButton";
import {OptionSheet} from "./optionSheet";
import EditUserGroup from "./editUserGroup";
import OptionSelector from "./optionSelector";
import {ColorPicker} from "./colorPicker";

interface Props {
    title: string;
    group: any;
    onSave: (newTitle: string, newMembers: object[]) => void;
    isNew?: boolean;
}

export const InputModalBlock: React.FC<Props> = ({group, searchId} ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(!group._id);
    const [color, setColor] = useState(group.color && group.color !== '' ? group.color :  '#848467');
    const [title, setTitle] = useState(group['name']);
    const [users, setUsers] = useState<object[]>(group['members']?? []);
    const [usersIds, setUsersIds] = useState<string[]>(group['users'].map((item: { [x: string]: any; }) => item['_id']));
    const getUsers = async () => {
        try {
            const response = await fetch('http://192.168.1.103:3000/users/');
            const json = await response.json();
            setUsers(json);
        } catch (error) {
        }
    };
    const selectedOptionIds = usersIds;
    useEffect(() => {
        getUsers();
    }, []);
    const handleLongPress = () => {
        setIsEditing(true);
    };
    const handleSave = async () => {
        // console.log(searchId)
        let url = 'http://192.168.1.103:3000/groups/';
        let reqMethod = 'POST';
        if (group._id && group._id != '0') {
            url += group._id + '/';
            reqMethod = 'PATCH'
        }
        console.log(reqMethod)
        console.log(url)
        console.log ({
            color: color,
            search: searchId,
            title: title,
            members: usersIds
        })
        try {
            const response = await fetch(url, {
                method: reqMethod,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    color: color,
                    search: searchId,
                    name: title,
                    users: usersIds
                })
            });
            setIsEditing(false);
        } catch (error) {
            // handle error
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://192.168.1.103:3000/groups/${group._id}`, {
                method: 'DELETE',
            });
            // handle success response
        } catch (error) {
            // handle error
        }
    }
    // @ts-ignore
    return isEditing ? (
            <View style={DropdownStyle.container}>
                <View style={DropdownStyle.headerContainer}>
                    <TouchableOpacity style={DropdownStyle.title}>
                        <InputField  value={title} maxLength={20} onChangeText={(text: React.SetStateAction<string>) => setTitle(text)}></InputField>
                    </TouchableOpacity>
                    <View style={DropdownStyle.headerButtonContainer}>
                        <IconButton name={'x'} style={DropdownStyle.headerButton} size={16} press={handleDelete} color={'#606060'}></IconButton>
                    </View>
                </View>

                <View style={DropdownStyle.colorPicker}>
                    <ColorPicker selectedColor={color} onSelectColor={setColor} />
                </View>
                <OptionSelector onSelection={(selectedOptionsIds) => {
                    setUsersIds(selectedOptionsIds)
                }} options={users} selected={selectedOptionIds}></OptionSelector>
                <View>
                    <Button style={DropdownStyle.saveButton} label={'cancel'} onPress={() => {
                        setIsEditing(false)
                    }}></Button>
                    <Button style={DropdownStyle.saveButton} label={'save'} onPress={handleSave}></Button>
                </View>
            </View>
        )
        : (
            <TouchableWithoutFeedback onLongPress={handleLongPress}>
                <View style={DropdownStyle.container}>
                    <Pressable style={DropdownStyle.arrowHeader} onLongPress={handleLongPress}
                               onPress={() => setIsVisible(!isVisible)}>
                        {/*<View style={DropdownStyle.color}></View>*/}
                        <View style={[DropdownStyle.circle, {backgroundColor: color}]} />
                        <Text style={DropdownStyle.title} value={title}>{title}</Text>
                        <Text style={DropdownStyle.arrow}>
                            {isVisible ? '▲' : '▼'}
                        </Text>
                    </Pressable>

                    {isVisible && (
                        <View>
                            <View style={DropdownStyle.line}></View>

                            {group['users'].map((member: { [x: string]: any; }) => (
                                <Text style={DropdownStyle.member} key={member['name']}>
                                    {member['name']}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
}

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
        paddingTop: 0
    },
    headerButton: {
        width: 16,
    },
    headerButtonContainer: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'flex-end',
        position: 'absolute',
        top: -20,
        right: -28,
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    title: {
        fontSize: 16,
        color: '#e1e1e1',
        marginTop: 0,
        height: 44,
        paddingTop: 6
    },
    member: {
        fontSize: 14,
        color: '#b0b0b0',
        marginTop: 2,
    },
    arrow: {
        width: 20,
        height: 15,
        color: '#444449',
    },
    line: {
        height: 1,
        backgroundColor: '#444449',
        width: '100%',
        marginBottom: 4,
        marginTop: 8
    },
    color: {
        height: 5,
        width: 5,
        borderRadius: 3,
        color: '#848467',
    },
    arrowHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    saveButton: {
        marginTop: 20,
        paddingVertical: 10,
        textAlign: 'center',
        color: 'white'
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    colorPicker: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
