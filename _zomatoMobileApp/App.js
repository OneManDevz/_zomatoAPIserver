import React, { Component, ReactDom } from 'react';
import { Alert, View, TouchableHighlight, Text } from 'react-native';
import StylesJS from './src/components/styles.js';
import MenuList from './src/components/MenulList';

const menuURL = 'your api url';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.getDailyMenus = this.getDailyMenus.bind(this);

    this.state = {
      render: false
    };
  }

  getDailyMenus() {
    if (this.state.render == false) {
      return fetch(menuURL)
        .then(data => data.json())
        .then(res => {
          this.setState({ dataSource: res });
          this.setState({ render: true });
        });
    } else {
      return 0;
    }
  }

  render() {
    if (this.state.render == true) {
      return (
        <View style={StylesJS.main}>
          <Text style={StylesJS.header}>Obedy - Ružinov</Text>
          <TouchableHighlight
            style={StylesJS.button}
            onPress={this.getDailyMenus}
          >
            <Text style={StylesJS.buttonText}>Načitaj</Text>
          </TouchableHighlight>

          <MenuList itemList={this.state.dataSource} />
        </View>
      );
    } else {
      return (
        <View style={StylesJS.main}>
          <Text style={StylesJS.header}>Obedy - Ružinov</Text>
          <TouchableHighlight
            style={StylesJS.button}
            onPress={this.getDailyMenus}
          >
            <Text style={StylesJS.buttonText}>Načitaj</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}
