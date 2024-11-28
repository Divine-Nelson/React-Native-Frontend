import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { theme, colors } from '../core/theme';
import { ScreenHeader, SectionHeader } from '../componets/HeaderComponet';
import TopPlace from '../componets/TopPlace'
import { TOP_PLACES, PLACES } from '../data';
import Machinelist  from '../componets/Machinelist';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
        <ScreenHeader mainTitle="For you" secondTitle="More for you to explore" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <TopPlace list={TOP_PLACES} />
          <SectionHeader
          title="Popular Machines"
          />
          <Machinelist list={PLACES} />
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default HomeScreen;

