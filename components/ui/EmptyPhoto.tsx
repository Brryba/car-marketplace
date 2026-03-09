import {StyleSheet} from "react-native";
import {IconButton} from "react-native-paper";
import {Text, TouchableOpacity} from "react-native";
import {useTheme} from "@/context/useTheme";
import {useTranslations} from "@/context/useTranslations";

interface EmptyPhotoProps {
    pickImage?: () => void;
}

export default function EmptyPhoto({pickImage}: EmptyPhotoProps) {
    const {colors} = useTheme();
    const { tr } = useTranslations();

    const isClickable = !!pickImage;

    return <TouchableOpacity
        activeOpacity={isClickable ? 0.5 : 1}
        style={[styles.container, styles.placeholder, isClickable ? styles.dashed : null, {
        borderColor: colors.border,
        backgroundColor: colors.content
    }]} onPress={pickImage}>
        <IconButton icon="camera" size={48} iconColor={colors.textSecondary}/>
        <Text style={{color: colors.textSecondary, fontWeight: '500'}}>{tr.car.photo}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {width: '100%', aspectRatio: 16 / 9, marginBottom: 20},
    placeholder: {
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dashed: {
        borderStyle: 'dashed',
    }
})