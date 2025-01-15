import { useContext } from "react";
import { KeyboardAvoidingView, ScrollView} from "react-native";
import {colors, color}  from "../../core/theme";
import {onIOS} from "../../core/constant";
import { HeaderHeightContext } from "@react-navigation/elements";

const ScrollableContainer = ({children, style, contentContainerStyle, ...props}) => {

    return (
        
        <KeyboardAvoidingView 
            behavior={onIOS? "padding": ""}
            style={{flex: 1}}
            keyboardVerticalOffset={useContext(HeaderHeightContext) ?? 0}
        >
            <ScrollView 
                style={[{flex: 1, backgroundColor: colors.primary}, style]}
                showsVerticalScrollIndicator={false}
                //contentContainerStyle={contentContainerStyle}
                //{...props}
                
            >
                {children}
            </ScrollView>
            
        </KeyboardAvoidingView>
    );
};

export default ScrollableContainer;