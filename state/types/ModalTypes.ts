import { ReactNode } from "react"

export interface IModal {
    open : boolean;
    imageModal : {
        open : boolean;
        src : string;
        imageName : string;
        children : ReactNode | null;
    },
}

type PAYLOAD = Partial<IModal["imageModal"]>;

export type GET_IMAGE_MODAL_DATA = { type : string, payload : PAYLOAD }