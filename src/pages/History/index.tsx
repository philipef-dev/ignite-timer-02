import { useContext } from "react";
import { HistoryContainer, HistoryList, StatusView } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";

export function History() {
    const { cycles } = useContext(CyclesContext);
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            {/* <pre>
                {JSON.stringify(cycles, null, 2)}
            </pre> */}
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
                        <tr>
                            <td>Conserto de débitos técnicos </td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td><StatusView statusColor="yellow">Em andamento </StatusView></td>
                        </tr>
                        <tr>
                            <td>Conserto de débitos técnicos </td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td><StatusView statusColor="red">Em andamento </StatusView></td>
                        </tr>
                        <tr>
                            <td>Conserto de débitos técnicos </td>
                            <td>25 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <td><StatusView statusColor="green">Em andamento </StatusView></td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}