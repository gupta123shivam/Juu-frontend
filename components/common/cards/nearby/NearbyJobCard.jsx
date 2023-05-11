import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbyjobcard.style'
import { checkImageURL } from '../../../../util'

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: checkImageURL(job.employer_logo)
              ? job.employer_logo
              : 'https://img.freepik.com/free-vector/cartoon-character-cat-sticker_1308-66949.jpg?w=740&t=st=1681312635~exp=1681313235~hmac=35efd58dd350365a47e5a014cc07b92fd02085ad3345ad514fff6d414185a59b',
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard
