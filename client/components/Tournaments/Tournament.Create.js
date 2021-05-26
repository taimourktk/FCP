import React, { useState } from 'react';
import Input from '../Basic/Input/Input.component';
import { View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import request from '../../utils/request'

const CreateTournament = (props) => {

    const [name, setName] = useState('');
    const [playerCount, setPlayerCount] = useState();
    const [winningPrice, setWinningPrice] = useState();
    const [registrationFees, setRegistrationFees] = useState();
    const [loading, setLoading] = useState(false);

    const createTournament = async () => {
        try {
            setLoading(true);
            let res = await request({
                route: 'tournaments',
                type: 'POST',
                body: {
                    name,
                    playerCount,
                    winningPrice,
                    registrationFees,
                }
            });
            setLoading(false);
            if (res.status === 'success') {
                props.onTournamentCreate();
            }
        }
        catch(err) {
            setLoading(false);
            console.log(err);
        }
    }

    return (

        <View
            style={{
                width: Dimensions.get('window').width - 80
            }}
        >
            <Text style={{
                fontSize: 22,
                fontWeight: '600',
                color: '#333',
                marginBottom: 30,
            }}>
                Create Tournament
            </Text>

            <Input 
                placeholder='Tournament Name'
                onChangeText={(val) => setName(val)}
            />
            <Input 
                placeholder='Player Count'
                onChangeText={(val) => setPlayerCount(val)}
            />
            <Input 
                placeholder="Registration Fees"
                onChangeText={(val) => setRegistrationFees(val)}
            />
            <Input 
                placeholder="Winning Price"
                onChangeText={(val) => setWinningPrice(val)}
            />

            <Button
                title='Create'
                loading={loading}
                disabled={loading}
                onPress={createTournament}
                containerStyle={{
                    marginTop: 30,
                }}
                titleStyle={{
                    fontWeight: '600'
                }}
            />

        </View>

    )

}

export default CreateTournament;