import React, { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

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
    marginBottom: 10,
    marginLeft: "2%",
    width: "96%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 1
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderWidth: 2
  },
  cardText: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#002145",
    color: "white",
    fontFamily: "Helvetica"
  }
});
