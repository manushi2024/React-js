import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TableWithDragAndDrop = () => {
  const [columns, setColumns] = useState([
    { id: 'id', title: 'ID' },
    { id: 'name', title: 'Name' },
    { id: 'age', title: 'Age' },
    { id: 'gender', title: 'Gender' },
    // Add more columns as needed
  ]);

  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 25, gender: 'Male' },
    { id: 2, name: 'Jane Doe', age: 30, gender: 'Female' },
   
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newColumns = Array.from(columns);
    const [reorderedColumn] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, reorderedColumn);

    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="columns" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ display: 'flex', marginTop: '20px' }}
          >
            {columns.map((column, index) => (
              <Draggable key={column.id} draggableId={column.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      border: '1px solid #ccc',
                      padding: '8px',
                      margin: '8px',
                      backgroundColor: '#f2f2f2',
                      minWidth: '100px',
                      textAlign: 'center',
                    }}
                  >
                    {column.title}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>

      <table style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '8px',
                  backgroundColor: '#e6e6e6',
                }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id}>
              {columns.map((column) => (
                <>
                <td
                  key={column.id}

                  style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                  }}
                >
                  {record[column.id]}
                </td>
              
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DragDropContext>
  );
};

export default TableWithDragAndDrop;
