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
      isLoading: true
    };
  }

  componentDidMount() {
    this.getContacts();
  }
  //Set emergency contact
  setEmergencyContact = newContact => {
    const contact = {
      name: newContact.name,
      number: newContact.phoneNumbers[0].number
    };
    AsyncStorage.setItem("emergencyContact", JSON.stringify(contact));
    this.props.navigation.state.params.renderEmergencyContactInfo();
    this.props.navigation.goBack();
  };

  //This function loads all contacts using Expo Contacts
  getContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.PHONE_NUMBERS]
    });
    this.setState({
      contacts: data,
      isLoading: false
    });
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
    flex: 1,
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
  }
});
