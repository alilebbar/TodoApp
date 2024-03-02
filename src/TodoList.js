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

export default function TodoList() {
  const { openSnack } = useSnackBarContext();
  const { todosState, setTodosState } = useContext(TodoContext);

  let [inputTitle, setInputTitle] = useState("");
  let [valueButton, setValueButton] = useState("isNotComplited");

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
  const todos = todoChangable.map((todo) => {
    return <Todo todo={todo} key={todo.id} valueButtonToogle={valueButton} />;
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
