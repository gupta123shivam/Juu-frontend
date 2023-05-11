import React, { createContext, useContext, useReducer } from 'react'
import { Alert, ToastAndroid, Appearance, useColorScheme } from 'react-native'
import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SET_IS_LOADING,
  SET_ERROR,
  MARK_TAG_WITH_USER_START,
  MARK_TAG_WITH_USER_SUCCEED,
  ADD_PRODUCT_TO_TAG_CART_START,
  ADD_PRODUCT_TO_TAG_CART_SUCCEED,
  FETCH_CART_START,
  FETCH_CART_SUCCEED,
  FETCH_CART_FAILED,
  FETCH_PAYMENT_INTENT_START,
  FETCH_PAYMENT_INTENT_SUCCEED,
  FETCH_PAYMENT_INTENT_FAILED,
  REGISTER_START,
  REGISTER_SUCCEED,
  LOGIN_START,
  LOGIN_SUCCEED,
} from '../actions/authActions'

import authReducer from '../reducer/authReducer'
import axios from 'axios'

import { API_URL } from '../constants'

export const initialState = {
  isLoading: false,
  isSignout: false,
  userToken: null,
  userInfo: {
    username: 'John',
    email: 'john@gmail.com',
    mobile: '123456789',
    verified: false,
    previousBills: [],
    __v: 0,
  },
  tagID: 'tagID_101',
  error: '',
  previousBills: [],
  cart: [],
  paymentParams: {},
  preferredTheme: useColorScheme(),
}

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  // Reducer Function
  const [state, dispatch] = useReducer(authReducer, initialState)

  const signIn = async ({ navigation, data }) => {
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token

    dispatch({ type: LOGIN_START })
    try {
      const res = await axios.post(`${API_URL}/user/login`, data)
      const { user, success, message, error } = res.data

      if (success) {
        dispatch({ type: LOGIN_SUCCEED, payload: { user } })
        ToastAndroid.show('User Login successfully', ToastAndroid.SHORT)
        navigation.navigate('MainTabs')
      } else {
        ToastAndroid.show('User Login failed' + message, ToastAndroid.SHORT)
      }
    } catch (error) {
      console.log(error)
      ToastAndroid.show(error.message, ToastAndroid.SHORT)
    } finally {
      dispatch({ type: SET_IS_LOADING, payload: { isLoading: false } })
    }
  }

  const signOut = () => dispatch({ type: SIGN_OUT })
  const signUp = async ({ navigation, data }) => {
    // In a production app, we need to send user data to server and get a token
    // We will also need to handle errors if sign up failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token

    dispatch({ type: REGISTER_START })
    try {
      const res = await axios.post(`${API_URL}/user/register`, data)
      const { user, success, message, error } = res.data

      if (success) {
        dispatch({ type: REGISTER_SUCCEED, payload: { user } })
        ToastAndroid.show('User registered successfully', ToastAndroid.SHORT)
        navigation.navigate('MainTabs')
      } else {
        ToastAndroid.show('User register failed', ToastAndroid.SHORT)
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT)
    } finally {
      dispatch({ type: SET_IS_LOADING, payload: { isLoading: false } })
    }
  }

  const setIsLoading = (value) => {
    dispatch({ type: SET_IS_LOADING, payload: { isLoading: value } })
  }

  const restoreToken = async (userToken) => {
    dispatch({ type: RESTORE_TOKEN, payload: { token: userToken } })
  }

  // Tag
  const markTagWithUser = async ({ tagID, navigation, setScanned }) => {
    dispatch({ type: MARK_TAG_WITH_USER_START })
    try {
      const res = await axios.post(`${API_URL}/tag/attach-tag`, {
        email: state.userInfo.email,
        tagID,
      })
      const { tag, success, message } = res.data

      if (success) {
        dispatch({ type: MARK_TAG_WITH_USER_SUCCEED, payload: { tag } })
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }
    } catch (err) {
      const errMessage = ' Please scan another qr code.'
      try {
        errMessage = err.response.data.message + errMessage
      } catch (error) {}
      Alert.alert('Tag Attaching Failed', errMessage, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => setScanned(false),
        },
      ])
    } finally {
      dispatch({ type: SET_IS_LOADING, payload: { isLoading: false } })
    }
    // return success=true, if tagID is attached to user, otherwisw tell him to scan again
  }

  const addProductToTagCart = async ({ productID, navigation, setScanned }) => {
    dispatch({ type: ADD_PRODUCT_TO_TAG_CART_START })
    try {
      const res = await axios.post(`${API_URL}/cart/add-product-to-cart`, {
        productID,
        qty: 1,
        tagID: state.tagID,
      })

      const { success, message } = res.data

      if (success) {
        dispatch({ type: ADD_PRODUCT_TO_TAG_CART_SUCCEED })
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }
    } catch (err) {
      const errMessage = 'Product loadin failed'
      try {
        errMessage += err.response.data.message
      } catch (error) {}

      Alert.alert('Product loading Failed', errMessage, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => setScanned(false),
        },
      ])
    } finally {
      dispatch({ type: SET_IS_LOADING, payload: { isLoading: false } })
    }
  }

  const fetchCart = async () => {
    dispatch({ type: FETCH_CART_START })
    try {
      const res = await axios.get(`${API_URL}/cart/get-cart`, {
        params: { tagID: state.tagID },
      })
      const result = res.data
      dispatch({ type: FETCH_CART_SUCCEED, payload: { cart: result.cart } })
      ToastAndroid.show('Cart fetched successfully', ToastAndroid.SHORT)
    } catch (error) {
      console.log(error)
      dispatch({
        type: FETCH_CART_FAILED,
        payload: { error: 'Cart fetching failed' },
      })
      ToastAndroid.show('Cart fetching failed', ToastAndroid.SHORT)
    } finally {
      dispatch({ type: SET_IS_LOADING, payload: { isLoading: false } })
    }
  }

  const fetchPaymentParams = async () => {
    dispatch({ type: FETCH_PAYMENT_INTENT_START })
    try {
      const res = await axios.post(
        `${API_URL}/payment/create-checkout-session`,
        {
          email: state.userInfo.email,
        }
      )
      const { success, message, paymentIntent, checkoutInfo } = res.data

      if (success) {
        ToastAndroid.show(message, ToastAndroid.SHORT)
      }
      dispatch({
        type: FETCH_PAYMENT_INTENT_SUCCEED,
        payload: { paymentParams: { paymentIntent, ...checkoutInfo } },
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: FETCH_PAYMENT_INTENT_FAILED,
        payload: {
          error: 'Could not fetch payment details. Please try again later',
        },
      })
      ToastAndroid.show('Payment Details fteching failed.', ToastAndroid.SHORT)
    } finally {
      dispatch({ type: SET_IS_LOADING, payload: { isLoading: false } })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        signUp,
        setIsLoading,
        restoreToken,
        markTagWithUser,
        addProductToTagCart,
        fetchCart,
        fetchPaymentParams,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
