import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
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
    return weekDates;
};

export default function Schedule() {
    const navigation = useNavigation();
    const currentDateString = formatDate(new Date());
    const [weekDates, setWeekDates] = useState(getCurrentWeekDates());
    const [selectedDate, setSelectedDate] = useState(currentDateString);
    const [items, setItems] = useState<Activity[]>([]);

    // useEffect para carregar os itens do cronograma todas as vezes que o atributo selectedDate mudar
    useEffect(() => {
        const fetchItems = async () => {
            const activities: Activity[] = await getActivities();
            console.log('test')
            console.log(selectedDate)
            console.log(activities)

            const filteredActivities = activities.filter(activity => activity.data.substring(0, 8) === selectedDate);

            setItems(filteredActivities);
        };

        fetchItems();
    }, [selectedDate]);

    const handlePress = (item: Activity) => {
        // @ts-ignore
        navigation.navigate('ScheduleDetails', { item });
    };

    return (
        <SafeAreaView className='bg-white flex-1'>
            <View>

                <View className='flex-row justify-start items-center pt-16 pb-2 px-6 gap-4'>
                    <Text className='text-3xl font-bold text-blue'>Cronograma</Text>
                </View>

                <View className='px-6 pt-6'>  
                    <View className='flex-row justify-center'>
                        {weekDates.map((date, index) => {
                            const dateString = formatDate(date);
                            const isSelected = dateString === selectedDate;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    className={`flex justify-center items-center w-12 h-12 ${isSelected ? 'bg-[#445BE6] rounded-full' : ''}`}
                                    onPress={() => setSelectedDate(dateString)}
                                >
                                    <Text className={`${isSelected ? "text-white" : 'text-black'}`}>
                                        {date.getDate()}
                                    </Text>
                                    <Text className={`${isSelected ? "text-white" : 'text-black'}`}>
                                        {date.toLocaleString('default', { weekday: 'short' })}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View className='flex justify-center items-center pt-10 px-6'>
                    <ScrollView>
                        {items.map((item, index) => (
                            <View className='pb-4' key={index}>
                                <ScheduleItemComponent
                                    scheduleItem={item}
                                    onClick={() => handlePress(item)}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}
