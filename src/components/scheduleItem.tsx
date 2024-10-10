import React from 'react';
import { View, Text, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScheduleItemProps } from '../entities/schedule-item';

type ScheduleItemComponentProps = {
    scheduleItem: Activity;
    onClick: () => void;
}

// Componente de ítens do cronogramam, pode ser mudado depois para aceitar mais informações
export default function ScheduleItemComponent({ scheduleItem, onClick }: ScheduleItemComponentProps) {
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={onClick} >
                <View className='flex flex-row justify-start min-w-full items-center p-4 rounded-xl bg-neutral-200/20'>
                    <View className='mx-1 w-16'>
                        <Text style={{ fontFamily: 'Inter_700Bold' }} className='text-neutral-500 text-xl'>{scheduleItem.data.substring(11, 16)}</Text>
                    </View>

                    <View className='pl-2 pr-8 max-w-[80%]'>
                        <Text className='text-blue font-bold min-w-full'>{scheduleItem.nome}</Text>
                        <Text className='text-black mt-1'>{scheduleItem.palestranteNome}</Text>
                        {/* <Text className='text-white'>{scheduleItem.detalhes}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>

    )

}
