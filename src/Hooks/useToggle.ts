import { useMemo, useState } from "react";

interface ToggleControl {
    readonly toggle: () => void;
    readonly off: () => void;
    readonly on: () => void;
}

export function useToggle(init?: boolean): readonly [flag: boolean, ToggleControl] {
    const [flag, setFlag] = useState(init || false)

    const toggleReturn = useMemo(() => {
        const on = () => setFlag(true)
        const off = () => setFlag(false)
        const toggle = () => setFlag(prev => !prev)


        const control = { toggle, off, on } as const
        return [flag, control] as const
    }, [flag])
    return toggleReturn
}