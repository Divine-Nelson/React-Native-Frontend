import { Dimensions, Platform } from "react-native";

// current os
const onIOS = Platform.OS == "ios";

// screen dimentions
export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;

export const AUTH_TOKEN_KEY = "authToken";
export const USER_INITIALS_KEY = "userInitials";
