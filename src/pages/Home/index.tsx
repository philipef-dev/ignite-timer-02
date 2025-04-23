import { useForm } from 'react-hook-form';
import { Play } from "phosphor-react";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod";
import {
    ContDownContainer,
    FormContainer,
    HomeContainer,
    MinutsAmountInput,
    Separator,
    StartCountDownButton,
    TaskInput
} from "./styles";
import { useState } from 'react';

const newCycleFormValidationSchema = zod.object({
    task: zod.string()
        .min(1, { message: "Informe a tarefa" }),
    minutesAmount: zod.number()
        .min(5, { message: "O ciclo precisa ser de no mínimo 5 minutos" })
        .max(60, { message: "O ciclo precisa ser de no mínimo 60 minutos" })
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface cycleProps {
    id: string;
    task: string;
    minutesAmount: number;
}

export function Home() {
    const [cycles, setCycles] = useState<cycleProps[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime())         
        
        const newCycle: cycleProps = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount            
        }

        setCycles((prevCycles) => [...prevCycles, newCycle ]);
        setActiveCycleId(id);

        reset();
    }

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    console.log(activeCycle)

    const task = watch('task');
    const minutes = watch('minutesAmount');

    const isSubmitDisabled = !task || !minutes;

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
                        step={5} min={5}
                        max={60}
                        {...register("minutesAmount", {
                            valueAsNumber: true
                        })}
                    />
                    <span>minutos.</span>
                </FormContainer>

                <ContDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </ContDownContainer>
                <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}