import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import TaskContext from "../context/TaskContext.jsx"

function BoardsPage() {

  const [newBoardName, setNewBoardName] = useState("")

  const { boards, handleAddBoard,handleDeleteBoard } = useContext(TaskContext)

  const [error, setError] = useState("")

  function handleNameChange(e) {
  setNewBoardName(e.target.value)
  if (error) setError("")
}


  function handleBoard() {
     if (!newBoardName.trim()) {
      setError("Board name can't be empty")
      return
    }


    handleAddBoard(newBoardName)
    setNewBoardName("")
    setError("")
  }

  

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-8 py-10">

        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-8">
          TaskFlow
        </h1>

       <div className="mb-8">
        <div className=" flex gap-2">
          <input
            type="text"
            value={newBoardName}
            onChange={handleNameChange}
            placeholder="New board name"
            className={`border rounded-md px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64 ${error ? "border-red-300" : "border-slate-200"}`}
          />

          <button
            onClick={handleBoard}
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add Board
          </button>
         
        </div>

         {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
       </div>


        {boards.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-slate-200 rounded-lg">
              <div className="text-3xl mb-2">🗂️</div>
              <p className="text-sm font-medium text-slate-700">No boards yet</p>
              <p className="text-xs text-slate-400 mt-1">Create your first board using the form above.</p>
            </div>
        ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
         {boards.map((board) => (
                <div
                  key={board.id}
                  className="relative bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all"
                >
                  <Link
                    to={`/board/${board.id}`}
                    className="block p-6"
                  >
                    <span className="text-slate-900 font-medium">{board.name}</span>

                    
                  </Link>

                   <button
                    onClick={() => handleDeleteBoard(board.id)}
                    className="absolute top-2 right-2 text-xs text-slate-400 hover:text-red-600 transition-colors"
                  >
                    ✕
                  </button>

                 
                </div>
      ))}
        </div>
           
  )}


      </div>
    </div>
  )
}

export default BoardsPage