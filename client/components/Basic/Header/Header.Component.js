import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import styles from './Header.Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

const Header = ({ onIconClick, iconName, title }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={ onIconClick }
                style={{width: 40, fontSize: 32}}
            >
                <Icon name={iconName} size={32} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>{ title }</Text>
        </View>
    )
}

export default Header;