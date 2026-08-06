import { useState } from "react"
import { DayPicker } from "react-day-picker"
import { CalendarIcon, NoSymbolIcon, XMarkIcon } from "@heroicons/react/16/solid"
import Popover from "./Popover.jsx"

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

function DatePickerField({ selectedDate, onDateChange, startDate, onStartDateChange }) {
  const [activeField, setActiveField] = useState("due")

  const dateObj = selectedDate ? new Date(selectedDate) : undefined
  const startDateObj = startDate ? new Date(startDate) : undefined

  function handleSelect(date, close) {
    if (!date) return
    const formatted = toISODate(date)

    if (activeField === "start") {
      onStartDateChange(formatted)
      setActiveField("due")
    } else {
      onDateChange(formatted)
      close()
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
              ? "border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-300"
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
        <div className="w-80">

          <div className="flex gap-2 p-3 border-b border-slate-100">

            <div
              onClick={() => setActiveField("start")}
              className={`flex-1 flex items-center justify-between px-2 py-1.5 rounded-md border text-xs cursor-pointer
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

            <div
              onClick={() => setActiveField("due")}
              className={`flex-1 flex items-center justify-between px-2 py-1.5 rounded-md border text-xs cursor-pointer
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

          <div className="p-2">
            <p className="px-1 pb-1 text-xs font-medium text-slate-400">
              Picking: {activeField === "start" ? "Start date" : "Due date"}
            </p>
            <DayPicker
              mode="single"
              selected={activeField === "start" ? startDateObj : dateObj}
              onSelect={(date) => handleSelect(date, close)}
              className="text-sm"
            />
          </div>

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