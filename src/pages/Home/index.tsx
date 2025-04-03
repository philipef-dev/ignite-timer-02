import { Play } from "phosphor-react";
import { ContDownContainer, FormContainer, HomeContainer, Separator } from "./styles";

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <input type="text" id="task" placeholder="Dê nome para o seu projeto" />

                    <label htmlFor="minutesAmount">durante</label>
                    <input type="number" id="minutesAmount" placeholder="- 00 +" />
                    <span>minutos.</span>
                </FormContainer>

                <ContDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span> 
                    <span>0</span>
                </ContDownContainer>
                <button> <Play size={24} /> Começar </button>
            </form>
        </HomeContainer >
    )
}