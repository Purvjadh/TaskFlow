import { useContext,useState } from "react"
import TaskContext from "../context/TaskContext.jsx"
import { FlagIcon } from "@heroicons/react/16/solid"
import IconButton from "./IconButton.jsx"
import Popover from "./Popover.jsx"
import { NoSymbolIcon } from "@heroicons/react/16/solid"
import DatePickerField from "./DatePickerField.jsx"

function TaskCard({task}){

const [isEditing, setIsEditing] = useState(false)
const [editedTitle, setEditedTitle] = useState(task.title)

const{handleDelete,handlePriorityChange,handleStatusChange,handleEditTitle ,handleDueDateChange}=useContext(TaskContext)

const PRIORITY_OPTIONS = [
  
  { label: "Urgent", color: "text-red-400" },
  { label: "High", color: "text-amber-400" },
  { label: "Normal", color: "text-blue-400" },
  { label: "Low", color: "text-slate-400" },
  
]

// function getPriorityStyles(priority) {
//   if (priority === "High") return { badge: "bg-red-50 text-red-700" }
//   if (priority === "Medium") return { badge: "bg-amber-50 text-amber-700"}
//   return { badge: "bg-emerald-50 text-emerald-700" }
//   }

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

  const currentPriority = PRIORITY_OPTIONS.find((p) => p.label === task.priority) 

  //const priorityStyles = getPriorityStyles(task.priority)

    return(
         <div className={`bg-white border border-slate-200 border-l-4  rounded-lg p-4 mb-3`}>

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

        

        {/* <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded mt-2 ${priorityStyles.badge}`}>
             {task.priority}
        </span> */}

   
        

        <div className="flex items-center gap-2 mt-3">
        {/* <select
            value={task.status}
            onChange={(e) => handleStatusChange(task.id,e.target.value) }
            className="text-xs border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
        </select> */}

              
        <Popover
          trigger={
            <button className="inline-flex items-center gap-1  px-1.5 py-1  rounded-md border border-slate-200 text-xs text-slate-700 hover:border-slate-300">
              <FlagIcon className={`w-3.5 h-3.5 ${currentPriority ? currentPriority.color : "text-slate-300"}`} />
              {currentPriority && task.priority}
            </button>
          }
        >
          {(close) => (
            <div className="w-40 py-1">
              <p className="px-3 py-1.5 text-xs font-medium text-slate-400">Priority</p>
              {PRIORITY_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  onClick={() => {
                    handlePriorityChange(task.id, option.label)
                    close()
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <FlagIcon className={`w-4 h-4 ${option.color}`} />
                  {option.label}
                  {task.priority === option.label && (
                    <span className="ml-auto text-indigo-600">✓</span>
                  )}
                </button>
              ))}


            <div className="border-t border-slate-100 mt-1 pt-1">
              <button
                onClick={() => {
                  handlePriorityChange(task.id, "")
                  close()
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50"
              >
                <NoSymbolIcon className="w-4 h-4 text-slate-400" />
                Clear
              </button>
            </div>

            
            </div>
          )}
        </Popover>

        <DatePickerField
          selectedDate={task.dueDate}
          onDateChange={(newDate) => handleDueDateChange(task.id, newDate)}

        />

        <button onClick={() => handleDelete(task.id)} className="ml-auto text-xs text-slate-400 hover:text-red-600 transition-colors">
          Delete
        </button>
        </div>

    </div>
    )

}

export default TaskCard
