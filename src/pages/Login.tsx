import React, { useEffect } from 'react'
import { View, StyleSheet, Text, StatusBar, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import { MaterialIcons as Icon } from '@expo/vector-icons'
import { globalStyles, colors } from '../styles/global_styles'
import { _RectButton, _TouchableOpacity } from '../components/Buttons'
import { _Input } from '../components/Input'
import logo from '../assets/img/conexa.png'
import Api from '../services/Api'

import { useSelector, useDispatch } from 'react-redux'
import { addUser, showPass, errMsg, hiddenComm } from '../stores/Actions'

interface RootStates {
  email: string
  password: string
  show: boolean
  hidden: boolean
  errorMessage: string
  hiddenComments: boolean
}

export default function Login() {

  const { email, password, show, hidden, errorMessage, hiddenComments } = useSelector((state: RootStates) => state)
  const dispatch = useDispatch()

  const navigation = useNavigation()

  /** used to show and hidden bottom comments when keyboard is opened */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => dispatch(hiddenComm(true)))
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => dispatch(hiddenComm(false)))
    return () => { keyboardDidHideListener.remove(), keyboardDidShowListener.remove() }
  }, [])

  function _showHiddenPass() {
    show
      ? dispatch(showPass(false, true))
      : dispatch(showPass(true, false))
  }

  async function _handleSignIn() {
    if (email.length === 0 || password.length === 0) return dispatch(errMsg('Preencha usuário e senha para continuar!'))

    const credentials = { email: email, password: password }

    const response = await Api.post('login', credentials)

    const userData = response.data
    const token = userData.data.token

    if (token != null) {
      _storeToken(userData)
      navigation.dispatch(StackActions.replace('Home'))
    }
  }

  async function _storeToken(userData: any) {
    try {
      await AsyncStorage.setItem('@userToken', JSON.stringify(userData))
    } catch (error) { console.error(error) }
  }

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor={colors.blueBgLogo} />

      <View style={globalStyles.container}>

        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" />
        </View>

        <View style={styles.body}>
          <KeyboardAvoidingView style={globalStyles.inputContainer} behavior={"padding"}>
            <Icon name='person-outline' size={28} style={globalStyles.inputIcon} />
            <_Input
              placeholder="Digite o seu email"
              placeholderTextColor={colors.inputsPlaceHolder}
              value={email}
              onChangeText={(text: string) => dispatch(addUser(text, password))}
              keyboardType='email-address'
              returnKeyType='next'
              style={globalStyles.input} />
          </KeyboardAvoidingView>

          <KeyboardAvoidingView style={globalStyles.inputContainer}>
            <Icon name='lock-outline' size={28} style={globalStyles.inputIcon} />
            <_Input
              placeholder="Digite a sua senha"
              placeholderTextColor={colors.inputsPlaceHolder}
              value={password}
              onChangeText={(text: string) => dispatch(addUser(email, text))}
              secureTextEntry={show}
              keyboardType='numeric'
              returnKeyType='go'
              onSubmitEditing={_handleSignIn}
              style={globalStyles.input} />

            <TouchableOpacity onPress={_showHiddenPass} style={styles.buttonPass}>
              <Icon
                name={hidden == false ? 'visibility' : 'visibility-off'}
                size={28} color={colors.blueLogo}
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>

          {errorMessage.length !== 0 && <Text style={styles.errorMessage}>{errorMessage}</Text>}

          <_RectButton
            onPress={_handleSignIn}
            style={{ ...globalStyles.button, margin: 15 }}
            textStyle={globalStyles.buttonText}
            buttonText='E N T R A R' />

          <_TouchableOpacity
            touchableOpacity_onPress={() => alert('@')}
            touchableOpacity_style={{ alignSelf: 'flex-start', paddingStart: 30, }}
            touchableOpacity_text_style={{ color: colors.blueLogo, textAlign: 'center' }}
            touchableOpacity_text='Problemas de acesso?' />

        </View>

        <View style={styles.footer}>
          <View style={[styles.showView, hiddenComments ? styles.hiddenView : {}]}>
            <Text style={{ textAlign: 'center' }}>Para entrar, utilize as credenciais que você recebeu de sua clínica, hospital ou convênio</Text>

            <_TouchableOpacity
              touchableOpacity_onPress={() => alert('@')}
              touchableOpacity_style={{ marginTop: 20 }}
              touchableOpacity_text_style={{ color: colors.blueLogo, textAlign: 'center' }}
              touchableOpacity_text='Em caso de dúvidas, fale conosco.' />

          </View>

        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    width: '100%',
    height: '48%'
  },
  footer: {
    width: '100%',
    height: '12%',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },

  buttonPass: {
    position: 'absolute',
    top: 8,
    right: 37,
    zIndex: 3,
  },
  errorMessage: {
    textAlign: 'center',
    color: colors.error,
    fontSize: 14,
    marginBottom: 10,
    marginTop: 15,
    marginHorizontal: 20,
  },
  showView: {
    width: '100%',
    height: 'auto'
  },
  hiddenView: {
    width: 0,
    height: 0
  }
})