import React, { Component } from "react";
import t from "tcomb-form-native";

const Form = t.form.Form;

export default class OnTaxiForm extends Component {
  constructor() {
    super();
  }
  renderMessage = (latitude, longitude) => {
    const value = this.refs.form.getValue();
    try {
      if (!value.knowArrival) {
        const message =
          "Hola!Comienzo mi camino hacia " +
          `${value.address}` +
          " voy a el taxi con la patente " +
          `${value.licensePlate} ` +
          ", probablemente llegue a las: " +
          `${value.arrival.getHours()}:` +
          `${value.arrival.getMinutes()}` +
          " y mi ubacion actual es " +
          "http://maps.google.com/maps?saddr=" +
          latitude +
          "," +
          longitude;
        return message;
      } else {
        const message =
          "Hola!Comienzo mi camino hacia " +
          `${value.address}` +
          " voy a tomar el taxi con la patente " +
          `${value.licensePlate} ` +
          ", no se a que hora llegaré y" +
          " mi ubacion actual es " +
          "http://maps.google.com/maps?saddr=" +
          latitude +
          "," +
          longitude;
        return message;
      }
    } catch {
      console.log("Error");
    }
  };
  render() {
    //Form Structure
    const TripFormStruct = t.struct({
      address: t.String,
      licensePlate: t.String,
      arrival: t.maybe(t.Date),
      knowArrival: t.Boolean
    });
    //Form Options
    const TripFormOptions = {
      fields: {
        address: {
          placeholder: "Direccion",
          label: "A donde vas?",
          error: "Ingresa una direccion",
          maxLength: 50
        },
        licensePlate: {
          placeholder: "Patente",
          label: "Cual es la patente especial del vehiculo?",
          error: "Ingresa una patente",
          maxLength: 8
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
    return <Form ref="form" type={TripFormStruct} options={TripFormOptions} />;
  }
}
