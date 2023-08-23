import { Dispatch } from "@reduxjs/toolkit"
import { finishLoading, startLoading } from "./uiSlice"



export const getUiInformation = () => {
    return async( dispatch: Dispatch ) => {
        // Primera acción - inicio
        dispatch( startLoading() )

        // Acción principal / HTTP request


        // Segunda acción - fin
        dispatch( finishLoading() )
    }
}