import {connect} from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connect()

//for searching with name
export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {name} = reqBody

        const event = await Event.findOne({name});

        if (!event){
            return NextResponse.json({error: "Event not found!"}, {status: 404})
        }

        event.views += 1
        const eventData = await event.save()

        return NextResponse.json({message: "Event Found!", success: true, eventData}, {status: 200})

    } catch (error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}