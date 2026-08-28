export interface Product {
    id : number;
    name : string;
    category : "Pria" | "Wanita"| "Kain";
    price : number;
    pattern : string;
    image: string;
    description : string;
}