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
    images: string[];
}

export interface IImageItem {
    id: number;
    animal: number;
    photo: string;
}

export interface IAnimalCreate {
    name: string;
    species: string;
    gender: string;
    age: string;
    breed?: string;
    description?: string;
    location: string;
    neutered?: boolean;
    vaccinated?: boolean;
    uploaded_images: File[]; 
}
export interface IAnimalEdit {
    id: number;
    name: string;
    species: string;
    gender: string;
    age: string;
    breed?: string;
    description?: string;
    location: string;
    neutered?: boolean;
    vaccinated?: boolean;
    images: string[];
    uploaded_images: IUploadedFile[]; 
}

export interface ISelectParams {
    species: Record<string, string>;
    gender: Record<string, string>;
    age: Record<string, string>;
    breed: Record<string, string>;
}

export interface IUploadedFile {
    id: number;
    image: string;
    priority: number;
    preview: any;
    url: any;
    originFileObj: File;
    size: number;
    type: string;
    uid: string;
}