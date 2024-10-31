"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordEncoder_1 = __importDefault(require("../src/utils/passwordEncoder"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const admin = await prisma.user.create({
        data: {
            name: 'Admin',
            lastName: 'Admin',
            gender: client_1.Gender.Other,
            email: 'admin@admin.com',
            phoneNumber: '123456789',
            birthDate: '2021-01-01',
            username: 'admin',
            password: (0, passwordEncoder_1.default)('admin'),
            role: client_1.Role.Admin,
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
//# sourceMappingURL=seed.js.map