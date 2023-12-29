import {connect} from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import getDataFromToken from "@/helpers/getDataFromToken";

connect()

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        var {name, description, startDate, endDate, location, image, miscLinks} = reqBody;

        if (image == "")   image = process.env.DEFAULT_EVENT_IMG;

        const userId = getDataFromToken(request);

        if (!userId){
            return NextResponse.json({error: "You must be logged in to create an event!"}, {status: 403});
        }

        const eventData = {
            name, 
            description,
            startDate: new Date(Date.parse(startDate)),
            endDate: new Date(Date.parse(endDate)),
            location, 
            image,
            creator: userId,
            creationDate: new Date(),
            miscLinks
        }

        const event = await Event.create(eventData);

        const user = await User.findById(userId);
        user.eventsCreated.push(event._id);
        await user.save();
        return NextResponse.json({message: "Event Created!", event}, {status: 201});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}