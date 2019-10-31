import React, { Component } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { Avatar } from "react-native-elements";
import DashboardMenu from "../../components/Dashboard/DashboardMenu";
import ActionButton from "react-native-action-button";

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emergencyContact: null
    };
  }

  componentDidMount() {
    this.renderEmergencyContactInfo();
  }

  //Gets the emergency contact that is stored in the Local phone storage and sets it in the state
  getEmergencyContact = async () => {
    try {
      var emergencyContact = await AsyncStorage.getItem("emergencyContact");
      var emergencyContactInfo = JSON.parse(emergencyContact);
      this.setState({
        emergencyContact: emergencyContactInfo
      });
    } catch {
      alert("Error al obtener contacto de emergencia");
    }
  };
  //This functions calls another function on load
  renderEmergencyContactInfo = async () => {
    try {
      await this.getEmergencyContact();
    } catch {
      alert("No has seleccionado tu contacto de emergencia");
      this.props.navigation.navigate("SetContact");
    }
  };

  render() {
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewAvatar}>
          <Avatar
            rounded
            source={require("../../../assets/icon.png")}
            size={150}
          />
        </View>
        <View style={styles.viewDashboardMenu}>
          <DashboardMenu
            navigation={this.props.navigation}
            emergencyContact={this.state.emergencyContact}
          />
        </View>
        <View>
          <ActionButton
            buttonColor="#00a680"
            onPress={() => {
              this.props.navigation.navigate("SetContact", {
                renderEmergencyContactInfo: this.renderEmergencyContactInfo
              });
            }}
          />
        </View>
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
  },
  headerStyle: {
    backgroundColor: "#00a680",
    height: 50
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  viewAvatar: {
    alignItems: "center",
    marginTop: 30
  }
});
