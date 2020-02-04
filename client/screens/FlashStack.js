import React, { Component } from "react";
import { ScrollView, View, SafeAreaView, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import colors from "../assets/colors";
import Flashcard from "../components/Flashcard";
import normalize from 'react-native-normalize';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height

export default class FlashStack extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [{
        "id": "1",
        "answer": "data1"
      }, {
        "id": "2",
        "answer": "data2"
      }],
      right: 0,
      region: this.props.navigation.getParam("region", "brain")
    };

  }

  componentDidMount(){
      //run this function if you want to connect to DB and not run demo JSON
      this.apiFetch();
  }

  //populates state.data with flashcards
  apiFetch(){
    return fetch('http://localhost:8080/flashcard?region=' + this.state.region)
    .then((response) => response.json())
    .then((responseJson) => {
     this.setState({data: responseJson});
    return responseJson;
    })
    .catch((error) => {
    console.error(error);
    });
  }

  static navigationOptions = {
    title: "FlashStack",
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  handleSwipe(val) {
    this.setState({ right: this.state.right + val });
  };

  render() {

    var stack = [];
    var totalSwiped = 0;

    this.state.data.forEach(function (tmp) {
        stack.push(
          <Flashcard
          uri="https://static2.bigstockphoto.com/8/5/1/large1500/158296634.jpg"
          cardTitle="Respiratory System"
          answer={tmp.answer}
          key={totalSwiped}
          handleSwipe={this.handleSwipe.bind(this)}
          />
        );
        totalSwiped += 1;
    }.bind(this));

    return (
        //<TouchableOpacity onPress={alert("dsf")}> 
        <View>

          <View style={styles.resultView}>
            <Text style={styles.result}>Amount correct: {this.state.right}</Text>
            <Text style={styles.result}>Total cards swiped: {totalSwiped}</Text>
            <Text style={styles.result}>Percentage correct: {this.state.right/totalSwiped*100} %</Text>
          </View>

            <View
              style={styles.container}
              contentContainerStyle={styles.contentContainer}
            >
              
              {stack}
            </View>
        </View>
        //</TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: deviceHeight*0.1,
    alignItems: "center",
  },
  resultView: {
    marginTop: deviceHeight*0.1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: deviceWidth,
    height: deviceWidth * 1.04
  },
  result:{

  }
});
