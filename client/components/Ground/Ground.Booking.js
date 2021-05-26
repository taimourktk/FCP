import React, {useState} from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import styles from './Ground.Style';
import { Calendar } from 'react-native-calendars';
import request from '../../utils/request';
import Payment from '../Payment/Payment.Component';

const Booking = (props) => {

    const [loading, setLoading] = useState(false);
    const [hours, setHours] = useState([]);
    const [date, setDate] = useState('');
    const [calendarDisplay, setCalenderDisplay] = useState('none');
    const [freeSlots, setFreeSlots] = useState([]);
    const [selected, _setSelected] = useState([]);
    const [payOnline, setPayOnline] = useState(false);
    const [payment, setPayment] = useState(false);

    const book = async () => {
        try {
            let res = await request({
                route: 'ground/book/' + props.id,
                type: 'PUT',
                credential: 'include',
                body: {
                    hours: selected,
                    date
                }
            })
            if (!res.error) {
                alert('Done Booking');
            }
        }
        catch (err) {
            setLoading(false);
            console.log(err)
        }
    }

    const setSelected = (index) => {

        if (selected.indexOf(index) > -1) {
            console.log("Removing")
            selected.splice(selected.indexOf(index), 1);
        }
        else {
            console.log("Adding")
            selected.push(index);
        }
        console.log(selected)
        _setSelected([ ...selected]);
    }

    const stylesRegister = {
        '-1':  {},
        '0': styles.notAvailable,
        '2': styles.buttonBooked
    }

    React.useEffect(() => {
        let hours = [];
        for (let index = 0; index < 24; index ++) {
            if (index < 12) {
                hours.push({ value: index, label: `${index} - ${index + 1}`, ampm: 'AM', status: props.availableHours.indexOf(index) > -1 ? -1 : 2 })
            }
            else if (index === 12) {
                hours.push({ value: index, label: '12 - 01', ampm: 'PM', status: props.availableHours.indexOf(index) > -1 ? -1 : 0})
            }
            else {
                hours.push({ value: index, label: `${index - 12} - ${index - 11}`, ampm: 'PM', status: props.availableHours.indexOf(index) > -1 ? -1 : 0})
            }
        }
        setHours(hours);
    }, []);

    React.useEffect(() => {
        try {
            if (!date)
                return;
            setLoading(true);
            request({
                route: `ground/slots/${props.id}/${date}`
            }).then(res => {
                console.log("Available Slots", res);
                if (!res.error)
                    setFreeSlots(res);
                setLoading(false);
            })
        }
        catch (err) {
            console.log("ERR", err);
            setLoading(false);
        }
    }, [date])

    if (payOnline && payment) {
        return (
            <>
            <Payment
                onSucess={book}
                onFailure={() => alert('Fail')}
                amount={selected.length * props.rate}
            />
            </>
        );
    }

    return (
        
        <View style={styles.bookingContainer}>
            <View
                style={{
                    width: '100%',
                    zIndex: 999,
                    flexDirection: 'column'
                }}
            >
                <TouchableOpacity
                    style={{
                        zIndex: 999,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}
                    onPress={() =>  calendarDisplay === 'flex' ? setCalenderDisplay('none') : setCalenderDisplay('flex')}
                >
                    <Text style={{backgroundColor: 'white', borderRadius: 5, overflow: 'hidden', paddingTop: 8, paddingLeft: 8, paddingLeft: 20, paddingRight: 20, fontSize: 28}}>{ calendarDisplay === 'flex' ? 'Cancel' : date ? date : 'Select Date'}</Text>
                </TouchableOpacity>
                <View
                    style={{
                        display: calendarDisplay,
                        justifyContent: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <Calendar 
                        onDayPress={(day) => {
                            setDate(day.dateString);
                            setSelected([]);
                            setCalenderDisplay('none');
                        }}
                        style={{
                            position: 'absolute',
                            zIndex: 999,
                            width: '100%',
                        }}
                        theme={{
                            textDayFontSize: 18,
                            textMonthFontSize: 18,
                            textDayHeaderFontSize: 18
                        }}
                    />
                </View>
            </View>
            {

                hours.map((hour, index) => {

                    let style = styles.hourButton;
                    
                    if (selected.indexOf(index) > -1) {
                        console.log("In selected")
                        style = { ...style, ...styles.selectedHour }
                    }
                    else if (freeSlots.indexOf(index) > -1) {
                        style = { ...style, ...styles.availableHour }
                    }
                    else if (props.availableHours?.indexOf(index) > -1) {
                        style = { ...style, ...styles.buttonBooked }
                    }
                    else {
                        style = { ...style, ...styles.notAvailable }
                    }

                    return (
                        <TouchableOpacity
                            onPress={() => setSelected(index)}
                            key={index}
                            disabled={freeSlots.indexOf(index) === -1}
                        >
                            <View style={style}>
                                <Text>{!loading ? hour.label : <ActivityIndicator/> }</Text>
                                <Text>{hour.ampm}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
            <View style={{ width: '100%', marginTop: 10 }}>
                <CheckBox
                    checked={payOnline}
                    title="Pay Online"
                    onPress={() => setPayOnline(!payOnline)}
                />
            </View>
            <Button 
                title={`Book - PKR ${selected.length * props.rate}`}
                disabled={loading || selected.length === 0}
                onPress={
                    payOnline ?
                    () => {
                        setPayOnline(true);
                        props.payOnline(10);
                    }: book
                }
                style={{
                    marginTop: 20,
                    fontSize: 16,
                    fontWeight: '600'
                }}
            />
        </View>
    );

}

export default Booking;