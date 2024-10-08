import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from "react-native";

const isIos: Boolean = Platform.OS === 'ios';

type ScheduleItemComponentProps = {
    scheduleItem: Activity;
    onClick?: () => void;
};

// Componente de ítens do cronograma
export default function MyEvent({ scheduleItem, onClick }: ScheduleItemComponentProps) {
    // Garantir que `scheduleItem.data` exista e seja uma string válida
    const eventDate = scheduleItem.data ? scheduleItem.data.substring(0, 10) : 'Data não disponível';
    const eventTime = scheduleItem.data ? scheduleItem.data.substring(11, 16) : 'Horário não disponível';

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={onClick}>
                <View className='flex flex-col justify-start bg-white rounded-2xl' style={isIos ? [styles.shadowProp] : [styles.elevation]}>
                    <View className="p-4">
                        <View className='space-y-1 p-1'>
                            <View className='flex-row items-center pb-1'>
                                <Ionicons name="calendar-clear-outline" size={18} color="#445BE6" />
                                <Text style={{ fontFamily: 'Inter_500Medium' }} className='pl-2 mr-2'>{scheduleItem.nome}</Text>
                            </View>

                            <View className='flex-row items-center'>
                                <Ionicons name="time-outline" size={18} color="#445BE6" />
                                <Text style={{ fontFamily: 'Inter_400Regular' }} className='pl-2'>{eventTime}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -1, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 4,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});