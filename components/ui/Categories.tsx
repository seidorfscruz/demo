
const Categories = ({ categories }: { categories: string[] }) => {
  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
        {
            categories.map( category => {
                return (
                    <button key={category} className="flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/40 hover:bg-primary/60 transition">
                        {category}
                    </button>
                )
            })
        }
    </div>
  )
}

export default Categories