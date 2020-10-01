export const API = process.env.REACT_APP_API_URL_CONNECTION;
export const fixedPrice = [
    {
        _id: 0,
        name: 'Any',
        array: [],
    },
    {
        _id: 1,
        name: "Dưới 50k",
        array: [0, 49000]
    },
    {
        _id: 2,
        name: "Từ 50k đến 100k",
        array: [50000, 100000]
    },
    {
        _id: 3,
        name: "Từ 100k đến 1000k",
        array: [101000, 1000000]
    },
    {
        _id: 4,
        name: "Trên 1000k",
        array: [1001000, 100000000]
        },
]