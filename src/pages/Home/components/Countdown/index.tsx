import { useContext, useEffect } from "react";
import { ContDownContainer, Separator } from "./styles"
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../context/CyclesContext";

export const Conutdown = () => {
    const {
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed
    } = useContext(CyclesContext);

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
                    markCurrentCycleAsFinished();

                    setSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setSecondsPassed(secondsDifference);
                }
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

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