import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";

export default class Card extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.card} onPress={this.props.callback}>
        <Image style={styles.cardImage} source={{ uri: this.props.uri }} />
        <Text style={styles.cardText}>{this.props.cardTitle}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    // marginLeft: "2%",
    // width: "96%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#002145",
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  }
});
