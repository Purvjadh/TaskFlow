import { useState, useRef, useEffect } from "react"

function Popover({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg">
            {typeof children === "function" ? children(() => setIsOpen(false)) : children}
        </div>
    )}
    </div>
  )
}

export default Popover