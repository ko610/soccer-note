import { Timestamp } from "firebase/firestore"
import { type GameTeamType, GameTeamModel } from "./GameTeam"

export interface GameType {
    id: string,
    type: string,
    createDate: Timestamp,
    updateDate: Timestamp,
    uid: string,
    date: string,
    title: string,
    weather: string,
    place: string,
    teams: Array<GameTeamType>,
    name1?: string,
    score1?: string,
    name2?: string,
    score2?: string,
    position: string,
    goodPoints: Array<string>,
    badPoints: Array<string>,
    next: string,
    comment: string,
    images?: Array<string>,
    boardIds?: Array<string>
}

export class GameModel implements GameType {
    id: string;
    type: string = "game";
    createDate: Timestamp;
    updateDate: Timestamp;
    uid: string;
    date: string;
    title: string;
    weather: string;
    place: string;
    teams: Array<GameTeamType> = [new GameTeamModel({})];
    name1?: string;
    score1?: string;
    name2?: string;
    score2?: string;
    position: string;
    goodPoints: Array<string>;
    badPoints: Array<string>;
    next: string;
    comment: string;
    images?: Array<string>;
    boardIds?: Array<string>;

    constructor(data: Partial<GameType>) {
        this.id = data.id || "";
        this.date = data.date || "";
        this.createDate = data.createDate || Timestamp.now();
        this.updateDate = data.updateDate || Timestamp.now();
        this.uid = data.uid || "";
        this.title = data.title || "";
        this.weather = data.weather || "";
        this.place = data.place || "";
        this.teams = data.teams || [new GameTeamModel({})];
        this.name1 = data.name1 || "";
        this.score1 = data.score1 || "";
        this.name2 = data.name2 || "";
        this.score2 = data.score2 || "";
        this.position = data.position || "";
        this.goodPoints = Array.isArray(data.goodPoints)
            ? data.goodPoints.map((item: any) => item.context ?? item) // 旧型 or 新型両対応
            : [];
        this.badPoints = Array.isArray(data.badPoints)
            ? data.badPoints.map((item: any) => item.context ?? item) // 旧型 or 新型両対応
            : [];
        this.next = data.next || "";
        this.comment = data.comment || "";
        this.images = data.images || [];
        this.boardIds = data.boardIds || [];
    }
}