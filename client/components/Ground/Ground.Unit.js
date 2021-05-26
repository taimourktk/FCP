import React from 'react';
import { Card } from 'react-native-elements';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Ground.Style';

function GroundUnit ({ index, name, location, city, availableHours, rate, selectGround }) {
    return (
        <Card>
            <TouchableOpacity
                onPress={() => selectGround(index)}
            >
                <Text style={styles.groundName}>{name}</Text>
                <Text>Rate/hr: Rs {rate}</Text>
                <Text>Location: {location}, {city}</Text>
                <Text>Available Hours: {availableHours.map( hour => hour > 12 ? `${hour-12} PM` : (hour === 12 ? '12 PM' :  `${hour} AM`)).join(', ')}</Text>
            </TouchableOpacity>
        </Card>
    );
}

export default GroundUnit;
