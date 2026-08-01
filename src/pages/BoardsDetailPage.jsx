import {useState,useContext} from "react"
import Column from "../components/Column.jsx"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import TaskContext from "../context/TaskContext.jsx"

const COLUMNS = ["To Do", "In Progress", "Done"]

export default function BoardsDetailPage (){
    const { boardId } = useParams()
    const{tasks,boards}=useContext(TaskContext)
    const currentBoard = boards.find((b) => b.id === Number(boardId))
    const [searchText, setSearchText] = useState("")
    const tasksForThisBoard = tasks.filter((task) => task.boardId === Number(boardId))
    const filteredTasks = tasksForThisBoard.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
    )

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto px-8 py-10">
        <Link to="/" className="text-sm text-text-secondary hover:text-accent transition-colors">
          &larr; Back to boards
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight text-text-primary mt-3 mb-6">
          {currentBoard?.name}
        </h1>

        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search tasks..."
          className="border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent mb-6 w-full max-w-sm bg-surface"
        />

        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((columnName) => (
            <Column
              key={columnName}
              title={columnName}
              tasks={filteredTasks.filter((task) => task.status === columnName)}
              boardId={Number(boardId)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}