import * as Notifications from 'expo-notifications';
import {SchedulableTriggerInputTypes} from 'expo-notifications';

export const scheduledNotificationService = {
    async scheduleNotifications(date: Date, title: string, body: string) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        await Notifications.cancelAllScheduledNotificationsAsync();

        await Notifications.scheduleNotificationAsync({
            content: { title, body },
            trigger: {
                type: SchedulableTriggerInputTypes.DAILY,
                hour: date.getHours(),
                minute: date.getMinutes(),
            },
        });
    },

    async cancelAllNotifications() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }
}

