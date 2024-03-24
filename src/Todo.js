import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { TodoContext } from "./TodoContext";
import { useContext } from "react";
import { useSnackBarContext } from "./SnackBarContext";

export default function Todo({
  todo,
  valueButtonToogle,
  openDialogSup,
  openDialogMod,
}) {
  const { todosState, setTodosState } = useContext(TodoContext);
  const { openSnack } = useSnackBarContext();

  function openDialogModHandel() {
    openDialogMod(todo);
  }
  function openDialogSupHandel() {
    openDialogSup(todo);
  }

  function handelDejaFait() {
    const newTodo = todosState.map((t) => {
      if (todo.id === t.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodosState(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
    if (todo.isCompleted) openSnack("Bravo Objectif Atteint!");
  }

  return (
    <>
      {/*construitre le blouque des objectif */}
      <Card
        variant="outlinined"
        style={{
          backgroundColor: "gray",
          color: "white",
          width: "100%",
          margin: "5px",
        }}
        className="todo"
      >
        <CardContent>
          <Grid container spacing={0.5} columns={{ xs: 4, md: 12 }}>
            <Grid xs={8}>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  fontFamily: "monospace",
                  textDecoration:
                    todo.isCompleted && valueButtonToogle !== "isComplited"
                      ? "line-through #424242"
                      : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h7"
                gutterBottom
                style={{ fontFamily: "revert-layer" }}
              >
                {todo.detail}
              </Typography>
            </Grid>
            <Grid xs={4}>
              <IconButton
                className="btnEffectTodo"
                aria-label="Done"
                size="small"
                onClick={handelDejaFait}
              >
                <DoneIcon
                  style={{ color: todo.isCompleted ? "black" : "white" }}
                />
              </IconButton>
              <IconButton
                className="btnEffectTodo"
                aria-label="Edit"
                size="small"
                onClick={openDialogModHandel}
              >
                <EditIcon style={{ color: "white" }} />
              </IconButton>
              <IconButton
                className="btnEffectTodo"
                aria-label="Delete"
                size="small"
                onClick={openDialogSupHandel}
              >
                <ClearIcon style={{ color: "white" }} />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/*construitre le blouque des objectif */}
    </>
  );
}
