import { useContext,useState } from "react"
import TaskContext from "../context/TaskContext.jsx"

function TaskCard({task}){

const [isEditing, setIsEditing] = useState(false)
const [editedTitle, setEditedTitle] = useState(task.title)

const{handleDelete,handlePriorityChange,handleStatusChange,handleEditTitle}=useContext(TaskContext)

function getPriorityStyles(priority) {
  if (priority === "High") return { badge: "bg-red-50 text-red-700", border: "border-l-red-400" }
  if (priority === "Medium") return { badge: "bg-amber-50 text-amber-700", border: "border-l-amber-400" }
  return { badge: "bg-emerald-50 text-emerald-700", border: "border-l-emerald-400" }
  }

  function isOverdue() {
    if (!task.dueDate) return false
    if (task.status === "Done") return false
    const today = new Date().toISOString().split("T")[0]
    return task.dueDate < today
  }

  function handleSaveEdit() {
    handleEditTitle(task.id, editedTitle)
    setIsEditing(false)
  }

  const priorityStyles = getPriorityStyles(task.priority)

    return(
         <div className={`bg-white border border-slate-200 border-l-4 ${priorityStyles.border} rounded-lg p-4 mb-3`}>

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
            autoFocus
            className="text-sm font-medium text-slate-900 border border-indigo-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-slate-900 cursor-pointer hover:text-indigo-600"
          >
            {task.title}
          </h3>
        )}

        

        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded mt-2 ${priorityStyles.badge}`}>
             {task.priority}
        </span>

         {task.dueDate && (
        <p className={`text-xs mt-2 ${isOverdue() ? "text-red-600 font-medium" : "text-slate-500"}`}>
          Due {task.dueDate} {isOverdue() && "· Overdue"}
        </p>
      )}

        <div className="flex items-center gap-2 mt-3">
        <select
            value={task.status}
            onChange={(e) => handleStatusChange(task.id,e.target.value) }
            className="text-xs border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        </select>

         <select
         value={task.priority}
         onChange={(e) => handlePriorityChange(task.id,e.target.value) }
         className="text-xs border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={() => handleDelete(task.id)} className="ml-auto text-xs text-slate-400 hover:text-red-600 transition-colors">
          Delete
        </button>
        </div>

          </div>
    )

}

export default TaskCard
