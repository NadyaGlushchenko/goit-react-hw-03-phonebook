import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const uuidv1 = require('uuid/v1');

class App extends Component {
  state = {
    contacts: [
      // { name: 'Rosie Simpson', number: '4591256', id: 'id-1' },
      // { name: 'Hermione Kline', number: '4438912', id: 'id-2' },
      // { name: 'Eden Clements', number: '6451779', id: 'id-3' },
      // { name: 'Annie Copeland', number: '2279126', id: 'id-4' },
    ],
    filter: '',
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');

    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  onSubmit = (name, number) => {
    if (this.state.contacts.some(contact => contact.number === number)) {
      alert(`${name} is already in contacts!`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [
          ...contacts,
          {
            name,
            number,
            id: uuidv1(),
          },
        ],
      }));
    }
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmit} />
        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        <ContactList
          contacts={filter.length === 0 ? contacts : visibleContacts}
          onRemove={this.removeContact}
        />
      </>
    );
  }
}

export default App;
