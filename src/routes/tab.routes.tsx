import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, Ionicons, FontAwesome6, Feather } from '@expo/vector-icons';

import {Schedule, UserHome, AdminHome } from '../screens';

import { colors } from "../styles/colors"
import { useAuth } from "../hooks/AuthContext";

const Tab = createBottomTabNavigator();


export default function TabRoutes() {

    const { user: { user } }: any = useAuth()

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
                tabBarShowLabel: false
            }}>

{
                user.tipo == 'USER' ? <Tab.Screen
                    name="HOME"
                    component={UserHome}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name={focused ? "home" : "home-outline"} size={28} color={colors.white} />
                        ),
                    }}
                /> : <Tab.Screen
                    name="PERFIL"
                    component={AdminHome}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons name={focused ? "home" : "home-outline"} size={28} color={colors.white} />
                        ),
                    }}
                />
            }

            <Tab.Screen
                name="CRONOGRAMA"
                component={Schedule}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "list" : "list-outline"} size={28} color={colors.white} />
                    ),

                }}
            />

        </Tab.Navigator>
    );
}


