import TaskCard from "./TaskCard.jsx"

function TaskList({onDelete,onPriorityChange,onStatusChange,tasks}){
    return(
        <div>
        {
        tasks.map((task) =>(
          <TaskCard
            task={task}
            key={task.id}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onPriorityChange={onPriorityChange}
          />
        ))
      }
        </div>
    )
}

export default TaskList