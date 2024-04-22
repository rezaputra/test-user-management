import { db } from "@/lib/db"

// export async function getGroupByUserId(id: string) {
//     try {
//         const groups = await db.groupMember.findMany({ where: { userId: id }, include: { group: true } })

//         return groups.map((groupMember) => groupMember.group)
//     } catch (error) {
//         return null
//     }
// }
