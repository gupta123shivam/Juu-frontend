import React, { useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
import { Layout, Text, TopNav, Button } from 'react-native-rapi-ui'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import { useAuthContext } from '../../context/authContext'
import { ItemCard } from '../../components'

export default function Cart({ navigation }) {
  const [error, setError] = useState('')
  const { isLoading, fetchCart, cart } = useAuthContext()
  useEffect(() => {
    ;(async () => {
      try {
        fetchCart()
      } catch (err) {
        setError('Error Occured while fetching cart.')
      }
    })()
  }, [])

  if (isLoading && !error) {
    return (
      <CartLayout navigation={navigation}>
        <ActivityIndicator
          animating={true}
          color={MD2Colors.red800}
          size={'large'}
        />
      </CartLayout>
    )
  }
  if (!isLoading && error) {
    return (
      <CartLayout navigation={navigation}>
        <Text size='lg'>Error: </Text>
        <Text>{error} Please try again later.</Text>

        <Button
          text='Fetch Cart Again'
          onPress={() => {
            setError('')
            fetchCart()
          }}
          style={{ marginVertical: 10 }}
        />
      </CartLayout>
    )
  }

  const checkCart = cart.items && cart.items.length > 0
  if (!checkCart) {
    return (
      <CartLayout navigation={navigation}>
        <Text>Nothing is on the cart. Please load products.</Text>
        <Button
          text={'Go to Scan'}
          onPress={() => navigation.navigate('Scan')}
        />
      </CartLayout>
    )
  }

  return (
    <CartLayout navigation={navigation}>
      <FlatList
        data={cart.items}
        renderItem={(item) => <ItemCard item={item.item} />}
        keyExtractor={(item, idx) => item.productID}
        showsVerticalScrollIndicator={true}
        style={{ gap: 5, flex: 1, marginVertical: 'auto' }}
      />
      <Button
        text='Proceed to Buy'
        onPress={() => navigation.navigate('Checkout')}
        size='md'
      />
    </CartLayout>
  )
}

function CartLayout({ children, navigation }) {
  return (
    <Layout>
      <TopNav
        middleContent='Cart'
        leftContent={<Ionicons name='chevron-back' size={20} />}
        leftAction={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: 20,
          marginBottom: 5,
        }}
      >
        {children}
      </View>
    </Layout>
  )
}
