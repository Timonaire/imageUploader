import { Model } from 'mongoose';
import { IImage, IGenericObject } from '../interfaces/index.interface';
import { ICreateUpload } from '../interfaces/index.interface';

class BaseService {
    constructor(public model: Model<IImage
>) {
        this.model = model;
    }

    async create(data: ICreateUpload) {
        return this.model.create(data);
    }

    async deleteOne(id: string) {
        return await this.model.findByIdAndDelete({ _id: id });
    }

    async findOne(filter: Partial<IImage
>) {
        return await this.model.findOne({ deleted: false, ...filter})
        .sort({ createdAt: -1 });
    }

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