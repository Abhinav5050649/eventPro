import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest, { params }: any) {
  try {
    const { id } = params;

    // Use substring instead of remove and convert to number
    const eventId = (id.substring(1));

    const event = await Event.findById(eventId.toString())

    if (!event) {
      return NextResponse.json({ error: "Event not found!" }, { status: 404 });
    }

    const updateSuccess = await event.save();

    return NextResponse.json({ message: "Event Found!", success: true, data: event, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
