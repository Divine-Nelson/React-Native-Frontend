import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

const OnboardingContext = createContext();
const CartContext = createContext();
const SavedProductsContext = createContext()



export {OnboardingContext, CartContext, SavedProductsContext};