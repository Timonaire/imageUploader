export interface IImage{
    _id: string;
    filename: string;
    url: string;
    filepath: string;
    mimetype: string;
    size: number;
}

export interface ICreateUpload {
    filename: string;
    avatar: string;
}