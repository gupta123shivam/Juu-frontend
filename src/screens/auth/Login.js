import React, { useState } from 'react'
import { StyleSheet, View, ToastAndroid } from 'react-native'
import {
  Button,
  Layout,
  Text,
  TextInput,
  useTheme,
  Section,
  SectionContent,
  TopNav,
} from 'react-native-rapi-ui'
import { Ionicons } from '@expo/vector-icons'

import { useAuthContext } from '../../context/authContext'

export default function ({ navigation }) {
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')

  const { signIn, isLoading } = useAuthContext()

  const { theme } = useTheme()

  const handleSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show('Please fill all the details', ToastAndroid.SHORT)
      return
    }
    await signIn({
      navigation,
      data: {
        email,
        password,
      },
    })
  }

  return (
    <Layout>
      <TopNav middleContent='Login' />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Section style={{ width: '80%' }}>
          <SectionContent>
            <View style={styles.inputContainer}>
              <Text style={{ marginBottom: 10 }}>Email</Text>
              <TextInput
                placeholder='Email'
                value={email}
                onChangeText={(val) => setEmail(val)}
                leftContent={
                  <Ionicons name='mail' size={20} color={theme.gray300} />
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ marginBottom: 10 }}>Password</Text>
              <TextInput
                placeholder='Password'
                value={password}
                onChangeText={(val) => setPassword(val)}
                leftContent={
                  <Ionicons
                    name='lock-closed'
                    size={20}
                    color={theme.gray300}
                  />
                }
                securetextentry={true}
              />
            </View>

            <Button
              text='Sign In'
              onPress={handleSignIn}
              rightContent={
                <Ionicons name='arrow-forward' size={20} color={theme.white} />
              }
              status='primary'
              type='TouchableOpacity'
              style={styles.button}
              disabled={isLoading}
            />
            <Button
              text='Register'
              onPress={() => navigation.navigate('Register')}
              outline
              style={styles.button}
            />
            <Button
              text='Demo'
              onPress={() => navigation.navigate('MainTabs')}
              outline
              style={styles.button}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 10,
    minWidth: 80,
  },
})
