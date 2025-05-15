import { useState, createContext } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCycleForm } from './components/NewCycleForm';
import { Conutdown } from './components/Countdown';
import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, InterruptCountDownButton, StartCountDownButton } from "./styles";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruputDate?: Date;
    finishDate?: Date;
}

interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

const newCycleFormValidationSchema = zod.object({
    task: zod.string()
        .min(1, { message: "Informe a tarefa" }),
    minutesAmount: zod.number()
        .min(5, { message: "O ciclo precisa ser de no mínimo 5 minutos" })
        .max(60, { message: "O ciclo precisa ser de no mínimo 60 minutos" })
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const newCyClyeleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { watch, reset, handleSubmit } = newCyClyeleForm

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        setCycles((state) => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishDate: new Date() }
            } else {
                return cycle;
            }
        }))
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

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
                <CyclesContext.Provider
                    value={{
                        activeCycle,
                        activeCycleId,
                        amountSecondsPassed,
                        markCurrentCycleAsFinished,
                        setSecondsPassed
                    }}
                >
                    <FormProvider {...newCyClyeleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Conutdown />
                </CyclesContext.Provider>

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