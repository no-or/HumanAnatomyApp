import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export const ButtonStyled = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#34abeb",
    borderRadius: 24,
    height: 55,
    width: "90%",
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25
  },
  text: {
    color: "#002145",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    padding: 14
  }
});
