import React, {useEffect, useState} from 'react';
import {DateTimePickerProps, Image, Text, View} from 'react-native-ui-lib';
import {Button} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {InputField} from '../../components/input/input';
import {Alert, ScrollView} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {useNavigation} from "@react-navigation/native";
import {useAppearance} from "../../utils/hooks";
import {useServices} from "../../services";
import {useRoute} from "@react-navigation/native";
import {DateTimeInput} from "../../components/input/dateTimePicker";

// @ts-ignore
export const SearchForm: React.FC = observer(({route}) => {
    useAppearance();
    const navigation = useNavigation();
    const searchItem = route?.params?.updatedSearchItem ?? {
        name: '',
        birthday: new Date(),
        lostdate: new Date(),
        place: '',
        circumstances: '',
        clothes: '',
        appearance: '',
        special: '',
        photos: [],
    };

    const {navio} = useServices();
    const [name, setName] = useState(searchItem.name);
    const [birthday, setBirthday] = useState(searchItem.birthday);
    const [lostdate, setLostdate] = useState(searchItem.lostdate);
    const [place, setPlace] = useState(searchItem.place);
    const [circumstances, setCircumstances] = useState(searchItem.constructor);
    const [clothes, setClothes] = useState(searchItem.clothes);
    const [appearance, setAppearance] = useState(searchItem.appearance);
    const [special, setSpecial] = useState(searchItem.special);
    const [photos, setPhotos] = useState<string[]>(searchItem.photos);
    const [image, setImage] = useState(null);

    let url = 'http://192.168.1.103:3000/search/';
    let reqMethod = 'POST';
    if (searchItem.id) {
        url += searchItem.id + '/';
        reqMethod = 'PATCH'
    }
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('birthday', birthday.toISOString());
            formData.append('lostdate', lostdate.toISOString());
            formData.append('place', place);
            formData.append('circumstances', circumstances);
            formData.append('clothes', clothes);
            formData.append('appearance', appearance);
            formData.append('special', special);
            photos.forEach((photo, index) => {
                const filename = `photo_${index}.jpg`;
                formData.append('photos', {
                    uri: photo,
                    name: filename,
                    type: 'image/jpeg',
                });
            });
            const response = await fetch(url, {
                method: reqMethod,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
            const data = await response.text();
            Alert.alert(
                'Success',
                'Your report was successfully submitted.',
                [
                    {
                        text: 'OK', onPress: () => {
                        }
                    },
                ],
                {cancelable: false},
            );
        } catch (error) {
            console.error(error);
        }
    };

    // const pickImage = async () => {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //     });
    //
    //     if (!result.cancelled) {
    //         // @ts-ignore
    //         setPhotos([...photos, result.uri]);
    //         console.log(photos)
    //         console.log(result.assets)
    //     }
    // };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView style={{padding: 16}}>
            <InputField
                placeholder='ФИО'
                value={name}
                required={true}
                onChangeText={(text: React.SetStateAction<string>) => setName(text)}
            />

            <DateTimeInput
                label={'Дата рождения'}
                value={birthday}
                onChange={setBirthday}
                mode={'date'}
            />
            <DateTimeInput
                label={'Дата пропажи'}
                value={lostdate}
                onChange={setLostdate}
                mode={'date'}
            />
            <InputField
                placeholder='Место пропажи'
                value={place}
                required={true}
                onChangeText={(text: React.SetStateAction<string>) => setPlace(text)}
            />

            <InputField
                placeholder='Обстоятельства пропажи'
                value={circumstances}
                required={true}
                onChangeText={(text: React.SetStateAction<string>) => setCircumstances(text)}
            />

            <InputField
                placeholder='Одежда'
                value={clothes}
                required={true}
                onChangeText={(text: React.SetStateAction<string>) => setClothes(text)}
            />

            <InputField
                placeholder='Внешность'
                value={appearance}
                required={true}
                onChangeText
                    ={(text: React.SetStateAction<string>) => setAppearance(text)}
            />
            <InputField
                placeholder='Особые приметы'
                value={special}
                onChangeText={(text: React.SetStateAction<string>) => setSpecial(text)}
            />

            <Button label='Добавить фото' onPress={pickImage} marginV-s3 />

            {photos.map((photo, index) => (
                <Image key={index} source={{ uri: photo }}
                       style={{ width: 200, height: 200 }}
                />
            ))}
            {photos.map((photo, index) => (
                <Image key={index} source={{ uri: photo }} style={{ width: 200, height: 200 }} />
            ))}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
            <Button
                marginV-s3
                label='Сохранить'
                onPress={handleSubmit}
            />
        </ScrollView>
    );
});
