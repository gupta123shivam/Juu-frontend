import 'expo-dev-client';
import React, { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ThemeProvider } from 'react-native-rapi-ui'
import { Provider as PaperProvider } from 'react-native-paper'
import { AuthProvider } from './src/context/authContext'

import AppScreens from './src/navigation/AppNavigator'
import usePersistanceNavigation from './src/hook/usePersistanceNavigation'
import Loading from './src/screens/utils/Loading'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    DMBold: require('./src/assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('./src/assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('./src/assets/fonts/DMSans-Regular.ttf'),
  })
  const { PERSISTENCE_KEY, isReady, initialState } = usePersistanceNavigation()

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }
  if (!isReady) {
    return <Loading />
  }

  return (
    <PaperProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer
            onReady={onLayoutRootView}
            onStateChange={(state) =>
              AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
            }
          >
            <AppScreens />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  )
}
