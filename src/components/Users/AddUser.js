import React, { useState } from "react";
import Button from "../Ui/Button";
import Card from "../Ui/Card";
import ErrorModal from "../Ui/ErrorModal";
import classes from "./AddUser.module.css";

export default function AddUser(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredUserage, setEnteredUserage] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (
      enteredUsername.trim().length === 0 ||
      enteredUserage.trim().length === 0
    ) {
      setError({
        title: "Invalid Input",
        message: "Please enter valid name and age",
      });
      return;
    }
    if (+enteredUserage < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter valid age (>0)",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredUserage);
    setEnteredUsername("");
    setEnteredUserage("");
  };

  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  };

  const userAgeChangeHandler = (e) => {
    setEnteredUserage(e.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            onChange={userAgeChangeHandler}
            value={enteredUserage}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}
