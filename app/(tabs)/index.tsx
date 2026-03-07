import {StyleSheet, Text, View} from 'react-native';

export default function TabTwoScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.textColor}>
                Testing
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#808080',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textColor: {
        color: '#224455',
    }
});