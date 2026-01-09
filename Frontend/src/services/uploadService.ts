import apiClient from '@/lib/axiosConfig';

export interface UploadResponse {
    success: boolean;
    data: {
        url: string;
        publicId: string;
    };
}

export const uploadService = {
    /**
     * Upload an image file
     */
    async uploadImage(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('image', file);

        const response = await apiClient.post('/upload/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Upload a video file
     */
    async uploadVideo(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('video', file);

        const response = await apiClient.post('/upload/video', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Upload a resume file
     */
    async uploadResume(file: File): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('resume', file);

        const response = await apiClient.post('/upload/resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
};
