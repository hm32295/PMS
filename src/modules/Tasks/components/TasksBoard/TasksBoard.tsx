// import { useContext, useEffect, useState } from "react";
// import "./TasksBoard.css"
// import { AuthContext } from "../../../../context/AuthContext";
// import { axiosInstance, TASKS_URLS } from "../../../../services/urls";
// export default function TasksBoard() {
//   const { loginData, isAuthLoading }: { loginData: any; isAuthLoading: boolean } = useContext(AuthContext);
//   const [tasks , setTasks] = useState([]);
//   const [loder, setLoder] = useState(false)

//   const getTasksToDo = async()=>{
//     console.log(loginData);
//     if(loginData === null) return null
//     setLoder(true)
//     try {
//       // if(loginData.userGroup === 'Employee'){
//         const response = await axiosInstance(TASKS_URLS.GET_MANGER);
//         console.log(response.data.data);
//         setTasks(response.data.data)
        
//         // }
//         // else if(loginData.userGroup =)
//       } catch (error) {
//         console.log(error);
        
//       }finally{

//         setLoder(false)
//       }
//     }

//     useEffect(() => {
//       if (!isAuthLoading && loginData) {
//         getTasksToDo();
//       }
//     }, [isAuthLoading, loginData]);
//   return (
//     <div className="TasksBoard">
//       <header className='p-3 d-flex justify-content-between align-items-center'>
//         <span>Task Board</span>
//       </header>
//       <div className="status d-flex gap-2 flex-wrap">
//         <div className="">
//           <span className="p-2 d-inline-block">To Do</span>
//           <div className="mt-2 d-flex p-2 pt-3 rounded-2 align-items-center flex-column gap-2 text-white">
//             {
//               tasks.length&&(
//                 tasks.map(task=>{
//                   if(task.status === "ToDo"){

//                     return(
  
//                       <p key={task.id} className="rounded-1 p-2 text-white w-100 px-3">{task.title}</p>
//                     )
//                   }
//                 })
//               )
//             }
          
//           </div>
//         </div>
//         <div className="">
//           <span className="p-2 d-inline-block">In Progress</span>
//           <div className="mt-2 d-flex p-2 pt-3 rounded-2  align-items-center flex-column gap-2 text-white">
//           {
//               tasks.length&&(
//                 tasks.map(task=>{
//                   if(task.status === "InProgress"){

//                     return(
  
//                       <p key={task.id} className="rounded-1 p-2 text-white w-100 px-3">{task.title}</p>
//                     )
//                   }
//                 })
//               )
//             }
//           </div>
//         </div>
//         <div className="">
//           <span className="p-2 d-inline-block">Done</span>
//           <div className="mt-2 d-flex p-2 pt-3 rounded-2  align-items-center flex-column gap-2 text-white">
//           {
//               tasks.length&&(
//                 tasks.map(task=>{
//                   if(task.status === "Done"){

//                     return(
  
//                       <p key={task.id} className="rounded-1 p-2 text-white w-100 px-3">{task.title}</p>
//                     )
//                   }
//                 })
//               )
//             }
//           </div>
//         </div>
//       </div>


//       <div className="test">

//       </div>
//     </div>
//   )
// }

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import "./TasksBoard.css";

const initialTasks = {
  todo: [
    { id: "task-1", content: "قراءة بريد العمل" },
    { id: "task-2", content: "تحضير تقرير المشروع" },
  ],
  inProgress: [{ id: "task-3", content: "مكالمة مع العميل" }],
  done: [{ id: "task-4", content: "تنظيف سطح المكتب" }],
};

function TaskItem({ id, content }: { id: string; content: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "8px",
    margin: "4px 0",
    backgroundColor: "#eee",
    borderRadius: "4px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </div>
  );
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeColumn, setActiveColumn] = useState<keyof typeof tasks>("todo");

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: any) => {
    const taskId = event.active.id;
    const column = Object.keys(tasks).find((key) =>
      tasks[key as keyof typeof tasks].some((task) => task.id === taskId)
    );
    if (column) setActiveColumn(column as keyof typeof tasks);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const sourceColumn = activeColumn;
    const destinationColumn = over.data.current?.sortable.containerId;

    if (!destinationColumn) return;

    if (sourceColumn === destinationColumn) {
      const oldIndex = tasks[sourceColumn].findIndex((t) => t.id === active.id);
      const newIndex = tasks[sourceColumn].findIndex((t) => t.id === over.id);
      const newTasks = arrayMove(tasks[sourceColumn], oldIndex, newIndex);

      setTasks((prev) => ({
        ...prev,
        [sourceColumn]: newTasks,
      }));
    } else {
      const movingTask = tasks[sourceColumn].find((t) => t.id === active.id);
      if (!movingTask) return;

      setTasks((prev) => {
        if (!prev[destinationColumn]) {
          console.error("destinationColumn غير موجود:", destinationColumn);
          return prev;
        }
        const updatedSource = prev[sourceColumn].filter(
          (t) => t.id !== active.id
        );
        const updatedDest = [...prev[destinationColumn], movingTask];
        return {
          ...prev,
          [sourceColumn]: updatedSource,
          [destinationColumn]: updatedDest,
        };
      });
      
    }
  };

  return (
    <div className="task-board" style={{ display: "flex", gap: "20px" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <div key={columnId} style={{ flex: 1 }}>
            <h4 style={{ textAlign: "center" }}>
              {columnId === "todo"
                ? "To Do"
                : columnId === "inProgress"
                ? "In Progress"
                : "Done"}
            </h4>
            <div
              style={{
                minHeight: "200px",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              <SortableContext
                items={columnTasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                {columnTasks.map((task) => (
                  <TaskItem key={task.id} id={task.id} content={task.content} />
                ))}
              </SortableContext>
            </div>
          </div>
        ))}
      </DndContext>
    </div>
  );
}
