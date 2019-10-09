import React, { Component } from "react";
import { StyleSheet, View, Text, Share, Linking } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import t from "tcomb-form-native";

const Form = t.form.Form;

export default class StartTripScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      address: ""
    };
  }

  componentDidMount() {
    this.getCurrentLocation();
  }
  //Message Rendering
  renderMessage = (address, arrivalTime, knowArrival) => {
    if (!knowArrival) {
      const message =
        "Hola!Comienzo mi camino hacia " +
        `${address}` +
        ", probablemente llegue a las: " +
        `${arrivalTime.getHours()}:` +
        `${arrivalTime.getMinutes()}` +
        " y mi ubacion actual es " +
        "http://maps.google.com/maps?saddr=" +
        this.state.latitude +
        "," +
        this.state.longitude;
      return message;
    } else {
      const message =
        "Hola!Comienzo mi camino hacia " +
        `${address}` +
        ", no se a que hora llegaré y" +
        " mi ubacion actual es " +
        "http://maps.google.com/maps?saddr=" +
        this.state.latitude +
        "," +
        this.state.longitude;
      return message;
    }
  };
  //Sending Message
  sendMessage = value => {
    if (value) {
      const mobile = 5493516133529;
      const message = this.renderMessage(
        value.address,
        value.arrival,
        value.knowArrival
      );
      let url = "whatsapp://send?text=" + message + "&phone=" + mobile;
      Linking.openURL(url)
        .then(data => {
          console.log("WhatsApp Abierto");
        })
        .catch(() => {
          alert("Whatsapp no esta instalado en este dispositivo");
        });
    }
  };
  //Geolocation
  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }),
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAgre: 1000 };
  };

  render() {
    //Form Structure
    const TripFormStruct = t.struct({
      address: t.String,
      arrival: t.maybe(t.Date),
      knowArrival: t.Boolean
    });
    //Form Options
    const TripFormOptions = {
      fields: {
        address: {
          placeholder: "Direccion",
          label: "A donde vas?",
          error: "Ingresa una direccion"
        },
        arrival: {
          placeholder: "Hora de llegada",
          label: "A que hora llegas?",
          minuteInterval: 10,
          mode: "time",
          error:
            "Debes ingresar un horario o tildar la opcion si no sabes tu demora"
        },
        knowArrival: {
          label: "No se a que hora llego"
        }
      }
    };

    return (
      <View style={styles.viewBody}>
        <View style={styles.formStyle}>
          <Form ref="form" type={TripFormStruct} options={TripFormOptions} />
        </View>
        <View style={styles.buttonViewStyle}>
          <Button
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
            title="Comenzar Viaje"
            onPress={() => this.sendMessage(this.refs.form.getValue())}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  formStyle: {
    alignContent: "center",
    padding: 40
  },
  buttonStyle: {
    backgroundColor: "#00a680"
  },
  buttonContainerStyle: {
    height: 100
  },
  buttonViewStyle: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40
  },
  viewTimePicker: {
    marginLeft: 40,
    marginRight: 40
  },
  delayText: {
    fontWeight: "bold",
    fontSize: 20
  }
});
