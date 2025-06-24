import connect from "../../../../lib/db.js";
import Send from "../../../../models/Send.js"; // Import the Number model

export async function GET() {
  await connect();
  const numbers = await Send.find().sort({ createdAt: -1 });
  return Response.json(numbers);
}

export async function POST(req) {
  try {
    await connect();
    const body = await req.json();

    const { number } = body;

    if (!number) {
      return new Response(JSON.stringify({ error: 'Number is required' }), {
        status: 400,
      });
    }

    const newNumber = await Send.create({ number, status: "Send" });

    return new Response(JSON.stringify(newNumber), {
      status: 201,
    });
  } catch (err) {
    console.error("POST /api/send error:", err);
    return new Response(JSON.stringify({ error: 'Failed to add number' }), {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  try {
    await connect();
    const body = await req.json();
    const { number } = body;

    if (!number) {
      return new Response(JSON.stringify({ error: 'Number is required' }), {
        status: 400,
      });
    }

    const deleted = await Send.findOneAndDelete({ number });

    if (!deleted) {
      return new Response(JSON.stringify({ error: 'Number not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: 'Number deleted successfully' }), {
      status: 200,
    });
  } catch (err) {
    console.error("DELETE /api/send error:", err);
    return new Response(JSON.stringify({ error: 'Failed to delete number' }), {
      status: 500,
    });
  }
}
