import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Gamificacao() {
    return (
        <SafeAreaView className='bg-white flex-1'>

            <View className='flex-row  items-center pt-12 pb-10 px-4 gap-4'>
                <Text className='text-3xl font-bold text-green-old-700'>Gamificação</Text>
            </View>

        </SafeAreaView>
    );
}