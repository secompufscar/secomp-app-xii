import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Home, Dashboard, Cronograma } from '../screens';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HOME"
                component={Home}
            />
            <Tab.Screen
                name="CRONOGRAMA"
                component={Cronograma}
            />
            <Tab.Screen
                name="GAMIFICAÇÃO"
                component={Dashboard}
            />
        </Tab.Navigator>
    );
}