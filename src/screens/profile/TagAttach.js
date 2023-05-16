import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { Layout, Text, TopNav, Button, useTheme } from 'react-native-rapi-ui'
import { Camera, CameraType } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons'
import Loading from '../utils/Loading'

import { useAuthContext } from '../../context/authContext'

export default function ({ navigation }) {
  const [type, setType] = useState(CameraType.back)
  const [permission, setPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  // For remounting camera
  const [loaded, setLoaded] = useState(true)

  const { markTagWithUser, userInfo } = useAuthContext()
  const { isDarkmode } = useTheme()

  useEffect(() => {
    requestCameraPermission()

    // For remounting camera
    navigation.addListener('focus', () => {
      setLoaded(true)
    })
    navigation.addListener('blur', () => {
      setLoaded(false)
    })
  }, [])

  const requestCameraPermission = useCallback(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    setPermission(status === 'granted')
  })

  const handleBarCodeScanned = (scanningResult) => {
    if (!scanned) {
      const { data } = scanningResult
      setScanned(true)

      try {
        const res = JSON.parse(data)
        if (typeof res == 'object' && res.tagID) {
          markTagWithUser({ tagID: res.tagID, navigation, setScanned })
        } else {
          throw Error()
        }
      } catch (err) {
        const errMessage = 'Please scan another QR Code.'
        Alert.alert('Invalid QR Scanned', errMessage, [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => setScanned(false),
          },
        ])
      }

      // if scan is incorrect, prompt to scan again, and if he agrees then scan again
      // ToastAndroid.show('Tag was not attached properly. Scan Again', ToastAndroid.SHORT);
      // setScanned(false)
    }
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  // User is not looged/registerd
  if (!userInfo.email) {
    return (
      <Layout>
        <TopNav middleContent='TagAttach' />
        <View style={styles.container}>
          <Text style={{ textAlign: 'center', color: 'red' }}>
            Please login/register first.
          </Text>
        </View>
      </Layout>
    )
  }

  // Camera permissions are still loading
  if (permission == null) {
    return <Loading />
  }

  // Camera permissions are not granted 
  if (!permission) {
    return (
      <Layout>
        <TopNav middleContent='TagAttach' />
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>
            We need your permission to scan the tag
          </Text>
          <Button
            onPress={requestCameraPermission}
            text='Grant Camera permission'
            style={styles.button}
          />
        </View>
      </Layout>
    )
  }

  return (
    <Layout>
      <TopNav
        middleContent='Tag Attach'
        leftContent={
          <Ionicons
            name='chevron-back'
            size={20}
            color={isDarkmode ? themeColor.white100 : '#191921'}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {loaded && (
          <CameraComponent
            handleBarCodeScanned={handleBarCodeScanned}
            toggleCameraType={toggleCameraType}
            type={type}
          />
        )}
        {scanned && (
          <Button text='Scan Again' onPress={() => setScanned(false)} />
        )}
      </View>
    </Layout>
  )
}

const CameraComponent = ({ handleBarCodeScanned, toggleCameraType, type }) => {
  return (
    <Camera
      style={styles.camera}
      type={type}
      onBarCodeScanned={handleBarCodeScanned}
      barCodeScannerSettings={{ barCodeTypes: ['qr'] }}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Ionicons
            name='sync-circle-outline'
            style={{ fontSize: 60, fontWeight: 400, color: 'white' }}
          />
        </TouchableOpacity>
      </View>
    </Camera>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
