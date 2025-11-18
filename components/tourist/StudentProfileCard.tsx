'use client'

import { Star, CheckCircle2, XCircle, Award, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

export interface StudentMatch {
  studentId: string
  maskedId: string
  displayName: string
  nationality: string
  languages: string[]
  institute: string
  tripsHosted: number
  averageRating: number | null
  reviewCount: number
  noShowCount: number
  reliabilityBadge: string | null
  tags: string[]
  matchReasons: string[]
}

interface StudentProfileCardProps {
  student: StudentMatch
  isSelected: boolean
  onToggleSelect: (studentId: string) => void
}

export function StudentProfileCard({
  student,
  isSelected,
  onToggleSelect,
}: StudentProfileCardProps) {
  const reliabilityColor = {
    gold: 'bg-yellow-500 text-yellow-900',
    silver: 'bg-gray-400 text-gray-900',
    bronze: 'bg-orange-600 text-orange-100',
  }

  const reliabilityBadgeColor =
    student.reliabilityBadge && reliabilityColor[student.reliabilityBadge as keyof typeof reliabilityColor]
      ? reliabilityColor[student.reliabilityBadge as keyof typeof reliabilityColor]
      : 'bg-gray-200 text-gray-700'

  return (
    <Card
      className={`relative transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
      }`}
    >
      <CardContent className="p-6">
        {/* Selection Checkbox */}
        <div className="absolute top-4 right-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelect(student.studentId)}
            className="h-5 w-5"
          />
        </div>

        {/* Masked ID */}
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-gray-800">{student.maskedId}</h3>
          <p className="text-sm text-gray-500">{student.displayName}</p>
        </div>

        {/* University & Nationality */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">{student.institute}</p>
          <p className="text-sm text-gray-600">From: {student.nationality}</p>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
            Languages
          </p>
          <div className="flex flex-wrap gap-1">
            {student.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        {/* Experience Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="flex items-center gap-1 text-gray-600 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Experience</span>
            </div>
            <p className="text-lg font-bold text-gray-800">
              {student.tripsHosted} trips
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-gray-600 mb-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">Rating</span>
            </div>
            {student.averageRating ? (
              <p className="text-lg font-bold text-gray-800">
                {student.averageRating.toFixed(1)}/5
                <span className="text-xs text-gray-500 ml-1">
                  ({student.reviewCount})
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-500">No ratings yet</p>
            )}
          </div>
        </div>

        {/* Reliability */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {student.noShowCount === 0 && student.tripsHosted > 0 ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-700 font-medium">
                    Perfect attendance
                  </span>
                </>
              ) : student.noShowCount > 0 ? (
                <>
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">
                    {student.noShowCount} no-show{student.noShowCount > 1 ? 's' : ''}
                  </span>
                </>
              ) : (
                <span className="text-sm text-gray-500">New guide</span>
              )}
            </div>

            {student.reliabilityBadge && (
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <Badge className={`text-xs ${reliabilityBadgeColor}`}>
                  {student.reliabilityBadge}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Match Reasons */}
        {student.matchReasons.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 uppercase mb-2">
              Why this guide?
            </p>
            <ul className="space-y-1">
              {student.matchReasons.slice(0, 3).map((reason, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start">
                  <span className="mr-2">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags/Strengths */}
        {student.tags.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Specialties
            </p>
            <div className="flex flex-wrap gap-1">
              {student.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs bg-white border-gray-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
