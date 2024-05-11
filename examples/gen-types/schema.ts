/* DO NOT MODIFY, AUTOGENERATED */
/* GENERATED BY KODARPC CLI AT SAT MAY 11 2024 04:35:50 GMT+0300 (MOSCOW STANDARD TIME) */

import { parseSchema, Schema } from "@koda-rpc/parser"

export interface IPet {
    id: number;
    name: string;
    owner: IOwner;
}

export interface IOwner {
    id: number;
    name: string;
}

export interface IPetService {
    getById(id: number): IPet;
}

export const schema: Schema = parseSchema(`svc PetService {
  getById(id: number): Pet;
}

contract Pet {
  number id;
  string name;
  Owner owner;
}

contract Owner {
  number id;
  string name;
}
`)
