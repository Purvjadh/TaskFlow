import {useState} from "react"


import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BoardsPage from "./pages/BoardsPage.jsx"
import BoardsDetailPage from "./pages/BoardsDetailPage"

export default function App() {
   const [tasks,setTasks]=useState([
    { id: 1, title: "Learn React Hooks", status: "To Do",priority:"Medium", dueDate: "2026-08-05",boardId: 2 },
    { id: 2, title: "Build Task Manager", status: "In Progress",priority:"High", dueDate: "2026-08-25",boardId: 1  },
    { id: 3, title: "Setup Tailwind", status: "Done",priority:"Low", dueDate: "2026-07-20",boardId: 1 },
  ])

  const [boards, setBoards] = useState([
    { id: 1, name: "Work Project" },
    { id: 2, name: "Personal" },
  ])

    function handleDelete(taskId){
    setTasks(tasks.filter((task) => task.id  !== taskId)) 
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
    setTasks(tasks.map((task) => task.id == taskId ? {...task,status:newStatus}: task ))
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
  setBoards([...boards, newBoard])   // Ab kaam karega, kyunki setBoards prop se mila
}

  return(
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardsPage boards={boards} setBoards={setBoards} onAddBoard={handleAddBoard}/>} />
        <Route 
        path="/board/:boardId" 
        element={
        <BoardsDetailPage 
        boards={boards} 
        tasks={tasks}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        />} />
      </Routes>
   </BrowserRouter>
  )
}