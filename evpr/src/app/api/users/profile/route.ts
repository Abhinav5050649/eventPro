import {connect} from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import Event from "@/models/eventModel";
import getDataFromToken from "@/helpers/getDataFromToken";
import { ObjectId } from "mongoose";

connect()

export async function GET(request: NextRequest){
    try{
        const userId = getDataFromToken(request);
        const user = await User.findById(userId), username = user.username;

        const eventsParticipated: {ename: String, eObjId: String}[] = [];

        for (const event of user.eventsParticipated){
            const eObjId = event;
            const eObj = await Event.findById(eObjId);
            const ename = eObj.name;
            eventsParticipated.push({ename, eObjId});
        }
        
        console.log(eventsParticipated)
        return NextResponse.json({username, eventsParticipated}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}