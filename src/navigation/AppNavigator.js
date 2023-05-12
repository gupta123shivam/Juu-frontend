import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Linking, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { themeColor, useTheme } from 'react-native-rapi-ui'
import TabBarIcon from '../components/utils/TabBarIcon'
import TabBarText from '../components/utils/TabBarText'

import Loading from '../screens/utils/Loading'
// Auth screens
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import ForgetPassword from '../screens/auth/ForgetPassword'

// Home  screens
import Home from '../screens/home/Home'
import SecondScreen from '../screens/home/SecondScreen'

// Scan screens
import Scan from '../screens/scan/Scan'
import Cart from '../screens/scan/Cart'
import Checkout from '../screens/scan/Checkout'

// Setting screens
import Setting from '../screens/setting/Setting'

// Profile Screens
import Profile from '../screens/profile/Profile'
import TagAttach from '../screens/profile/TagAttach'

// Auth Navigation
const AuthStack = createNativeStackNavigator()
const AuthScreens = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Login'
    >
      <AuthStack.Screen name='Login' component={Login} />
      <AuthStack.Screen name='Register' component={Register} />
      <AuthStack.Screen name='ForgetPassword' component={ForgetPassword} />
    </AuthStack.Navigator>
  )
}

const HomeStack = createNativeStackNavigator()
const HomeScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Home'
    >
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='SecondScreen' component={SecondScreen} />
    </HomeStack.Navigator>
  )
}

const ScanStack = createNativeStackNavigator()
const ScanScreens = () => {
  return (
    <ScanStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Scan'
    >
      <ScanStack.Screen name='Scan' component={Scan} />
      <ScanStack.Screen name='Cart' component={Cart} />
      <ScanStack.Screen name='Checkout' component={Checkout} />
    </ScanStack.Navigator>
  )
}

const SettingStack = createNativeStackNavigator()
const SettingScreens = () => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Setting'
    >
      <SettingStack.Screen name='Setting' component={Setting} />
    </SettingStack.Navigator>
  )
}

const ProfileStack = createNativeStackNavigator()
const ProfileScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Profile'
    >
      <ProfileStack.Screen name='Profile' component={Profile} />
      <ProfileStack.Screen name='TagAttach' component={TagAttach} />
    </ProfileStack.Navigator>
  )
}

const Tabs = createBottomTabNavigator()
const MainTabs = () => {
  const { isDarkmode } = useTheme()
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : '#c0c0c0',
          backgroundColor: isDarkmode ? themeColor.dark200 : '#ffffff',
        },
        unmountOnBlur: true,
      }}
      initialRouteName='HomeScreens'
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name='HomeScreens'
        component={HomeScreens}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title='Home' />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'md-home'} />
          ),
        }}
      />
      <Tabs.Screen
        name='ScanScreens'
        component={ScanScreens}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title='Scan' />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'ios-person'} />
          ),
        }}
      />
      <Tabs.Screen
        name='SettingScreens'
        component={SettingScreens}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title='Profile' />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'ios-settings-outline'} />
          ),
        }}
      />
      <Tabs.Screen
        name='ProfileScreens'
        component={ProfileScreens}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title='Profile' />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={'ios-person-outline'} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}

const AppStack = createNativeStackNavigator()
const AppScreens = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='AuthScreens'
    >
      <AppStack.Screen name='AuthScreens' component={AuthScreens} />
      <AppStack.Screen name='MainTabs' component={MainTabs} />
    </AppStack.Navigator>
  )
}

export default () => {
  return <AppScreens />
}
// Navigation persistance
const usePersistanceNavigation = () => {
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true)
  const [initialState, setInitialState] = React.useState()
  const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1'

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL()

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY)
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined

          if (state !== undefined) {
            setInitialState(state)
          }
        }
      } finally {
        setIsReady(true)
      }
    }

    if (!isReady) {
      restoreState()
    }
  }, [isReady])

  // if (!isReady) {
  //   return <ActivityIndicator />;
  // }

  // return (
  // <NavigationContainer
  //   initialState={initialState}
  //   onStateChange={(state) =>
  //     AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
  //   }
  // >
  //     <AppScreens />

  // );

  return { isReady, initialState, PERSISTENCE_KEY }
}
