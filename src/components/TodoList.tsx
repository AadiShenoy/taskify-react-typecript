import React from "react";
import { Todo } from "../models/model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

const TodoList = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}: props) => {
  const handleDone = (id: number) => {
    let tempTodo = todos.filter((todo) => todo.id === id);
    let tempCompletedTodo = CompletedTodos.filter((todo) => todo.id === id);

    if (tempCompletedTodo.length !== 0) {
      setCompletedTodos(CompletedTodos.filter((todo) => todo.id !== id));
      setTodos([...todos, tempCompletedTodo[0]]);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
      setCompletedTodos([...CompletedTodos, tempTodo[0]]);
    }
  };

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
                handleDone={handleDone}
                completed={false}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
                handleDone={handleDone}
                completed={true}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
