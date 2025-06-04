import { useContext } from "react";
import { HistoryContainer, HistoryList, StatusView } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";

export function History() {
    const { cycles } = useContext(CyclesContext);
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle =>
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutesAmount} minutos</td>
                                <td>{cycle.startDate.toISOString()}</td>
                                <td>
                                    {cycle.finishDate && (
                                        <StatusView statusColor="green">Concluído</StatusView>
                                    )}
                                    {cycle.interruputDate && (
                                        <StatusView statusColor="red">Interrompido</StatusView>
                                    )}
                                    {!cycle.finishDate && !cycle.interruputDate && (
                                        <StatusView statusColor="yellow">Em andamento</StatusView>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}