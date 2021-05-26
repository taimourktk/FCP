import React from 'react';
import {Image, Button} from 'react-native-elements'
import {View, Text, ScrollView} from 'react-native'
import styles from './Me.style'
import {set} from '../../utils/storage'
import user from '../../utils/user'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
Icon.loadFont();

const cover = "https://lh3.googleusercontent.com/proxy/QHFBsqWhazrUd0TayCr4aePhVx9FSNfMCAfZrHvSFM-DClseUQJaDR_1H2QgeoS0xmbvaSO1o4cdzfQcJIOFUSs27FjgMdlT8yjt"

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
                    source={{ uri: cover }}
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
                    style={{ ...styles.menuItemValue, alignSelf: 'flex-start', fontSize: 24, marginBottom: -35, marginLeft: 10 }}
                >
                    Profile
                </Text>
                <TouchableOpacity
                    onPress={() => alert(1)}
                    style={{
                        alignSelf: 'flex-end',
                        width: 20,
                        marginTop: 5,
                        marginBottom: -25,
                        marginRight: 130
                    }}
                >
                    <Icon name="refresh" size={16}></Icon>
                </TouchableOpacity>
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
                />
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
                <Text style={styles.menuItemName}>Role</Text>
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
        </ScrollView>
    )

}

export default Me;