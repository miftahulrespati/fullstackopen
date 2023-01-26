import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonList from "./components/Person";
import api from "./services/personService";

const App = () => {
  useEffect(() => {
    api
      .getAll()
      .then((res) => {
        setPersons(res);
      })
      .catch((err) =>
        setNotification({
          message: `Failed to fetch data: ${err}`,
          type: "success",
        })
      );
  }, []);

  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState();

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addPersonHandler = (e) => {
    e.preventDefault();

    if (newName === "" || newNumber === "") {
      setNotification({
        message: "Please insert name and number",
        type: "success",
      });
      return;
    }

    const findPerson = persons.find((p) => p.name === newName);
    if (findPerson) {
      if (
        !window.confirm(
          `${findPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      )
        return;

      api
        .update(findPerson.id, {
          name: findPerson.name,
          number: newNumber,
        })
        .then((res) => {
          const addPerson = [
            ...persons.filter((p) => p.id !== findPerson.id),
            res,
          ];
          setPersons(addPerson);
          setNotification({
            message: `Added ${findPerson.name}`,
            type: "success",
          });
        })
        .catch((err) =>
          setNotification({
            message: `Failed to update ${findPerson.name}: ${err}`,
            type: "success",
          })
        )
        .finally(() => {
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });

      return;
    }

    api
      .create({
        name: newName,
        number: newNumber,
      })
      .then((res) => {
        const addPerson = [...persons, res];
        setPersons(addPerson);
        setNotification({
          message: `Added ${newName}`,
          type: "success",
        });
      })
      .catch((err) =>
        setNotification({
          message: `Failed to create new contact: ${err}`,
          type: "success",
        })
      )
      .finally(() => {
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const deletePersonHandler = (e) => {
    const id = parseInt(e.target.id);
    const name = persons.find((p) => p.id === id)?.name;
    if (!window.confirm(`Are you sure want to delete ${name}?`)) return;

    api
      .remove(id)
      .then(() => {
        setNotification({
          message: `${name} successfully deleted`,
          type: "error",
        });
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setNotification({
            message: `Information of ${name} has already been removed from server`,
            type: "error",
          });
          return;
        }
        setNotification({
          message: `Failed to delete contact: ${err}`,
          type: "error",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });

    const deletePerson = persons.filter((p) => p.id !== id);
    setPersons(deletePerson);
  };

  const newNameHandler = (e) => setNewName(e.target.value);
  const newNumberHandler = (e) => setNewNumber(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification notification={notification} />}
      <Filter filter={filter} setFilter={setFilter} />
      <Form
        addPersonHandler={addPersonHandler}
        newNameHandler={newNameHandler}
        newNumberHandler={newNumberHandler}
      />
      <PersonList
        persons={filteredPersons}
        deletePersonHandler={deletePersonHandler}
      />
    </div>
  );
};

export default App;
