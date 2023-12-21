import {connect} from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function PUT(request: NextRequest, params: {id: String}){
    try{
        const id = params;
        const event = await Event.findById(id), userId = getDataFromToken(request);

        if (!event){
            return NextResponse.json({error: "Event not found!"}, {status: 404})
        }

        if (userId !== event.creator){
            return NextResponse.json({error: "You can't report your own event!"}, {status: 403})
        }

        event.views += 1
        event.numberOfReports += 1
        let percentValue = (event.views / event.numberOfReports) * 100, eventCreator = event.creator;
        const updatedEvent = await event.save()

        //mailer code here
        await sendEmail({percentValue, eventCreator})
        .then(() => {
            return NextResponse.json({message: "Event Reported!"}, {status: 200})
        })
        .catch((error: any) => {
            return NextResponse.json({message: error.message}, {status: 500})
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}