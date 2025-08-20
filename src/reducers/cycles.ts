import { Cycle } from "../context/CyclesContext";

interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}


export function cyclesReducer(state: CyclesState, action: any) {
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
}