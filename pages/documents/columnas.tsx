"use client"

import { Button } from "@/registry/default/ui/button"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  name: string
  date: string
  descriptions: string
  autor: string
}

export const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
  {
    accessorKey: "descriptions",
    header: "Descriptions",
  },
  {
    accessorKey: "autor",
    header: "Autor",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "edit",
    header: () => <div className="text-left">Edit</div>,
    id:"actions",
    cell: ({ row }) => {
        const payment = row.original
        return ( <div className="text-left font-medium">
 <button value={payment.id} className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>


  </button>

 </div>
          )
    }
  },
  {
    accessorKey: "delete",
    header: () => <div className="text-left">Delete</div>,
    id:"actions",
    cell: ({ row }) => {
        const payment = row.original
        return ( <div className="text-left font-medium">
  <button value={payment.id} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>


  </button>

 </div>
          )
    }
  },
]
