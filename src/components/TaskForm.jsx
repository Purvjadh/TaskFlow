import { useContext, useState } from "react"
import TaskContext from "../context/TaskContext.jsx"

function TaskForm({onAddTask}){
     const [newTaskTitle, setNewTaskTitle] = useState("")
     const [newDueDate,setNewDueDate] = useState("")
     const [error, setError] = useState("")

     function handleAddTask(){
       if (!newTaskTitle.trim()) {
         setError("Task title can't be empty")
         return
       }
       onAddTask(newTaskTitle,newDueDate)
       setNewTaskTitle("")
       setNewDueDate("")
       setError("")
     }

     function handleTitleChange(e) {
       setNewTaskTitle(e.target.value)
       if (error) setError("")
     }

    return(
       <div className="mb-6">
         <div className="flex gap-2">
          <input
          type="text"
          value={newTaskTitle}
          placeholder="New task title"
          className={`border rounded-md px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent flex-1 ${error ? "border-red-300" : "border-slate-200"}`}
          onChange={handleTitleChange}
          />

          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
            <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors" onClick={handleAddTask}>Add</button>
         </div>
         {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
       </div>
    )
}

export default TaskForm