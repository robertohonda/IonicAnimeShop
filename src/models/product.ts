
/*
export enum Genre{
    drama = 'Drama',
    action = 'Action',
    adventure = 'Adventure',
    romance = 'Romance',
};

export enum Category{
    manga = 'Manga',
    lightnovel = 'LightNovel'
};
*/

export interface Product{
    name: string;
    category: any;
    genres: Array<any>;
    img: string;
    description: string;
    quantity: number;
    price: number;
}