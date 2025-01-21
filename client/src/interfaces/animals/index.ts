interface BaseAnimalItem {
    name: string;
    species: string;
    gender: string;
    age: string;
    breed?: string;
    description?: string;
    found_home: boolean;
    location: string;
    date_added: Date;
    neutered: boolean;
    vaccinated: boolean;
}

export interface IAnimalItem extends BaseAnimalItem {
    id: number;
    images: IImageItem[];
}

export interface IImageItem extends BaseAnimalItem  {
    id: number;
    animal: number;
    photo: string;
}

export interface IAnimalCreate extends BaseAnimalItem {
    uploaded_images: File[];
}

export interface IAnimalEdit extends BaseAnimalItem {
    id: number;
    images: IImageItem[];
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