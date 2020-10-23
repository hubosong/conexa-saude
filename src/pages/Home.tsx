import React, { useEffect, useState } from 'react'
import { View, Image, StatusBar, KeyboardAvoidingView, Keyboard, Alert, SafeAreaView, FlatList, Text, ActivityIndicator, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { useNavigation, useFocusEffect, StackActions } from '@react-navigation/native'

import { MaterialIcons as Icon } from '@expo/vector-icons'
import { deleteUser } from '../Utils'
import { _RectButton, _TouchableOpacity } from '../components/Buttons'
import { _Input } from '../components/Input'
import { globalStyles, colors } from '../styles/global_styles'
import logo from '../assets/img/conexa.png'
import api from '../services/Api'

interface dadosPaciente {
  id: number,
  paciente: string
}

export default function Home() {

  const [appointment, setAppointment] = useState([])
  const [appointmentDate, setAppointmentDate] = useState('22/22/2222 22:33')
  const [patient, setPatient] = useState('teste')
  const [observation, setObservation] = useState('obser')
  const [doctorId, setDoctorId] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [loading, setLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [hiddenComments, setHiddenComments] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setHiddenComments(true))
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setHiddenComments(false))
    return () => { keyboardDidHideListener.remove(), keyboardDidShowListener.remove() }
  }, [])

  async function _clearToken() {
    await deleteUser()
    navigation.dispatch(StackActions.replace('Login'))
    console.log("token clear")
  }

  /** used to refresh appointments list when update */
  function _onRefresh() {
    setIsFetching(true)
    _getMedicalAppointments()
  }

  useFocusEffect(() => {
    _getMedicalAppointments()
  })

  async function _getMedicalAppointments() {

    const response = await api.get('consultas')
    const res = response.data
    const data = res.data
    const medico_id = data[0].medico.id
    const medico_nome = data[0].medico.nome

    setAppointment(data)
    setDoctorId(medico_id)
    setDoctorName(medico_nome)

    setLoading(false)
  }

  async function _getDetailsAppointments(id_patient: string) {

    const response = await api.get(`consulta/${id_patient}`)
    const res = response.data
    const data = res.data

    const dataConsulta = data.dataConsulta
    const paciente = data.paciente
    const observacao = data.observacao

    Alert.alert('Detalhes',
      'Paciente: ' + paciente + '\n' +
      'Data da Consulta: ' + dataConsulta + '\n' +
      'Observações: ' + observacao)
  }

  async function _registerAppointments() {
    if (appointmentDate.length === 0 || patient === '' || observation === '') return

    const data = {
      dataConsulta: appointmentDate,
      idMedico: doctorId,
      observacao: observation,
      paciente: patient
    }

    const response = await api.post('consulta', data)

    const res = response.data
    const dataRes = res.data

    if (dataRes != null) {
      Keyboard.dismiss()
      Alert.alert('Cadastro realizado com sucesso')
      setAppointmentDate('')
      setPatient('')
      setObservation('')
    }

  }

  /** used to format date before to set state >> fast form found */
  function _formatDateText(dateText: any) {
    if (dateText.length < 2) {
      setAppointmentDate(dateText)
    } else if (dateText.length == 2) {
      setAppointmentDate(dateText + '/')
    } else if (dateText.length == 5) {
      setAppointmentDate(dateText + '/')
    } else if (dateText.length == 10) {
      setAppointmentDate(dateText + ' ')
    } else if (dateText.length == 13) {
      setAppointmentDate(dateText + ':')
    } else {
      setAppointmentDate(dateText)
      console.log(dateText)
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor={colors.blueBgLogo} />

      <View style={globalStyles.container}>

        <View style={styles.header}>
          <_TouchableOpacity
            touchableOpacity_onPress={_clearToken}
            touchableOpacity_style={styles.buttonClearToken}
            touchableOpacity_text_style={{ color: colors.blueLogo }}
            touchableOpacity_text='Sair' />

          <Image style={styles.logo} source={logo} resizeMode="contain" />

          <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 16, color: colors.blueLogo }}>Dashboard do
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.blueBgLogo }}> {doctorName}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.inputsAllContainer}>
            <KeyboardAvoidingView style={globalStyles.inputContainer} behavior={"padding"}>
              <Icon name='date-range' size={28} style={globalStyles.inputIcon} />
              <_Input
                placeholder="00/00/0000 00:00"
                placeholderTextColor={colors.inputsPlaceHolder}
                value={appointmentDate}
                keyboardType='numeric'
                maxLength={16}
                onChangeText={(dateText: any) => _formatDateText(dateText)}
                onChangeText={setAppointmentDate}
                returnKeyType='next'
                style={globalStyles.input} />

            </KeyboardAvoidingView>

            <KeyboardAvoidingView style={globalStyles.inputContainer} behavior={"padding"}>
              <Icon name='person-add' size={28} style={globalStyles.inputIcon} />
              <_Input
                placeholder="Digite o nome do paciente"
                placeholderTextColor={colors.inputsPlaceHolder}
                value={patient}
                keyboardType='default'
                maxLength={16}
                onChangeText={setPatient}
                returnKeyType='next'
                style={globalStyles.input} />

            </KeyboardAvoidingView>

            <KeyboardAvoidingView style={globalStyles.inputContainer} behavior={"padding"}>
              <Icon name='receipt' size={28} style={globalStyles.inputIcon} />
              <_Input
                placeholder="Observação"
                placeholderTextColor={colors.inputsPlaceHolder}
                value={observation}
                keyboardType='default'
                returnKeyType='go'
                onChangeText={setObservation}
                onSubmitEditing={_registerAppointments}
                style={globalStyles.input} />

            </KeyboardAvoidingView>

            <_RectButton
              onPress={_registerAppointments}
              style={{ ...globalStyles.button, margin: 15 }}
              textStyle={globalStyles.buttonText}
              buttonText='C A D A S T R A R' />

          </View>

          <SafeAreaView
            style={[styles.appointmentList, hiddenComments ? styles.hiddenView : {}]}>

            <View style={styles.appointmentListTitle}>
              <Text style={styles.appointmentListTitleText}> Lista de pacientes agendados</Text>
            </View>
            <FlatList
              data={appointment}
              keyExtractor={(item: dadosPaciente) => item.id.toString()}
              onRefresh={_onRefresh}
              refreshing={isFetching}
              renderItem={({ item }) =>
                <View style={styles.appointmentsItems}>
                  <Text style={styles.appointmentsItemsNames}>{item.paciente}</Text>

                  <TouchableWithoutFeedback onPress={() => { _getDetailsAppointments(item.id.toString()) }}>
                    <View style={styles.appointmentsItemsButtonDetails}>
                      <Text style={styles.appointmentsItemsButtonDetailsText}>Detalhes</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              } />
            <ActivityIndicator animating={loading} color={colors.blueLogo} size="large" />
          </SafeAreaView>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  body: {
    width: '100%',
    height: 'auto',
  },
  buttonClearToken: {
    marginEnd: 10,
    marginTop: 5,
    borderWidth: 2,
    borderColor: colors.blueLogo,
    paddingHorizontal: 15,
    alignSelf: 'flex-end'
  },
  logo: {
    width: '55%',
    paddingHorizontal: 15
  },
  inputsAllContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  appointmentList: {
    width: '100%',
    height: 'auto',
    paddingStart: 20,
    paddingEnd: 20,
    marginTop: 30
  },
  appointmentListTitle: {
    backgroundColor: colors.blueBgLogo,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
  },
  appointmentListTitleText: {
    color: colors.buttonsTextColor,
    fontWeight: 'bold',
  },
  appointmentsItems: {
    flexDirection: 'row',
    marginTop: 10,
    paddingStart: 10,
    paddingEnd: 10
  },
  appointmentsItemsNames: {
    width: '60%',
    textAlign: 'left',
    fontSize: 16
  },
  appointmentsItemsButtonDetails: {
    width: '40%',
    backgroundColor: colors.blueLogo,
    padding: 5,
    borderRadius: 12
  },
  appointmentsItemsButtonDetailsText: {
    textAlign: 'center',
    color: colors.buttonsTextColor,
    fontWeight: 'bold'
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