
import { useState, useContext } from "react"
import TaskCard from "./TaskCard.jsx"
import TaskContext from "../context/TaskContext.jsx"

function KanbanColumn({ status, tasks, boardId }) {
  const { handleAdd } = useContext(TaskContext)
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState("")

  function handleSave() {
  if (newTitle.trim() === "") {
    setIsAdding(false)
    return
  }
  handleAdd(newTitle.trim(), "", boardId, status)
  setNewTitle("")
  setIsAdding(false)
}

  return (
    <div className="bg-slate-100 rounded-lg p-3 w-72 flex-shrink-0">
      
      {/* Column header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-medium text-slate-700">{status}</h3>
        <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full">{tasks.length}</span>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.length === 0 && !isAdding ? (
          <p className="text-xs text-slate-400 text-center py-6 border border-dashed border-slate-300 rounded-md">
            No tasks
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>

      {/* Inline input */}
      {isAdding && (
        <div className="mt-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
              if (e.key === "Escape") setIsAdding(false)
            }}
            autoFocus
            placeholder="Task title..."
            className="w-full text-sm border border-indigo-300 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add card button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-3 w-full text-left text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-200 px-2 py-1.5 rounded-md transition-colors"
        >
          + Add card
        </button>
      )}

    </div>
  )
}

export default KanbanColumn