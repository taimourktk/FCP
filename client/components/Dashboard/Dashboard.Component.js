import React from 'react';
import { ScrollView, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from './Dashboard.Style';

import CreateTeamForm from '../Team/Team.Create';
import CreateTournamentForm from '../Tournaments/Tournament.Create';
import News from '../News/News.Component';

import Toast from 'react-native-toast-message';

import Buttons from './Buttons'

const Dashbaord = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const onTeamCreate = () => {
        Toast.show({
            text1: 'Team Created Successfully'
        });
        setSelectedIndex(null);
    }

    const onTournamentCreate = () => {
        Toast.show({
            text1: 'Tournament Created Successfully'
        });
        setSelectedIndex(null);
    }

    return (
        <>
        <ScrollView
            style={styles.container}
        >
            <Overlay
                isVisible={selectedIndex === 0}
                onBackdropPress={() => setSelectedIndex(null)}
            >
                <CreateTeamForm
                    onTeamCreate={onTeamCreate}
                />
            </Overlay>
            <Overlay
                isVisible={selectedIndex === 2}
                onBackdropPress={() => setSelectedIndex(null)}
            >
                <CreateTournamentForm
                    onTournamentCreate={onTournamentCreate}
                />
            </Overlay>
            <View>
                <Buttons
                    setSelectedIndex={setSelectedIndex}
                />
            </View>

            <News />
        </ScrollView>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        </>
        )

}

export default Dashbaord;