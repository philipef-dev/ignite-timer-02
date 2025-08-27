import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { NewCycleForm } from './components/NewCycleForm';
import { Conutdown } from './components/Countdown';
import { HandPalm, Play } from 'phosphor-react';
import { CyclesContext } from '../../context/CyclesContext';
import {
  HomeContainer,
  InterruptCountDownButton,
  StartCountDownButton,
} from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, { message: 'Informe a tarefa' }),
  minutesAmount: zod
    .number()
    .min(1, { message: 'O ciclo precisa ser de no mínimo 5 minutos' })
    .max(60, { message: 'O ciclo precisa ser de no mínimo 60 minutos' }),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);
  const newCyClyeleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { watch, handleSubmit, reset } = newCyClyeleForm;

  const task = watch('task');
  const minutesTask = watch('minutesAmount');

  const isSubmitDisabled = !task || !minutesTask;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCyClyeleForm}>
          <NewCycleForm />
        </FormProvider>
        <Conutdown />

        {activeCycle ? (
          <InterruptCountDownButton
            type="button"
            onClick={interruptCurrentCycle}
          >
            <HandPalm size={24} />
            Interromper
          </InterruptCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
