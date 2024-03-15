const Persons = ({ filteredPersons, deletePerson }) => {
  const confirmDeletePerson = (name, id) =>
    window.confirm(`Delete ${name}?`) ? deletePerson(id) : null;

  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} <b>{person.number}</b>
          <button onClick={() => confirmDeletePerson(person.name, person.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
