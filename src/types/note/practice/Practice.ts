import { Timestamp } from "firebase/firestore"

export interface PracticeType {
    id: string,
    type: string,
    date: string,
    updateDate: Timestamp,
    createDate: Timestamp,
    title: string,
    uid: string,
    weather: string,
    place: string,
    details: Array<string>,
    goodPoints: Array<string>,
    badPoints: Array<string>,
    next: string,
    comment: string,
    images?: Array<string>,
    boardIds?: Array<string>
}


export class PracticeModel implements PracticeType {
    id: string
    type: string = "practice"
    date: string
    createDate: Timestamp
    updateDate: Timestamp
    title: string
    uid: string
    weather: string 
    place: string
    details: Array<string>
    goodPoints: Array<string>
    badPoints: Array<string>
    next: string
    comment: string
    images?: Array<string>
    boardIds?: Array<string>

    constructor(data: Partial<PracticeType>) {
        this.id = data.id || "";
        this.date = data.date || "";
        this.createDate = data.createDate || Timestamp.now();
        this.updateDate = data.updateDate || Timestamp.now();
        this.title = data.title || "";
        this.uid = data.uid || "";
        this.weather = data.weather || "";
        this.place = data.place || "";
        this.details = data.details || Array.isArray(data.details)
            ? data.details.map((item: any) => item.context ?? item) // 旧型 or 新型両対応
            : [];
        this.goodPoints = data.goodPoints || Array.isArray(data.goodPoints)
            ? data.goodPoints.map((item: any) => item.context ?? item) // 旧型 or 新型両対応
            : [];
        this.badPoints = data.badPoints || Array.isArray(data.badPoints)
            ? data.badPoints.map((item: any) => item.context ?? item) // 旧型 or 新型両対応
            : [];
        this.next = data.next || "";
        this.comment = data.comment || "";
        this.images = data.images || [];
        this.boardIds = data.boardIds || [];
    }
}