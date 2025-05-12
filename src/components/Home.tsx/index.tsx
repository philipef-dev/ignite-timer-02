// Entendendo contexto

import { createContext, useContext, useState } from 'react';

const CyclesContext = createContext({} as any)

function NewCycleForm() {
    let { activeCycle, setActiveCycle } = useContext(CyclesContext);

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <h2>NewCycle: {activeCycle} </h2>
            <button onClick={() => setActiveCycle(5)}>Alterar Ciclo</button>
        </div>
    )
}

function CountDown() {
    const { activeCycle } = useContext(CyclesContext);
    return (
        <h2>CountDown: {activeCycle} </h2>
    )
}

export const Home = () => {
    const [activeCycle, setActiveCycle] = useState(0)

    return (
        <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
            <div>
                <NewCycleForm />
                <CountDown />
            </div>
        </CyclesContext.Provider>
    )
}