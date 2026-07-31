import TaskCard from "./TaskCard.jsx"

function TaskList({tasks}){
    return(
        <div className="space-y-3">
        {
        tasks.map((task) =>(
          <TaskCard
            task={task}
            key={task.id}
          />
        ))
      }
        </div>
    )
}

export default TaskList