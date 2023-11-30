import React, { useState } from "react";
import { nanoid } from "nanoid";
import { motion } from 'framer-motion';



import "./ToDoList.css";
import ToDo from "./ToDo";
import Form from "./Form";
import FilterButton from "./FilterButton";
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function ToDoList(props) {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(props.tasks);

  // New function for handling drag-and-drop
  function reorderTasks(droppedItemId, targetItemId) {
    const updatedTasks = [...tasks];
    const droppedIndex = tasks.findIndex((task) => task.id === droppedItemId);
    const targetIndex = tasks.findIndex((task) => task.id === targetItemId);

    // Swap the positions of the dragged and dropped tasks
    [updatedTasks[droppedIndex], updatedTasks[targetIndex]] = [
      updatedTasks[targetIndex],
      updatedTasks[droppedIndex],
    ];

    setTasks(updatedTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  
  }

  function clearCompleted() {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <ToDo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        reorderTasks={reorderTasks} // Pass the new function to ToDo component
  
        />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  const tasksNoun = taskList.length !== 1 ? "items" : "item";
  const headingText = `${taskList.length} ${tasksNoun} left`;

  return (
    <div className="todo-list">
      <Form addTask={addTask} />
      <ul className="todo-list-items">{taskList}</ul>
      <div className="form-controls">
        <h2 class="list-heading">{headingText}</h2>
        <div className="filter-list">{filterList}</div>
        <button className="btn" onClick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  );
}

export default ToDoList;
