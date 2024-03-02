import "./App.css";
import TodoList from "./TodoList";
import { TodoContext } from "./TodoContext";
import { useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { SnackBarProvider } from "./SnackBarContext";

const todoListInfo = [];

const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
    },
  },
});
function App() {
  const [todosState, setTodosState] = useState(todoListInfo);

  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <div className="App">
          <TodoContext.Provider value={{ todosState, setTodosState }}>
            <TodoList />
          </TodoContext.Provider>
        </div>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
