import { prisma } from './prisma'
import { sendAdminNotification } from './email'
import { ReportType, StudentStatus } from '@prisma/client'

interface ReportData {
  type: ReportType
  reportedUserId: string
  reportedBy: string
  description: string
}

export async function handleReport(reportData: ReportData) {
  try {
    // Store the report
    const report = await prisma.report.create({
      data: {
        type: reportData.type,
        reportedUserId: reportData.reportedUserId,
        reportedBy: reportData.reportedBy,
        description: reportData.description,
        status: 'pending',
      },
    })

    // Immediate actions for critical reports
    if (
      reportData.type === ReportType.SAFETY_CONCERN ||
      reportData.type === ReportType.HARASSMENT
    ) {
      // Notify admin immediately
      await sendAdminNotification({
        id: report.id,
        type: report.type,
        reportedUserId: report.reportedUserId,
        reportedBy: report.reportedBy,
        description: report.description,
      })

      // Temporarily suspend the user
      await prisma.student.update({
        where: { id: reportData.reportedUserId },
        data: { status: StudentStatus.SUSPENDED },
      })

      // Update report status
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: 'under_review',
          actionTaken: 'User temporarily suspended pending investigation',
        },
      })
    }

    // Check for patterns - count recent reports
    const userReports = await prisma.report.count({
      where: {
        reportedUserId: reportData.reportedUserId,
        createdAt: {
          // Reports in the last 6 months
          gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
        },
      },
    })

    // Flag for manual review if 3+ reports
    if (userReports >= 3) {
      await sendAdminNotification({
        id: report.id,
        type: 'PATTERN_DETECTED',
        reportedUserId: reportData.reportedUserId,
        reportedBy: 'SYSTEM',
        description: `User has ${userReports} reports in the last 6 months. Manual review recommended.`,
      })

      // Update the latest report
      await prisma.report.update({
        where: { id: report.id },
        data: {
          status: 'under_review',
          actionTaken: `Flagged for manual review - ${userReports} total reports detected`,
        },
      })
    }

    return {
      success: true,
      reportId: report.id,
      message: 'Report submitted successfully',
      immediateAction:
        reportData.type === ReportType.SAFETY_CONCERN ||
        reportData.type === ReportType.HARASSMENT,
    }
  } catch (error) {
    console.error('Error handling report:', error)
    return {
      success: false,
      error: 'Failed to process report',
    }
  }
}

export async function countUserReports(userId: string): Promise<number> {
  return await prisma.report.count({
    where: {
      reportedUserId: userId,
      createdAt: {
        gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000), // Last 6 months
      },
    },
  })
}

export async function flagForManualReview(userId: string) {
  const reportCount = await countUserReports(userId)

  await sendAdminNotification({
    id: 'PATTERN_ALERT',
    type: 'MANUAL_REVIEW_REQUIRED',
    reportedUserId: userId,
    reportedBy: 'SYSTEM',
    description: `User ${userId} has ${reportCount} reports. Requires manual review.`,
  })

  // Update student record
  await prisma.student.update({
    where: { id: userId },
    data: { status: StudentStatus.PENDING_APPROVAL }, // Temporarily downgrade status
  })
}
