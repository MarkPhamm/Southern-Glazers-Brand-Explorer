import { NextResponse } from "next/server";

export async function POST(req){
    const {name, email} = req.body;
    return NextResponse.json(
        {message: "Sucess"},
        {status: 200}
    )
}