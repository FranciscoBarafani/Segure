import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";

export default class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props
    };
  }

  render() {
    return (
      <View style={styles.viewButtons}>
        <Text>Informacion del Usuario</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 100
  }
});
