import {Navio} from 'rn-navio';

import {Main} from '../base/main';
import {Playground} from '../base/playground';
import {Settings} from '../base/settings';
import {Example} from '../base/_screen-sample';

import {useAppearance} from '../../utils/hooks';
import {screenDefaultOptions, tabDefaultOptions, getTabBarIcon} from '../../utils/designSystem';
import {Login} from "../base/login";
import {UserList} from "../user/userList";
import {UserForm} from "../user/userForm";

// NAVIO

console.log(getTabBarIcon('MainTab'))
export const navio = Navio.build({
  screens: {
    Main,
    Settings,
    Example,
    Login,
    UserList,
    UserForm,
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
        title: '',
        tabBarIcon: getTabBarIcon('MainTab'),
      },
    },
    SettingsTab: {
      stack: ['Settings'],
      options: () => ({
        title: '',
        tabBarLabel:'test',
        tabBarIcon: getTabBarIcon('SettingsTab'),
      }),
    },
    LoginTab: {
      stack: ['Login', 'UserList', 'UserForm'],
      options: () => ({
        title: '',
        tabBarIcon: getTabBarIcon('SettingsTab'),
      }),
    },
    // UserListTab: {
    //   stack: ['UserList'],
    //   options: () => ({
    //     title: '',
    //     tabBarIcon: getTabBarIcon('UserListTab'),
    //   }),
    // },
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

