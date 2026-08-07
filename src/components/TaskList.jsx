import { useContext } from "react"
import KanbanColumn from "./KanbanColumn.jsx"
import TaskContext from "../context/TaskContext.jsx"

function TaskList({tasks,boardId}){
  const { STATUSES } = useContext(TaskContext)

  return(
    <div className="flex gap-4 overflow-x-auto pb-4">
      {STATUSES.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
          boardId={boardId}
        />
      ))}
    </div>
  )
}

export default TaskList