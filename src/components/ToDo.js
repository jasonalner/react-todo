import React from "react";

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
      <input 
        id={props.id}
        className="todo-checkbox"
        type="checkbox"
        defaultChecked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
      />
      <label
        className="todo-label"
        htmlFor={props.id}
        style={{ textDecoration: props.completed ? "line-through" : "none" }}
      >
        {props.name}
      </label>
    </li>
  );
}

export default ToDo;
