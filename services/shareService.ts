import {CarEntity} from "@/types/schemas/car-schema";
import Share, {Social} from 'react-native-share';
import i18n from "i18next";

export const shareService = {
    shareCarToTelegram: async (car: CarEntity) => {
        try {
            const priceLabel = i18n.t('share.price');
            const mileageLabel = i18n.t('share.mileage');
            const locationLabel = i18n.t('share.location');
            const kilometerLabel = i18n.t("helpers.km");
            const photoLabel = i18n.t("share.photo");

            const text = [
                `🔥 ${car.make} ${car.model}, ${car.releaseYear}`,
                `━━━━━━━━━━━━━━━━━━━━`,
                `💰 ${priceLabel}: ${car.price.toLocaleString('en-EN')} $`,
                `🛣 ${mileageLabel}: ${car.mileage.toLocaleString('en-EN')} ${kilometerLabel}`,
                `📍 ${locationLabel}: ${car.city}`,
                `${photoLabel}: ${car.photo}`,
            ].join('\n');

            await Share.shareSingle({
                social: Social.Telegram,
                message: text,
            });
        } catch (e) {
            console.log("Error sharing to Telegram: " +e)
        }
    }
}