import React from 'react'
import { View, Linking } from 'react-native'
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
  TopNav,
} from 'react-native-rapi-ui'

import { useAuthContext } from '../../context/authContext'

export default function ({ navigation }) {
  const { userInfo } = useAuthContext()
  const { isDarkmode, setTheme } = useTheme()

  const a = () => {
      console.log(1)
    };
  return (
    <Layout>
      <TopNav middleContent='Home' />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
        }}
      >
        <Section>
          <SectionContent>
            {/* <Text fontWeight="bold" style={{ textAlign: "center" }}>
                These UI components provided by Rapi UI
              </Text>
              <Button
                style={{ marginTop: 10 }}
                text="Rapi UI Documentation"
                status="info"
                onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
              /> */}
            <Button
              text={`Hello, ${
                userInfo?.username ? userInfo?.username : 'Juu User'
              }!`}
              onPress={() => {
                navigation.navigate('SecondScreen')
              }}
              style={{
                marginTop: 10,
              }}
            />

            <Button
              text={isDarkmode ? 'Light Mode' : 'Dark Mode'}
              status={isDarkmode ? 'success' : 'warning'}
              onPress={() => {
                a()
                if (isDarkmode) {
                  setTheme('light')
                } else {
                  setTheme('dark')
                }
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  )
}
