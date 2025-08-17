import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./index.css";

const initialTasks = {
  todo: [
    { id: "1", content: "Design UI", priority: "High" },
    { id: "4", content: "Create Wireframes", priority: "Medium" },
  ],
  inProgress: [
    { id: "2", content: "Setup Redux", priority: "High" },
    { id: "5", content: "Integrate API", priority: "Medium" },
  ],
  done: [
    { id: "3", content: "Project Plan", priority: "Low" },
    { id: "6", content: "Team Meeting", priority: "Low" },
  ],
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const srcCol = [...tasks[source.droppableId]];
    const destCol = [...tasks[destination.droppableId]];
    const [moved] = srcCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, moved);

    setTasks({ ...tasks, [source.droppableId]: srcCol, [destination.droppableId]: destCol });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container">
        {Object.keys(tasks).map((colId) => (
          <Droppable droppableId={colId} key={colId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`kanban-column ${colId}`}
              >
                <h2>{colId}</h2>
                {tasks[colId].map((task, idx) => (
                  <Draggable draggableId={task.id} index={idx} key={task.id}>
                    {(prov, snapshot) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className={`kanban-card ${snapshot.isDragging ? "dragging" : ""}`}
                      >
                        <div className="task-content">{task.content}</div>
                        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                          {task.priority}
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
