import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

interface CreateCycleDate {
    task?: string,
    minutesAmount?: number
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleDate) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CycleContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider({
    children
}: CycleContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    })

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    function createNewCycle(data: CreateCycleDate) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setAmountSecondsPassed(0);
        dispatch(addNewCycleAction(newCycle))
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFinished,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}
