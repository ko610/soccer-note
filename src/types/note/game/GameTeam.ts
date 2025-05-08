export interface GameTeamType {
    team: string,
    score1: string,
    score2: string,
}

export class GameTeamModel implements GameTeamType {
    team: string = "";
    score1: string = "";
    score2: string = "";

    constructor(data: Partial<GameTeamType>) {
        this.team = data.team || "";
        this.score1 = data.score1 || "";
        this.score2 = data.score2 || "";
    }
}