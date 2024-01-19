//Import necessary models and packages
import BaseService from "./base.service";
import { Upload } from "../models/index.model";

export const uploadService = new BaseService(Upload)