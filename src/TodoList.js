import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import Todo from "./Todo";
import Grid from "@mui/material/Unstable_Grid2";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TodoContext } from "./TodoContext";
import { useContext, useEffect, useMemo } from "react";
import topPicture from "./logo/TodoObjectif-logos_white.png";
import { useSnackBarContext } from "./SnackBarContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TodoList() {
  const { openSnack } = useSnackBarContext();
  const { todosState, setTodosState } = useContext(TodoContext);
  const [openDialogSupState, setOpenDialogSupState] = useState(false);
  let [inputTitle, setInputTitle] = useState("");
  let [valueButton, setValueButton] = useState("isNotComplited");
  let [todoIdDelete, setTodoIdDelete] = useState(null);
  let [todoIdUpdate, setTodoIdUpdate] = useState("");
  const [openModifier, setOpenModifier] = useState(false);
  const [inputTodo, setInputTodo] = useState({
    title: "",
    detail: "",
  });

  let todoChangable = todosState;
  let todoIsCompleted = useMemo(() => {
    return todosState.filter((t) => {
      return t.isCompleted;
    });
  }, [todosState]);
  let todoIsNotCopleted = useMemo(() => {
    return todosState.filter((t) => {
      return !t.isCompleted;
    });
  }, [todosState]);
  if (valueButton === "isComplited") {
    todoChangable = todoIsCompleted;
  } else {
    if (valueButton === "isNotComplited") {
      todoChangable = todoIsNotCopleted;
    }
  }

  // handel open dialog suppression

  function openDialogSup(todo) {
    setTodoIdDelete(todo.id);
    setOpenDialogSupState(true);
  }
  function closeDialogSup() {
    setOpenDialogSupState(false);
  }
  function handleDelete() {
    let id = todoIdDelete;
    const newTodo = todosState.filter((t) => id !== t.id);
    setTodosState(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
    openSnack("Suppression Réussie!");
    closeDialogSup();
  }
  // close handel open dialog suppression

  // Open Handel Dialog Modification
  function openDialogMod(todo) {
    setTodoIdUpdate(todo);
    setInputTodo({ title: todo.title, detail: todo.detail });
    setOpenModifier(true);
  }
  function handleCloseModifier() {
    setOpenModifier(false);
  }
  function handelClickModifier() {
    const newTodo = todosState.map((t) => {
      if (t.id === todoIdUpdate.id) {
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
  // Close Handel Dialog Modification
  const todos = todoChangable.map((todo) => {
    return (
      <Todo
        todo={todo}
        key={todo.id}
        valueButtonToogle={valueButton}
        openDialogSup={openDialogSup}
        openDialogMod={openDialogMod}
      />
    );
  });

  function changeButton(e) {
    setValueButton(e.target.value);
  }

  function addTodo() {
    const newTodo = {
      id: uuidv4(),
      title: inputTitle,
      detail: "",
      isCompleted: false,
    };
    const updateTodo = [...todosState, newTodo];
    setTodosState(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
    setInputTitle("");
    openSnack("Objectif ajouté!");
  }

  useEffect(() => {
    const updateTodo = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodosState(updateTodo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/*le popup de suppression */}
      <Dialog
        open={openDialogSupState}
        onClose={closeDialogSup}
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
          <Button onClick={closeDialogSup}>Annuler</Button>
          <Button onClick={handleDelete} autoFocus>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/*le popup de suppression */}
      {/*le popup de Modification */}
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
      {/*le popup de Modification */}

      <img src={topPicture} alt="topPicture" style={{ maxHeight: "15vh" }} />

      <Box>
        <Card
          variant="outlined"
          style={{
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <Container maxWidth="lg">
            <React.Fragment>
              <CardContent>
                <Typography
                  color="text.secondary"
                  variant="h2"
                  gutterBottom
                  style={{
                    textAlign: "center",
                    fontFamily: "fantasy",
                  }}
                >
                  Todo List
                </Typography>
                <Divider light />
                <ToggleButtonGroup
                  variant="text"
                  aria-label="Basic button group"
                  value={valueButton}
                  style={{
                    marginTop: "2px",
                    color: "gray",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "3vh",
                  }}
                  onChange={changeButton}
                >
                  <ToggleButton value="isNotComplited">
                    Encore pas fait
                  </ToggleButton>
                  <ToggleButton value="all" className="toutButton">
                    Tout
                  </ToggleButton>
                  <ToggleButton value="isComplited">Deja fait</ToggleButton>
                </ToggleButtonGroup>
                <Grid2
                  container
                  spacing={1}
                  marginTop={"5px"}
                  marginLeft={"5px"}
                  columns={{ xs: 4, md: 12 }}
                >
                  <Grid xs={8}>
                    <TextField
                      value={inputTitle}
                      id="outlined-basic"
                      label="Tache"
                      variant="outlined"
                      style={{ width: "40vh" }}
                      onChange={(e) => {
                        setInputTitle(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid xs={4}>
                    <Button
                      variant="outlined"
                      style={{
                        width: "20vh",
                        height: "8.5vh",
                        border: "#808080 0.5px solid",
                      }}
                      color="primary"
                      disabled={inputTitle.length === 0 ? true : false}
                      onClick={addTodo}
                    >
                      Ajouter
                    </Button>
                  </Grid>
                </Grid2>
                {todos}
              </CardContent>
            </React.Fragment>
          </Container>
        </Card>
      </Box>
      <div style={{ color: "white", fontFamily: "monospace" }}>
        TodoObjectif
      </div>
    </>
  );
}
