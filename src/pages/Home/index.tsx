import { useForm } from 'react-hook-form';
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod";
import {
    ContDownContainer,
    FormContainer,
    HomeContainer,
    InterruptCountDownButton,
    MinutsAmountInput,
    Separator,
    StartCountDownButton,
    TaskInput
} from "./styles";
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

const newCycleFormValidationSchema = zod.object({
    task: zod.string()
        .min(1, { message: "Informe a tarefa" }),
    minutesAmount: zod.number()
        .min(1, { message: "O ciclo precisa ser de no mínimo 5 minutos" })
        .max(60, { message: "O ciclo precisa ser de no mínimo 60 minutos" })
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface cycleProps {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruputDate?: Date;
    finisheDate?: Date;
}

export function Home() {
    const [cycles, setCycles] = useState<cycleProps[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amontSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;


    useEffect(() => {
        let interval: number

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date,
                    activeCycle.startDate
                )

                if (secondsDifference >= totalSeconds) {
                    setCycles((state) => state.map((cycle) => {
                        if (cycle.id === activeCycleId) {
                            return { ...cycle, finisheDate: new Date() }
                        } else {
                            return cycle;
                        }
                    }))

                    setAmountSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setAmountSecondsPassed(secondsDifference);
                }
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, totalSeconds, activeCycleId]);

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime())

        const newCycle: cycleProps = {
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

    const currentSeconds = activeCycle ? totalSeconds - amontSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    useEffect(() => {
        document.title = `${minutes} : ${seconds}`
    }, [minutes, seconds])

    const task = watch('task');
    const minutesTask = watch('minutesAmount');

    const isSubmitDisabled = !task || !minutesTask;

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        type="text"
                        id="task"
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        disable={!!activeCycle}
                        {...register('task')}
                    />
                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutsAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        disabled={!!activeCycle}
                        step={5} 
                        min={1}
                        max={60}
                        {...register("minutesAmount", {
                            valueAsNumber: true
                        })}
                    />
                    <span>minutos.</span>
                </FormContainer>

                <ContDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </ContDownContainer>
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