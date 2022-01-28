export interface IAvatarProps {
    src : string;
    size : number;
    onClick? : () => void;
    active? : boolean;
}

export interface IAvatarStylesProps {
   size : number;
}