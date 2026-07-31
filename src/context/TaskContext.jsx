import { createContext } from "react";
import { useState,useEffect } from "react";
const TaskContext=createContext(null)



export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("taskflow-tasks")
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Learn React Hooks", status: "To Do", priority: "Medium", dueDate: "2026-08-05", boardId: 2 },
      { id: 2, title: "Build Task Manager", status: "In Progress", priority: "High", dueDate: "2026-08-25", boardId: 1 },
      { id: 3, title: "Setup Tailwind", status: "Done", priority: "Low", dueDate: "2026-07-20", boardId: 1 },
    ]
  })



  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem("taskflow-boards")
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Work Project" },
      { id: 2, name: "Personal" },
    ]
  })

  useEffect(() => {
  localStorage.setItem("taskflow-tasks", JSON.stringify(tasks))
}, [tasks])

useEffect(() => {
  localStorage.setItem("taskflow-boards", JSON.stringify(boards))
}, [boards])

  function handleDelete(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  
  function handleAdd(title,newDueDate,boardId){
     const newTask = {
      id: Date.now(),
      title: title,
      status: "To Do",
      priority:"Medium",
      dueDate:newDueDate,
      boardId:boardId
    }

    setTasks([...tasks,newTask])
    

  }

  
  function handleStatusChange(taskId,newStatus){
    setTasks(tasks.map((task) => task.id === taskId ? {...task,status:newStatus}: task ))
  }


  function handlePriorityChange(taskId,newPriority){
    setTasks(
      tasks.map((task) => (
        task.id === taskId ? {...task,priority:newPriority}:task 
      ))
    )
  }

  function handleAddBoard(boardName) {
  const newBoard = { id: Date.now(), name: boardName }
  setBoards([...boards, newBoard])
}

function handleEditTitle(taskId, newTitle) {
  setTasks(tasks.map((task) => task.id === taskId ? { ...task, title: newTitle } : task))
}

function handleDeleteBoard(boardId) {
  setBoards(boards.filter((board) => board.id !== boardId))
  setTasks(tasks.filter((task) => task.boardId !== boardId))
}

  const value = {
    tasks,
    boards,
    handleDelete,
    handleAdd,
    handleStatusChange, 
    handlePriorityChange,
    handleAddBoard,
    handleEditTitle,
    handleDeleteBoard
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext