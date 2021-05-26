import React from 'react';
import {ScrollView, View, Text, TouchableOpacity,} from 'react-native';
import { Button, CheckBox } from 'react-native-elements'
import request from '../../utils/request';
import styles from './Tournament.Style';
import TournamentUnit from './Tournament.Unit';
import CreateTournamentForm from './Tournament.Create';
import {Overlay} from 'react-native-elements';
import Icon from "react-native-vector-icons/FontAwesome";
import commonStyles from '../../common/styles';
import { getTeams } from '../../utils/getTeams';
import Select from '../Basic/Select/Select.Component';
import Payment from '../Payment/Payment.Component';


const Tournament = function (props) {

    const [tournaments, setTournaments] = React.useState([]);
    const [isAddVisible, setIsAddVisible] = React.useState(false);
    const [viewId, setViewId] = React.useState(null);
    const [team, setTeam] = React.useState('');
    const [teamName, setTeamName] = React.useState('');
    const [teamSelectorView, setTeamSelectorView] = React.useState(false);
    const [payOnline, setPayOnline] = React.useState(false);
    const [payment, setPayment] = React.useState(false);

    const myTeamsList = getTeams({ mine: true }).map(team => {
        return ({
            value: team._id,
            label: team.name
        })
    });

    const addTeam = async () => {
        let res = await request({
            route: 'tournaments/' + tournaments[viewId]._id,
            type: 'PUT',
            credential: 'include',
            body: {
                teamId: team
            }
        });

        if (!res.error) {
            alert("Team added to tournament")
        }
    }

    const getTournaments = async () => {
        let res = await request({
            route: 'tournaments'
        });
        if (res.status === 'success') {
            setTournaments(res.data);
        }
    }

    React.useEffect(() => {
        getTournaments();
    }, []);

    const onTournamentCreate = () => {
        alert('Tournament created');
    }

    if (payment) {
        return (
            <Payment 
                onSuccess={addTeam}
                onFailure={() => alert("Payment failed")}
                amount={tournaments[viewId].registrationFees}
            />
        )
    }

    return (
        <>
        <Overlay
            isVisible={viewId !== null}
            onBackdropPress={() => setViewId(null)}
        >
            <Overlay
                isVisible={teamSelectorView}
                onBackdropPress={() => setTeamSelectorView(false)}
            >
                <Select
                    options={[ {value: '', label: 'Select Team'}, ...myTeamsList]}
                    onChoose={(option) => {
                        setTeam(option.value);
                        setTeamName(option.label);
                    }}
                />
            </Overlay>
            <View style={styles.overlay}>
                {(() => {
                    let tournament = tournaments[viewId];
                    
                    if (!tournament) {
                        return null;
                    }

                    return (
                        <>
                            <Text style={styles.title}>{tournament.name}</Text>
                            <Text style={styles.overlayText}>Player Count: {tournament.playerCount}</Text>
                            <Text style={styles.overlayText}>Registration Fee: {tournament.registrationFees} Rs</Text>
                            <Text style={styles.overlayText}>Winning Price: {tournament.winningPrice} Rs</Text>
                            <View style={{ marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => setTeamSelectorView(true)}
                                >
                                    <Text style={{ fontSize: 18 }}>
                                        {team ? "Team: " + teamName : 'Choose Team'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    alignContent: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CheckBox
                                    checked={payOnline}
                                    title="Pay Online"
                                    onPress={() => setPayOnline(!payOnline)}
                                />
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    alignContent: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                            <Button 
                                title="Join Tournament"
                                style={{
                                    marginTop: 20
                                }}
                                onPress={() => {
                                    payOnline ? setPayment(true) : addTeam();
                                }}
                            />
                            </View>
                        </>
                    );
                    
                })()}
            </View>
        </Overlay>
        <ScrollView style={styles.container}>
            <Text style={{fontSize: 32, fontWeight: '600', margin: 20,}}>Tournaments</Text>
            {
                tournaments.map((tournament, index) => {

                    if (!tournament.approved)
                        return null;

                    return (
                        <TournamentUnit 
                            name={tournament.name}
                            playerCount={tournament.playerCount}
                            tournament={tournament}
                            view={() => setViewId(index)}
                        />
                    )
                })
            }
        </ScrollView>
        <Overlay
            isVisible={isAddVisible}
            onBackdropPress={() => setIsAddVisible(false)}
        >
            <CreateTournamentForm
                onTournamentCreate={onTournamentCreate}
            />
        </Overlay>


        <TouchableOpacity 
            style={commonStyles.floatingButton}
            onPress={() => setIsAddVisible(true)}
        >
            <Icon name="plus" style={{ color: 'white' }} size={24} />
        </TouchableOpacity>
        </>
    )

}

export default Tournament;