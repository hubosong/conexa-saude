import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

/** lib with ripple button */
import { RectButton } from 'react-native-gesture-handler'

export function _RectButton(props: any) {
    return (
        <RectButton
            onPress={props.onPress}
            style={props.style}>
            <Text style={props.textStyle}>{props.buttonText}</Text>
        </RectButton>
    )
}

export function _TouchableOpacity(props: any) {
    return (
        <TouchableOpacity style={props.touchableOpacity_style} onPress={props.touchableOpacity_onPress}>
            <Text style={props.touchableOpacity_text_style}>{props.touchableOpacity_text}</Text>
        </TouchableOpacity>
        
    )
}