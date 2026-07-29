import {useState} from "react"

import TaskForm from "../components/TaskForm.jsx"
import TaskList from "../components/TaskList.jsx"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function BoardsDetailPage ({boards,tasks,onDelete,onAdd,onStatusChange,onPriorityChange}){
    const { boardId } = useParams()

    const currentBoard = boards.find((b) => b.id === Number(boardId))


  const [searchText, setSearchText] = useState("")



const tasksForThisBoard = tasks.filter((task) => task.boardId === Number(boardId))

  
  const filteredTasks = tasksForThisBoard.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  )
  
function handleAddTask (){
    onAdd(Number(boardId))
}

  return (


<div className="min-h-screen bg-gray-100 p-8">
    <Link to="/" className="text-blue-600 text-sm">&larr; Back to Boards</Link>
      <h1 className="text-2xl font-bold text-gray-800 my-4">{currentBoard?.name}</h1>
       <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search tasks..."
      className="border rounded px-3 py-2 mb-4 w-full max-w-sm"
    />
       <TaskForm
       onAddTask={handleAddTask}
       />


      <TaskList
        tasks={filteredTasks} 
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
      />
 
      
    </div>
  )
}