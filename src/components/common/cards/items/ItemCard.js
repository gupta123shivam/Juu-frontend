import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './itemcard.style'
import { checkImageURL } from '../../../../util'

const ItemCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(item.image)
              ? job.employer_logo
              : 'https://img.freepik.com/free-vector/cartoon-character-cat-sticker_1308-66949.jpg?w=740&t=st=1681312635~exp=1681313235~hmac=35efd58dd350365a47e5a014cc07b92fd02085ad3345ad514fff6d414185a59b',
          }}
          resizeMode='contain'
          style={styles.itemImage}
        />
      </TouchableOpacity>

      <View>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.itemType}>Qty: {item.quantity}</Text>
        <Text style={styles.itemType}>Price: {item.price}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemCard
