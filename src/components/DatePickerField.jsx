import { useState } from "react"
import { DayPicker } from "react-day-picker"
import { CalendarIcon } from "@heroicons/react/16/solid"
import Popover from "./Popover.jsx"

function DatePickerField({ selectedDate, onDateChange }) {
  const dateObj = selectedDate ? new Date(selectedDate) : undefined

  function handleSelect(date) {
   if (date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const formatted = `${year}-${month}-${day}`
    onDateChange(formatted)
  }
  }

  function formatDisplay(date) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <Popover
      trigger={
        <button className="inline-flex items-center gap-1 px-1.5 py-1 rounded-md border border-slate-200 text-xs text-slate-600 hover:border-slate-300">
          <CalendarIcon className={`w-3.5 h-3.5 ${dateObj ? "text-indigo-500" : "text-slate-300"}`} />
          {dateObj && formatDisplay(dateObj)}
        </button>
      }
    >
      {(close) => (
        <div className="p-2">
          <DayPicker
            mode="single"
            selected={dateObj}
            onSelect={(date) => {
              handleSelect(date)
              close()
            }}
            className="text-sm"
          />
        </div>
      )}
    </Popover>
  )
}

export default DatePickerField