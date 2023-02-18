import React, { useCallback, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureDesignSystem, getNavigationTheme, getStatusBarBGColor, getStatusBarStyle } from './src/utils/designSystem';
import { hydrateStores } from './src/stores';
import { initServices } from './src/services';
import { SSProvider } from './src/utils/providers';
import { StatusBar } from 'expo-status-bar';
import { useAppearance } from './src/utils/hooks';
import { Login } from './src/screens/base/login';
import { AppRoot } from './src/screens/navigation';

LogBox.ignoreLogs(['Require']);

export default () => {
  useAppearance();
  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const start = useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();

    await hydrateStores();
    configureDesignSystem();
    await initServices();

    setReady(true);
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    start();
  }, [start]);

  const handleLogin = (isLoggedIn: boolean | ((prevState: boolean) => boolean)) => {
    setIsLoggedIn(isLoggedIn);
  };

  if (!ready) return <></>;

  if (!isLoggedIn) {
    // @ts-ignore
    return <Login onLogin={handleLogin}></Login>;
  }

  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SSProvider>
          <StatusBar style={getStatusBarStyle()} backgroundColor={getStatusBarBGColor()} />
          <AppRoot navigationContainerProps={{theme: getNavigationTheme()}} />
        </SSProvider>
      </GestureHandlerRootView>
  );
};
