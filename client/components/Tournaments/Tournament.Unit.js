import React from 'react';
import {Card} from 'react-native-elements';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Tournament.Style'

const Tournament = function (props) {

    return (
        <Card>
            <TouchableOpacity
                onPress={() => props.view()}
            >
                <Text style={styles.title}>{props.name}</Text>
            </TouchableOpacity>
        </Card>
    )

}

export default Tournament;