import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;

    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }      
`

export const FormContainer = styled.div`     
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme['gray-100']};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`

export const ContDownContainer = styled.div`
    font-family: 'Roboto Mono', sans-serif;
    font-weight: bold;
    font-size: 10rem;
    color: ${props => props.theme['gray-100']};

    display: flex;
    gap: 1rem;

    span {
        padding: 2rem 1rem;
        background-color: ${props => props.theme['gray-700']};
        border-radius: 8px;
    }
`

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${props => props.theme['green-500']};
    display: flex;
    justify-content: center;
`

export const StartCountDownButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;

    border: none;
    border-radius: 8px;
    color: ${props => props.theme['gray-100']};
    background-color: ${props => props.theme['green-500']};
    padding: 1rem;

    font-weight: bold;

    &:disabled {
        background-color: ${props => props.theme['green-500']};
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background-color: ${props => props.theme['green-700']};
    }
`

export const BaseInput = styled.input`
    background-color: transparent;
    border: none;
    height: 2.5rem;
    border-bottom: 2px solid ${props => props.theme['gray-500']};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${props => props.theme['gray-100']};
`

export const TaskInput = styled(BaseInput)`
    flex: 1;
`

export const MinutsAmountInput = styled(BaseInput)`
    width: 4rem;
`