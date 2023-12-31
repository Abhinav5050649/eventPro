import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function PUT(request: NextRequest, { params }: any) {
  try {
    var { id } = params;

    if (!id) {
      console.log("Block 1");
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    var id1 = id.substring(1);

    const event = await Event.findById(id1);
    const userId = getDataFromToken(request);

    const user = await User.findById(userId);

    if (!event) {
      console.log("Block 2");
      return NextResponse.json({ error: "Event not found!" }, { status: 404 });
    }

    if (userId == event.creator) {
      console.log("Block 3");
      return NextResponse.json(
        {
          error: "You can't be the creator of the event and participate!",
        },
        { status: 403 }
      );
    }

    if (event.participants.includes(userId)) {
      console.log("Block 4");

      event.participants.pull(userId);
      user.eventsParticipated.pull(event._id);

      // Add mail code here
      let messageText = `You are no longer a participant of Event: ${event.name}, starting on ${event.startDate}`;
      let subjectText = `Non-Participation in Event: ${event.name}`
      
      await Promise.all([user.save(), event.save()]);

      await sendEmail({ message: messageText, subject: subjectText, userId: user._id})
      
      return NextResponse.json(
        { message: "You are no longer participating in this event!" },
        { status: 200 }
      );
    } else {
      console.log("Block 5");

      event.participants.push(user._id);
      user.eventsParticipated.push(event._id);

      // Add mail code here
      let messageText = `You are now a participant of Event: ${event.name}, starting on ${event.startDate}`;
      let subjectText = `Participation in Event: ${event.name}`

      await Promise.all([user.save(), event.save()]);

      await sendEmail({ message: messageText, subject: subjectText, userId: user._id})
      
      return NextResponse.json(
        { message: "You are participating in this event!" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error in participation:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
