import React from 'react';
import { View, Text } from 'react-native';
import request from '../../utils/request';
import GroundUnit from './Ground.Unit';
import styles from './Ground.Style';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../Basic/Header/Header.Component';
import Booking from './Ground.Booking';
import Payment from '../Payment/Payment.Component'

Icon.loadFont();

const Ground = function (props) {

    const [data, setData] = React.useState([]);
    const [detailId, setDetailId] = React.useState(null);
    const [payOnline, setPayOnline] = React.useState(0);

    React.useEffect(() => {
        request({
            route: 'ground'
        }).then(res => {
            setData(res.data)
        })
    }, []);

    if (payOnline) {
        return <Payment />
    }

    if (detailId !== null) {
        return (
            <ScrollView style={{ backgroundColor: 'white' }} >
                <Header
                    onIconClick={() => setDetailId(null)}
                    iconName="chevron-left"
                    title="Grounds"
                />
                <Booking
                    id={data[detailId]?._id}
                    rate={200}
                    availableHours={[9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
                    payOnline={(amount) => {setPayOnline(amount)}}
                />
            </ScrollView>
        )
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }} >
            <Header
                onIconClick={props.back}
                iconName="chevron-left"
                title="Grounds"
            />
            {
                data.map((ground, index) => (
                    <GroundUnit 
                        key={ground._id}
                        id={ground._id}
                        index={index}
                        name={ground.name}
                        availableHours={ground.availableHours}
                        location={ground.location}
                        city={ground.city}
                        rate={ground.rate}
                        selectGround={setDetailId}
                    />
                ))
            }
        </ScrollView>
    )

}

export default Ground;