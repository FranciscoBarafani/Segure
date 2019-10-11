import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ActivityIndicator
} from "react-native";
import { Button, Icon, Overlay } from "react-native-elements";

export default class DashboardMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      overlayComponent: null,
      loading: false
    };
  }
  //When pressing Arrived Safely
  arrivedSafe = () => {
    const message = "Llegue sin problemas, gracias por estar al tanto!";
    const mobile = this.props.emergencyContact.number;
    let url = "whatsapp://send?text=" + message + "&phone=" + mobile;
    Linking.openURL(url)
      .then(data => {
        console.log("WhatsApp Abierto");
      })
      .catch(() => {
        alert("Whatsapp no esta instalado en este dispositivo");
      });
  };

  //When pressing Im in Danger
  sendAlert = () => {
    const mobile = this.props.emergencyContact.number;
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(position => {
      const message =
        "Estoy en peligro! Mi ubicacion es: " +
        "http://maps.google.com/maps?saddr=" +
        position.coords.latitude +
        "," +
        position.coords.longitude;
      let url = "whatsapp://send?text=" + message + "&phone=" + mobile;
      Linking.openURL(url)
        .then(data => {
          this.setState({ loading: false });
        })
        .catch(() => {
          alert("Whatsapp no esta instalado en este dispositivo");
        });
      this.setState({ loading: false });
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.viewButtons}>
        <Button
          buttonStyle={styles.startTripButton}
          containerStyle={styles.startTripButtonContainer}
          title="Comienzo mi viaje"
          onPress={() => {
            this.props.navigation.navigate("StartTrip");
          }}
          icon={
            <Icon
              name="walk"
              type="material-community"
              size={30}
              color="white"
            />
          }
        />
        <Button
          buttonStyle={styles.finishTripButton}
          containerStyle={styles.finishTripButtonContainer}
          title="Llegue Bien!"
          icon={
            <Icon
              name="check-circle"
              type="material-community"
              size={30}
              color="white"
            />
          }
          onPress={() => {
            this.arrivedSafe();
          }}
        />
        <Button
          buttonStyle={styles.sendAlertButton}
          containerStyle={styles.sendAlertButtonContainer}
          title="Estoy en peligro!"
          onPress={() => {
            this.sendAlert();
          }}
          icon={
            <Icon
              name="alert-outline"
              type="material-community"
              size={30}
              color="white"
            />
          }
        />
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={loading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadingText}>Cargando tu ubicación</Text>
            <ActivityIndicator size="large" color="#00a680" />
          </View>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewButtons: {
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 100
  },
  startTripButtonContainer: {
    height: 100
  },
  startTripButton: {
    backgroundColor: "#00a680"
  },
  finishTripButtonContainer: {
    height: 100
  },
  finishTripButton: {
    backgroundColor: "#00a680"
  },
  sendAlertButtonContainer: {
    height: 100
  },
  sendAlertButton: {
    backgroundColor: "red"
  },
  overlayLoading: {
    padding: 20,
    borderRadius: 10
  },
  overlayLoadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  }
});
