import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function headerSepet({ navigation }) {

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("basket")}>
        <Text >0 </Text>
        <FontAwesome5 name="shopping-basket" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

