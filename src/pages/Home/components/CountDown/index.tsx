import { ContDownContainer, Separator } from "./styles"

export const CountDown = () => {
    return (
        <ContDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>: </Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </ContDownContainer>
    )
}