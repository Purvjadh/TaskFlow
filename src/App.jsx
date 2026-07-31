import {useState} from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BoardsPage from "./pages/BoardsPage.jsx"
import BoardsDetailPage from "./pages/BoardsDetailPage.jsx"
import { TaskProvider } from "./context/TaskContext.jsx"

export default function App() {
  

  return(
   <TaskProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="/board/:boardId" element={<BoardsDetailPage />} />
      </Routes>
   </BrowserRouter>
   </TaskProvider>
  )
}