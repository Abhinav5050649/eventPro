import {connect} from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connect()

export async function PUT(request: NextRequest, {params}: any){
    try{
        const reqBody = await request.json();
        var {name, description, startDate, endDate, location, image, miscLinks} = reqBody
        
        const userId = getDataFromToken(request);
        const eventData = await Event.findById(params.id);
        
        name = name || eventData.name;
        description = description || eventData.description;
        startDate = startDate || eventData.startDate;
        endDate = endDate || eventData.endDate;
        location = location || eventData.location;
        image = image || eventData.image;
        miscLinks = miscLinks || eventData.miscLinks;

        if (userId !== eventData.creator){
            return NextResponse.json({error: "You must be the creator of the event to update it!"}, {status: 403})
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventData._id, {
            name, 
            description,
            startDate,
            endDate,
            location, 
            image,
            miscLinks
        }, {new: true});

        console.log(updatedEvent)

        return NextResponse.json({message: "Event Updated!", data: updatedEvent, status: 200})
        
    } catch (error: any){
        return NextResponse.json({error:error.message}, {status:500})
    }
}