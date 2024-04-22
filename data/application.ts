import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

export async function getApplicationByUserId(userId: string) {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            include: { group: true },
        })

        if (!user || !user.group) {
            return null // Return null jika pengguna atau group tidak ditemukan
        }

        const applications = await db.groupApplication.findMany({
            where: { groupId: user.group.id },
            include: {
                application: true,
            },
        })

        return applications
    } catch (error) {
        console.error("Error fetching applications:", error)
        throw error // Anda mungkin ingin membuang error untuk menangani di tempat lain
    } finally {
        await db.$disconnect()
    }
}
