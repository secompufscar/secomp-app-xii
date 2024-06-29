import React from 'react';

import {NativeStackNavigationProp, createNativeStackNavigator} from '@react-navigation/native-stack'

import TabRoutes from './tab.routes'

import {
    Login,
    SignUp,
    Navigator,
    Schedule,
    ScheduleDetails,
    MyEvents,
    Credential,
    Notifications,
    Registration,
    RegistrationDetails,
} from '../screens'
import { ScheduleItemProps } from '../entities/schedule-item';

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Home: undefined;
    Login: undefined;
    SignUp: undefined;
    Navigator: undefined;
    ScheduleDetails: { item: ScheduleItemProps };
    RegistrationDetails: {item: ScheduleItemProps};
    MyEvents: undefined;
    Credential: undefined;
    Notifications: undefined;
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
            <Stack.Screen name="MyEvents" component={MyEvents}/>
            <Stack.Screen name="Credential" component={Credential}/>
            <Stack.Screen name="Notifications" component={Notifications}/>
            <Stack.Screen name="Registration" component={Registration}/>
            <Stack.Screen name="RegistrationDetails" component={RegistrationDetails}/>
        </Stack.Navigator>
    );
}

