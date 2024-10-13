// ... (your existing imports)

function App() {
    // ... (your existing state variables)
  
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
  
    // ... (your existing functions)
  
    const openDeleteConfirmation = (postId) => {
      setPostToDelete(postId);
      setShowDeleteConfirmation(true);
    };
  
    const closeDeleteConfirmation = () => {
      setPostToDelete(null);
      setShowDeleteConfirmation(false);
    };
  
    const confirmDeleteTask = () => {
      if (postToDelete) {
        deleteTask(postToDelete);
        closeDeleteConfirmation();
      }
    };
  
    // ... (your existing JSX)
  
    return (
      <>
        {/* ... (your existing JSX) */}
  
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided, snapshot) => (
              <div
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  padding: 8,
                  width: 400,
                  minHeight: 300,
                }}
              >
                {data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid black",
                          margin: "4px",
                          borderRadius: "2px",
                          height: "30px",
                          width: "400px",
                          marginLeft: "30px",
                        }}
                      >
                        <div>
                          <span>{item.post}</span>
                        </div>
                        <div>
                          <span title="Delete" style={{ marginLeft: "320px" }}>
                            <FontAwesomeIcon
                              className="delete"
                              icon={faTrashCan}
                              onClick={() => openDeleteConfirmation(item.id)}
                            />
                          </span>
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
  
        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteConfirmation} onHide={closeDeleteConfirmation}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this post?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteConfirmation}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDeleteTask}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
  
        {/* ... (your existing JSX) */}
      </>
    );
  }
  
  export default App;
  







import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidV4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [val, setVal] = useState([]);
  const [isIconDisabled, setIsIconDisabled] = useState(false);
  const [savebtn, setSaveBtn] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  //const [tempData, setTempData] = useState([]);
  const [isOrderChanged, setIsOrderChanged] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    setVal([...val, {}]);
    setIsIconDisabled(true);
  };

  const openModal = () => {
    setShowModal(true);
    setData([...data]);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsIconDisabled(false);
    setIsOrderChanged(false);
    setSaveBtn(true);
  };

  const addPost = () => {
    setData([...data, { id: uuidV4(), post: value }]);
    setValue("");
  };

  const deleteTask = (id) => {
    const filterData = data.filter((item) => {
      return item.id !== id;
    });

    setData(filterData);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
    setIsOrderChanged(true);
  }

  const handleSave = () => {
    if (isOrderChanged) {
      setData([...data]);
      console.log("Order changed, save order:", data);
      // Add your logic to save the order
    } else {
      console.log("Order not changed");
    }

    // Reset state variables
    setIsOrderChanged(false);
    setSaveBtn(true);
    setData([]);
    closeModal();
  };

  const cancelTask = () => {
    setIsIconDisabled(false);
    setIsOrderChanged(false);
    setSaveBtn(true);
    setData([...data]);
    closeModal();
  };

  return (
    <>
      <div>
        <Button variant="secondary" onClick={openModal} style={{ marginLeft: "620px" }}>
          Edit Post
        </Button>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided, snapshot) => (
                  <div
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      padding: 8,
                      width: 400,
                      minHeight: 300,
                    }}
                  >
                    {data.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid black",
                              margin: "4px",
                              borderRadius: "2px",
                              height: "30px",
                              width: "400px",
                              marginLeft: "30px",
                            }}
                          >
                            <div>
                              <span>{item.post}</span>
                            </div>
                            <div>
                              <span title="Delete" style={{ marginLeft: "320px" }}>
                                <FontAwesomeIcon
                                  className="delete"
                                  icon={faTrashCan}
                                  onClick={() => deleteTask(item.id)}
                                />
                              </span>
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

            {isIconDisabled && (
              <div className="main-div">
                <input
                  type="text"
                  placeholder="enter post"
                  name="value"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <button type="button" className="btn btn-success" onClick={addPost}>
                  Add
                </button>
                <button type="button" className="btn btn-danger" onClick={cancelTask}>
                  Cancel
                </button>
              </div>
            )}

            <div style={{ margin: "auto", padding: "10px" }}>
              <button
                disabled={isIconDisabled}
                onClick={handleAdd}
                style={{ width: "39px", height: "40px", borderRadius: "90px" }}
              >
                <FaCirclePlus
                  className={`icon-add ${isIconDisabled ? "disabled" : ""}`}
                />
              </button>
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`btn-save ${savebtn || !isOrderChanged ? "disabled" : ""}`}
            onClick={handleSave}
            disabled={savebtn || !isOrderChanged}
            style={{ backgroundColor: savebtn || !isOrderChanged ? "green" : "black" }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
