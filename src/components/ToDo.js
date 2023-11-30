import React from "react";
import "./ToDo.css";
import { IoIosClose } from "react-icons/io";

function ToDo(props) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", props.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData("text/plain");
    props.reorderTasks(droppedItemId, props.id);
  };

  return (
    <li
      className="list-item"
      drag="y"
      draggable="true"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {" "}
      <label
        className="todo-label"
        htmlFor={props.id}
        style={{ textDecoration: props.completed ? "line-through" : "none" }}
      >
        <div>
          <input
            id={props.id}
            className="todo-checkbox"
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <span className="checkmark"></span>
          {props.name}
        </div>

        <IoIosClose
          type="button"
          className="btn delete-btn"
          onClick={() => props.deleteTask(props.id)}
        />
      </label>
    </li>
  );
}

export default ToDo;
