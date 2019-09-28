import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import StylesJS from './styles';

const MenuList = ({ itemList }) => (
    <View style= {StylesJS.mainFlatList} >
        <FlatList 
            data={itemList} 
            renderItem={({item}) => 
            <View style= {{paddingBottom: 5}}>
                <Text style={StylesJS.default}>{item.name}</Text>
                <Text style={StylesJS.default}>{item.price}</Text>
                <Text style={StylesJS.priceBold}>{item.restaurant}</Text>
            </View>                
            }
            keyExtractor = {(item, index) => index.toString()}
        />
    </View>
);
export default MenuList;