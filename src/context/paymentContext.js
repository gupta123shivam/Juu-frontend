import React, { createContext, useContext, useReducer } from "react";
import {
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  SET_IS_LOADING,
  MARK_TAG_WITH_USER,
} from "../actions/authActions";

import authReducer from "../reducer/authReducer";
import axios from "axios";

export const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  userInfo: null,
  tagID: null,
  error: "",
  previousBills: [],
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Reducer Function
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async (data) => {
    // In a production app, we need to send some data (usually username, password) to server and get a token
    // We will also need to handle errors if sign in failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token

    const userInfo = {
      username: "John",
      mobile: 123456789,
      email: "john@gmaail.com",
    };
    dispatch({
      type: SIGN_IN,
      payload: { token: "dummy-auth-token", userInfo },
    });
  };

  const signOut = () => dispatch({ type: SIGN_OUT });
  const signUp = async (data) => {
    // In a production app, we need to send user data to server and get a token
    // We will also need to handle errors if sign up failed
    // After getting token, we need to persist the token using `SecureStore`
    // In the example, we'll use a dummy token

    dispatch({ type: SIGN_UP, payload: { token: "dummy-auth-token" } });
  };

  const setIsLoading = (value) => {
    dispatch({ type: SET_IS_LOADING, payload: { isLoading: value } });
  };

  const restoreToken = async (userToken) => {
    dispatch({ type: RESTORE_TOKEN, payload: { token: userToken } });
  };

  // Tag
  const markTagWithUser = async (data) => {
    const { tagID } = data;
    // Send the data to backend and then if respose is good, set the tagID in state. Otherwise
    // set the error and ask to scan another tag
    // data to be sent = {email, data}
    dispatch({ type: MARK_TAG_WITH_USER, payload: { tagID } });

    // return success=true, if tagID is attached to user, otherwisw tell him to scan again
  };

  const addProductToTagCart = async (data) => {
    const { productTag, qty } = data;
    dispatch({ type: ADD_PRODUCT_TO_TAG_CART });
  };

  const fetchCart = async () => {
    const data = [{ name: "product1", amount: 150000, qty: 5, items: [] }];
    dispatch({ type: SET_CART, payload: { cart: data } });
  };

  const generatePaymentIntent = async () => {
    dispatch({ type: START_PAYMENT });
  };

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
        generatePaymentIntent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
