import React from 'react';
import {Text, View} from 'react-native'
import {ButtonGroup} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Dashboard.Style'

Icon.loadFont();

const CreateButton = (props) => {

  let name = props.iconName || 'plus';

  return (
    <View
      style={styles.createButton}
    >
        <Icon name={name} size={32} color="#333"/>
        <Text style={styles.createButtonTitle}>{props.title}</Text>
    </View>
  )

}

const Buttons = (props) => {

    const buttons = [
      <CreateButton title = "Add Team" />,
      <CreateButton title = "Request Match" iconName = "futbol-o"/>,
      <CreateButton title = "Tournament" iconName = "trophy"/>
    ]

    return (
        <ButtonGroup
          onPress={(index) => props.setSelectedIndex(index)}
          buttons={buttons}
          containerStyle={{height: 100}}
        />
    )

}

export default Buttons;