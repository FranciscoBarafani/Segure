import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Linking,
  Text,
  ActivityIndicator
} from "react-native";
import { Button, ButtonGroup, Icon, Overlay } from "react-native-elements";
import t from "tcomb-form-native";
//Forms Import
import OnFootForm from "../../components/Forms/OnFootForm";
import OnBusForm from "../../components/Forms/OnBusForm";
import OnCarForm from "../../components/Forms/OnCarForm";
import OnTaxiForm from "../../components/Forms/OnTaxiForm";

//TODO , add a function that changes formOptions and Struct when Index changes, create a render function f
//for the tcomb form native

const Form = t.form.Form;

export default class StartTripScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      latitude: 0,
      longitude: 0,
      address: "",
      formOptions: null,
      formStruct: null,
      isLoading: true
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  componentDidMount() {
    this.getCurrentLocation();
  }
  //Geolocation
  getCurrentLocation = async () => {
    await navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        isLoading: false
      });
    }),
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAgre: 1000 };
  };
  //Index updating for ButtonGroup component
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }
  //Buttons for index
  onFootButton = () => {
    return (
      <Icon type="material-community" name="walk" size={25} color="grey" />
    );
  };
  onBusButton = () => {
    return <Icon type="material-community" name="bus" size={25} color="grey" />;
  };
  onCarButton = () => {
    return <Icon type="material-community" name="car" size={25} color="grey" />;
  };
  onTaxiButton = () => {
    return (
      <Icon type="material-community" name="taxi" size={25} color="grey" />
    );
  };
  //Form Rendering Function, returns form component based on index selection
  renderForm = () => {
    if (this.state.selectedIndex == 0) {
      return <OnFootForm ref="form" />;
    }
    if (this.state.selectedIndex == 1) {
      return <OnBusForm ref="form" />;
    }
    if (this.state.selectedIndex == 2) {
      return <OnCarForm ref="form" />;
    }
    if (this.state.selectedIndex == 3) {
      return <OnTaxiForm ref="form" />;
    }
  };
  //Sending Message
  sendMessage = () => {
    const mobile = this.props.navigation.state.params.emergencyContact.number;
    const message = this.refs.form.renderMessage(
      this.state.latitude,
      this.state.longitude
    );
    let url = "whatsapp://send?text=" + message + "&phone=" + mobile;
    Linking.openURL(url)
      .then(data => {
        console.log("WhatsApp Abierto");
      })
      .catch(() => {
        alert("Whatsapp no esta instalado en este dispositivo");
      });
  };

  render() {
    const { isLoading } = this.state;
    //Index for ButtonGroup Structure
    const buttons = [
      { element: this.onFootButton },
      { element: this.onBusButton },
      { element: this.onCarButton },
      { element: this.onTaxiButton }
    ];
    const { selectedIndex } = this.state;

    return (
      <ScrollView style={styles.viewBody}>
        <Text style={styles.transportMethodStyleText}>
          Metodo de Transporte
        </Text>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 50 }}
          selectedButtonStyle={styles.buttonGroupSelectedStyle}
        />
        <View style={styles.formStyle}>{this.renderForm()}</View>
        <View style={styles.buttonViewStyle}>
          <Button
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
            title="Comenzar Viaje"
            onPress={() => this.sendMessage()}
          />
        </View>
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={isLoading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadingText}>Cargando Ubicacion</Text>
            <ActivityIndicator size="large" color="#00a680" />
          </View>
        </Overlay>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  formStyle: {
    alignContent: "center",
    padding: 40,
    paddingTop: 20
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
  },
  onFootButtonStyle: {
    backgroundColor: "white"
  },
  buttonGroupSelectedStyle: {
    backgroundColor: "#00a680"
  },
  transportMethodStyleText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10
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
