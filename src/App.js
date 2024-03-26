import "./App.css";
import TodoList from "./TodoList";

import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { SnackBarProvider } from "./SnackBarContext";
import TodoProvider from "./TodoContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodoProvider>
        <SnackBarProvider>
          <div className="App">
            <TodoList />
          </div>
        </SnackBarProvider>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
