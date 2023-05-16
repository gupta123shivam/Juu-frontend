import { StyleSheet, Platform } from 'react-native'

import { COLORS, SHADOWS, SIZES } from '../../../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: '#FFF',
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    height: 90,
    width: 380,
    columnGap: 20,
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '70%',
    height: '70%',
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

export default styles
