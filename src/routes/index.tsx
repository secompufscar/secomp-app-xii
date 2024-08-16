import {NavigationContainer} from '@react-navigation/native';

import { useAuth } from '../hooks/AuthContext'

import StackRoutes from './stack.routes';
import AuthRoutes from './auth.routes';

export default function Routes(){
    const { user }: any = useAuth()

    return(
        <NavigationContainer>
            {user ? <StackRoutes /> : <AuthRoutes/>}
        </NavigationContainer>
    );
}