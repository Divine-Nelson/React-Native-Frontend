import { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native'
import MainContainer from '../componets/Container/MainContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY } from '../core/constant';
import CartCard from "../componets/CartCard";
import { colors } from '../core/theme';
import StyledText from '../componets/Texts/StyledText';
import StyledButton from '../componets/button/StyledButton';
import {Feather} from "@expo/vector-icons";
import { ScreenWidth } from '../core/constant';
import { CartContext } from '../utils/context';
import { storeData } from '../utils/storage';
import AlertModal from '../componets/Modals/AlertModal';
//import {initiatePayment} from '../services/payment';


export default function CartScreen () {
  const {cartItems, setCartItems} = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        const payment = await initiatePayment(token);
        if (payment) {
          setIsPaid(payment);
        }
      }
    };
    fetchPayment();
  }, []);

  const calculateCartTotal = () => {
    if(cartItems.length > 0) {
      const cartTotal = cartItems.reduce((accumulator, cartItem) => {
        return accumulator + cartItem.price * cartItem.cartCount;
      }, 0);
      setCartTotal(cartTotal);
    }
  };

  useEffect(()=> {
    calculateCartTotal();
  }, [cartItems]);

  const checkOut = (isConfirmed) => {
    if (isConfirmed == true) {
      setIsConfirming(true);

      return setTimeout(() => {
        setOrderConfirmed(true);
        setIsConfirming(false);
      }, 2000)
    }
    setIsModalVisible(true);

  };

  const cancelCheckOut = () => {
    if(orderConfirmed) {
      return completeOrder();
    }
    setIsModalVisible(false);
  };

  const completeOrder = async () => {
    await clearCart();
    setIsModalVisible(false);
    setOrderConfirmed(false);
  };

  const clearCart = async() =>{
    try {
      storeData("@App:CartItems", []);
      setCartItems([]);

    } catch (error) {
      console.warn(error);
      
    }
  }

  return (
    <MainContainer style={styles.container}>
      {cartItems.length <= 0 && (
        <View style={styles.emptyCart}>
          <Feather
            name="shopping-cart"
            size={ScreenWidth * 0.4}
            color={colors.tertiary + "55"}
            style={{marginBottom: 50}}
          />

          <StyledText big>Your cart is empty!</StyledText>
          <StyledText style={styles.emptyCartText}>
            No items found in your cart
          </StyledText>
        </View>
      )}

      {cartItems.length > 0 && (
        <>
          <FlatList 
            data={cartItems}
            renderItem={({item}) => <CartCard {...item}/>}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.divider}/>

          <View style={styles.checkOutRow}>
            <StyledText big style={styles.totalAmount}>{`${cartTotal}kr`}</StyledText>
            <StyledButton bold style={styles.checkoutButton} onPress={checkOut}>
              Checkout
            </StyledButton>
          </View>
        </>
      )}
      <AlertModal isVisible={isModalVisible} onClose={cancelCheckOut}>
        {!orderConfirmed && (
          <View style={styles.modalContentContainer}>
          <StyledText style={{marginBottom: 15}}>
            You are about to checkout an order of {" "}
            <StyledText bold>{`${cartTotal}kr`}</StyledText>. Continue?
          </StyledText>

          <StyledButton 
            style={styles.modalButton} 
            isLoading={isConfirming}
            onPress={() => checkOut(true)}
          >Continue</StyledButton>
        </View>
        )}

        {orderConfirmed && (
          <View style={styles.modalContentContainer}>
            <Feather name='check-circle' size={45} color={colors.green} style={{marginBottom: 15}}/>  

            <StyledText style={{marginBottom: 15}}>
              Order Confirmed!
            </StyledText>

            <StyledButton 
              style={[styles.modalButton, {backgroundColor: colors.green}]} 
              onPress={completeOrder}
            >Great</StyledButton>
          </View>
        )}
      </AlertModal>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 25,
  },
  divider: {
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: 1,
  },
  checkOutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  totalAmount: {
    width: "40%"
  },
  checkoutButton: {
    width: "50%"
  },

  emptyCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyCartText: {
    color: colors.tertiary,
    marginTop: 5
  },

  modalContentContainer: {
    padding: 25,
    alignItems: "center"
  },
  modalButton: {
    height: 50,
    width: "50%"
  }
})
