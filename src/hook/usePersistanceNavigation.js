import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Linking, Platform } from 'react-native'

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1'
const usePersistanceNavigation = () => {
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true)
  const [initialState, setInitialState] = React.useState()

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

  return { isReady, initialState, PERSISTENCE_KEY }
}

export default usePersistanceNavigation
