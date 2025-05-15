import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login, SignUp } from '../screens'
import { ScheduleItemProps } from '../entities/schedule-item';

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    ScheduleDetails: { item: ScheduleItemProps };
    RegistrationDetails: { item: ScheduleItemProps };
    MyEvents: undefined;
    Credential: undefined;
    Notifications: undefined;
};

export type AuthTypes = NativeStackNavigationProp<StackNavigation>;

export default function AuthRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, title: "SECOMP UFSCar 2024" }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}

