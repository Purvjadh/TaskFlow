function IconButton({ icon: Icon, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-sm border transition-colors shrink-0 ${
        active
          ? "border-indigo-300 bg-indigo-50 text-indigo-600"
          : "border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

export default IconButton