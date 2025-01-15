import { useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import StyledText from './Texts/StyledText';
import CartCounter from './input/CartCounter';
import { ScreenWidth } from '../core/constant';
import { colors } from '../core/theme';
import {AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../utils/context';
import { storeData } from '../utils/storage';


const CartCard =({id, image, name, price, currency, cartCount, quantityAvailable})=>{
    const navigation = useNavigation();
    const {cartItems, setCartItems} = useContext(CartContext);

    const handleOnPress = () => {
        navigation.navigate("ProductDetails", {id})
    };

    const handleAddToCart = async (newCount) => {
        try {

            if(newCount > 0){
                let itemIndex = cartItems.findIndex(
                    (cartItem) => cartItem.id == id
                );
                cartItems[itemIndex].cartCount = newCount;
            }
            let updatedCartItems = [...cartItems];

            saveCartItems(updatedCartItems); 
                     
        } catch (error) {
          console.warn(error)
        }
    };
    
    const saveCartItems = async (updatedCartItems) => {
        try {
            storeData("@App:CartItems", updatedCartItems);
            setCartItems(updatedCartItems);

        } catch (error) {
            console.warn(error)
        }
    };

    const handleRemoveFromCart = async () =>{
        try {
            
            let updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== id);
    
            saveCartItems(updatedCartItems);
        } catch (error) {
          
        }
      };

    return(
        <TouchableOpacity style={styles.container} onPress={handleOnPress}>
            <Image source={image} style={styles.image} />

            <View style={styles.details}>
                <View style={styles.nameRow}>
                    <StyledText bold numberOfLines={2} style={styles.name}>
                        {name}
                    </StyledText>
                    <TouchableOpacity style={styles.closeButton} onPress={handleRemoveFromCart}>
                        <AntDesign name='close' size={22} color={colors.tertiary + "cc"} />

                    </TouchableOpacity>
                </View>

                <View style={styles.priceRow}>
                    <StyledText bold style={styles.price}> {price + currency}</StyledText>
                    <CartCounter small count={cartCount} setCount={handleAddToCart} limit={quantityAvailable}/>
                </View>
            </View>
        </TouchableOpacity>
        
    );



   
};
export default CartCard;


const styles = StyleSheet.create({
    container: {
        height: ScreenWidth * 0.43,
        minHeight: 160,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: colors.secondary
    },
    image: {
        width: "20%",
        height: "80%",
        resizeMode: "contain"
    },
    details:{
        width: "75%",

    },
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    name:{
        width: "70%",
    },
    closeButton: {
        width: 40,
        height: 40,
        alignItems: "flex-end",
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});