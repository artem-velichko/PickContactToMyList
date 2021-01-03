import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import customEventEmitter, {CUSTOM_EVENTS} from './customEvents';
import Home from './Home';
import ContactPage from './ContactPage';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressItem = () => {
    customEventEmitter.emit(CUSTOM_EVENTS.REMOVE_SELECTED_CALL_PARTICIPANT);
  };

  render() {
    return (
      <>
        <Home />
        <TouchableOpacity
          style={{
            backgroundColor: 'darkblue',
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
          onPress={this.onPressItem}>
          <Text style={{color: 'white'}}>Click Me</Text>
        </TouchableOpacity>
        <ContactPage />
      </>
    );
  }
}

export default App;
