import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import YoutubePlayer from 'react-native-youtube-iframe';
import styles from './Exercise.Style'

const ExerciseUnit = ({ videoId, title, description }) => {
    return (
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
    )
}

export default ExerciseUnit;