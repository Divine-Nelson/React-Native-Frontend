import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import {AntDesign} from "@expo/vector-icons"
import { color } from "../../core/theme";

const StyledTextInput = ({icons, style, ...props}) =>{
    const [activeBackgroundColor, setActiveBackgroundColor] = useState("")

    const customOnFocus = () =>{
        props?.onFocus;
        setActiveBackgroundColor(color.highlight);
    };

    const customOnBlur = () =>{
        props?.onBlur;
        setActiveBackgroundColor("");
    };
    return (
        <View>
            <View style={styles.leftIcon}>
                <AntDesign name={icons} color={color.placeholder} size={30}/>
            </View>
            <TextInput 
                placeholderTextColor={color.placeholder}
                {...props} 
                onFocus={customOnFocus}
                onBlur={customOnBlur}
                style={[styles.inpputField, 
                    {
                    backgroundColor: activeBackgroundColor 
                    ? activeBackgroundColor
                    : color.secondary,
                },
                style,
            ]}
            />
    
        </View>
    );
};

const styles = StyleSheet.create({
    inpputField: {
        height: 50,
        fontSize: 16, 
        color: color.tint,
        paddingLeft: 55,
        paddingRight: 15,
        borderRadius: 10
    },

    leftIcon: {
        left: 15,
        top: 10,
        zIndex: 1,
        position: 'absolute'
    }
});

export default StyledTextInput;