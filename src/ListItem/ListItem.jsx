import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListItem.module.css';

export default function ListItem({ id, name, number, onRemove }) {
    return (
        <li className={styles.listItem} key={id}>
            {name} : {number}
            <button type="button" className={styles.button} onClick={() => onRemove(id)}>Delete</button>
        </li>
    )
};


ListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};
