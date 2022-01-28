export interface IChatItemProps {
    id? : string;
    src : string;
    username : string;
    message : string;
    active? : boolean;
    key? : string;
    size : number;
    onClick? : () => void;
    width : string;
    notSeen? : number;
}

export interface StyleProps {
    width : string;
}