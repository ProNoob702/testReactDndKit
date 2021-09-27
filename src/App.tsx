import React, { useState } from "react";
import "./App.css";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
} from "@dnd-kit/core";
import {
  useSortable,
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function App() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Manoj",
    },
    {
      id: "2",
      name: "John",
    },
    {
      id: "3",
      name: "Ronaldo",
    },
    {
      id: "4",
      name: "Harry",
    },
    {
      id: "5",
      name: "Jamie",
    },
  ]);

  const sensors = [useSensor(PointerSensor)];

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        width: 200,
        textAlign: "center",
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <UserComponent {...item} key={item.id} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

const UserComponent = ({ id, name }: any) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: id });

  const style: any = {
    transition,
    transform: CSS.Transform.toString(transform),
    border: "2px solid black",
    marginBottom: 5,
    marginTop: 5,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {name}
    </div>
  );
};

export default App;
