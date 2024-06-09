import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function notificationsScreen() {
	const marginHorizontal = 6;

	const rectangleWidth = screenWidth - (2 * marginHorizontal);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.rectangles}>
				<TouchableOpacity>
					<View style={[styles.rectangle, { width: rectangleWidth }]}>
						<Text style={styles.texto1}>Transaction Completed</Text>
						<Text style={styles.texto2}>8 minutes ago</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={[styles.rectangle, { width: rectangleWidth }]}>
						<Text style={styles.texto1}>Transaction Completed</Text>
						<Text style={styles.texto2}>8 minutes ago</Text>
					</View>
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: 'flex-start',
		paddingTop: 0,
	},
	rectangle: {
		height: 81,
		backgroundColor: '#51B68D',
		borderRadius: 5,
		marginBottom: 32,
		marginHorizontal: 6,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,

	},
	rectangles: {
		marginTop: 62,
	},
	texto1: {
		color: 'black',
		fontSize: 14,
		fontWeight: 'bold',
	},
	texto2: {
		color: 'black',
		fontSize: 8,
		fontWeight: 'medium',
	},
});