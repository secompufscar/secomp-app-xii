import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, Ionicons, FontAwesome6, Feather } from '@expo/vector-icons';
import { View, Text } from "react-native"
import { Schedule, Home } from '../screens';

import { colors } from "../styles/colors"
import { useAuth } from "../hooks/AuthContext";

const Tab = createBottomTabNavigator();


export default function TabRoutes() {

    // Usa para diferenciar entre navegação de user e admin
    const { user: { user } }: any = useAuth()
    const role = user.tipo;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: "#445BE6",
                    borderTopWidth: 0,
                    height: 60,
                },
                tabBarShowLabel: false,
                title: "SECOMP UFSCar 2024"
            }}>

            <Tab.Screen
                name="HOME"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className={`flex justify-center items-center ${focused ? "font-bold" : "font-normal"}`}>
                            <Ionicons name={focused ? "home" : "home-outline"} size={28} color={colors.white} />
                            <Text className='text-center text-white'>Home</Text>
                        </View>
                    ),
                }}
            /> 

            <Tab.Screen
                name="CRONOGRAMA"
                component={Schedule}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View className={`flex justify-center items-center ${focused ? "font-bold" : "font-normal"}`}>
                            <Ionicons name={focused ? "calendar-clear" : "calendar-clear-outline"} size={28} color={colors.white} />
                            <Text className='text-center text-white'>Cronograma</Text>
                        </View>
                    ),

                }}
            />

        </Tab.Navigator>
    );
}

