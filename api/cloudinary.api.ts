import {upload} from "cloudinary-react-native";
import {cld} from "@/api/config/cloudinary.config";

export async function uploadPhotoToCloudinary(uri: string): Promise<string> {
    return new Promise((resolve, reject) => {
        upload(cld, {
            file: uri,
            options: {
                folder: 'cars',
                upload_preset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
            },
            callback: (error, response) => {
                if (error) reject(error);
                else resolve(response!.secure_url);
            }
        });
    });
}