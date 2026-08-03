import TaskCard from "./TaskCard.jsx"

function KanbanColumn({ status, tasks }) {
  return (
    <div className="bg-slate-100 rounded-lg p-3 w-72 flex-shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-medium text-slate-700">{status}</h3>
        <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full">{tasks.length}</span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6 border border-dashed border-slate-300 rounded-md">
            No tasks
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  )
}

export default KanbanColumn