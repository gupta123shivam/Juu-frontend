import React, { createContext, useContext, useReducer } from 'react'
import {
  SET_IS_LOADING,
  ADD_PRODUCT_TO_TAG_CART,
  SET_CART,
} from '../actions/cartActions'

import cartReducer from '../reducer/cartReducer'
import axios from 'axios'

export const initialState = {
  isLoading: true,
  cart: [],
  error: '',
}

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  // Reducer Function
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const setIsLoading = (value) => {
    dispatch({ type: SET_IS_LOADING, payload: { isLoading: value } })
  }

  const addProductToTagCart = async (data) => {
    const { productTag, qty } = data
    dispatch({ type: ADD_PRODUCT_TO_TAG_CART })
  }

  const fetchCart = async () => {
    const data = [{ name: 'product1', amount: 150000, qty: 5, items: [] }]
    dispatch({ type: SET_CART, payload: { cart: data } })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        setIsLoading,
        addProductToTagCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
