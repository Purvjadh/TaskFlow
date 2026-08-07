import { useState, useContext } from "react"
import TaskForm from "../components/TaskForm.jsx"
import TaskList from "../components/TaskList.jsx"
import { useParams, Link } from "react-router-dom"
import TaskContext from "../context/TaskContext.jsx"

export default function BoardsDetailPage() {
  const { boardId } = useParams()
  const { tasks, boards, handleAdd } = useContext(TaskContext)
  const currentBoard = boards.find((b) => b.id === Number(boardId))
  const [searchText, setSearchText] = useState("")

  const tasksForThisBoard = tasks.filter((task) => task.boardId === Number(boardId))
  const filteredTasks = tasksForThisBoard.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  )

  function handleAddTask(title, dueDate) {
    handleAdd(title, dueDate, Number(boardId))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-8 py-10">
        <Link to="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
          &larr; Back to boards
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mt-3 mb-6">
          {currentBoard?.name}
        </h1>

        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search tasks..."
          className="border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-6 w-full max-w-sm"
        />

        <TaskForm onAddTask={handleAddTask} />

        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-lg">
            <div className="text-3xl mb-2">📋</div>
            <p className="text-sm font-medium text-slate-700">
              {searchText ? "No matching tasks" : "No tasks yet"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {searchText ? "Try a different search term." : "Add your first task using the form above."}
            </p>
          </div>
        ) : (
          <TaskList tasks={filteredTasks} boardId={Number(boardId)} />
        )}
      </div>
    </div>
  )
}