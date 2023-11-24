export interface Libro {
    title : string
    races : RaceInfo[];
}
export interface RaceInfo {
    name : string;
    desc : string;
    slug : string
}