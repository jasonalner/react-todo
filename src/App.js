import "./App.css";
import ToDoList from "./components/ToDoList";

import useLocalStorage from "use-local-storage";
import { FaRegMoon, FaSun } from "react-icons/fa";

function App() {
  const DATA = [
    {
      id: "todo-0",
      name: "Complete online JavaScript course",
      completed: true,
    },
    { id: "todo-1", name: "Jog around the park 3x", completed: false },
    { id: "todo-2", name: "10 minutes meditation", completed: false },
    { id: "todo-3", name: "Read for 1 hour", completed: false },
  ];
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App" data-theme={theme}>
      <div className="Container">
        <header>
          <h1>TODO</h1>
          <div className="mode-toggle" onClick={toggleTheme}>
            {theme === "light" ? <FaRegMoon /> : <FaSun />}
          </div>
        </header>

        <ToDoList tasks={DATA} />
      </div>
        <span className="instructions">Drag and drop to reorder list</span>
    </div>
  );
}

export default App;
