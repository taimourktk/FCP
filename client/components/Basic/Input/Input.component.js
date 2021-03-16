import React from 'react'
import {TextInput, Text} from 'react-native'
import styles from './Input.style'

const Input = (props) => {

    return (
        <TextInput 
            style={styles.input}
            autoCapitalize="none"
            {... props}
        />
    )

}

export default Input;