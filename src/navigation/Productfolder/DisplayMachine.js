import { StyleSheet, View, Image } from "react-native";
import StyledText from "../../componets/Texts/StyledText";
import { ScreenWidth } from "../../core/constant";

const DisplaceMachine = ({product}) => {
  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.coverImage} />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      flex: 1,
      position: "relative",
      marginTop: 10,
    },
    coverImage:{
      height: 260,
      width: ScreenWidth * 0.45,
      borderRadius: 10,
      marginVertical: 10,
      marginLeft: 10,
    }
});

export default DisplaceMachine;
