import passwordEncoder from "../src/utils/passwordEncoder"
import { Role, PrismaClient, Gender } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.create({
        data: {
            name: 'Admin',
            lastName: 'Admin',
            gender: Gender.Other,
            email: 'admin@admin.com',
            phoneNumber: '123456789',
            birthDate: '2021-01-01',
            username: 'admin',
            password: passwordEncoder('admin'),
            role: Role.Admin,
        }, 
    });
    console.log({ admin });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });