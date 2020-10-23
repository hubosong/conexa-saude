import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

export default function AuthLoading() {

    const navigation = useNavigation()

    useEffect(() => {
        async function handleUserNextScreen() {
            const userToken = await AsyncStorage.getItem('@userToken')
            navigation.dispatch(StackActions.replace(userToken ? 'Home' : 'Welcome'))
        }
        handleUserNextScreen();

    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#3bb3e7" />
        </View>
    )

}