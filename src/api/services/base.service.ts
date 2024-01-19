//Importing the necessary models and packages
import { Model } from 'mongoose';
import { IImage, IGenericObject, IUploadImage } from '../interfaces/index.interface';

//Creating a general service class
class BaseService {
    constructor(public model: Model<IImage
>) {
        this.model = model;
    }

    //For creating a file
    async create(data: IUploadImage) {
        return this.model.create(data);
    }

    //For deleting a single file
    async deleteOne(id: string) {
        return await this.model.findByIdAndDelete({ _id: id });
    }

    //For searching for a single file
    async findOne(filter: Partial<IImage
>) {
        return await this.model.findOne({ deleted: false, ...filter})
        .sort({ createdAt: -1 });
    }

    //For getting all available files
    async findAll(filter: Partial<IImage
> & IGenericObject) {
        const page = filter?.page ? parseInt(filter?.page) : 1;
        const uploadsPerPage = filter?.limit ? parseInt(filter?.limit) : 10;
        
        delete filter?.page
        delete filter?.limit
    
        let uploads: IImage
[] = [];
        let totalCount: number;

        if (filter) {
            totalCount = await this.model.countDocuments(filter);
            uploads = await this.model.find(filter )
                .skip((page - 1) * uploadsPerPage)
                .limit(uploadsPerPage)
                .sort({ createdAt: -1 })
                .select('-__v');
        } else {
            totalCount = await this.model.countDocuments();
            uploads = await this.model.find({})
                .skip((page - 1) * uploadsPerPage)
                .limit(uploadsPerPage)
                .sort({ createdAt: -1 })
                .select('-__v');
        }
        
        return {
            uploads,
            currentPage: page,
            totalPages: Math.ceil(totalCount / uploadsPerPage)
        };
    }
}

export default BaseService