import React from "react"

const InputError = (thereIsError: boolean, error: string) => {
    return thereIsError ? (
        <small className="p-error">{error}</small>
    ) : (
        <small className="p-error">&nbsp;</small>
    )
}

export default InputError
