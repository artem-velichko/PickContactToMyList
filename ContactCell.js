import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import customEventEmitter, {CUSTOM_EVENTS} from './customEvents';

export default class ContactCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateCheckBox: false,
      isDisabled: false,
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

  deselectContact = (id) => {
    const {contact} = this.props;

    if (id === contact.name) {
      this.toggleCheckBox();
    }
  };

  changeCheckboxState = () => {
    this.setState((state) => ({
      ...state,
      stateCheckBox: !this.state.stateCheckBox,
    }));
  };

  toggleCheckBox = () => {
    const {
      addContactToTopList,
      removeContactFromTopList,
      contact,
      contactsTopListLength,
    } = this.props;

    // console.log('contactsTopListLength', contactsTopListLength + 1);

    if (contactsTopListLength + 1 < 7) {
      // console.log('I CHANGE STATE');
      this.changeCheckboxState();
    }

    if (!this.state.stateCheckBox && contactsTopListLength + 1 < 7) {
      // console.log('WORK WHERE IS ADD CONTACT');
      addContactToTopList(contact);
    } else if (this.state.stateCheckBox && contactsTopListLength + 1 === 7) {
      // console.log('WORK WHERE IS REMOVE CONTACT');
      this.changeCheckboxState();
      removeContactFromTopList(contact);
    } else {
      removeContactFromTopList(contact);
    }

    // if (!this.state.stateCheckBox && contactsTopListLength + 1 < 7) {
    //   console.log('WORK WHERE IS ADD CONTACT');
    //   addContactToTopList(contact);
    // } else {
    //   console.log('WORK WHERE IS REMOVE CONTACT');
    //   removeContactFromTopList(contact);
    // }
  };

  _onTap = () => {
    this.toggleCheckBox();
  };

  render() {
    const {contact} = this.props;

    return (
      <TouchableOpacity style={styles.touchableBtn} onPress={this._onTap}>
        <Text>{contact.name}</Text>
        <CheckBox
          disabled={this.state.isDisabled}
          tintColors={{true: '#178FE1'}}
          value={this.state.stateCheckBox}
          onValueChange={this._onTap}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchableBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: 'pink',
    marginVertical: 5,
  },
});
