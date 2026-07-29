import { useState } from "react"

function TaskForm({onAddTask}){
     const [newTaskTitle, setNewTaskTitle] = useState("")
      const [ newDueDate,setNewDueDate] = useState("")

     function handleAddTask(){
        onAddTask(newTaskTitle,newDueDate)
        setNewTaskTitle("")
         setNewDueDate("")
     }

    return(
       <div className="mb-4 flex gap-2">
        <input
        type="text"
        value={newTaskTitle}
        placeholder="New task title"
        className="border rounded px-3 py-2 flex-1"
        onChange={(e) => {setNewTaskTitle(e.target.value)}}
        >

        </input>

      <input
        type="date"
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
        className="border rounded px-3 py-2"
      />
        <button  className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAddTask}>Add</button>
      </div>

    )
}

export default TaskForm