import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-elements";

//Main Screens
import DashboardScreen from "../screens/Dashboard/Dashboard";
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

//Global Routes // BottomTab Navigator

const RootStack = createBottomTabNavigator(
  {
    //BottomTabOptions
    Dashboard: {
      screen: DashboardScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Segure",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="account-multiple-outline"
            type="material-community"
            size={40}
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
