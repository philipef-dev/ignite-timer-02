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

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function CyclesContextProvider({
    children
}: CycleContextProviderProps) {
    const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
        switch (action.type) {
            case "ADD_NEW_CYCLE":
                return {
                    ...state,
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id
                };
            case "INTERRUPT_CURRENT_CYCLE":
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                            return { ...cycle, interruputDate: new Date() }
                        } else {
                            return cycle;
                        }
                    }),
                    activeCycleId: null
                };
            case "MARK_CURRENTY_CYCLE_FINISHED":
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                            return { ...cycle, finishDate: new Date() }
                        } else {
                            return cycle;
                        }
                    }),
                    activeCycleId: null
                };
            default:
                return state
        }
    }, {
        cycles: [],
        activeCycleId: null  
    })

const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

const { cycles, activeCycleId } = cyclesState;
const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

function markCurrentCycleAsFinished() {
    dispatch({
        type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
        payload: ''
    })
}

function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
}

function interruptCurrentCycle() {
    dispatch({
        type: 'INTERRUPT_CURRENT_CYCLE',
        payload: ''
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
