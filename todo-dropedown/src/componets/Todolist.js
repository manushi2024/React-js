import React, { useState } from "react";
import "../todolist.css";
import { v4 as uuidV4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";

import Toggle from "react-toggle";
import "react-toggle/style.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Todolist() {
  const [value, setvalue] = useState("");
  const [todo, settodo] = useState([
   {id:uuidV4(),name:"manushi"},{id:uuidV4(),name:"dipen"}
  ]);
  const [editid, seteditid] = useState(null);
  //const[editmod,seteditmod]=useState(false)
  // const [checked,setchecked]=useState(defaultChecked)

  const adddata = () => {
    if (editid !== null) {
      const updatedTodos = todo.map((item) => {
        if (item.id === editid) {
          return { id: item.id, name: value };
        }
        return item;
      });

      settodo(updatedTodos);
      setvalue("");
      seteditid(null);
    } else {
      settodo([...todo, { id: uuidV4(), name: value }]);
      setvalue("");
      //seteditmod(false)
    }
  };

  const deleteTask = (id) => {
    const filterTodos = todo.filter((item) => {
      return item.id !== id;
    });

    settodo(filterTodos);
  };

  const editTask = (id) => {
    const edititem = todo.find((item) => {
      return item.id === id;
    });

    setvalue(edititem.name);
    seteditid(id);
  };
  const deleteall = () => {
    settodo([]);
  };
  const toggleTaskStatus = (id) => {
    const updatedToDo = todo.map((item) => {
      if (item.id === id) {
        const isCompleted = !item.isCompleted;

        if (isCompleted) {
          alert(`Task "${item.name}" marked as complete.`);
        } else {
          alert(`Task "${item.name}" marked as incomplete.`);
        }

        return {
          ...item,
          isCompleted: [
            { ...todo, id: uuidV4(), name: value, isCompleted: true },
          ],
        };
      }

      return item;
    });

    settodo(updatedToDo);
    console.log(updatedToDo);
  };
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(todo);
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log(reorderedItem);
    items.splice(result.destination.index, 0, reorderedItem);

    settodo(items);
  }

  return (
    <>
      <div className="body">
        <div className="container ">
          <br />
          <br />
          <h2>To Do List App </h2>
          <br />
          <br />
          <div className="row button-with-textbox">
            <div className="col">
              <input
                value={value}
                onChange={(e) => {
                  setvalue(e.target.value);
                }}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto flex">
              <button onClick={adddata} className="btn btn-dark btn-add">
                {editid ? "Edit" : "Add"}
              </button>
            </div>
          </div>

          <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <div
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {todo.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={item.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="col taskBg">
                              <div>
                                <span className="taskText">{item.name}</span>
                              </div>
                              <div className="iconsWrap">
                                <span
                                  title="Edit"
                                  defaultChecked={item.id}
                                  onChange={() => toggleTaskStatus(item.id)}
                                >
                                  <Toggle />
                                </span>
                                <span
                                  title="Edit"
                                  onClick={() => {
                                    editTask(item.id);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </span>
                                <span
                                  title="Delete"
                                  onClick={() => deleteTask(item.id)}
                                >
                                  <FontAwesomeIcon
                                    className="delete"
                                    icon={faTrashCan}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <button
          
            className="btn btn-dark adds"
            style={{ marginLeft: "250px" }}
          >
            save
          </button>
        </div>
      </div>
    </>
  );
}

export default Todolist;
