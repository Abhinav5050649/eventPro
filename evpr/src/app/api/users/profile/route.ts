//define GET req which fetches username and events which user has created or participated in
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

        const eventsCreated: {ename: String, eObjId: ObjectId}[] = [];
        const eventsParticipated: {ename: String, eObjId: ObjectId}[] = [];

        user.eventsCreated.forEach((eObjId:ObjectId) => {
            Event.findById(eObjId)
            .then((eventDets) => {
                const ename = eventDets.name;
                eventsCreated.push({ename, eObjId});
            })
            .catch((err) => {
                console.log(err);
            })
        });

        user.eventsParticipated.forEach((eObjId:ObjectId) => {
            Event.findById(eObjId)
            .then((eventDets) => {
                const ename = eventDets.name;
                eventsParticipated.push({ename, eObjId});
            })
            .catch((err) => {
                console.log(err);
            })
        });

        return NextResponse.json({username, eventsCreated, eventsParticipated}, {status: 200});
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}