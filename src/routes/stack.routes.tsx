import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'

import TabRoutes from './tab.routes'

import {
    Schedule,
    ScheduleDetails,
    MyEvents,
    Credential,
    Registration,
    RegistrationDetails,
    Categorias,
    Minicursos,
    Palestras,
    Workshops,
    Competições,
    QRCode,
    Welcome,
    SECOMP
} from '../screens'

import { ScheduleItemProps } from '../entities/schedule-item';

const Stack = createNativeStackNavigator();

// Rotas para usuários logados
type StackNavigation = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    ScheduleDetails: { item: ScheduleItemProps };
    RegistrationDetails: { item: ScheduleItemProps };
    MyEvents: undefined;
    Credential: undefined;
    Notifications: undefined;
    QRCode: { id: string };
    PasswordReset: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, title: "SECOMP UFScar 2024" }}>
            <Stack.Screen name="Home" component={TabRoutes} />
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="ScheduleDetails" component={ScheduleDetails} />
            <Stack.Screen name="MyEvents" component={MyEvents} />
            <Stack.Screen name="Credential" component={Credential} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="RegistrationDetails" component={RegistrationDetails} />
            <Stack.Screen name="Categorias" component={Categorias} />
            <Stack.Screen name="Minicursos" component={Minicursos} />
            <Stack.Screen name="Palestras" component={Palestras} />
            <Stack.Screen name="Competições" component={Competições} />
            <Stack.Screen name="Workshops" component={Workshops} />
            <Stack.Screen name="QRCode" component={QRCode} />
            <Stack.Screen name="SECOMP" component={SECOMP} />
            <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
    );
}
