import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, Ionicons, FontAwesome6, Feather } from '@expo/vector-icons';

import { Home, Schedule, Gamificacao, UserProfile, Notifications } from '../screens';
import { AdminProfile } from '../screens/profileScreen';

import { colors } from "../styles/colors"

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: "#445BE6",
                    borderTopWidth: 0,
                    height: 70,
                },
                tabBarShowLabel: false,
            }}>

            <Tab.Screen
                name="HOME"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} size={28} color={colors.white} />
                    )

                }}
            />


            <Tab.Screen
                name="CRONOGRAMA"
                component={Schedule}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "list" : "list-outline"} size={28} color={colors.white} />
                    ),

                }}
            />

            <Tab.Screen
                name="NOTIFICAÇÕES"
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "notifications" : "notifications-outline"} size={28} color={colors.white} />
                    )
                }}
            />

            <Tab.Screen
                name="PERFIL"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "person" : "person-outline"} size={28} color={colors.white} />
                    )
                }}
            />

        </Tab.Navigator>
    );
}