import { useContext } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import {colors}  from "../../core/theme";
import {onIOS} from "../../core/constant";
import { HeaderHeightContext } from "@react-navigation/elements";

const MainContainer = ({children, style, ...props}) => {

    return (
        <View 
        style={[{flex: 1, backgroundColor: colors.primary}, style]}
        {...props}>
            <KeyboardAvoidingView 
                behavior={onIOS? "padding": ""}
                style={{flex: 1}}
                keyboardVerticalOffset={useContext(HeaderHeightContext) ?? 0}
            >
                {children}
            </KeyboardAvoidingView>
        </View>
    );
};

export default MainContainer;