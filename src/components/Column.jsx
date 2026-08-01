import { useState, useContext } from "react"
import { Plus } from "lucide-react"
import TaskCard from "./TaskCard.jsx"
import TaskContext from "../context/TaskContext.jsx"

function Column({ title, tasks, boardId }) {
  const { handleAdd } = useContext(TaskContext)
  const [isAdding, setIsAdding] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDueDate, setNewDueDate] = useState("")

  function submitNewCard(e) {
    e.preventDefault()
    if (!newTitle.trim()) return
    handleAdd(newTitle, newDueDate, boardId, title)
    setNewTitle("")
    setNewDueDate("")
  }

  return (
    <div className="bg-bg border border-border rounded-lg p-3 w-72 flex-shrink-0">
      <div className="flex items-center gap-2 px-1 mb-3">
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
        <span className="text-xs text-text-secondary bg-surface border border-border rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>

      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {isAdding ? (
        <form onSubmit={submitNewCard} className="bg-surface border border-border rounded-lg p-2 space-y-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Task title"
            autoFocus
            className="w-full text-sm border border-border rounded px-2 py-1.5 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent bg-surface"
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="w-full text-xs border border-border rounded px-2 py-1 text-text-primary bg-surface focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="text-xs font-medium bg-accent text-white px-3 py-1.5 rounded hover:bg-accent-hover transition-colors"
            >
              Add card
            </button>
            <button
              type="button"
              onClick={() => { setIsAdding(false); setNewTitle("") }}
              className="text-xs text-text-secondary hover:text-text-primary"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent hover:bg-surface rounded-md px-2 py-2 transition-colors"
        >
          <Plus size={16} />
          Add a card
        </button>
      )}
    </div>
  )
}

export default Column