import React, { Component } from "react";
import {
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import colors from "../assets/colors"
import { ButtonStyled } from "../components/ButtonStyled";
import { HOST_NAME } from "../constants/Constants";

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

export default class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      university: null,
      degree: null,
      educationLevel: null,
      year: null,
     }
  }


  static navigationOptions = {
    title: "Welcome",
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: colors.primaryText,
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  postStats = () => {
    const host = HOST_NAME
    fetch(HOST_NAME + "/stat", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        university: this.state.university,
        degree: this.state.degree,
        educationLevel: this.state.educationLevel,
        year: parseInt(this.state.year),
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  navigateRoot = () => {
    this.postStats()
    this.props.navigation.navigate("Root")
  }

  render() {
    return (
      <SafeAreaView style={styles.wrapper}>
        <DismissKeyboard>
          <View style={styles.content}>
            <Text style={styles.heading}>WELCOME</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={true}
              placeholder="What is your university?"
              onChangeText={(text) => this.setState({university: text})}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={true}
              placeholder="What is your degree?"
              onChangeText={(text) => this.setState({degree: text})}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={true}
              placeholder="What is your educational level?"
              onChangeText={(text) => this.setState({educationLevel: text})}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={true}
              placeholder="What is your current year?"
              keyboardType="number-pad"
              onChangeText={(text) => this.setState({year: text})}
            />
            <ButtonStyled
              text="Continue"
              onPress={this.navigateRoot}
            />
            <TouchableOpacity>
              <Text style={styles.text}>Not A Student?</Text>
            </TouchableOpacity>

          </View>
        </DismissKeyboard>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto"
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#002145"
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: 32
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 24,
    height: 55,
    width: "100%",
    margin: 15,
    textAlign: "center",
    color: "#051d63",
    fontWeight: "500",
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
    fontSize: 15
  }
});
