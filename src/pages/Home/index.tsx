import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, InterruptCountDownButton, StartCountDownButton } from "./styles";
import { useState, createContext } from 'react';
import { NewCycleForm } from './components/NewCycleForm';
import { Conutdown } from './components/Countdown';

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruputDate?: Date;
    finisheDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amontSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((prevCycles) => [...prevCycles, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);

        reset();
    }

    function handleInterruptCycle() {
        setActiveCycleId(null);
        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruputDate: new Date() }
                } else {
                    return cycle;
                }
            }))
    }    

    const task = watch('task');
    const minutesTask = watch('minutesAmount');

    const isSubmitDisabled = !task || !minutesTask;


    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <NewCycleForm />
                <Conutdown />

                {activeCycle ?
                    <InterruptCountDownButton type="button" onClick={handleInterruptCycle}>
                        <HandPalm size={24} />
                        Interromper
                    </InterruptCountDownButton> :
                    <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                        <Play size={24} />
                        Começar
                    </StartCountDownButton>
                }
            </form>
        </HomeContainer >
    )
}