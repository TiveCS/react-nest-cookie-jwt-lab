import React, {  useState } from "react";

function useInput(defaultValue = ''): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] {
    const [value, setValue] = useState(defaultValue)

    function onValueChangeHandler(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        setValue(e.target.value)
    }

    return [value, onValueChangeHandler]
}

export default useInput