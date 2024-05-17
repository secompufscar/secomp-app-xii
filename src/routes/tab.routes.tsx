import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, Ionicons, FontAwesome6, Feather } from '@expo/vector-icons';

import { Home, Cronograma, Gamificacao, Profile} from '../screens';

import { colors } from "../styles/colors"

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#51B68D",
                    borderTopWidth: 0,
                }
            }}>

            <Tab.Screen
                name="HOME"
                component={Home}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="home" size={24} color={colors.white} />
                    )

                }}
            />


            <Tab.Screen
                name="CRONOGRAMA"
                component={Cronograma}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="list" size={24} color={colors.white} />
                    )

                }}
            />

            <Tab.Screen
                name="GAMIFICAÇÃO"
                component={Gamificacao}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome6 name="ranking-star" size={24} color={colors.white} />
                    )

                }}
            />
            <Tab.Screen
                name="PERFIL"
                component={Profile}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="person" size={24} color={colors.white} />
                    )

                }}
            />
        </Tab.Navigator>
    );
}