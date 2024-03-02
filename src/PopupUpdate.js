import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";
import { useSnackBarContext } from "./SnackBarContext";
export default function PopupUpdate({ todo, setopenTodoM }) {
  const { openSnack } = useSnackBarContext();
  const { todosState, setTodosState } = useContext(TodoContext);
  const [openModifier, setOpenModifier] = useState(true);
  const [inputTodo, setInputTodo] = useState({
    title: todo.title,
    detail: todo.detail,
  });
  function handelClickModifier() {
    const newTodo = todosState.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: inputTodo.title,
          detail: inputTodo.detail,
        };
      } else {
        return t;
      }
    });
    setTodosState(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
    openSnack("Modification Réussi!");
    handleCloseModifier();
  }
  function handleCloseModifier() {
    setOpenModifier(false);
    setopenTodoM(false);
  }

  return (
    <>
      <Dialog open={openModifier} onClose={handleCloseModifier}>
        <DialogTitle>Modifier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            value={inputTodo.title}
            margin="dense"
            name="Title"
            type="Text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setInputTodo({ ...inputTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            placeholder="Introduire des detailles "
            value={inputTodo.detail}
            margin="dense"
            name="Detail"
            type="Text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setInputTodo({ ...inputTodo, detail: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModifier}>Annuler</Button>
          <Button onClick={handelClickModifier}>Modifier</Button>
        </DialogActions>
      </Dialog>
      ;
    </>
  );
}
