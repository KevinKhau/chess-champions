import React from 'react';
import './App.css';
import ChessRankingService from "./ChessRankingService";
import {downloadExcel} from "./Utils";

function App() {
    const champions = ChessRankingService.getChampions();

    return (
        <div className="App">
            <header className="App-header">
                <h3>Chess Champions out of <a href="" onClick={()=> downloadExcel(ChessRankingService.getPlayers())}>{ChessRankingService.getPlayers().length} players</a></h3>
                <table>
                    <tbody>
                    <tr>
                        {
                            !!champions.length ?
                                Object.keys(champions[0]).map(key => <th key={key}>{key.toUpperCase()}</th>) :
                                "No champion found"
                        }
                    </tr>
                    {
                        champions.map((champion, index) =>
                            <tr key={'champion' + index}>
                                <td>{champion.name}</td>
                                <td>{champion.elo}</td>
                                <td>{champion.age}</td>
                            </tr>)
                    }
                    </tbody>
                </table>
            </header>
        </div>
    );
}

export default App;
