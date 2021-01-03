import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ContactCell from './ContactCell';
import customEventEmitter, {CUSTOM_EVENTS} from './customEvents';

const contacts = [
  {name: 'Artem'},
  {name: 'Lyubow'},
  {name: 'Alex'},
  {name: 'Serg'},
  {name: 'Rooney'},
  {name: 'Robin'},
  {name: 'Nick'},
  {name: 'Vivi'},
  {name: 'Robert'},
  {name: 'Dooley'},
];

export default class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactsTopList: [],
    };
  }

  addContactToTopList = (newContact) => {
    if (this.state.contactsTopList.length + 1 < 7) {
      this.setState((state) => ({
        ...state,
        contactsTopList: [...this.state.contactsTopList, newContact],
      }));

      console.log('LENGTH OF TOP LIST', this.state.contactsTopList.length + 1);
    }
  };

  removeContactFromTopList = (contact) => {
    const updatedContactsTopList = this.state.contactsTopList.filter(
      (item) => item.name !== contact.name,
    );

    this.setState((state) => ({
      ...state,
      contactsTopList: updatedContactsTopList,
    }));
  };

  onTapOnCloseBtn = (id) => {
    customEventEmitter.emit(CUSTOM_EVENTS.REMOVE_SELECTED_CALL_PARTICIPANT, id);
  };

  _renderItem = ({item}) => {
    return (
      <ContactCell
        contact={item}
        contactsTopListLength={this.state.contactsTopList.length}
        addContactToTopList={this.addContactToTopList}
        removeContactFromTopList={this.removeContactFromTopList}
      />
    );
  };

  render() {
    return (
      <View style={styles.flex}>
        <ScrollView horizontal style={styles.horizontalScrollContainer}>
          {this.state.contactsTopList.map((contact) => {
            return (
              <View style={styles.contactContainer}>
                <View style={styles.contactAva} />
                <View style={styles.contactNameContainer}>
                  <Text>{contact?.name}</Text>
                </View>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => this.onTapOnCloseBtn(contact.name)}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <FlatList
          data={contacts}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'green',
  },
  horizontalScrollContainer: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  contactContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'orange',
  },
  contactAva: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'darkred',
  },
  contactNameContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
  },
  closeBtn: {
    position: 'absolute',
    left: 35,
    top: 50,
    backgroundColor: 'pink',
  },
});
