import {} from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import StyledTextInput from "./StyledTextInput";
import {AntDesign} from "@expo/vector-icons"
import { colors } from "../../core/theme";


export default function CartCounter({style, small, count = 1, setCount, limit= 1}) {

    const increaseDisabled = count == limit;
    const decreaseDisabled = count == 1;

    const increaseCount =() => {
        count = parseInt(count);
        limit = parseInt(limit);

        let newCount = count >= limit ? limit : count + 1;
        setCount(newCount);
    }

    const decreaseCount = () =>{
        count = parseInt(count);
        let newCount = count <= 1 ? 1: count -1;

        setCount(newCount);
    }

    const handleOnEndEditing = () => {
        let newCount = count >= limit ? limit : count< 1? 1: count;

        setCount(newCount);
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
      };
    
    return (
        <>
        {!small && (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={[styles.button, decreaseDisabled && styles.disabled]} onPress={decreaseCount}disabled={decreaseDisabled}>
                <AntDesign name='minuscircle' size={30} color={colors.tertiary} />
            </TouchableOpacity>

            <StyledTextInput style={styles.input} value={`${Math.round(count) || 1}`} onEndEditing={handleOnEndEditing}
            onChangeText={setCount}
            keyboardType="number-pad"
            />

            <TouchableOpacity 
                style={[
                    styles.button, 
                    increaseDisabled && styles.disabled
                ]} 
                onPress={increaseCount} 
                disabled={increaseDisabled}>
                <AntDesign name='pluscircle' size={30} color={colors.tertiary} />
            </TouchableOpacity>
        </View>)}

        {small && (
        <View style={[styles.container, styles.smallContainer, style]}>
            <TouchableOpacity 
                style={[
                    styles.button, 
                    styles.smallButton, 
                    decreaseDisabled && styles.disabled
                ]} 
                onPress={decreaseCount} disabled={decreaseDisabled}>
                <AntDesign name='minuscircle' size={30} color={colors.tertiary} />
            </TouchableOpacity>

            <StyledTextInput style={styles.smallInput} value={`${Math.round(count) || 1}`}
            onEndEditing={handleOnEndEditing}
            onChangeText={setCount}
            keyboardType="number-pad"
            returnKeyType="done"
            />

            <TouchableOpacity 
                style={[
                    styles.button, 
                    styles.smallButton, 
                    increaseDisabled && styles.disabled
                ]} 
                onPress={increaseCount} disabled={increaseDisabled}>
                <AntDesign name='pluscircle' size={30} color={colors.tertiary} />
            </TouchableOpacity>
        </View>)}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        alignItems:"center",
        justifyContent: "space-around",
        backgroundColor: colors.secondary,
        borderRadius: 15,
        width: "100%"
    },
    smallContainer:{
        height: 40,
        width: "auto",
        backgroundColor: colors.primary
    },
    button: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    smallButton: {
        width: "auto",
        paddingLeft: 10
    },
    input: {
        width: 50,
        fontSize: 20,
        paddingLeft: 1, 
        paddingRight: 1,
        textAlign: "center",
        fontWeight: "bold",
    },
    smallInput: {
        height: 30,
        width: 40,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 10,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    disabled: {
        opacity: 0.4,
    }
});
