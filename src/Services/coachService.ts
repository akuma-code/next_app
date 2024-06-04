// 'use server'

// import { _log } from "@/Helpers/helpersFns";
// import db from "@/client/client"

// export async function createCoach(payload: { first_name: string, second_name?: string | null }) {
//     const { first_name, second_name } = payload;

//     try {
//         const c = await db.coach.create({
//             data: {
//                 first_name, second_name
//             },
//             select: { first_name: true, second_name: true }
//         })
//         return c
//     } catch (error) {
//         throw new Error("Create coach error!")
//     }
// }

// export async function getAllCoaches() {
//     const coaches = await db.coach.findMany()
//     return coaches
// }


// // export async function connectCoachToPlayer(playerId: number, coachId: number, eventId: number) {
// //     const c = db.coach
// //     const p = db.player
// //     const e = db.event
// //     try {
// //         const connect = await p.update({
// //             where: { id: playerId },
// //             data: {
// //                 Coach: {
// //                     connect: {
// //                         id: coachId,

// //                     },
// //                     update: {
// //                         events: { connect: { id: eventId } }
// //                     }
// //                 },
// //                 events: {
// //                     connect: { id: eventId }
// //                 }
// //             },
// //             select: { id: true, name: true, Coach: true, events: true }
// //         })
// //         return connect
// //     } catch (error) {
// //         _log(error)
// //     }

// // }