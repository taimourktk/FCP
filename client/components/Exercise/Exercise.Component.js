import React from 'react';
import { ScrollView, Text } from 'react-native';
import Unit from './Exercise.Unit';
import styles from './Exercise.Style'
import request from '../../utils/request';
import Header from '../Basic/Header/Header.Component';

const Exercise = (props) => {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        request({
            route: 'exercise',
        }).then(data => {
            setData(data.data)
        })
    }, []);

    return (
        <ScrollView style={{ backgroundColor: 'white' }} >
            <Header 
                onIconClick={props.back}
                iconName="chevron-left"
                title="Exercises"
            />
            {
                data.map(exercise => {
                    return (
                    <Unit 
                        title={exercise.title}
                        description={exercise.description}
                        videoId={exercise.videoId}
                    />
                    )
                })
            }
        </ScrollView>
    );
}

export default Exercise;