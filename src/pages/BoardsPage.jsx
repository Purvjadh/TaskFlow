import { Link } from "react-router-dom"
import { useState } from "react"

function BoardsPage({ boards,onAddBoard }) {

 const [newBoardName, setNewBoardName] = useState("") 

function handleAddBoard() {
    onAddBoard(newBoardName)
    setNewBoardName("")
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">TaskFlow</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="New board name"
          className="border rounded px-3 py-2"
        />
        <button
          onClick={handleAddBoard}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Board
        </button>
      </div>


      <div className="flex gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            to={`/board/${board.id}`}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md"
          >
            {board.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BoardsPage