import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { Layout, Text, TopNav, Button } from 'react-native-rapi-ui'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

import { useAuthContext } from '../../context/authContext'

export default function Cart({ navigation }) {
  const [error, setError] = useState('')
  const { isLoading, fetchCart, cart } = useAuthContext()
  useEffect(() => {
    ;(async () => {
      try {
        await fetchCart()
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
  if (error) {
    return (
      <CartLayout navigation={navigation}>
        <Text size='lg'>Error: </Text>
        <Text>{error}</Text>
        <Text>Please try again later.</Text>

        <Button
          text='Fetch Cart Again'
          onPress={fetchCart}
          style={{ marginVertical: 10 }}
        />
      </CartLayout>
    )
  }
  const checkCart = !cart.items || cart.items.length < 1
  if (checkCart) {
    return (
      <CartLayout navigation={navigation}>
        <Text>Nothing is on the cart. Please load product.</Text>
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
        renderItem={(item) => <Item item={item} />}
        keyExtractor={(item, idx) => item.productID}
      />
      <Button
        text='Proceed to Buy'
        onPress={() => navigation.navigate('Checkout')}
      />
    </CartLayout>
  )
}

const Item = ({ item: { item } }) => {
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
          borderColor: MD2Colors.grey700,
          borderRadius: 10,
        }}
      >
        <Text
          style={{ fontSize: 25, textTransform: 'capitalize' }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View>
          <Text
            style={{ fontSize: 15, color: MD2Colors.grey600, marginTop: 3 }}
          >
            Quantity: {item.quantity}
          </Text>
          <Text
            style={{ fontSize: 15, color: MD2Colors.grey600, marginTop: 3 }}
          >
            Price: {item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
