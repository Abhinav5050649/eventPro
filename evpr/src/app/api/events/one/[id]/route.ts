import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest, params: {id: String}){
    try{
        const {id} = params;
        const event = await Event.findById(id).select("-views -numberOfReports -participants");

        if (!event){
            return NextResponse.json({error: "Event not found!"}, {status: 404})
        }
        event.views += 1
        event.save()
        .then(() => {
            return NextResponse.json({message: "Event Found!", success: true, event}, {status: 200})
        })
        .catch((error: any) => {
            return NextResponse.json({error: error.message}, {status: 500})
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}