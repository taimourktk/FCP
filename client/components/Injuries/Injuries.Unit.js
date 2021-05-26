import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import YoutubePlayer from 'react-native-youtube-iframe';
import styles from './Injuries.Style'

const InjuryUnit = ({ videoId, title, description, onClick }) => {

    return (
        <TouchableOpacity
            onPress={onClick ? () => onClick() : () => {}}
        >
        <Card>
            <YoutubePlayer
              height={190}
              play={false}
              videoId={videoId}
            />
            <Text
                style={styles.title}
            >
                {title}
            </Text>
            <Text>
                {description}
            </Text>
        </Card>
        </TouchableOpacity>
    )
}

export default InjuryUnit;