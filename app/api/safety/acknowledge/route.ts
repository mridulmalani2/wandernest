import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      )
    }

    // Update student to mark safety guidelines as acknowledged
    const student = await prisma.student.update({
      where: { id: body.studentId },
      data: {
        safetyGuidelinesAcknowledged: true,
        safetyAcknowledgedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Safety guidelines acknowledged',
      acknowledgedAt: student.safetyAcknowledgedAt,
    })
  } catch (error) {
    console.error('Safety acknowledgment error:', error)
    return NextResponse.json(
      { error: 'Failed to acknowledge safety guidelines' },
      { status: 500 }
    )
  }
}
