import *as React from 'react';
import { View, Text } from 'react-native';

export default function Mybooking({navigation}){
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
                onPress={() => alert('This is the "MyBooking" screen.')}
                style={{fontSize: 26, fontWeight: 'bold' }}>Mybooking Screen</Text>
        </View>
    );
}