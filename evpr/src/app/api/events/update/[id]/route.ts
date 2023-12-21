import {connect} from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connect()

export async function PUT(request: NextRequest, params: {id: string}){
    try{
        const reqBody = await request.json();
        const {name, description, creationDate, startDate, endDate, location, image, registrationLinks, miscLinks} = reqBody
        
        const userId = getDataFromToken(request);
        const eventData = await Event.findById(params.id);

        if (userId !== eventData.creator){
            return NextResponse.json({error: "You must be the creator of the event to update it!"}, {status: 403})
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventData._id, {
            name, 
            description,
            creationDate,
            startDate,
            endDate,
            location, 
            image,
            registrationLinks,
            miscLinks
        }, {new: true});

        return NextResponse.json({message: "Event Updated!", updatedEvent}, {status: 200})
        
    } catch (error: any){
        return NextResponse.json({error:error.message}, {status:500})
    }
}