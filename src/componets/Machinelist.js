import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, shadow, sizes, spacing} from '../core/theme';

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 300;

const Machinelist = ({list}) => {
  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return (
          <TouchableOpacity style={styles.cardContainer}>
            <View style={[styles.card, shadow.light]} key={item.id}>
              <View style={styles.imageBox}>
                <Image style={styles.image} source={item.image} />
              </View>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  
});

export default Machinelist;