import connect from '../../../../lib/db.js';
import Number from '../../../../models/Number.js';

export async function GET() {
  await connect();
  const numbers = await Number.find().sort({ createdAt: -1 });
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

    const newNumber = await Number.create({ number, status:"valid" });

    return new Response(JSON.stringify(newNumber), {
      status: 201,
    });
  } catch (err) {
    console.error("POST /api/numbers error:", err);
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

    const deleted = await Number.findOneAndDelete({ number });

    if (!deleted) {
      return new Response(JSON.stringify({ error: 'Number not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: 'Number deleted successfully' }), {
      status: 200,
    });
  } catch (err) {
    console.error("DELETE /api/numbers error:", err);
    return new Response(JSON.stringify({ error: 'Failed to delete number' }), {
      status: 500,
    });
  }
}
