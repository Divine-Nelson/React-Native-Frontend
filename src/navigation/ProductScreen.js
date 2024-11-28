import React from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import { colors } from '../core/theme';
import { SectionHeader } from '../componets/HeaderComponet';
import { Dumbells, Mats, Bands, Roller} from '../data';
import Machinelist  from '../componets/Machinelist';

const ProductScreen = () => {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <SectionHeader
            title="Dumbells"
            />
            <View style={styles.buttonBox}></View>
            <Machinelist list={Dumbells} />

            <SectionHeader
            title="Mats"
            />
            <Machinelist list={Mats} />

            <SectionHeader
            title="Bands"
            />
            <Machinelist list={Bands}/>

            <SectionHeader
            title="Foam Roller"
            />
            <Machinelist list={Roller} />
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
export default ProductScreen;
