import { Type } from "typescript";

declare module "*.svg" {
    const content: string;
    export default content;
}
declare module "*.png" {
    const value: Type;
    export = value;
}

declare module "*.ico" {
    const value: Type;
    export = value;
}