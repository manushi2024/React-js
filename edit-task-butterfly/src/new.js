//whith chnage order

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidV4 } from "uuid";
import "./App.css";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [val, setVal] = useState([]);
  const [isIconDisabled, setIsIconDisabled] = useState(false);
  const[savebtn,setsavebtn]=useState(false)
  const[isinputvisibal,setinputvisibal]=useState(true)
  const [value, setvalue] = useState("");
  const [data, setdata] = useState([]);

  



  const handleAdd = (e) => {
    e.stopPropagation();
    setVal([...val, {}]);
    setIsIconDisabled(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addpost = () => {
    setdata([...data, { id: uuidV4(), post: value }]);

    setvalue("");
    console.log(data);
  };

  const deleteTask = (id) => {
    const filterdata = data.filter((item) => {
      return item.id !== id;
    });

    setdata(filterdata);
    console.log(filterdata);
  };
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log(reorderedItem);
    items.splice(result.destination.index, 0, reorderedItem);

    setdata(items);
  }

  const handlesave=(items)=>{
  
    console.log("order save",items);
  }
  const canceltask=()=>{
    
    setIsIconDisabled(false)
    setsavebtn(true)
   

  }

  return (
    <>
      <div>
        <Button variant="secondary" onClick={openModal} style={{marginLeft:"620px"}}>
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
                {(provided,snapshot) => (
                  <div
                    className="characters"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      //background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                      padding: 8,
                      width: 400,
                      minHeight: 300,
                    }}
                  >
                    {data.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
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
                              <span
                                title="Delete"
                                style={{ marginLeft: "320px" }}
                              >
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
              <>
     
              <div  className="main-div">
                <input
                  type="text"
                  placeholder="enter post"
                  name="value"
                  value={value}
                  onChange={(e) => {
                    setvalue(e.target.value);
                    console.log(value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addpost}
                >
                  Add
                </button>
                <button type="button" className="btn btn-danger" onClick={canceltask}   >
                  Cancel
                </button>
              </div>
            
             
                </>
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
            <div></div>
          </>
        </Modal.Body>
        <Modal.Footer>
  <button
    className={`btn-save ${savebtn ? "disabled" : ""}`}
    onClick={handlesave}
    disabled={savebtn}
    style={{ backgroundColor: savebtn ? 'green' : 'black' }}
  >
    Save
  </button>
</Modal.Footer>

      </Modal>
    </>
  );
}

export default App;













import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidV4 } from "uuid";
import "./App.css";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [val, setVal] = useState([]);
  const [isIconDisabled, setIsIconDisabled] = useState(false);
  const [value, setvalue] = useState("");
  const [data, setdata] = useState([]);

  const handleAdd = (e) => {
    e.stopPropagation();
    setVal([...val, {}]);
    setIsIconDisabled(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addpost = () => {
    setdata([...data, { id: uuidV4(), post: value }]);

    setvalue("");
    console.log(data);
  };

  const deleteTask = (id) => {
    const filterdata = data.filter((item) => {
      return item.id !== id;
    });

    setdata(filterdata);
    console.log(filterdata);
  };

  return (
    <>
      <div>
        <Button variant="secondary" onClick={openModal}>
          Edit Post
        </Button>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
          
            {data.map((item, index) => {
              
              return (
                <>
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center", border:"1px solid black", margin:"2px", borderRadius:"2px", height:"30px", width:"400px",marginLeft:"30px"}}
                  >
                    <div>
                      <span>{item.post}</span>
                    </div>
                    <div>
                      <span title="Delete" style={{marginLeft:"320px"}}>
                        <FontAwesomeIcon className="delete" icon={faTrashCan}  onClick={() => deleteTask(item.id)} />
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
            {val.map((item, index) => (
              <div key={index} className="map-div">
                <input
                  type="text"
                  placeholder="enter post"
                  name="value"
                  value={value}
                  onChange={(e) => {
                    setvalue(e.target.value);
                    console.log(value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addpost}
                >
                  Add
                </button>
                <button type="button" className="btn btn-danger">
                  Cancel
                </button>
              </div>
            ))}
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
          <button className="btn-save">Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidV4 } from "uuid";
import "./App.css";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [val, setVal] = useState([]);
  const [isIconDisabled, setIsIconDisabled] = useState(false);
  const [value, setvalue] = useState("");
  const [data, setdata] = useState([]);

  const handleAdd = (e) => {
    e.stopPropagation();
    setVal([...val, {}]);
    setIsIconDisabled(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addpost = () => {
    setdata([...data, { id: uuidV4(), post: value }]);

    setvalue("");
    console.log(data);
  };

  const deleteTask = (id) => {
    const filterdata = data.filter((item) => {
      return item.id !== id;
    });

    setdata(filterdata);
    console.log(filterdata);
  };

  return (
    <>
      <div>
        <Button variant="secondary" onClick={openModal}>
          Edit Post
        </Button>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
          
            {data.map((item, index) => {
              
              return (
                <>
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center", border:"1px solid black", margin:"2px", borderRadius:"2px", height:"30px", width:"400px",marginLeft:"30px"}}
                  >
                    <div>
                      <span>{item.post}</span>
                    </div>
                    <div>
                      <span title="Delete" style={{marginLeft:"320px"}}>
                        <FontAwesomeIcon className="delete" icon={faTrashCan}  onClick={() => deleteTask(item.id)} />
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
            {val.map((item, index) => (
              <div key={index} className="map-div">
                <input
                  type="text"
                  placeholder="enter post"
                  name="value"
                  value={value}
                  onChange={(e) => {
                    setvalue(e.target.value);
                    console.log(value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addpost}
                >
                  Add
                </button>
                <button type="button" className="btn btn-danger">
                  Cancel
                </button>
              </div>
            ))}
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
          <button className="btn-save">Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
