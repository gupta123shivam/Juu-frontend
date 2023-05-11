// eslint-disable-next-line react-hooks/exhaustive-deps
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import { Layout, Text, TopNav, Button } from 'react-native-rapi-ui'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

import { useAuthContext } from '../../context/authContext'
import { PUBLISHABLE_KEY, MERCHANT_ID, API_URL } from '../../constants'

export default function Cart({ navigation }) {
  const [ready, setReady] = useState(false)
  const [err, setErr] = useState(false)
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()

  const { userInfo, fetchPaymentParams, paymentParams, isLoading } =
    useAuthContext()

  useEffect(() => {
    if (userInfo !== null) {
      initializePaymentSheet()
    }
  }, [])

  const initializePaymentSheet = async () => {
    try {
      await fetchPaymentParams()

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentParams.paymentIntent,
        merchantDisplayName: 'Juu-India',
      })

      if (error) {
        Alert.alert(`Error Code: ${error.code}`, error.message)
      } else {
        setReady(true)
      }
    } catch (error) {
      setErr(true)
      ToastAndroid.show('Payment Intent generation failed.', ToastAndroid.SHORT)
    }
  }

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/payment/create-checkout-session`,
        {
          email: userInfo.email,
        }
      )
      return response.data
    } catch (error) {
      setErr(true)
      Alert.alert(`Network Error`, error.message)
    }
  }

  const buy = async () => {
    const { error } = await presentPaymentSheet()
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
      setReady(false)
    } else {
      Alert.alert(
        'Success',
        'The payment was confirmed successfully. You will be redirected to Home in 5 sec'
      )
      setTimeout(
        () => navigation.navigate('HomeScreens', { screen: 'Home' }),
        5000
      )
      setReady(false)
    }
  }

  if (userInfo == null || !userInfo.email) {
    return (
      <CheckoutLayout navigation={navigation}>
        <Text>No Userinfo was found. PLease make sure you are logged in</Text>
        <Button
          text='Go to Login'
          onPress={() => navigation.navigate('Login')}
        />
      </CheckoutLayout>
    )
  }

  if (isLoading && !err) {
    return (
      <CheckoutLayout navigation={navigation}>
        <ActivityIndicator
          animating={true}
          color={MD2Colors.red800}
          size={'large'}
        />
      </CheckoutLayout>
    )
  }

  if (err) {
    return (
      <CheckoutLayout navigation={navigation}>
        <Text>Some error occured. Please try again later.</Text>
        <Button
          text='Go to Home'
          onPress={() => navigation.navigate('HomeScreens', { screen: 'Home' })}
        />
      </CheckoutLayout>
    )
  }

  return (
    <StripeProvider
      publishableKey={PUBLISHABLE_KEY}
      merchantIdentifier={MERCHANT_ID}
    >
      <CheckoutLayout navigation={navigation}>
        <Checkout paymentParams={paymentParams} />
        <Button
          text='Proceed to Pay'
          onPress={buy}
          disabled={loading || !ready}
          style={{ marginBottom: 30 }}
        />
      </CheckoutLayout>
    </StripeProvider>
  )
}

const Checkout = ({ paymentParams }) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          columnGap: 20,
          marginHorizontal: 5,
          backgroundColor: MD2Colors.grey300,
          width: '100%',
          maxHeight: 100,
        }}
      >
        <Text
          style={{ fontSize: 25, textTransform: 'capitalize' }}
          numberOfLines={1}
        >
          Juu-India
        </Text>
        <View>
          <Text
            style={{ fontSize: 15, color: MD2Colors.grey600, marginTop: 3 }}
          >
            No.of Items : {paymentParams.quantity}
          </Text>
          <Text
            style={{ fontSize: 15, color: MD2Colors.grey600, marginTop: 3 }}
          >
            Total : {paymentParams.amount / 100}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function CheckoutLayout({ children, navigation }) {
  return (
    <Layout>
      <TopNav
        middleContent='Checkout'
        leftContent={<Ionicons name='chevron-back' size={20} />}
        leftAction={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          rowGap: 10,
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        {children}
      </View>
    </Layout>
  )
}
