import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);
  const showNotification = (name, type) => {
    if (type === "update") {
      setMessage(`Number of ${name} updated`);
    } else {
      setMessage(`Added ${name}`);
    }
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  const addContact = (event) => {
    event.preventDefault();
    const isFound = persons.some((person) => person.name === newName);
    if (isFound) {
      const p = persons.find((p) => p.name === newName);
      const changedPerson = { ...p, number: newNumber };

      window.confirm(
        `${p.name} is already added to phonebook, replace the old number with a new one?`
      )
        ? updateContact(p.id, changedPerson)
        : null;
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewNumber("");
        setNewName("");
        showNotification(returnedPerson.name, "create");
      });
    }
  };

  const updateContact = (id, changedPerson) => {
    personService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id !== returnedPerson.id ? p : returnedPerson))
        );
      })
      .catch((error) => {
        setPersons(persons.filter((p) => p.id !== id));
        showNotification(changedPerson.name, "error");
      });
    showNotification(changedPerson.name, "update");
    setNewName("");
    setNewNumber("");
  };
  const deletePerson = (id) => {
    personService.deletePerson(id).then((returnedPerson) => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const searchContact = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredList = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm)
    );
    setFilteredPersons(filteredList);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchContact={searchContact} />
      <h3>Add a new Contact</h3>
      <PersonForm
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
