export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public errors?: any[]
    ) {
        super(message);
        this.name = 'ApiError';
        Error.captureStackTrace(this, this.constructor);
    }
}

export const asyncHandler = (fn: Function) => {
    return (req: any, res: any, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
