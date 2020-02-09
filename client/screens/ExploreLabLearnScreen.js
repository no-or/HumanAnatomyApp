import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  SectionList,
  Text
} from 'react-native';
import colors from '../assets/colors';
import Card from "../components/Card";
import Accordion from '../components/Accordion'

export default class ExploreLabLearnScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu :[]
     }
  }

  componentDidMount() {
    this.apiFetch();
  }

  apiFetch() {
    var host = '192.168.0.102'
    return fetch('http://'+host+':8080/explore/?section=region')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({menu: responseJson});
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderAccordions=()=> {
    const items = [];
    for (item of this.state.menu) {
        items.push(
            <Accordion 
                title = {item.title}
                data = {item.children}
                key = {item._id}
                id = {item.id}
                image = {item.image}
                navigation = {this.props.navigation}
            />
        );
    }
    return items;
  }

  static navigationOptions = {
    title: 'Learn',
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.content}>
              { this.renderAccordions() }
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    backgroundColor: "#fff"
  }
});

