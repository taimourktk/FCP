import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Unit from './Injuries.Unit';
import styles from './Injuries.Style'
import request from '../../utils/request';
import Header from '../Basic/Header/Header.Component';
import HTMLView from 'react-native-htmlview';

const Injuries = ( props ) => {

    const [data, setData] = React.useState([]);
    const [detailId, setDetailId] = React.useState(null);

    React.useEffect(() => {
        request({
            route: 'injury',
        }).then(data => {
            setData(data.data)
        })
    }, []);

    if (detailId !== null) {
        const injury = data[detailId];
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Header
                    onIconClick={() => setDetailId(null)}
                    iconName="chevron-left"
                    title="Injuries"
                />
                <Unit 
                    title={injury.title}
                    description={injury.description}
                    videoId={injury.videoId}
                />
                <Card>
                <HTMLView
                  value={injury.content}
                />
                </Card>
            </ScrollView>
        )
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }} >
            <Header
                onIconClick={props.back}
                iconName="chevron-left"
                title="Injuries"
            />
            {
                data.map((exercise, index) => {
                    return (
                    <Unit 
                        title={exercise.title}
                        description={exercise.description}
                        videoId={exercise.videoId}
                        onClick={() => setDetailId(index)}
                    />
                    )
                })
            }
        </ScrollView>
    );
}

export default Injuries;