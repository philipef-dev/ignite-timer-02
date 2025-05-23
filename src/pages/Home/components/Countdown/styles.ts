import styled from "styled-components";

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