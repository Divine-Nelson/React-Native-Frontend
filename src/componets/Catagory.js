import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../core/theme";


const Catagory = ({item, selectedCategory, setSelectedCategory}) => {
    return (
        <TouchableOpacity onPress={() => setSelectedCategory(item)}>
            <Text style={[styles.catagoryText, selectedCategory === item && 
                {backgroundColor: "#E96E6E"}
            ]}> {item}</Text>
        </TouchableOpacity>
    );
};
export default Catagory;

const styles = StyleSheet.create({
    catagoryText: {
        fontSize: 16,
        fontWeight: "600",
        //color: "#FFFFFF",
        //backgroundColor: "#E96E6E",
        color: colors.primary,
        backgroundColor: "#938F8F",
        padding: 10,
        textAlign: "center",
        borderRadius: 16,
        marginHorizontal: 10, 
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
});
