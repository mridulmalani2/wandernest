import { NextRequest, NextResponse } from 'next/server'
import { handleReport } from '@/lib/reportHandler'
import { ReportType } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.type || !body.reportedUserId || !body.reportedBy || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate report type
    if (!Object.values(ReportType).includes(body.type)) {
      return NextResponse.json(
        { error: 'Invalid report type' },
        { status: 400 }
      )
    }

    const result = await handleReport({
      type: body.type as ReportType,
      reportedUserId: body.reportedUserId,
      reportedBy: body.reportedBy,
      description: body.description,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to submit report' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        reportId: result.reportId,
        message: result.message,
        immediateAction: result.immediateAction,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Report API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
