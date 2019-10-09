import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-elements";

//Main Screens
import DashboardScreen from "../screens/Dashboard/Dashboard";
import MyAccountScreen from "../screens/MyAccount/MyAccount";
//Secondary Screens
import StartTripScreen from "../screens/Dashboard/StartTrip";
import SetContactScreen from "../screens/Dashboard/SetContact";

//Routes inside each screen
const DashboardScreenStack = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: ({ navigation }) => ({ title: "Tablero" })
  },
  StartTrip: {
    screen: StartTripScreen,
    navigationOptions: ({ navigation }) => ({ title: "Comenzar Viaje" })
  },
  SetContact: {
    screen: SetContactScreen,
    navigationOptions: ({ navigation }) => ({ title: "Elegir Contacto" })
  }
});
const MyAccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: ({ navigation }) => ({ title: "Mi Cuenta" })
  }
});

//Global Routes // BottomTab Navigator

const RootStack = createBottomTabNavigator(
  {
    //BottomTabOptions
    Dashboard: {
      screen: DashboardScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Tablero",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="home-variant-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    MyAccount: {
      screen: MyAccountScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Mi Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="account-circle-outline"
            type="material-community"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  }, //Tab Configuration
  {
    initialRouteName: "Dashboard",
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

//Exporting
export default createAppContainer(RootStack);
