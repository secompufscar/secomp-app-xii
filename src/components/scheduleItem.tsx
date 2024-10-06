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
                <View className='flex flex-row justify-start min-w-full items-center p-4 rounded-md bg-neutral-200/50'>
                    <View className='pl-8 pr-4'>
                        <Text className='text-blue font-bold'>{scheduleItem.data.substring(11, 16)}</Text>
                    </View>
                    <View className='pl-4 pr-8 max-w-[70%]'>
                        <Text className='text-blue font-bold min-w-full'>{scheduleItem.nome}</Text>
                        <Text className='text-black'>{scheduleItem.palestranteNome}</Text>
                        {/* <Text className='text-white'>{scheduleItem.detalhes}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>

    )

}
