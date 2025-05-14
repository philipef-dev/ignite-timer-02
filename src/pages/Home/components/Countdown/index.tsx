import { use, useContext, useEffect } from "react";
import { ContDownContainer, Separator } from "./styles"
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../..";

export const Conutdown = () => {
    const { activeCycle} = useContext(CyclesContext);

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

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amontSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, "0");
    const seconds = String(secondsAmount).padStart(2, "0");

    useEffect(() => {
        document.title = `${minutes} : ${seconds}`
    }, [minutes, seconds])

    return (
        <ContDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </ContDownContainer>
    )
}