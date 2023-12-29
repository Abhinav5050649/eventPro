// Import necessary modules and models
import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import getDataFromToken from "@/helpers/getDataFromToken";

// Connect to the database
connect();

// Define the PUT endpoint function
export async function PUT(request: NextRequest, { params }: any) {
  try {
    // Parse the JSON body of the request
    const reqBody = await request.json();

    // Destructure request body properties
    const {
      name,
      description,
      startDate,
      endDate,
      location,
      image,
      miscLinks,
    } = reqBody;

    // Get the user ID from the token
    const userId = getDataFromToken(request);

    // Use the id directly from params
    const eventId = params.id.substring(1);
    // Find the event by ID from the database
    const eventData = await Event.findById(eventId);

    // Check if the user is the creator of the event
    if (userId != eventData.creator) {
      return NextResponse.json(
        { error: "You must be the creator of the event to update it!" },
        { status: 403 }
      );
    }

    console.log(new Date(Date.parse(startDate)), new Date(Date.parse(endDate)))

    // Update event details with non-null values from the request body
    eventData.name = name || eventData.name;
    eventData.description = description || eventData.description;
    eventData.startDate = startDate ? new Date(Date.parse(startDate)) : eventData.startDate;
    eventData.endDate = endDate ? new Date(Date.parse(endDate)) : eventData.endDate;
    eventData.location = location || eventData.location;
    eventData.image = image || eventData.image;
    eventData.miscLinks = miscLinks || eventData.miscLinks;

    // Save the updated event details to the database
    const updatedEvent = await eventData.save();

    // Log the updated event to the console
    console.log(updatedEvent);

    // Return a consistent JSON response indicating success
    return NextResponse.json({
      message: "Event Updated!",
      data: updatedEvent,
      status: 200,
    });
  } catch (error: any) {
    // Return a consistent JSON response with an error message if an error occurs
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
