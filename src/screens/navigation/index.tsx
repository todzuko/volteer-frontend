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
import {SearchList} from "../search/searchList";
import {SearchForm} from "../search/searchForm";
import { SearchDetail } from '../search/searchDetail';
import { SearchManagment } from '../search/searchManagment';

// NAVIO

console.log(getTabBarIcon('MainTab'))
// @ts-ignore
export const navio = Navio.build({
  screens: {
    Main,
    Settings,
    Example,
    Login,
    UserList,
    UserForm,
    SearchList,
    SearchForm,
    SearchDetail,
    SearchManagment,
    Playground: {
      component: Playground,
      options: () => ({
        title: 'Playground',
      }),
    },
  },
  stacks: {
    SearchStack: ['SearchList', 'SearchForm', 'SearchDetail', 'SearchManagment'],
    ExampleStack: ['Example'],
    UserStack: ['UserList', 'UserForm'],
  },
  tabs: {
    MainTab: {
      stack: 'SearchStack',
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
      stack: 'UserStack',
      options: () => ({
        title: '',
        tabBarIcon: getTabBarIcon('SettingsTab'),
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

