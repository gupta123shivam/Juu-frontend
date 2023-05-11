import React from 'react'
import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native'

import styles from './popularjobcard.style'
import { images } from '../../../../constants'
import { checkImageURL } from '../../../../util'

const PopularJobCard = ({
  item,
  selectedJob,
  handleCardPress,
  handleNavigate,
}) => {
  const {} = item
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: checkImageURL(item.employer_logo)
              ? item.employer_logo
              : 'https://img.freepik.com/free-vector/cartoon-character-cat-sticker_1308-66949.jpg?w=740&t=st=1681312635~exp=1681313235~hmac=35efd58dd350365a47e5a014cc07b92fd02085ad3345ad514fff6d414185a59b',
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard
