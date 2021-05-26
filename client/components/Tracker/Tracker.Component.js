import React, { useState } from 'react';
import { FitnessTrackerAPI } from '@kilohealth/rn-fitness-tracker';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native';
import Header from '../Basic/Header/Header.Component';
import styles from './Tracker.Style'

export default function (props) {

    const [stepsToday, setStepsToday] = useState(0);
    const [stepsWeek, setStepsWeek] = useState(0);
    const [distanceToday, setDistanceToday] = useState(0);
    const [floorsToday, setFloorsToday] = useState(0);

    const main = async () => {
        const authorizationStatus = await FitnessTrackerAPI.setupTracking();
        const _steps = await FitnessTrackerAPI.getStepsToday();
        const steps = await FitnessTrackerAPI.getStepsWeekTotal();
        const distance = await FitnessTrackerAPI.getDistanceToday();
        const floorsClimbed = await FitnessTrackerAPI.getFloorsToday();

        setStepsToday(_steps);
        setStepsWeek(steps);
        setDistanceToday(distance);
        setFloorsToday(floorsClimbed);

    }

    React.useEffect(() => {main()}, []);
    return (
        <ScrollView style={styles.container}>
            <Header
                onIconClick={props.back}
                iconName="chevron-left"
                title="Step Tracker"
            />
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>Today</Text>
                <Text style={styles.menuItemValue}>{stepsToday}</Text>
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>This Week</Text>
                <Text style={styles.menuItemValue}>{stepsWeek}</Text>
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>Distance</Text>
                <Text style={styles.menuItemValue}>{distanceToday}</Text>
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>Floors Climbed Today</Text>
                <Text style={styles.menuItemValue}>{floorsToday}</Text>
            </View>
        </ScrollView>
    );
    

}