import React from 'react';
import {Image, Button} from 'react-native-elements'
import {View, Text, ScrollView, Dimensions} from 'react-native'
import styles from './Me.style'
import {set} from '../../utils/storage'
import user from '../../utils/user'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import cover from "../../res/cover.jpg"
Icon.loadFont();


const Me = (props) => {

    const [i, setI] = React.useState(0);

    const listenerFunction = () => {
        setI(i+1)
    }

    React.useEffect(() => {
        user.listenChange(listenerFunction)
    }, [])

    if (i == 1) {
        setI(0)
    }

    return (
        <ScrollView
            style={styles.container}
        >
            <View 
                style={{ 
                    width: '100%', 
                    height: 200, 
                    marginBottom: -75
                }}
            >
                <Image 
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                    }}
                    source={ cover }
                />
            </View>
            <View>
                <Image
                    containerStyle={styles.imageContainer}
                    source={{
                        uri: user.photo ? user.photo : 'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png'
                    }}
                    transitionDuration={1000}
                    style={{ width: 150, height: 150, borderRadius: 100, flexDirection: 'row' }}
                />
                <Text
                    style={{ ...styles.menuItemValue, alignSelf: 'flex-start', fontSize: 24, marginBottom: 0, marginLeft: 10 }}
                >
                    Profile
                </Text>
                
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>Name</Text>
                <Text style={styles.menuItemValue}>{user.name}</Text>
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>Email</Text>
                <Text style={styles.menuItemValue}>{user.email}</Text>
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>Position</Text>
                <Text style={styles.menuItemValue}>{user.role}</Text>
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>City</Text>
                <Text style={styles.menuItemValue}>{user.city}</Text>
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>Phone</Text>
                <Text style={styles.menuItemValue}>{user.phone}</Text>
            </View>
            <View style={styles.menuContainer}>
                <Text style={styles.menuItemName}>Joined On</Text>
                <Text style={styles.menuItemValue}>{user.joinDate}</Text>
            </View>
            <Button 
                    title='Log Out'
                    onPress={() => {
                        set('token', null);
                        props.reload();
                    }}
                    style={{
                        alignSelf: 'flex-end',
                        width: 120,
                        marginTop: 0,
                        marginBottom: 20
                    }}
                    buttonStyle={{
                        marginLeft: (Dimensions.get('window').width - 300)/2,
                          width:300,
                          backgroundColor: 'black',
                          borderRadius: 5,
                          marginTop:10
                      }}
                    
                />
        </ScrollView>
        
    )
    

}


export default Me;