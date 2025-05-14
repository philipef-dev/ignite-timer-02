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

export const BaseCountDownButton = styled.button`
    width: 100%;
    display: flex;
    color: ${props => props.theme['gray-100']};
    padding: 1rem;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;

    border: none;
    border-radius: 8px;
    font-weight: bold;


    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`

export const StartCountDownButton = styled(BaseCountDownButton)`    
    background-color: ${props => props.theme['green-500']};

    &:not(:disabled):hover {
        background-color: ${props => props.theme['green-700']};
    }
`

export const InterruptCountDownButton = styled(BaseCountDownButton)`
    background-color: ${props => props.theme['red-500']};

    &:not(:disabled):hover {
        background-color: ${props => props.theme['red-700']};
    }
`