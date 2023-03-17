import ChessRankingService from './ChessRankingService'

describe('#getBestPlayersByAge', () => {

    it('with 0 player should return []', () => {
        ChessRankingService.getPlayers = jest.fn().mockReturnValue([]);
        expect(ChessRankingService.getBestPlayersByAge()).toEqual([]);
    });

    it('with 1 player should return array with 1 age player', () => {
        // Given: players with 1 entry
        const players = [{name: 'Ruben', age: 27, elo: 1700}];
        ChessRankingService.getPlayers = jest.fn().mockReturnValue(players);

        // When: #getBestPlayersByAge called
        const actual = ChessRankingService.getBestPlayersByAge();

        // Then: should equal array with age index to players
        const expected = [];
        expected[players[0].age] = players;
        expect(actual).toEqual(expected);
    });

    it('with 2 players with same age, same elo should return array with 1 age: 2 players', () => {
        const players = [{name: 'Ruben', age: 27, elo: 1700}, {name: 'Anne', age: 27, elo: 1700}];
        ChessRankingService.getPlayers = jest.fn().mockReturnValue(players);
        const expected = [];
        expected[players[0].age] = players;
        expect(ChessRankingService.getBestPlayersByAge()).toEqual(expected);
    });

    it('with 2 identical players should return array with 1 age: 2 players', () => {
        const ruben = {name: 'Ruben', age: 27, elo: 1700};
        const players = [ruben, ruben];
        ChessRankingService.getPlayers = jest.fn().mockReturnValue(players);
        const expected = [];
        expected[players[0].age] = players;
        expect(ChessRankingService.getBestPlayersByAge()).toEqual(expected);
    });

    it('with 2 players with same age, different elos should return array with 1 age: 1 player', () => {
        const ruben = {name: 'Ruben', age: 27, elo: 1800};
        const anne = {name: 'Anne', age: 27, elo: 1700};
        ChessRankingService.getPlayers = jest.fn().mockReturnValue([ruben, anne]);
        const expected = [];
        expected[ruben.age] = [ruben];
        expect(ChessRankingService.getBestPlayersByAge()).toEqual(expected);
    });

    it('with 2 players should return array with 2 age: 2 player', () => {
        const ruben = {name: 'Ruben', age: 27, elo: 1800};
        const felix = {name: 'Anne', age: 31, elo: 2000};
        ChessRankingService.getPlayers = jest.fn().mockReturnValue([ruben, felix]);
        const expected = [];
        expected[felix.age] = [felix];
        expected[ruben.age] = [ruben];
        expect(ChessRankingService.getBestPlayersByAge()).toEqual(expected);
    })

});

describe('#getChampions', () => {

    it('when #getBestPlayersByAge empty should return empty array', () => {
        ChessRankingService.getBestPlayersByAge = jest.fn().mockReturnValue([]);
        expect(ChessRankingService.getChampions()).toEqual([]);
    });

    it('with 1 ageBestPlayer should return 1 champion', () => {
        const ruben = {name: 'Ruben', age: 27, elo: 1800};
        const ageBestPlayers = [];
        ageBestPlayers[27] = [ruben];
        ChessRankingService.getBestPlayersByAge = jest.fn().mockReturnValue(ageBestPlayers);
        expect(ChessRankingService.getChampions()).toEqual([ruben]);
    });

    it('with 1 age: 2 bestPlayers should return 2 champions', () => {
        const ruben = {name: 'Ruben', age: 27, elo: 1800};
        const anne = {name: 'Anne', age: 27, elo: 1800};
        const ageBestPlayers = [];
        ageBestPlayers[27] = [ruben, anne];
        ChessRankingService.getBestPlayersByAge = jest.fn().mockReturnValue(ageBestPlayers);
        expect(ChessRankingService.getChampions()).toEqual([ruben, anne]);
    });


    it('with 2 age: 3 bestPlayers should return 2 champions', () => {
        const ruben = {name: 'Ruben', age: 27, elo: 1800};
        const anne = {name: 'Anne', age: 27, elo: 1800};
        const felix = {name: 'Felix', age: 31, elo: 2000};
        const ageBestPlayers = [];
        ageBestPlayers[27] = [ruben, anne, felix];
        ChessRankingService.getBestPlayersByAge = jest.fn().mockReturnValue(ageBestPlayers);
        expect(ChessRankingService.getChampions()).toEqual([ruben, anne, felix]);
    });

});