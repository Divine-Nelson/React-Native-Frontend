import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, shadow, sizes, spacing} from '../core/theme';

const CARD_WIDTH = sizes.width - 50;
const CARD_HEIGHT = 300;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopPlace = ({list}) => {
  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      showsHorizontalScrollIndicator ={false}
      keyExtractor={i => i.id}
      decelerationRate="fast"
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: spacing.l,
              marginRight: index === list.length - 1 ? spacing.l : 0,
            }}>
            <View style={[styles.card, shadow.dark]}>
              
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default TopPlace;