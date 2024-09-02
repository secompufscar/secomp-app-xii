import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, Linking, AppState } from 'react-native';
import {CameraView} from "expo-camera"
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

export default function QRCode() {
    const route = useRoute();
    const { id } = route.params as { id: string };
    const qrLock = useRef(false);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if (appState.current.match(/inactive | background/) && 
                nextAppState === "active") 
            {
                qrLock.current = false;
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, [])

    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <CameraView style={StyleSheet.absoluteFillObject}
                        facing='back'
                        onBarcodeScanned={({data}) => {
                            if (data && !qrLock.current){
                                qrLock.current = true;
                                setTimeout(async () => {
                                    await Linking.openURL(data);
                                }, 500);
                            }
                        }}>
                
            </CameraView>

        </SafeAreaView>
    );
}
