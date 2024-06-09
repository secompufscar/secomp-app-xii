import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import notificationsScreen from './notificationsScreen';
import CustomBackButton from '../components/CustomBackButton';

//definir explicitamente o tipo desse parametro
type SetColorType = React.Dispatch<React.SetStateAction<string>>;

type RootStackParamList = {
	Home: undefined;
	Notifications: undefined;
};

type homeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type homeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;


type Props = {
	navigation: homeScreenNavigationProp;
	route: homeScreenRouteProp;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: Props) {
	const [colorText1, setColorText1] = useState('#51B68D');
	const [colorText2, setColorText2] = useState('#51B68D');
	const [colorText3, setColorText3] = useState('#51B68D');


	const handlePressIn = (setColor: SetColorType) => {
		setColor('#9ADBC1');
	};

	const handlePressOut = (setColor: SetColorType) => {
		setColor('#51B68D');
	};

	const handleLongPress = (setColor: SetColorType) => {
		setColor('#9ADBC1');
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.linha}>
				<Text style={styles.ola}>Olá, Usuário!</Text>
				<TouchableOpacity onPress={() => alert('Imagem pressionada')}>
					<Pressable onPress={() => navigation.navigate('Notifications')}>
						{({ pressed }) => (<Image source={require('../../assets/notification-2-fill.png')}
							style={[styles.image, {
								opacity: pressed ? 0.5 : 1,
							},
							]}
						/>
						)}
					</Pressable>
				</TouchableOpacity>
			</View>

			<View style={textosClicaveis.container}>
				<Pressable onPressOut={() => handlePressOut(setColorText1)} onPressIn={() => handlePressIn(setColorText1)} onLongPress={() => handleLongPress(setColorText1)}>
					<Text style={[textosClicaveis.text, textosClicaveis.spacing, { color: colorText1 }]} key="2">Acontecendo agora</Text>
				</Pressable>
				<Pressable onPressOut={() => handlePressOut(setColorText2)} onPressIn={() => handlePressIn(setColorText2)} onLongPress={() => handleLongPress(setColorText2)}>
					<Text style={[textosClicaveis.text, textosClicaveis.spacing, { color: colorText2 }]} key="3">Eventos de hoje</Text>
				</Pressable>
				<Pressable onPressOut={() => handlePressOut(setColorText3)} onPressIn={() => handlePressIn(setColorText3)} onLongPress={() => handleLongPress(setColorText3)}>
					<Text style={[textosClicaveis.text, textosClicaveis.spacing, { color: colorText3 }]} key="4">Inscreva-se nos eventos!</Text>
				</Pressable>
			</View>

			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

//Transição entre home e notificações
export default function App() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home"
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Notifications"
				component={notificationsScreen}
				options={{
					title: 'Notificações',
					headerTitleStyle: {
						color: '#51B68D',
						fontWeight: 'bold',
						fontSize: 30,
					},
					headerStyle: {
						backgroundColor: '#ffffff',
					},
					headerLeft: () => <CustomBackButton />,
				}}
			/>
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingTop: 13,
	},
	ola: {
		color: '#51B68D',
		fontSize: 30,
		paddingLeft: 17,
		fontWeight: 'bold',
	},
	linha: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
		paddingRight: 30,
	},
	image: {
		width: 20,
		height: 20,
	},
});

const textosClicaveis = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginLeft: 17,
	},
	text: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	spacing: {
		paddingVertical: 100,
	},
});


