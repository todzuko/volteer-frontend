import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View, SegmentedControl, Colors, Button} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {NavioScreen} from 'rn-navio';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Step 1
import { StackActions } from '@react-navigation/native';
import { Login } from "./login";
import {Section} from '../../components/section';
import {Row} from '../../components/row';
import {
  appearances,
  appearancesUI,
  appearanceUIToInternal,
  languages,
  languagesUI,
  languageUIToInternal,
} from '../../utils/types/enums';
import {useAppearance} from '../../utils/hooks';
import {hydrateStores, useStores} from '../../stores';
import {HeaderButton} from '../../components/button';
import {initServices, services} from '../../services';
import {navio} from "../navigation";
import * as SplashScreen from "expo-splash-screen";
import {configureDesignSystem} from "../../utils/designSystem";
import VContext from "../../../VContext";

export const Settings: NavioScreen = observer(({ navigation, route }: any) => {
  useAppearance();
  // const navigation = useNavigation();
  const {ui} = useStores();

  // State
  const [appearance, setAppearance] = useState(ui.appearance);
  const [language, setLanguage] = useState(ui.language);

  const { loggedIn, setLoggedIn } = useContext(VContext);
  // Computed
  const unsavedChanges = ui.appearance !== appearance || ui.language !== language;

  const appearanceInitialIndex = appearances.findIndex(it => it === appearance);
  const appearanceSegments = appearancesUI.map(it => ({label: it}));

  const languageInitialIndex = languages.findIndex(it => it === language);
  const languageSegments = languagesUI.map(it => ({label: it}));

  // Start
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        unsavedChanges ? <HeaderButton onPress={handleSave} label="Save" /> : null,
    });
  }, [unsavedChanges, appearance, language]);

  // Methods
  const handleAppearanceIndexChange = (index: number) =>
    setAppearance(appearanceUIToInternal[appearancesUI[index]]);
  const handleLanguageIndexChange = (index: number) =>
    setLanguage(languageUIToInternal[languagesUI[index]]);

  const handleSave = () => {
    ui.setMany({
      appearance,
      language,
    });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <View flex bg-bgColor>
        <ScrollView contentInsetAdjustmentBehavior="always">
          <Section title={'UI'}>
            <View paddingV-s1>
              <Row>
                <View flex>
                  <Text textColor text60R>
                    Appearance
                  </Text>
                </View>

                <SegmentedControl
                    initialIndex={appearanceInitialIndex}
                    segments={appearanceSegments}
                    backgroundColor={Colors.bgColor}
                    activeColor={Colors.primary}
                    inactiveColor={Colors.textColor}
                    onChangeIndex={handleAppearanceIndexChange}
                />
              </Row>
            </View>

            <View paddingV-s1>
              <Row>
                <View flex>
                  <Text textColor text60R>
                    Language
                  </Text>
                </View>

                <SegmentedControl
                    initialIndex={languageInitialIndex}
                    segments={languageSegments}
                    backgroundColor={Colors.bgColor}
                    activeColor={Colors.primary}
                    inactiveColor={Colors.textColor}
                    onChangeIndex={handleLanguageIndexChange}
                />
              </Row>
            </View>
          </Section>
        </ScrollView>

        <View paddingH-s1 paddingV-s2>
          <Button
              onPress={() => {
                AsyncStorage.setItem('accessToken', '');
                AsyncStorage.setItem('role', '');
                setLoggedIn(false)
                console.log('out')
              }}
              label="Logout"
              color={Colors.red20}
          />
        </View>
      </View>
  );
});
Settings.options = () => ({
  title: services.t.do('settings.title'),
});