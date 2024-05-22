import {NativeStackNavigationProp, createNativeStackNavigator} from '@react-navigation/native-stack'

import TabRoutes from './tab.routes'

import {
    Login,
    SignUp,
    Navigator,
    Schedule,
    ScheduleDetails
} from '../screens'
import { ScheduleItemProps } from '../entities/schedule-item';

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    Navigator: undefined;
    ScheduleDetails: { item: ScheduleItemProps };
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackRoutes(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Navigator" component={Navigator}/>
            <Stack.Screen name="Home" component={TabRoutes}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="Schedule" component={Schedule}/>
            <Stack.Screen name="ScheduleDetails" component={ScheduleDetails}/>
        </Stack.Navigator>
    );
}

