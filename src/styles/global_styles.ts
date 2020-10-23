import { StyleSheet } from 'react-native'

export const colors = {
    bg: '#ffffff',
    
    buttonsTextColor: '#ffffff',
    inputs: '#f7f7f7',
    inputBorder: '#888',
    error: '#ce2029',
    inputsPlaceHolder: '#888',
    
    blueLogo: '#3bb1e5',
    blueBgLogo: '#17355d',
}


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
        paddingTop: 20
      },
      button: {
        paddingVertical: 12,
        backgroundColor: colors.blueLogo,
        alignSelf: 'stretch',
        marginHorizontal: 25,
        borderRadius: 12,
        borderWidth: 3,
      },
      buttonText: {
        color: colors.buttonsTextColor,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
      },

      inputContainer: {
        flexDirection: 'row',
      },
      inputIcon: {
        position: 'absolute',
        top: 10,
        left: 35,
        zIndex: 2,
        color: colors.blueLogo
      },
      input: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: colors.inputs,
        zIndex: 1,
        alignSelf: 'stretch',
        marginBottom: 15,
        marginHorizontal: 25,
        paddingStart: 45,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blueBgLogo,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.inputBorder
      },
})
