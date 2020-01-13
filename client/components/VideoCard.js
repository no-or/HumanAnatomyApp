import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View
} from "react-native";

export default class VideoCard extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.card} onPress={this.props.callback}>
        <Image style={styles.cardImage} source={{ uri: this.props.uri }} />
        <View style={styles.cardText}>
            <Text style={styles.cardDescription}>{this.props.cardTitle}</Text>
            <Text style={styles.cardDescription}>{this.props.cardViews}</Text>
        </View>
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
    elevation: 1,
    flexDirection: "row"
  },
  cardImage: {
    width: "40%",
    height: 100,
    resizeMode: "cover",
    borderWidth: 2
  },
  cardText: {
    width: "60%",
    padding: 10,
    paddingLeft: 20,
    backgroundColor: "#002145",
    justifyContent: "space-between"
  },
  cardDescription: {
    fontSize: 16,
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
  }
});
