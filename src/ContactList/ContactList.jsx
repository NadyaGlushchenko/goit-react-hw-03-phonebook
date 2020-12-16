import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import ListItem from '../ListItem/ListItem';

export default function ContactList({ contacts, onRemove }) {
    return (
        <ul className={styles.contactList} >
            {contacts.map(contact => (
                <ListItem id={contact.id} name={contact.name} number={contact.number} onRemove={onRemove} />
            ))
            }
        </ul>
    )
};

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
};

