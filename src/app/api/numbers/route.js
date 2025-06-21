// Example: app/api/numbers/route.js
import connect from '../../../../lib/db.js'; // Import the MongoDB connection function
import Number from '../../../../models/Number.js'; // Import the Number model

export async function GET() {
  await connect(); // ⬅️ Connect to MongoDB
  const numbers = await Number.find().sort({ createdAt: -1 });
  return Response.json(numbers);
}
