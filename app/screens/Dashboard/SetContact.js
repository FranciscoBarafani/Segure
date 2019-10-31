import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Alert,
  AsyncStorage
} from "react-native";
import { ListItem, Icon, Overlay } from "react-native-elements";
import * as Contacts from "expo-contacts";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class SetContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
      isLoading: true,
      chosenContact: null
    };
  }
  componentDidMount() {
    this.getContacts();
    this.getChosenContact();
  }
  //This functions sets the new emergency contact
  setEmergencyContact = newContact => {
    try {
      const contact = {
        name: newContact.name,
        number: newContact.phoneNumbers[0].number
      };
      AsyncStorage.setItem("emergencyContact", JSON.stringify(contact));
      //The function belows starts the renderEmergencyContactInfo function that is on
      //Dashboard component, this one is brought through parameters when using navigation.
      this.props.navigation.state.params.renderEmergencyContactInfo();
      this.props.navigation.goBack();
    } catch {
      alert("Error al seleccionar contacto, por favor seleccione otro");
    }
  };
  //This functions renders the chosen contact information to let the user know which one is already picked
  renderChosenContactInfo = () => {
    if (this.state.chosenContact) {
      return (
        <View>
          <Text style={styles.chosenContactText}>Contacto Elegido</Text>
          <Text style={styles.chosenContactInfo}>
            {this.state.chosenContact.name}
          </Text>
          <Text style={styles.chosenContactInfo}>
            {this.state.chosenContact.number}
          </Text>
        </View>
      );
    } else {
      return <Text>Cargando contacto</Text>;
    }
  };
  //This functions get the chosen contact and loads it into the component's state
  getChosenContact = async () => {
    var chosenContact = await AsyncStorage.getItem("emergencyContact");
    var chosenContactInfo = JSON.parse(chosenContact);
    this.setState({
      chosenContact: chosenContactInfo
    });
  };
  //This function loads all contacts using Expo Contacts
  getContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.PHONE_NUMBERS],
        sort: Contacts.Fields.LastName
      });
      this.setState({
        contacts: data,
        isLoading: false
      });
    } catch {
      alert("Error al obtener contactos");
    }
  };
  //This functions renders the contacts list
  renderListItem = contacts => {
    if (!this.state.isLoading) {
      return contacts.map((d, i) => (
        <TouchableOpacity
          key={i}
          onPress={() =>
            Alert.alert(
              "Elegir Contacto",
              "Quieres elegir a " + d.name + " como tu contacto de emergencia?",
              [
                {
                  text: "Cancelar",
                  style: "cancel"
                },
                { text: "Si", onPress: () => this.setEmergencyContact(d) }
              ]
            )
          }
        >
          <ListItem
            key={i}
            title={d.name}
            leftIcon={
              <Icon
                type="material-community"
                name="account-circle"
                size={40}
                color="#00a680"
              />
            }
            bottomDivider
          />
        </TouchableOpacity>
      ));
    }
  };

  render() {
    const { contacts, isLoading } = this.state;
    return (
      <ScrollView style={styles.viewBody}>
        {this.renderChosenContactInfo()}
        {this.renderListItem(contacts)}
        <Overlay
          overlayStyle={styles.overlayLoading}
          isVisible={isLoading}
          width="auto"
          height="auto"
        >
          <View>
            <Text style={styles.overlayLoadingText}>Cargando Contactos</Text>
            <ActivityIndicator size="large" color="#00a680" />
          </View>
        </Overlay>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    margin: 20
  },
  overlayLoading: {
    padding: 20,
    borderRadius: 10
  },
  overlayLoadingText: {
    color: "#00a680",
    marginBottom: 20,
    fontSize: 20
  },
  chosenContactText: {
    fontWeight: "bold",
    fontSize: 18
  },
  chosenContactInfo: {
    fontSize: 16
  }
});
