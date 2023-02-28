import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import contactsData from "./contacts.json";
import { v4 as uuid } from 'uuid'


function App() {
    const [contacts, setContacts] = useState(contactsData.slice(0, 6));
    const remainingContacts = contactsData.slice(6)
  
    function addRandomContact() {
      const contactIndex = Math.floor(Math.random() * remainingContacts.length);
      const newContactList = remainingContacts[contactIndex];
      newContactList.id = uuid();
      setContacts((prevContacts) => [...prevContacts, newContactList]);
    }

    function sortContactName() {
      const sortedContact = [...contacts];
      sortedContact.sort((a, b) => a.name.localeCompare(b.name));
      setContacts(sortedContact);
    }

    function sortContactPopularity() {
      const sortedPopContact = [...contacts];
      sortedPopContact.sort((a, b) => b.popularity - a.popularity);
      setContacts(sortedPopContact);
    }
  
    function contactDelete(id) {
      const newList = contacts.filter((contacts) => contacts.id !== id)
      setContacts(newList);
    }

  return <div className="App">
    <button onClick = {addRandomContact}>Add contact</button>
    <button onClick = {sortContactName}>Sort by name</button>
    <button onClick = {sortContactPopularity}>Sort by popularity</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contacts) => (
          <tr key={contacts.id}>
            <td><img src={contacts.pictureUrl} alt={contacts.name} /></td>
            <td>{contacts.name}</td>
            <td>{contacts.popularity}</td>
            <td>{contacts.wonOscar ? <span>&#x1F3C6;</span> : null}</td>
            <td>{contacts.wonEmmy ? <span>&#x1F3C6;</span> : null}</td>
            <td>
            <button onClick= {() => contactDelete(contacts.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

}

export default App;
