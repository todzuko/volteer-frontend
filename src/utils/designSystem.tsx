import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {StatusBarStyle} from 'expo-status-bar';
import {Appearance as RNAppearance, Platform} from 'react-native';
import {Colors, Typography} from 'react-native-ui-lib';

import {stores} from '../stores';
import {Icon} from '../components/icon';
import {Appearance} from './types/enums';

// =============
// | RN UI Lib |
// =============

const colors = {
  primary: '#B3ABFF', // blue
  secondary: '#B3ABFF', // green
  accent: '#895f94', // yellow
  _black: '#303034',
  _black2: '#2b2b2d',
  _whiteText: '#e3e7ea',
  _white: Colors.rgba(250, 250, 250, 1),
  _white2: Colors.rgba(230, 230, 230, 1),
};

const themes: Record<Appearance, ThemeColors> = {
  system: {} as any,
  light: {
    textColor: colors._black,
    bgColor: colors._white,
    bg2Color: colors._white2,
  },
  dark: {
    textColor: colors._whiteText,
    bgColor: colors._black,
    bg2Color: colors._black2,
  },
};

// for more information - https://wix.github.io/react-native-ui-lib/foundation/style
export const configureDesignSystem = async (): PVoid => {
  const {ui} = stores;

  setColorsScheme(ui.appearance); // needed here
  if (ui.isAppearanceSystem) {
    Colors.loadColors(colors);
    Colors.loadSchemes(themes);
  } else {
    Colors.loadColors({...colors, ...themes[ui.appearance]});
    Colors.loadSchemes({dark: {}, light: {}});
  }

  Typography.loadTypographies({
    section: {fontSize: 26, fontWeight: '600'},
  });
};

const setColorsScheme = (appearance: Appearance) => {
  if (appearance === 'system') Colors.setScheme('default');
  else Colors.setScheme(appearance);
};

// ==============
// | Navigation |
// ==============
export const getStatusBarStyle = (): StatusBarStyle => {
  const {ui} = stores;

  if (ui.isAppearanceSystem) {
    return 'auto';
  } else {
    switch (ui.appearance) {
      case 'dark':
        return 'light';
      case 'light':
        return 'dark';
      default:
        return 'auto';
    }
  }
};

export const getStatusBarBGColor = (): string => {
  const {ui} = stores;
  const appearance = ui.isAppearanceSystem ? RNAppearance.getColorScheme() : ui.appearance;
  return themes[appearance ?? 'light'].bg2Color;
};

export const getNavigationTheme = (): Theme => {
  const {ui} = stores;

  // for more information - https://reactnavigation.org/docs/themes
  const MyDefaultTheme: Theme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      background: Colors.bgColor,
      card: Colors.bgColor,
      text: Colors.textColor,
      // border: Colors.grey30,
      // notification: Colors.primary,
    },
  };

  const MyDarkTheme: Theme = {
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.primary,
      background: Colors.bgColor,
      card: Colors.bgColor,
      text: Colors.textColor,
      // border: Colors.grey30,
      // notification: Colors.primary,
    },
  };

  const appearance = ui.isAppearanceSystem ? RNAppearance.getColorScheme() : ui.appearance;
  switch (appearance) {
    case 'dark':
      return MyDarkTheme;
    case 'light':
      return MyDefaultTheme;
  }

  return DefaultTheme;
};

export const getHeaderBlurEffect = (): 'regular' | 'light' | 'dark' => {
  const {ui} = stores;

  return ui.isAppearanceSystem ? 'regular' : (ui.appearance as 'light' | 'dark');
};

// Default options
export const screenDefaultOptions = (): NativeStackNavigationOptions => ({
  headerShadowVisible: false,
  headerTintColor: Colors.primary,

  // this setup makes large title work on iOS
  ...Platform.select({
    ios: {
      headerLargeTitle: true,
      headerTransparent: true,
      headerBlurEffect: getHeaderBlurEffect(), // this sets up blurred nav bar
      // if you'd like to have a solid color for a nav bar, then you should
      // set up `headerStyle: {backgroundColor: Colors.bg2Color}`
    },
  }),
});

export const tabDefaultOptions = (): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.grey40,
  tabBarStyle: {backgroundColor: Colors.bgColor, borderTopWidth: 0, elevation: 0},
});

export const getTabBarIcon =
  (tabName: string) =>
  ({focused, color, size}: {focused: boolean; color: string; size: number}) =>
    <Icon name={getTabIconName(tabName, focused)} size={20} color={color} />;

const getTabIconName = (tabName: string, focused: boolean): string => {
  if (tabName === 'MainTab') {
    return 'home';
  }
  if (tabName === 'SettingsTab') {
    return 'gear';
  }
  if (tabName === 'UserListTab') {
    return 'person';
  }

  return 'list';
};
