import {connect} from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connect()

export async function PUT(request: NextRequest, params: {id: String}){
    try{
        const {id} = params;

        const event = await Event.findById(id), userId = getDataFromToken(request);

        if (!event){
            return NextResponse.json({error: "Event not found!"}, {status: 404})
        }

        if (userId === event.creator){
            return NextResponse.json({error: "You cant be the creator of the event and participate!"}, {status: 403})
        }

        if (event.participants.includes(userId)){
            event.participants = event.participants.remove(userId);
            event.views += 1
            event.save()
            .then(() => {return NextResponse.json({message: "You are no longer participating in this event!"}, {status: 200}) })
            .catch((error: any) => {return NextResponse.json({error: error.message}, {status: 500})})
        }

        event.participants.push(userId);
        event.views += 1
        event.save()
        .then(() => {return NextResponse.json({message: "You are now participating in this event!"}, {status: 200}) })
        .catch((error: any) => {return NextResponse.json({error: error.message}, {status: 500})})
    } catch (error: any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}