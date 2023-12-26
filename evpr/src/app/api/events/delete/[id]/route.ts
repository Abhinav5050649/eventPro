import {connect} from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connect()

export async function DELETE(request: NextRequest, {params}: any){
    try{
        const {id} = params;
        const userId = getDataFromToken(request);
        const eventData = await Event.findById(id);

        if (userId !== eventData.creator){
            return NextResponse.json({error: "You must be the creator of the event to delete it!"}, {status: 403})
        }

        const response = await Event.findByIdAndDelete(eventData._id)

        return NextResponse.json({message: "Event Deleted!", response})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}