const { PrismaClient } = require("@prisma/client")
const {
    productSeed,
    categorySeed,
    sizeSeed,
    colorSeed,
    carrierSeed,
    userSeed,
    addressSeed,
    variantSeed,
} = require("./seedDatas")

const prisma = new PrismaClient()
async function main() {
    /*     const testUser = await prisma.user.upsert({
        where: { email: "test@test.com" },
        update: {},
        create: {
            email: "test@test.com",
            name: "Test user",
            password: password,
        },
    })
    console.log({ testUser }) */

    //delete existing datas
    await prisma.user.deleteMany()
    await prisma.carrier.deleteMany()
    await prisma.address.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.color.deleteMany()
    await prisma.size.deleteMany()

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Carrier AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Address AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Color AUTO_INCREMENT = 1`
    await prisma.$queryRaw`ALTER TABLE Size AUTO_INCREMENT = 1`

    //populate datas
    const userSeedHashed = await userSeed()
    const user = await prisma.user.createMany({
        data: userSeedHashed,
    })
    const address = await prisma.address.createMany({
        data: addressSeed,
    })
    const carrier = await prisma.carrier.createMany({
        data: carrierSeed,
    })
    const category = await prisma.category.createMany({
        data: categorySeed,
    })
    const color = await prisma.color.createMany({
        data: colorSeed,
    })
    const size = await prisma.size.createMany({
        data: sizeSeed,
    })
    const product = await prisma.product.createMany({
        data: productSeed,
    })
    await prisma.productVariant.createMany({
        data: variantSeed,
    })

    console.log("user", user)
    console.log("address", address)
    console.log("carrier", carrier)
    console.log("category", category)
    console.log("product", product)
    console.log("color", color)
    console.log("size", size)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
