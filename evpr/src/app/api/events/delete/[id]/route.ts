import {connect} from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connect()

export async function DELETE(request: NextRequest, {params}: any){
    try{
        const {id} = params;
        const userId = getDataFromToken(request);
        const eventId = id.substring(1);
        const eventData = await Event.findById(eventId);

        if (userId.toString() != eventData.creator){
            return NextResponse.json({error: "You must be the creator of the event to delete it!"}, {status: 403})
        }

        const response = await Event.findByIdAndDelete(eventData._id)

        return NextResponse.json({message: "Event Deleted!", response})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}