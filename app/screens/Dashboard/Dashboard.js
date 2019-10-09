import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import DashboardMenu from "../../components/Dashboard/DashboardMenu";
import UserInfo from "../../components/Dashboard/UserInfo";
import ActionButton from "react-native-action-button";

export default class DashboardScreen extends Component {
  render() {
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewUserInfo}>
          <UserInfo />
        </View>
        <View style={styles.viewDashboardMenu}>
          <DashboardMenu navigation={this.props.navigation} />
        </View>
        <ActionButton
          buttonColor="#00a680"
          onPress={() => {
            this.props.navigation.navigate("SetContact");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  viewUserInfo: {},
  viewDashboardMenu: {
    flex: 1
  }
});
