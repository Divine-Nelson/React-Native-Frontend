import { Text, StyleSheet, View } from 'react-native';
import StyledText from '../../componets/Texts/StyledText';
import { colors } from '../../core/theme';

export default function ProductInfo ({label, children, style}){
    return (
      <View style={style}>
        <StyledText bold style={{color: colors.accent + "cc", marginBottom: 5}}>{label}</StyledText>
        <StyledText bold>{children}</StyledText>
      </View>
    );
}

const styles = StyleSheet.create({})
