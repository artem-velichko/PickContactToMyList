import React from 'react';
import {View, Text} from 'react-native';
import customEventEmitter, {CUSTOM_EVENTS} from './customEvents';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentWillMount() {
    customEventEmitter.addListener(
      CUSTOM_EVENTS.REMOVE_SELECTED_CALL_PARTICIPANT,
      this.deselectContact,
    );
  }

  componentWillUnmount() {
    customEventEmitter.removeListener(
      CUSTOM_EVENTS.REMOVE_SELECTED_CALL_PARTICIPANT,
      this.deselectContact,
    );
  }

  deselectContact = () => {
    this.setState((state) => ({
      ...state,
      count: this.state.count + 1,
    }));
  };

  render() {
    return (
      <View>
        <Text>HOME</Text>
        <Text>{this.state.count}</Text>
      </View>
    );
  }
}
