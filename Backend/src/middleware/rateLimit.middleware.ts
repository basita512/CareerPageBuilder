import rateLimit from 'express-rate-limit';

// API rate limiter - in-memory store (simple and sufficient for assignments)
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per window per IP
    message: 'Too many requests, please try again later',
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

// Auth rate limiter - stricter limits for login/register
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 login attempts per window per IP
    message: 'Too many login attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});
