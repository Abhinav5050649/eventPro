import {connect} from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

connect()

export async function GET(request: NextRequest){
    try{
        const events = await Event.find().select("-views -numberOfReports -participants")

        return NextResponse.json({message: "Events Found!", success: true, events}, {status: 200});
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}