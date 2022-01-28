import { Data } from "../../pages/account/[email]";

export interface IFilter {
    data : Data[],
    filteredData : Data[],
    filterValue : string
}

export type GET_DATA_ACTION = { type: string, payload : { data : Data[] } }
export type GET_FILTER_VALUE_ACTION = { type: string, payload: string }