const { hash } = require("bcrypt")

const userSeed = async () => {
    const datas = [
        {
            id: "clm9kn4fn0002ioxooeov6xlu",
            name: "admin",
            email: "adrien.quacchia@gmail.com",
            password: await hash("admin", 12),
        },
        {
            name: "test user",
            email: "test@test.com",
            password: await hash("1234", 12),
        },
    ]
    return datas
}

const addressSeed = [
    {
        label: "Maison",
        name: "Adrien Quacchia",
        phone: "0650635106",
        address: "11 voie du moulin",
        postalCode: "10600",
        city: "La Chapelle St Luc",
        country: "France",
        userId: "clm9kn4fn0002ioxooeov6xlu",
    },
]

const categorySeed = [
    {
        name: "Téléphones",
    },
]

const productSeed = [
    {
        name: "Samsung Galaxy S22",
        description: "Un super téléphone ultra rapide.",
        price: 799,
        categoryId: 1,
    },
    {
        name: "Apple Iphone 14",
        description: "Un super téléphone ultra rapide.",
        price: 899,
        categoryId: 1,
    },
    {
        name: "Samsung A52",
        description: "Un téléphone rapide.",
        price: 399,
        categoryId: 1,
    },
    {
        name: "Xiaomi Redmi Note 12",
        description: "Un téléphone rapide.",
        price: 499,
        categoryId: 1,
    },
    {
        name: "Apple Iphone SE 2022",
        description: "Un téléphone rapide.",
        price: 699,
        categoryId: 1,
    },
]

const variantSeed = [
    {
        productId: 1,
        sizeId: 5,
        colorId: 1,
        quantity: 99,
        price: 799,
    },
    {
        productId: 1,
        sizeId: 6,
        colorId: 1,
        quantity: 99,
        price: 799,
    },
    {
        productId: 1,
        sizeId: 5,
        colorId: 2,
        quantity: 99,
        price: 799,
    },
    {
        productId: 1,
        sizeId: 6,
        colorId: 2,
        quantity: 99,
        price: 799,
    },
]

const sizeSeed = [
    {
        name: "S",
    },
    {
        name: "M",
    },
    {
        name: "L",
    },
    {
        name: "XL",
    },
    {
        name: "128 Go",
    },
    {
        name: "256 Go",
    },
]

const colorSeed = [
    {
        name: "Noir",
    },
    {
        name: "Blanc",
    },
]

const carrierSeed = [
    {
        name: "Chronopost",
        description: "Livraison rapide.",
        price: 4.99,
    },
    {
        name: "Mondial Relay",
        description: "Livraison en point relais.",
        price: 3.99,
    },
]

module.exports = {
    categorySeed,
    productSeed,
    sizeSeed,
    colorSeed,
    carrierSeed,
    userSeed,
    addressSeed,
    variantSeed,
}
