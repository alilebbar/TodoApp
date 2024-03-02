import { v4 as uuidv4 } from "uuid";
export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        detail: "",
        isCompleted: false,
      };
      const updateTodo = [...currentTodos, newTodo];

      localStorage.setItem("todos", JSON.stringify(updateTodo));
      return updateTodo;
    }
    case "verified": {
      const newTodo = currentTodos.map((t) => {
        if (action.payload.id === t.id) {
          t.isCompleted = !t.isCompleted;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    }

    case "reload": {
      const updateTodo = JSON.parse(localStorage.getItem("todos")) ?? [];
      return updateTodo;
    }
    default: {
      throw new Error("Action inatrouvable" + action.type);
    }
  }
}
