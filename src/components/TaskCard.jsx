
import { useContext, useState } from "react"
import TaskContext from "../context/TaskContext.jsx"
import { FlagIcon, TrashIcon } from "@heroicons/react/16/solid"
import { CheckCircleIcon, ClockIcon, PlayCircleIcon } from "@heroicons/react/16/solid"
import Popover from "./Popover.jsx"
import { NoSymbolIcon } from "@heroicons/react/16/solid"
import DatePickerField from "./DatePickerField.jsx"

const STATUS_OPTIONS = [
  { label: "To Do", icon: ClockIcon, color: "text-slate-400" },
  { label: "In Progress", icon: PlayCircleIcon, color: "text-amber-500" },
  { label: "Done", icon: CheckCircleIcon, color: "text-emerald-500" },
]

const PRIORITY_OPTIONS = [
  { label: "Urgent", color: "text-red-400" },
  { label: "High", color: "text-amber-400" },
  { label: "Normal", color: "text-blue-400" },
  { label: "Low", color: "text-slate-400" },
]

const PILL = "inline-flex items-center gap-1 px-1.5 py-1 rounded-md border border-slate-200 text-xs text-slate-700 hover:border-slate-300 whitespace-nowrap"

function TaskCard({ task }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)

  const {
    handleDelete,
    handlePriorityChange,
    handleStatusChange,
    handleEditTitle,
    handleDueDateChange,
    handleStartDateChange
  } = useContext(TaskContext)

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
  const currentStatus = STATUS_OPTIONS.find((s) => s.label === task.status) || STATUS_OPTIONS[0]
  const StatusIcon = currentStatus.icon

  return (
    <div className="group relative bg-white border border-slate-200 rounded-lg p-4 mb-3 hover:shadow-sm transition-shadow">

      <button
        onClick={() => handleDelete(task.id)}
        title="Delete task"
        className="absolute top-3 right-3 p-1 rounded text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
      >
        <TrashIcon className="w-4 h-4" />
      </button>

      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
          autoFocus
          className="text-sm font-medium text-slate-900 border border-indigo-300 rounded px-2 py-1 w-full pr-6 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      ) : (
        <h3
          onClick={() => setIsEditing(true)}
          className="text-sm font-medium text-slate-900 cursor-pointer hover:text-indigo-600 pr-6"
        >
          {task.title}
        </h3>
      )}

      <div className="flex items-center gap-2 mt-3 flex-wrap">

        <Popover
          trigger={
            <button className={PILL}>
              <StatusIcon className={`w-3.5 h-3.5 ${currentStatus.color}`} />
            </button>
          }
        >
          {(close) => (
            <div className="w-40 py-1">
              <p className="px-3 py-1.5 text-xs font-medium text-slate-400">Status</p>
              {STATUS_OPTIONS.map((option) => {
                const OptIcon = option.icon
                return (
                  <button
                    key={option.label}
                    onClick={() => { handleStatusChange(task.id, option.label); close() }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <OptIcon className={`w-4 h-4 ${option.color}`} />
                    {option.label}
                    {task.status === option.label && <span className="ml-auto text-indigo-600">✓</span>}
                  </button>
                )
              })}
            </div>
          )}
        </Popover>

        <DatePickerField
          selectedDate={task.dueDate}
          onDateChange={(newDate) => handleDueDateChange(task.id, newDate)}
          startDate={task.startDate}
          onStartDateChange={(newDate) => handleStartDateChange(task.id, newDate)}
        />

        <Popover
          trigger={
            <button className={PILL}>
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
                  onClick={() => { handlePriorityChange(task.id, option.label); close() }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <FlagIcon className={`w-4 h-4 ${option.color}`} />
                  {option.label}
                  {task.priority === option.label && <span className="ml-auto text-indigo-600">✓</span>}
                </button>
              ))}
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  onClick={() => { handlePriorityChange(task.id, ""); close() }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50"
                >
                  <NoSymbolIcon className="w-4 h-4 text-slate-400" />
                  Clear
                </button>
              </div>
            </div>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default TaskCard