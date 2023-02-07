import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import {Section} from '../../components/section';
import {useAppearance} from '../../utils/hooks';
import {DetailText} from "../../components/detailText";
import {Button, Colors} from "react-native-ui-lib";
import {useServices} from "../../services";
import {Dropdown} from "../../components/dropdown";

// @ts-ignore
export const SearchManagment: React.FC = observer(({route}) => {
    useAppearance();
    const navigation = useNavigation();
    const searchId= route.params.searchId;
    const {navio} = useServices();
    useEffect(() => {
        configureUI();
    }, []);
    const configureUI = () => {
        navigation.setOptions({});
    };

    return (
        <ScrollView>
            <Section title={'Группы'}>
                {/*need to do so that color of each group would be displayed at the group name as a tag or something*/}
                <View>
                    <Button marginB-s4 label={'К карте'}></Button>
                </View>
                <View>
                    <Dropdown title={'Дата обращения'} members={['group', 'member1']}></Dropdown>
                </View>
                <View style={detailStyle.buttonContainer}>
                    {/*<Button label={'Изменить группы'} style={detailStyle.flexButton} onPress={()=>{}}></Button>*/}
                    <Button label={'+'} onPress={()=>{}}></Button>
                </View>
                {/*edit group on long press (there's rn component for such thing*/}
            </Section>
        </ScrollView>
    );
});

const detailStyle = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
