import React, { Component } from "react";
import {
  AsyncStorage,
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
      hasStats: '0'
     }
     this._isMounted = false;
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

  componentDidMount() {
    this._isMounted = true;
    this._retrieveData();
  }

  _retrieveData = async () => {
    if (this._isMounted) {
      try {
        const value = await AsyncStorage.getItem('hasStats');
        if (value == '1') {
          this.props.navigation.navigate("Root")
        } else {
        }
      } catch (error) {
      }
    }
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('hasStats', '1');
      if (this._isMounted) {
        this.setState({'hasStats': '1'})
      }
    } catch (error) {
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  postStats = (university, degree, educationLevel, year) => {
    this._storeData()
    fetch(HOST_NAME + "/stat", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        university: university,
        degree: degree,
        educationLevel: educationLevel,
        year: parseInt(year),
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
    let {university, degree, educationLevel, year} = this.state;
    if (!university && !degree && !educationLevel && !year) {
      alert("Please enter a value")
    } else {
      this.postStats(university, degree, educationLevel, year)
      this.props.navigation.navigate("Root")
    }
  }

  render() {
    const {hasStats} = this.state;
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
              <Text
                style={styles.text}
                onPress={() => this.props.navigation.navigate("Root")}
              >
                Not A Student?
              </Text>
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
