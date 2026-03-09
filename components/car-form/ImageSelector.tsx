import {StyleSheet, View} from "react-native";
import {Image} from "expo-image";
import {IconButton} from "react-native-paper";
import {useTranslations} from "@/context/useTranslations";
import {useTheme} from "@/context/useTheme";
import {CarFormData} from "@/types/schemas/car-schema";
import * as ImagePicker from "expo-image-picker";
import EmptyPhoto from "@/components/ui/EmptyPhoto";

interface ImageSelectorProps {
    formData: CarFormData;
    handleChange: (value: string) => void;
}

export default function ImageSelector({formData, handleChange}: ImageSelectorProps) {
    const {tr} = useTranslations();
    const {colors} = useTheme();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1
        });
        if (!result.canceled) {
            handleChange(result.assets[0].uri);
        }
    };

    if (formData.photo) return (
        <View style={styles.container}>
            <Image source={{uri: formData.photo}} style={styles.photo}/>
            <IconButton icon="camera-flip" mode="contained" containerColor={colors.content}
                        iconColor={colors.accent} size={24} style={styles.change} onPress={pickImage}/>
            <IconButton icon="close" mode="contained" containerColor={colors.content}
                        iconColor={colors.error} size={24} style={styles.remove} onPress={() => handleChange('')}/>
        </View>
    );

    return (
        <EmptyPhoto pickImage={pickImage}/>
    );
}

const styles = StyleSheet.create({
    container: {width: '100%', aspectRatio: 16 / 9, marginBottom: 20},
    photo: {width: '100%', height: '100%', borderRadius: 12},
    change: {position: 'absolute', bottom: 12, right: 12, margin: 0},
    remove: {position: 'absolute', top: 12, right: 12, margin: 0},
});