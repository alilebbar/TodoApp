import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { TodoContext } from "./TodoContext";
import { useContext, useState } from "react";
import { useSnackBarContext } from "./SnackBarContext";

export default function PopupSuppression({ id, setopenTodo }) {
  const [open, setOpen] = useState(true);
  const { todosState, setTodosState } = useContext(TodoContext);
  const { openSnack } = useSnackBarContext();
  function handleClose() {
    setOpen(false);
    setopenTodo();
  }
  function handleDelete() {
    const newTodo = todosState.filter((t) => id !== t.id);
    setTodosState(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
    openSnack("Suppression Réussie!");
    setopenTodo(false);
  }
  return (
    <>
      {/*le popup de suppression */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation suppression"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez vous vraimment supprimer ce Objectif ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleDelete} autoFocus>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/*le popup de suppression */}
    </>
  );
}
