import { View, StyleSheet } from "react-native";
import StyledText from "./StyledText";
import {AntDesign} from "@expo/vector-icons";
import { colors } from "../../core/theme";


const ProfileInfo =({icon, label, children, style}) => {
    return(
        <View style={[styles.container, style ]}>
            <View style={styles.label}>
                <AntDesign  name={icon} size={20} color={colors.tertiary}/>
                <StyledText style={styles.labeText}>{label}</StyledText>

            </View>
            <StyledText>{children}</StyledText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        marginBottom: 15
    },
    label: {
        flexDirection: "row",
        alignItems: "center",
         
    },
    labeText: {
        marginLeft: 10,
        color: colors.tertiary,

    }
})

export default ProfileInfo;