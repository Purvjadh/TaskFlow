import { useState } from "react"
import { DayPicker } from "react-day-picker"
import { CalendarIcon, NoSymbolIcon, XMarkIcon } from "@heroicons/react/16/solid"
import Popover from "./Popover.jsx"
import { addDays, addWeeks, nextSaturday, nextSunday } from "date-fns"

function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatShort(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function formatDisplay(date) {
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

function renderTriggerLabel(startDateObj, dateObj) {
  if (startDateObj && dateObj) {
    const sameMonth = startDateObj.getMonth() === dateObj.getMonth()
    return sameMonth
      ? `${formatShort(startDateObj)} - ${dateObj.getDate()}`
      : `${formatShort(startDateObj)} - ${formatShort(dateObj)}`
  }
  if (dateObj) return formatShort(dateObj)
  if (startDateObj) return `From ${formatShort(startDateObj)}`
  return null
}

function DatePickerField({ selectedDate, onDateChange, startDate, onStartDateChange,isOverdue }) {
  const [activeField, setActiveField] = useState("due")

  const dateObj = selectedDate ? new Date(selectedDate) : undefined
  const startDateObj = startDate ? new Date(startDate) : undefined

  const today = new Date()

const PRESETS = [
  { label: "Today", date: today },
  { label: "Tomorrow", date: addDays(today, 1) },
  { label: "This weekend", date: nextSaturday(today) },
  { label: "Next week", date: addWeeks(today, 1) },
  { label: "Next weekend", date: nextSaturday(addWeeks(today, 1)) },
  { label: "2 weeks", date: addWeeks(today, 2) },
  { label: "4 weeks", date: addWeeks(today, 4) },
]

  function handleSelect(date, close) {
    if (!date) return
    const formatted = toISODate(date)

    if (activeField === "start") {
      onStartDateChange(formatted)

        // agar start date due date ke baad ya equal hai
      if (selectedDate && formatted >= selectedDate) {
      // due date = start date + 1
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)
      onDateChange(toISODate(nextDay))
    }

      setActiveField("due")
    } else {
      onDateChange(formatted)

       // agar due date start date se pehle ya equal hai
      if (startDate && formatted <= startDate) {
      // start date = due date - 1
      const prevDay = new Date(date)
      prevDay.setDate(prevDay.getDate() - 1)
      onStartDateChange(toISODate(prevDay))
    }

       //close()
    }
  }

  const triggerLabel = renderTriggerLabel(startDateObj, dateObj)
  const hasAnyDate = Boolean(startDateObj || dateObj)

  return (
    <Popover
      trigger={
        <button
          className={`inline-flex items-center gap-1 px-1.5 py-1 rounded-md border text-xs font-medium whitespace-nowrap
            
            ${hasAnyDate
              ? `border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-300 ${isOverdue ? "text-red-600" : "text-indigo-700"}`
              : "border-slate-200 text-slate-400 hover:border-slate-300"}`}
        >
          <CalendarIcon className={`w-3.5 h-3.5 ${hasAnyDate ? "text-indigo-500" : "text-slate-300"}`} />
          {triggerLabel}
          {hasAnyDate && (
            <XMarkIcon
              className="w-3.5 h-3.5 ml-0.5 text-indigo-300 hover:text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                onDateChange(null)
                onStartDateChange(null)
              }}
            />
          )}
        </button>
      }
    >
     {(close) => (
  <div className="w-auto">

    {/* Top two fields */}
    <div className="flex gap-2 p-3 border-b border-slate-100">
      {/* Start date field — same as before */}
      <div
        onClick={() => setActiveField("start")}
        className={`flex-1 flex items-center justify-between px-2 py-1.5 rounded-md border text-xs cursor-pointer transition-colors duration-300
          ${activeField === "start" ? "border-indigo-300 bg-indigo-50" : "border-slate-200"}`}
      >
        <span className={startDateObj ? "text-indigo-700 font-medium" : "text-slate-400"}>
          {startDateObj ? formatDisplay(startDateObj) : "Start date"}
        </span>
        {startDateObj && (
          <XMarkIcon
            className="w-3.5 h-3.5 text-slate-400 hover:text-red-500"
            onClick={(e) => { e.stopPropagation(); onStartDateChange(null) }}
          />
        )}
      </div>

      {/* Due date field — same as before */}
      <div
        onClick={() => setActiveField("due")}
        className={`flex-1 flex items-center justify-between px-2 py-1.5 rounded-md border text-xs cursor-pointer transition-colors duration-300
          ${activeField === "due" ? "border-indigo-300 bg-indigo-50" : "border-slate-200"}`}
      >
        <span className={dateObj ? "text-indigo-700 font-medium" : "text-slate-400"}>
          {dateObj ? formatDisplay(dateObj) : "Due date"}
        </span>
        {dateObj && (
          <XMarkIcon
            className="w-3.5 h-3.5 text-slate-400 hover:text-red-500"
            onClick={(e) => { e.stopPropagation(); onDateChange(null) }}
          />
        )}
      </div>
    </div>

    {/* Presets + Calendar side by side */}
    <div className="flex">

      {/* Left — Presets */}
      <div className="w-36 border-r border-slate-100 py-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => {
              if (activeField === "start") {
                onStartDateChange(toISODate(preset.date))
                setActiveField("due")
              } else {
                onDateChange(toISODate(preset.date))
                close()
              }
            }}
            className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Right — Calendar */}
      <div className="p-2">
        <DayPicker
          mode="single"
          selected={activeField === "start" ? startDateObj : dateObj}
          onSelect={(date) => handleSelect(date, close)}
          className="text-sm"
        />
      </div>

    </div>

    {/* Clear all */}
    {(dateObj || startDateObj) && (
      <div className="border-t border-slate-100 px-2 py-1">
        <button
          onClick={() => {
            onDateChange(null)
            onStartDateChange(null)
            close()
          }}
          className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50 rounded"
        >
          <NoSymbolIcon className="w-4 h-4 text-slate-400" />
          Clear all
        </button>
      </div>
    )}

  </div>
)}
    </Popover>
  )
}

export default DatePickerField