import { v4 as uuidv4 } from "uuid";
export default function todoReducer(currentResult, action) {
  switch (action.type) {
    case "add": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        detail: "",
        isCompleted: false,
      };
      const updateTodo = [...currentResult, newTodo];
      localStorage.setItem("todos", JSON.stringify(updateTodo));
      return updateTodo;
    }

    case "supp": {
      let id = action.payload.id;
      const newTodo = currentResult.filter((t) => id !== t.id);
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    }
    case "upd": {
      const newTodo = currentResult.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            detail: action.payload.detail,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    }

    case "val": {
      const newTodo = currentResult.map((t) => {
        if (action.payload.id === t.id) {
          const updateTodo = {
            ...t,
            isCompleted: !t.isCompleted,
          };
          return updateTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    }

    case "get": {
      const updateTodo = JSON.parse(localStorage.getItem("todos")) ?? [];
      return updateTodo;
    }

    default:
      throw Error("Action Type Introuvable" + action.type);
  }
}
