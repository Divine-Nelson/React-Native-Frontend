import axios from "axios";
import { Linking } from "react-native";

export const initiatePayment = async (amount, message) => {
    try {
      const response = await axios.post("http://172.20.10.5:8000/api/create-payment/", {
        amount,
        message,
      });
  
      if (response.status === 201) {
        const { id, token } = response.data;
        const callbackUrl = "http://172.20.10.5:8000/api/callback-payment/";
        const appUrl = `swish://paymentrequest?token=${token}&callbackurl=${encodeURIComponent(callbackUrl)}`;
        Linking.openURL(appUrl); // Redirect to Swish
        return { id, token };
      }
    } catch (error) {
      console.error("Error initiating payment:", error.response || error);
      throw error;
    }
  };
  