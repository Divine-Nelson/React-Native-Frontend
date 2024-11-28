import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {sizes, spacing} from '../core/theme';

export const ScreenHeader = ({mainTitle, secondTitle}) => {
  return (
    <View style={screenHeaderStyles.container}>
      <Text style={screenHeaderStyles.mainTitle}>{mainTitle}</Text>
      <Text style={screenHeaderStyles.secondTitle}>{secondTitle}</Text>
      
    </View>
  );
};

const screenHeaderStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  mainTitle: {
    fontSize: sizes.title,
    fontWeight: 'bold',
  },
  secondTitle: {
    fontSize: sizes.title,
  },
});

export const SectionHeader = ({title}) => {
  return (
    <View style={sectionHeaderStyles.container}>
      <Text bold>{title}</Text>
    </View>
  );
};

const sectionHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: spacing.l,
    marginRight: spacing.m,
    marginTop: spacing.l,
    marginBottom: 10,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
  },
});

export const Screen = ({mainTitle}) => {
  return (
    <View style={ScreenStyles.container}>
      <Text style={ScreenStyles.mainTitle}>{mainTitle}</Text>
    </View>
  );
};

const ScreenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  mainTitle: {
    fontSize: sizes.title,
    fontWeight: 'bold',
  },
});
