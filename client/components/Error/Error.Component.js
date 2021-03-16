import React from 'react';
import {Text, View} from 'react-native';
import styles from './Error.Style'

const ErrorComponent = (props) => {

    if (!props.message)
        return null;

    return (
        <View style={styles.container}>
            <Text style={styles.message}>
                {props.message}
            </Text>
        </View>
    );

}

export default ErrorComponent;