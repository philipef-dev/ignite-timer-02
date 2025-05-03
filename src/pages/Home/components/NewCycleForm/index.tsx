import { FormContainer, MinutsAmountInput, TaskInput } from "./styles"

export const NewCycleForm = () => {
    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text"
                id="task"
                list="task-suggestions"
                placeholder="Dê um nome para o seu projeto"
                disabled={!!activeCycle}
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

    )
}