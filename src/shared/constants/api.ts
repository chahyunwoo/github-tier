const DEFAULT_CACHE_TTL = 3600;

export const CACHE_TTL = Number(process.env.CACHE_SECONDS) || DEFAULT_CACHE_TTL;
