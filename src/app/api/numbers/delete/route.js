import { NextResponse } from 'next/server';
import connect from '../../../../../lib/db.js';
import Number from '../../../../../models/Number.js';

export async function DELETE(req) {
  await connect();

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: 'Number ID is required' }, { status: 400 });
    }

    const deletedNumber = await Number.findByIdAndDelete(id);

    if (!deletedNumber) {
      return NextResponse.json({ success: false, message: 'Number not found' }, { status: 404 });
    }
    const deletedUser = await Number.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Number deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
  }
}
