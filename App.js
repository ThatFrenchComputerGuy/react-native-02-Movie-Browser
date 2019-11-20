import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MovieSelector from './components/MovieSelector';
import DetailsScreen from "./components/DetailsScreen";

const RootStack = createStackNavigator(
    {
      Home: MovieSelector,
      Details: DetailsScreen,
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
