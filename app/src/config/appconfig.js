const {
    NODE_ENV
} = process.env;

export const __DEV__ = NODE_ENV === 'development';
export const __SERVERSIDE__ = typeof window === 'undefined';
