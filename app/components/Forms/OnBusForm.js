import React, { Component } from "react";
import t from "tcomb-form-native";

const Form = t.form.Form;

export default class OnBusForm extends Component {
  constructor() {
    super();
  }
  renderMessage = (latitude, longitude) => {
    const value = this.refs.form.getValue();
    if (!value.knowArrival) {
      const message =
        "Hola!Comienzo mi camino hacia " +
        `${value.address}` +
        " voy a tomar el omnibus " +
        `${value.busLine} ` +
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
        " voy a tomar el omnibus " +
        `${value.busLine} ` +
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
      busLine: t.String,
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
        busLine: {
          placeholder: "Linea de Omnibus",
          label: "Que linea tomas?",
          error: "Ingresa un numero de linea",
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
          label: "No se a que hora llego",
          error: "Si no sabes a que hora llegas debes seleccionar esta opción"
        }
      }
    };
    return <Form ref="form" type={TripFormStruct} options={TripFormOptions} />;
  }
}
