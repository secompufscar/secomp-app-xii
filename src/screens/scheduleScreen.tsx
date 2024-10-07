import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import ScheduleItemComponent from '../components/scheduleItem';
import { useNavigation } from "@react-navigation/native";
import { ScheduleItemProps } from '../entities/schedule-item';
import { AntDesign } from '@expo/vector-icons';
import WeekCalendar from '../components/calendar';
import { getActivities } from '../services/activities';

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getCurrentWeekDates = () => {
    const currentDate = new Date('2024-10-28');
    const startOfWeek = currentDate.getDate() - currentDate.getDay();
    const weekDates = Array.from({ length: 7 }).map((_, index) => {
        const date = new Date(currentDate);
        date.setDate(startOfWeek + index);
        return date;
    });

    weekDates.pop()
    weekDates.shift()

    return weekDates;
};


export default function Schedule() {
    const navigation = useNavigation();
    const currentDateString = formatDate(new Date());
    const [weekDates, setWeekDates] = useState(getCurrentWeekDates());
    const [selectedDate, setSelectedDate] = useState(formatDate(weekDates[0])); // Define a primeira data como padrão
    const [items, setItems] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(false);

    // useEffect para carregar os itens do cronograma todas as vezes que o atributo selectedDate mudar
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const activities: Activity[] = await getActivities();
                console.log('Data selecionada:', selectedDate);
                console.log('Atividades:', activities);

                // Filtra as atividades de acordo com a data selecionada
                const filteredActivities = activities
                    .filter(activity => activity.data.substring(0, 10) === selectedDate)
                    .sort((a, b) => a.data.substring(11, 16).localeCompare(b.data.substring(11, 16))); // Ordena pela hora

                setItems(filteredActivities);
            } catch (error) {
                console.error('Erro ao buscar atividades:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [selectedDate]);



    const handlePress = (item: Activity) => {
        // @ts-ignore
        navigation.navigate('ScheduleDetails', { item });
    };

    return (
        <SafeAreaView className='bg-white flex-1 px-8 pb-2'>


            <View>

                <View className='flex-row justify-start items-center pt-10 mb-4'>
                    <Text style={{ fontFamily: 'Inter_700Bold' }} className='text-3xl text-black/80'>Cronograma</Text>
                </View>

                <View className='mt-4 pb-6'>
                    <View className='flex-row justify-between'>
                        {weekDates.map((date, index) => {
                            const dateString = formatDate(date);
                            const isSelected = dateString === selectedDate;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '18%',
                                        height: 56,
                                        backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(229, 231, 235, 0.3)',
                                        borderRadius: 8,
                                    }}
                                    onPress={() => setSelectedDate(dateString)}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'Inter_600SemiBold',
                                            color: !isSelected ? 'rgba(107, 114, 128, 0.7)' : '#445BE6', // text-blue ou text-neutral-500/70
                                            fontSize: 16,
                                        }}
                                    >
                                        {date.getDate()}
                                    </Text>

                                    <Text
                                        style={{
                                            fontFamily: 'Inter_400Regular',
                                            color: !isSelected ? 'rgba(107, 114, 128, 0.7)' : '#445BE6', // text-blue ou text-neutral-500/70
                                            fontSize: 14,
                                        }}
                                    >
                                        {date.toLocaleString('default', { weekday: 'short' })}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </View>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#445BE6" />
                </View>
            ) : (
                <ScrollView className='flex'>
                    <View className='flex-row flex-wrap justify-around'>
                        {items.map((item, index) => (
                            <View className='w-full mb-3 border border-neutral-200/70 rounded-xl' key={index}>
                                <ScheduleItemComponent
                                    scheduleItem={item}
                                    onClick={() => handlePress(item)}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}