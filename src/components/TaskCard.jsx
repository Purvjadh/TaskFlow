function TaskCard({task,onStatusChange,onDelete,onPriorityChange}){

function getPriorityColor(priority) {
  if (priority === "High") return "bg-red-100 text-red-700"
  if (priority === "Medium") return "bg-yellow-100 text-yellow-700"
  return "bg-green-100 text-green-700"
  }

  function isOverdue() {
    if (!task.dueDate) return false          // agar due date hi nahi di, overdue nahi ho sakta
    if (task.status === "Done") return false  // jo task khatam ho chuka, wo overdue nahi maana jaata
    const today = new Date().toISOString().split("T")[0]   // aaj ki date, "YYYY-MM-DD" format mein
    return task.dueDate < today               // agar due date aaj se pehle hai, overdue hai
  }


    return(
         <div  className="bg-white rounded-lg shadow p-4 max-w-sm mb-3">
            
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>

        <span className={`inline-block text-xs px-2 py-1 rounded mt-2 ${getPriorityColor(task.priority)}`}>
             {task.priority}
        </span>

         {task.dueDate && (
        <p className={`text-xs mt-2 ${isOverdue() ? "text-red-600 font-semibold" : "text-gray-500"}`}>
          Due: {task.dueDate} {isOverdue() && "(Overdue)"}
        </p>
      )}

        <div className="flex items-center gap-2 mt-2"> 
        <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id,e.target.value) }
            className="mt-2 text-sm border rounded px-2 py-1"
            >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        </select>

         <select
         value={task.priority}
         onChange={(e) => onPriorityChange(task.id,e.target.value) }
         className="mt-2 text-sm border rounded px-2 py-1"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>


           
        <button onClick={() => onDelete(task.id)} className="mt-2 ml-2 text-sm text-red-600 hover:text-red-800">Delete</button>
        </div>

            
          </div>
    )

}

export default TaskCard