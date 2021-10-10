
import { Deta } from "deta";
import { nanoid } from "nanoid";


const deta = Deta("a0ojq87u_xgq3dQQLkXj3YBsJ5iJKZ5MTAtYmCLoF");

function generateModelKey(): string {
    const modelKey: string = nanoid(12);
    return modelKey;
}


export { deta, generateModelKey };