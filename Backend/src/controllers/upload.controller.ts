import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { asyncHandler } from '../utils/errors.util';
import { ApiError } from '../utils/errors.util';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class UploadController {
    static uploadImage = asyncHandler(async (req: Request, res: Response) => {
        if (!req.file) {
            throw new ApiError(400, 'No file provided');
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'careers-builder',
            transformation: [
                { width: 1920, height: 1080, crop: 'limit' },
                { quality: 'auto', fetch_format: 'auto' },
            ],
        });

        res.json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id,
            },
        });
    });

    static uploadVideo = asyncHandler(async (req: Request, res: Response) => {
        if (!req.file) {
            throw new ApiError(400, 'No file provided');
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'careers-builder/videos',
            resource_type: 'video',
        });

        res.json({
            success: true,
            data: {
                url: result.secure_url,
                publicId: result.public_id,
            },
        });
    });
}
