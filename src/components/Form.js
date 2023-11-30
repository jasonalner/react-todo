import React, { useState } from "react";
import "./Form.css";

function Form(props) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    if (name) {
      e.preventDefault();
      props.addTask(name);
      setName("");
    } else {
      alert("please enter some text");
    }
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="new-todo-input"
        autoComplete="off"
        placeholder="Create a new todo"
        value={name}
        onChange={handleChange}
      />
             

      <button
        type="submit"
        className="btn btn__primary btn__lg"
        visibility="hidden"
      >
        Add
      </button>
    </form>
  );
}

export default Form;
