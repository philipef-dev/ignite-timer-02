import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

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
    }, (initialState) => {
        const storedStadeAsJson = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

        if (storedStadeAsJson) {
            return JSON.parse(storedStadeAsJson)
        }

        return initialState
    })

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date, new Date(activeCycle.startDate))
        }

        return 0
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)

    }, [cyclesState])


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
