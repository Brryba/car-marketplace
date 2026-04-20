import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {IconButton} from "react-native-paper";
import {useTheme} from "@/context/useTheme";

interface FloatingButtonProps {
    onPress: () => void;
}

const ToggleParamsButton = ({ onPress } : FloatingButtonProps) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={[styles.fabContainer, { backgroundColor: colors.accent }]} onPress={onPress}>
            <IconButton icon="tune" size={24} iconColor={colors.background}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        opacity: 1,
        zIndex: 1000,

        width: 60,
        height: 60,
        borderRadius: 30,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#007AFF',
    },
});

export default ToggleParamsButton;