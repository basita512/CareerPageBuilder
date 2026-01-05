declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                companyId: string;
                role: string;
            };
        }
    }
}

export { };
