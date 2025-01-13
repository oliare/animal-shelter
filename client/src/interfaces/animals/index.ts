export interface IAnimalItem {
    id: number;
    name: string;
    species: string;
    gender: string;
    age: string;
    breed: string;
    description: string;
    found_home: boolean;
    location: string;
    date_added: Date;
    neutered: boolean;
    vaccinated: boolean;
    images: File[];
}

export interface IAnimalCreate {
    id: number;
    name: string;
    species: string;
    gender: string;
    age: string;
    breed: string;
    description?: string;
    location: string;
    neutered?: boolean;
    vaccinated?: boolean;
    uploaded_images: File[]; 
}

export interface ISelectParams {
    species: Record<string, string>;
    gender: Record<string, string>;
    age: Record<string, string>;
    breed: Record<string, string>;
}