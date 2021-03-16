import React, {useState} from 'react';
import {Picker, StyleSheet, View} from 'react-native';

const Select = (props) => {

    const [selectedValue, _setSelectedValue] = useState();

    const setSelectedValue = (value, index) => {
        if (props.onChoose)
            props.onChoose(props.options[index])
        _setSelectedValue(value);
    }

    return (
        <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue, itemIndex)}
        >
            {
                props.options.map(option => {
                    return (
                        <Picker.Item
                            value={option.value}
                            label={option.label}
                        />
                    )
                })
            }
        </Picker>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center"
    }
  });

export default Select;