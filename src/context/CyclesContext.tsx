import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleDate {
    task?: string,
    minutesAmount?: number
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruputDate?: Date;
    finishDate?: Date;
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
    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
        console.log('Testando dispatch', action);
        return state
    }, []);


    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        // setCycles((state) => state.map((cycle) => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, finishDate: new Date() }
        //     } else {
        //         return cycle;
        //     }
        // }))
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: ''
        })
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function interruptCurrentCycle() {
        setActiveCycleId(null);
        // setCycles((state) =>
        //     state.map((cycle) => {
        //         if (cycle.id === activeCycleId) {
        //             return { ...cycle, interruputDate: new Date() }
        //         } else {
        //             return cycle;
        //         }
        //     }))
        dispatch({
            type: 'INTERRUPT_CYCLE',
            payload: {
                activeCycleId
            }
        })
    }

    function createNewCycle(data: CreateCycleDate) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        // setCycles((prevCycles) => [...prevCycles, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle
            }
        })
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
