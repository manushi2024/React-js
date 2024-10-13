import React, { useState } from "react";

const DeleteMessagePopup = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={handleToggleVisibility} className="fa fa-trash">delete</button>
      {isVisible && (
        <div className="popup">
          <h1>Delete Message</h1>
          <p>Are you sure you want to delete this message?</p>
          <button onClick={() => {}}>Delete</button>
          <button onClick={handleToggleVisibility}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DeleteMessagePopup;