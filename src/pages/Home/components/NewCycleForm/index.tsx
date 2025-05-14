import * as zod from "zod";
import { FormContainer, MinutsAmountInput, TaskInput } from "./styles"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const newCycleFormValidationSchema = zod.object({
    task: zod.string()
        .min(1, { message: "Informe a tarefa" }),
    minutesAmount: zod.number()
        .min(5, { message: "O ciclo precisa ser de no mínimo 5 minutos" })
        .max(60, { message: "O ciclo precisa ser de no mínimo 60 minutos" })
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
        task: '',
        minutesAmount: 0
    }
});

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
                min={5}
                max={60}
                {...register("minutesAmount", {
                    valueAsNumber: true
                })}
            />
            <span>minutos.</span>
        </FormContainer>
    )
}