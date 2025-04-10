import { useForm } from 'react-hook-form';
import { Play } from "phosphor-react";
import { ContDownContainer, FormContainer, HomeContainer, MinutsAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

type FormInputs = {
    tasks: string,
    minutesAmount: number
}

export function Home() {
    const { register, handleSubmit, watch } = useForm<FormInputs>();

    function handleCreateNewCycle(data: any) {
        console.log(data)

    }

    const task = watch('tasks');
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
                        {...register('tasks')}
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