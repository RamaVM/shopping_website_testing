export const users = {
    standardUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },

    invalidUser: {
        username: 'ram',
        password: 'secret_sauce'
    },

    invalidPassword: {
        username: 'standard_user',
        password: 'ram'
    },

    invalidCredentials: {
        username: 'ram',
        password: 'bhim'
    }
};

export const boundaryData = {
    minMinusOne: 'a',
    min: 'ab',
    minPlusOne: 'abc',
    maxMinusOne: 'a'.repeat(19),
    max: 'a'.repeat(20),
    maxPlusOne: 'a'.repeat(21),
};