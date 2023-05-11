import * as React from 'react'

import {
  RESTORE_TOKEN,
  SIGN_OUT,
  SET_IS_LOADING,
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

function reducer(prevState, action) {
  const { type, payload } = action

  switch (type) {
    case RESTORE_TOKEN: {
      return {
        ...prevState,
        userToken: payload.token,
        isLoading: false,
      }
    }

    case SIGN_OUT: {
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      }
    }

    case SET_IS_LOADING: {
      return {
        ...prevState,
        isLoading: payload.isLoading,
      }
    }

    case FETCH_CART_START: {
      return {
        ...prevState,
        isLoading: true,
        error: '',
      }
    }

    case FETCH_CART_SUCCEED: {
      return {
        ...prevState,
        cart: payload.cart,
      }
    }

    case FETCH_CART_FAILED: {
      return {
        ...prevState,
        error: payload.error,
      }
    }

    case FETCH_PAYMENT_INTENT_START: {
      return { ...prevState, isLoading: true, paymentParams: {}, error: '' }
    }
    case FETCH_PAYMENT_INTENT_SUCCEED: {
      return {
        ...prevState,
        paymentParams: payload.paymentParams,
      }
    }

    case FETCH_PAYMENT_INTENT_FAILED: {
      return {
        ...prevState,
        error: payload.error,
        paymentParams: {},
      }
    }

    case MARK_TAG_WITH_USER_START:
    case ADD_PRODUCT_TO_TAG_CART_START:
    case LOGIN_START:
    case REGISTER_START: {
      return {
        ...prevState,
        isLoading: true,
      }
    }

    case LOGIN_SUCCEED:
    case REGISTER_SUCCEED: {
      return { ...prevState, userInfo: payload.user }
    }

    case MARK_TAG_WITH_USER_SUCCEED: {
      return {
        ...prevState,
        tagID: payload.tag.tagID,
      }
    }

    default: {
      return prevState
    }
  }
}

export default reducer
