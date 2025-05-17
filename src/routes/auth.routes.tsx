import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login, SignUp, PasswordReset, VerifyEmail, SetNewPassword } from '../screens'
import { ScheduleItemProps } from '../entities/schedule-item';

const Stack = createNativeStackNavigator();

// Rotas para usuários NÃO logados
type StackNavigation = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    Navigator: undefined;
    ScheduleDetails: { item: ScheduleItemProps };
    RegistrationDetails: { item: ScheduleItemProps };
    MyEvents: undefined;
    Credential: undefined;
    Notifications: undefined;
    PasswordReset: undefined;
    VerifyEmail: undefined;
    SetNewPassword: undefined;
};


export type AuthTypes = NativeStackNavigationProp<StackNavigation>;

export default function AuthRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, title: "SECOMP UFSCar 2025" }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
            <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
        </Stack.Navigator>
    );
}

