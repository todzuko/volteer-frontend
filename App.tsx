import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {LogBox} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
    configureDesignSystem,
    getNavigationTheme,
    getStatusBarBGColor,
    getStatusBarStyle
} from './src/utils/designSystem';
import {hydrateStores} from './src/stores';
import {initServices, services, useServices} from './src/services';
import {SSProvider} from './src/utils/providers';
import {StatusBar} from 'expo-status-bar';
import {useAppearance} from './src/utils/hooks';
import {Login} from './src/screens/base/login';
import {AppRoot} from './src/screens/navigation';
import VContext from "./VContext";

LogBox.ignoreLogs(['Require']);

export default () => {
    useAppearance();
    const [ready, setReady] = useState(false);
    const [loggedIn, setLoggedIn] =  useState(false);//useContext(VContext);
    const value = useMemo(
        () => ({loggedIn, setLoggedIn}),
        [loggedIn, setLoggedIn]
    );
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

    if (!ready) return <></>;

    // @ts-ignore
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <VContext.Provider value={value}>
                <SSProvider>
                    {!loggedIn ? (
                        <Login />
                    ) : (
                        <>
                            <StatusBar style={getStatusBarStyle()} backgroundColor={getStatusBarBGColor()} />
                            <AppRoot navigationContainerProps={{theme: getNavigationTheme()}} />
                        </>
                    )}
                </SSProvider>
            </VContext.Provider>
        </GestureHandlerRootView>
    );
};
