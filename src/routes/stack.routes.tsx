import {NativeStackNavigationProp, createNativeStackNavigator} from '@react-navigation/native-stack'

import TabRoutes from './tab.routes'

import {
    Login,
    SignUp
} from '../screens'

const Stack = createNativeStackNavigator();

type StackNavigation = {
    Home: undefined;
    Login: undefined;
    SignUp:undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

export default function StackRoutes(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="Home" component={TabRoutes}/>
        </Stack.Navigator>
    );
}

