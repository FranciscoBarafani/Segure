import React, { Component } from "react";
import t from "tcomb-form-native";

const Form = t.form.Form;

export default class OnCarForm extends Component {
  constructor() {
    super();
  }
  renderMessage = (latitude, longitude) => {
    const value = this.refs.form.getValue();
    if (!value.knowArrival) {
      const message =
        "Hola!Comienzo mi camino hacia " +
        `${value.address}` +
        " voy en el auto con la patente " +
        `${value.licensePlate} ` +
        ", probablemente llegue a las: " +
        `${value.arrivalTime.getHours()}:` +
        `${value.arrivalTime.getMinutes()}` +
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
        " voy en el auto con la patente " +
        `${value.licensePlate} ` +
        ", no se a que hora llegaré y" +
        " mi ubacion actual es " +
        "http://maps.google.com/maps?saddr=" +
        latitude +
        "," +
        longitude;
      return message;
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
          error: "Ingresa una direccion"
        },
        licensePlate: {
          placeholder: "Patente",
          label: "Cual es la patente del vehiculo?",
          error: "Ingresa una patente"
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
