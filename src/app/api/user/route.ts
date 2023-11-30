import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import * as z from 'zod'

const userSchema = z.object({
    username: z.string().min(1, 'Username is required').max(30, 'username must have not more than 30 character'),
    email: z.string().min(1, 'Email is required').email('invalid email'),
    password: z.string().min(1, 'Password  is required').min(8, 'Password must have than 8 character')
})

export async function POST(req: Request) {

    try {
        const body = await req.json()

        const { username, email, password } = userSchema.parse(body)
        const existingEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (existingEmail) {
            return NextResponse.json({ user: null, message: "email already exists!" }, { status: 409 })
        }
        const existingUsername = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        if (existingUsername) {
            return NextResponse.json({ user: null, message: "username already exists!" }, { status: 409 })
        }
        const hashedPassword = await hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        });

        const { password: newUserPassword, ...res } = newUser;


        return NextResponse.json({ user: res, check: "user created succesfully" }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ message: "something went wrong!" }, { status: 500 })
    }
    // console.log(data)
    //   return NextResponse.json({ check: "message" })
}