type Player = {
    name: string;
    elo: number;
    age: number;
};

const ChessRankingService = {
    getChampions: function (): Player[] {
        const bestPlayersByAge = this.getBestPlayersByAge();
        if (!bestPlayersByAge.length) return [];
        return bestPlayersByAge.reduce((champions, agePlayers) => {
            const bestElo = champions.at(-1)?.elo || 0;
            return agePlayers[0].elo > bestElo ? champions.concat(agePlayers) : champions;
        });
    },
    getBestPlayersByAge: function (): Player[][] {
        const players = this.getPlayers();
        let bestPlayersByAge = [];
        for (const player of players) {
            const ageChampions = bestPlayersByAge[player.age];
            if (!ageChampions) {
                bestPlayersByAge[player.age] = [player];
            } else {
                const ageChampionElo = ageChampions[0].elo;
                if (ageChampionElo < player.elo) bestPlayersByAge[player.age] = [player];
                else if (ageChampionElo === player.elo) bestPlayersByAge[player.age].push(player);
            }
        }
        return bestPlayersByAge;
    },
    getPlayers: function (): Player[] {
        return require('./chess-players.json');
    }
};

export default ChessRankingService;
