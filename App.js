import React, { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import { ThemeProvider } from 'react-native-rapi-ui'
import { Provider as PaperProvider } from 'react-native-paper'
import { AuthProvider } from './src/context/authContext'

import AppNavigator from './src/navigation/AppNavigator'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    DMBold: require('./src/assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('./src/assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('./src/assets/fonts/DMSans-Regular.ttf'),
  })
  
  React.useEffect(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <PaperProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    </PaperProvider>
  )
}
