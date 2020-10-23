import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import AuthLoading from './pages/AuthLoading'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Home from './pages/Home'

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator headerMode='none' initialRouteName='AuthLoading'>
                <Screen name='AuthLoading' component={AuthLoading} options={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }} />
                <Screen name='Welcome' component={Welcome} options={{ gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />
                <Screen name='Login' component={Login} options={{ gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />
                <Screen name='Home' component={Home} options={{ gestureEnabled: true, gestureDirection: 'horizontal', cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />
            </Navigator>
        </NavigationContainer>
    )
}