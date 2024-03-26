import { createContext, useReducer, useContext } from "react";
import todoReducer from "./reducer/todoReducer";

const TodoContext = createContext([]);
const TodoProvider = ({ children }) => {
  const [todosState, dispatch] = useReducer(todoReducer, []);
  return (
    <TodoContext.Provider
      value={{ todosState: todosState, dispatch: dispatch }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoReducer = () => {
  return useContext(TodoContext);
};

export default TodoProvider;
