import React from 'react';
import {Image, Button} from 'react-native-elements'
import {View, Text, ScrollView} from 'react-native'
import styles from './Me.style'
import {set} from '../../utils/storage'
import user from '../../utils/user'

const Me = (props) => {

    return (
        <ScrollView
            style={styles.container}
        >
            <Image
                containerStyle={styles.imageContainer}
                source={{
                    uri: 'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png'
                }}
                transitionDuration={1000}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.infoContainer}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Name</Text>
                </View>
                <View style={styles.infoDetailContainer}>
                    <Text>{user.name}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Email</Text>
                </View>
                <View style={styles.infoDetailContainer}>
                    <Text>{user.email}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Phone</Text>
                </View>
                <View style={styles.infoDetailContainer}>
                    <Text>{''}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>City</Text>
                </View>
                <View style={styles.infoDetailContainer}>
                    <Text>{''}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoTitleContainer}>
                    <Text style={styles.infoTitle}>Join Date</Text>
                </View>
                <View style={styles.infoDetailContainer}>
                    <Text>{user.joinDate}</Text>
                </View>
            </View>
            <Button 
                title='Log Out'
                onPress={() => {
                    set('token', null);
                    props.reload();
                }}
                style={{
                    marginTop: 30,
                    alignSelf: 'center',
                    width: 120,
                }}
            />
        </ScrollView>
    )

}

export default Me;