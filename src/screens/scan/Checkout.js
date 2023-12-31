// eslint-disable-next-line react-hooks/exhaustive-deps
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native'
import { Layout, Text, TopNav, Button } from 'react-native-rapi-ui'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

import { useAuthContext } from '../../context/authContext'
import { COLORS, SHADOWS, SIZES } from '../../constants'
import { MERCHANT_ID, PUBLISHABLE_KEY, API_URL } from '@env'

export default function Cart({ navigation }) {
  const [ready, setReady] = useState(false)
  const [err, setErr] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentParams, setPaymentParams] = useState(null)
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet()

  const { userInfo, fetchPaymentParams } = useAuthContext()

  useEffect(() => {
    if (userInfo !== null) {
      startFetchingPaymentDetails();
  }}, [])

  const startFetchingPaymentDetails = async()=>{
    try{
      const params = await fetchPaymentSheetParams();
    setPaymentParams(params); // Update the paymentParams state
    initializePaymentSheet(params); // Call initializePaymentSheet after the state update
    }
    catch(error){
      setErr(true)
      console.log('Error:', error)
    }
}

  const initializePaymentSheet = async (paymentParams) => {
    try {
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentParams.paymentIntent,
        merchantDisplayName: 'Juu-India',
      })
      if (error) {
        setErr(error)
        Alert.alert(`Error Code: ${error.code}`, error.message)
      } else {
        setReady(true)
      }
    } catch (error) {
      setErr(true)
      setReady(false)
      console.log(error)
      ToastAndroid.show('Payment Intent generation failed.', ToastAndroid.SHORT)
    }
  }

  const fetchPaymentSheetParams = async () => {
    try {
      setIsLoading(true)
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
      // throw error
    } finally {
      setIsLoading(false)
    }
  }

  const buy = async () => {
    if (!ready) {
      setErr(false)
      await startFetchingPaymentDetails()
    }
    const { error } = await presentPaymentSheet()
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
      setReady(false)
      setErr(true)
    } else {
      Alert.alert(
        'Success',
        'The payment was confirmed successfully. You will be redirected to Home in 5 sec.'
      )
      // send a request back to server telling that the payment was successful
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
        <Text>No User was found. Please login/register first.</Text>
        <Button
          text='Go to Login'
          onPress={() => navigation.navigate('Login')}
        />
      </CheckoutLayout>
    )
  }

  if ((isLoading && !err) || (paymentParams==null && !err)) {
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

  if (!isLoading && err) {
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
        <Checkout paymentParams={paymentParams.checkoutInfo} />
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
    <View style={styles.container}>
      <Text style={{ fontSize: 25, textTransform: 'capitalize' }}>
        Juu-India
      </Text>
      <Text style={{ fontSize: 15, color: MD2Colors.grey600, marginTop: 3 }}>
        Total Qty : {paymentParams.quantity}
      </Text>
      <Text style={{ fontSize: 15, color: MD2Colors.grey600, marginTop: 3 }}>
        Total Amount: {paymentParams.amount / 100}
      </Text>
    </View>
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
          justifyContent: 'space-around',
          rowGap: 10,
          marginTop: 5,
        }}
      >
        {children}
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    width: 340,
    rowGap: 10,
    maxHeight: 130,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  itemName: {
    fontSize: SIZES.medium,
    fontFamily: 'DMBold',
    color: COLORS.primary,
  },
  itemType: {
    fontSize: SIZES.small + 2,
    fontFamily: 'DMRegular',
    color: COLORS.gray,
    marginTop: 3,
    textTransform: 'capitalize',
  },
})
