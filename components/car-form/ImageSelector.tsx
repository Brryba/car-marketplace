import { Alert, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { IconButton } from "react-native-paper";
import { useTheme } from "@/context/useTheme";
import { CarFormData } from "@/types/schemas/car-schema";
import * as ImagePicker from "expo-image-picker";
import EmptyPhoto from "@/components/ui/EmptyPhoto";
import {useTranslations} from "@/context/useTranslations";

interface ImageSelectorProps {
    formData: CarFormData;
    handleChange: (value: string) => void;
}

export default function ImageSelector({formData, handleChange}: ImageSelectorProps) {
    const { tr } = useTranslations();
    const {colors} = useTheme();

    const OPTIONS: ImagePicker.ImagePickerOptions = {
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
    };

    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync(OPTIONS);
        if (!result.canceled) handleChange(result.assets[0].uri);
    };

    const pickFromCamera = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) return;

        const result = await ImagePicker.launchCameraAsync(OPTIONS);
        if (!result.canceled) handleChange(result.assets[0].uri);
    };

    const showPicker = () => {
        Alert.alert(tr.imagePicker.alert.title, tr.imagePicker.alert.description, [
            { text: tr.imagePicker.alert.cancel, style: 'cancel' },
            { text: '📷' + tr.imagePicker.alert.camera,  onPress: pickFromCamera  },
            { text: '🖼️' + tr.imagePicker.alert.gallery, onPress: pickFromGallery },
        ]);
    };

    if (formData.photo) return (
        <View style={styles.container}>
            <Image source={{uri: formData.photo}} style={styles.photo}/>
            <IconButton icon="camera-flip" mode="contained" containerColor={colors.content}
                        iconColor={colors.accent} size={24} style={styles.change} onPress={showPicker} />
            <IconButton icon="close" mode="contained" containerColor={colors.content}
                        iconColor={colors.error} size={24} style={styles.remove} onPress={() => handleChange('')}/>
        </View>
    );

    return <EmptyPhoto pickImage={showPicker} />;
}

const styles = StyleSheet.create({
    container: {width: '100%', aspectRatio: 16 / 9, marginBottom: 20},
    photo: {width: '100%', height: '100%', borderRadius: 12},
    change: {position: 'absolute', bottom: 12, right: 12, margin: 0},
    remove: {position: 'absolute', top: 12, right: 12, margin: 0},
});