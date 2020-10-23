import React from 'react'
import { TextInput } from 'react-native'

export function _Input(props: any) {
    return (
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={props.maxLength}
            underlineColorAndroid='transparent'
            keyboardType={props.keyboardType}
            returnKeyType={props.returnKeyType}
            onSubmitEditing={props.onSubmitEditing}
            blurOnSubmit={false}
            style={props.style} />
    )
}