import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { ObjectId } from "mongoose";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "You must be logged in to create an event!" }, { status: 403 });
    }

    const eventsCreatedByUser: any[] = await Promise.all(
      user.eventsCreated.map(async (eObjId: any) => {
        const eventData = await Event.findById(eObjId);
        return eventData;
      })
    );

    return NextResponse.json({ message: "Events Found!", success: true, data: eventsCreatedByUser, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
