import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text
} from "react-native";
import { ListItem, Icon, Overlay } from "react-native-elements";
import * as Contacts from "expo-contacts";

export default class SetContactScreen extends Component {
  constructor() {
    super();
    this.state = {
      contacts: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.getContacts();
  }
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
