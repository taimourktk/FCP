import React from 'react';
import { Card } from 'react-native-elements';
import { View, Image, Text, Dimensions } from 'react-native';
import moment from 'moment'

import Cover from '../../res/ground.jpg'
import styles from './News.Style'

const Unit = (props) => {

    return (
        <Card>
            <Image 
                source={{
                    uri: props.image
                }}
                style={{
                    width: '100%',
                    height: 200
                }}
            />
            <Card.Divider />
            <View>
                <Text style={styles.highlight}>{props.highlight}</Text>
                <Text>{props.body ? props.body.substr(0, 100) : ''}</Text>
                <Text style={styles.date}>
                    {moment(new Date(props.createdAt)).format('MMMM DD')}
                </Text>
            </View>
        </Card>
    )

}

export default Unit;