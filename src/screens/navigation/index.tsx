import {Navio} from 'rn-navio';

import {Main} from '../base/main';
import {Playground} from '../base/playground';
import {Settings} from '../base/settings';
import {Example} from '../base/_screen-sample';

import {useAppearance} from '../../utils/hooks';
import {screenDefaultOptions, tabDefaultOptions, getTabBarIcon} from '../../utils/designSystem';
import {Login} from "../base/login";
import {UserList} from "../user/userList";

// NAVIO
export const navio = Navio.build({
  screens: {
    Main,
    Settings,
    Example,
    Login,
    UserList,
    Playground: {
      component: Playground,
      options: () => ({
        title: 'Playground',
      }),
    },
  },
  stacks: {
    MainStack: ['Main', 'Example'],
    ExampleStack: ['Example'],
  },
  tabs: {
    MainTab: {
      stack: 'MainStack',
      options: {
        title: 'Home',
        tabBarIcon: getTabBarIcon('MainTab'),
      },
    },
    PlaygroundTab: {
      stack: ['Playground'],
      options: () => ({
        title: 'Playground',
        tabBarIcon: getTabBarIcon('PlaygroundTab'),
      }),
    },
    SettingsTab: {
      stack: ['Settings'],
      options: () => ({
        title: 'Settings',
        tabBarIcon: getTabBarIcon('SettingsTab'),
      }),
    },
    LoginTab: {
      stack: ['Login', 'UserList'],
      options: () => ({
        title: 'Login',
        tabBarIcon: getTabBarIcon('SettingsTab'),
      }),
    },
    UserListTab: {
      stack: ['UserList'],
      options: () => ({
        title: 'Users',
        tabBarIcon: getTabBarIcon('PlaygroundTab'),
      }),
    },
  },
  modals: {
    ExampleModal: 'ExampleStack',
  },
  root: 'Tabs',
  hooks: [useAppearance],
  options: {
    stack: screenDefaultOptions,
    tab: tabDefaultOptions,
  },
});

export const getNavio = () => navio;
export const AppRoot = navio.Root;

