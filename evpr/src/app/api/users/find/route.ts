import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { ObjectId } from "mongoose";
import Event from "@/models/eventModel";

connect()

export async function POST(request: NextRequest){
    try {
        const {username} = await request.json();

        const user = await User.findOne({username})
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