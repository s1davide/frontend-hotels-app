import React, { useEffect, useRef, useState } from "react"
import { ButtonGroup, IconButton } from "rsuite"
import PlusIcon from "@rsuite/icons/Plus"
import MinusIcon from "@rsuite/icons/Minus"
type PropsInputNumberCustom = {
    value?: number
    onChange: (param: { value: number }) => void
    max?: number
    min?: number
}
function InputNumberCustom(props: PropsInputNumberCustom) {
    const [count, setCount] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        setCount(props.value || 0)
    }, [props.value])
    const min = props.min ? props.min : 0
    const max = props.max ? props.max : 30

    const changeValue = async (action: "+" | "-", customValue: string = "") => {
        const customValueInt = parseInt(customValue)
        if (Number.isNaN(customValueInt) && customValue !== "") return
        if (
            (action === "+" &&
                (customValue ? customValueInt : count + 1) > max) ||
            (action === "-" && (customValue ? customValueInt : count - 1) < min)
        ) {
            return
        }
        const currentCount = await new Promise<number>((res) =>
            setCount((currentCount) => (res(currentCount), currentCount))
        )
        const changeIncrease = customValue ? customValueInt : currentCount + 1
        const changeDecrease = customValue ? customValueInt : currentCount - 1
        if (action === "+") {
            setCount(changeIncrease)
            props.onChange && props.onChange({ value: changeIncrease })
        } else {
            setCount(changeDecrease)
            props.onChange && props.onChange({ value: changeDecrease })
        }
    }

    const inputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "") {
            setCount(0)
            props.onChange && props.onChange({ value: 0 })
        } else {
            changeValue(parseInt(value) > count ? "+" : "-", value)
        }
    }

    return (
        <div>
            <ButtonGroup className="border-1 border-solid border-round-md border-400">
                <IconButton
                    onClick={() => changeValue("-")}
                    icon={<MinusIcon />}
                ></IconButton>
                <input
                    ref={inputRef}
                    onChange={inputChange}
                    style={{ width: "30px" }}
                    max={max}
                    value={count}
                    className="px-1 rs-btn rs-btn-default"
                />
                <IconButton
                    onClick={() => changeValue("+")}
                    icon={<PlusIcon />}
                ></IconButton>
            </ButtonGroup>
        </div>
    )
}

export default InputNumberCustom
