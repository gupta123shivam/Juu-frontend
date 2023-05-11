import React, { useEffect } from 'react'
import { StyleSheet, View, ToastAndroid } from 'react-native'
import {
  Button,
  Layout,
  Section,
  SectionContent,
  Text,
  TextInput,
  useTheme,
  TopNav,
} from 'react-native-rapi-ui'
import { Ionicons } from '@expo/vector-icons'

import { useAuthContext } from '../../context/authContext'

export default function ({ navigation }) {
  const [username, setusername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const [mobile, setMobile] = React.useState('')

  const { theme } = useTheme()
  const { signUp, isLoading } = useAuthContext()

  const handleRegister = async () => {
    // TODO
    if (!email || !username || !password || !password2 || !mobile) {
      ToastAndroid.show('Please fill all the details', ToastAndroid.LONG)
    }
    if (password !== password2) {
      ToastAndroid.show('Please confirm yoour password', ToastAndroid.LONG)
    }
    signUp({
      navigation,
      data: {
        email,
        username,
        password,
        mobile,
      },
    })
  }

  return (
    <Layout>
      <TopNav middleContent='Register' />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Section style={{ width: '80%', zIndex: -1 }}>
          <SectionContent>
            <View style={styles.inputContainer}>
              <Text style={{ marginBottom: 10 }}>Username</Text>
              <TextInput
                placeholder='Username'
                value={username}
                onChangeText={(val) => setusername(val)}
                leftContent={
                  <Ionicons
                    name='person-circle-sharp'
                    size={20}
                    color={theme.gray300}
                  />
                }
              />
            </View>
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
              <Text style={{ marginBottom: 10 }}>Email</Text>
              <TextInput
                keyboardType='number-pad'
                placeholder='Mobile'
                value={mobile}
                onChangeText={(val) => setMobile(val)}
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
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ marginBottom: 10 }}>Confirm Your password</Text>
              <TextInput
                placeholder='Enter your Password'
                value={password2}
                onChangeText={(val) => setPassword2(val)}
                leftContent={
                  <Ionicons
                    name='lock-closed'
                    size={20}
                    color={theme.gray300}
                  />
                }
              />
            </View>
            <Button
              text='Register'
              onPress={handleRegister}
              rightContent={
                <Ionicons name='arrow-forward' size={20} color={theme.white} />
              }
              status='primary'
              type='TouchableOpacity'
              style={styles.button}
              disabled={isLoading}
            />
            <Button
              text='Sign In'
              onPress={() => navigation.navigate('Login')}
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
  },
})
