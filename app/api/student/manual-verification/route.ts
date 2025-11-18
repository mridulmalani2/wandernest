import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const institute = formData.get('institute') as string;
    const nationality = formData.get('nationality') as string;
    const city = formData.get('city') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const idCardFile = formData.get('idCardFile') as File;

    // Validate required fields
    if (!email || !name || !institute || !nationality || !city || !coverLetter) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email },
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: 'A student with this email already exists' },
        { status: 409 }
      );
    }

    // In a real application, you would:
    // 1. Upload the ID card image to a cloud storage service (e.g., AWS S3, Cloudinary)
    // 2. Store the URL in the database
    // For now, we'll use a placeholder URL
    const idCardUrl = `placeholder-url-for-${email}-id-card`;

    // Create student with PENDING_APPROVAL status
    const student = await prisma.student.create({
      data: {
        email,
        name,
        institute,
        nationality,
        city,
        coverLetter,
        idCardUrl,
        status: 'PENDING_APPROVAL',
      },
    });

    // In a real application, you would:
    // 1. Send a confirmation email to the student
    // 2. Notify admins about the new manual verification request

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      studentId: student.id,
    });
  } catch (error) {
    console.error('Error processing manual verification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
