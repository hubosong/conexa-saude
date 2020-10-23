import React from 'react'
import { View, ImageBackground, Alert, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { globalStyles, colors } from '../styles/global_styles'
import { _RectButton, _TouchableOpacity } from '../components/Buttons'
import welcome_bg from '../assets/img/welcome_bg.jpg'

export default function Welcome() {

  const { navigate } = useNavigation()

  function _handleLogin() {
    navigate('Login')
  }

  function _handleFirstAccess() {
    Alert.alert('Oops, opção ainda não implementada')
  }

  return (
    <>
      <ImageBackground source={welcome_bg} style={globalStyles.container}>

        <View style={styles.buttonsContainer}>

          <_RectButton
            onPress={_handleLogin}
            style={globalStyles.button}
            textStyle={globalStyles.buttonText}
            buttonText='Fazer Login' />

          <_TouchableOpacity
            touchableOpacity_onPress={_handleFirstAccess}
            touchableOpacity_style={{ ...globalStyles.button, ...styles.buttonFirstAccess }}
            touchableOpacity_text_style={{ ...globalStyles.buttonText, color: '#3bb3e7' }}
            touchableOpacity_text='Primeiro Acesso' />

        </View>

      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  buttonFirstAccess: {
    marginBottom: 50,
    marginTop: 20,
    backgroundColor: colors.bg,
    borderColor: colors.blueLogo
  },
})