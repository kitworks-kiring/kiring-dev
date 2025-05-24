import { NextResponse } from 'next/server'
import { fetchTeamCount } from '@/services/teamService'
import { wrapControllerResponse } from '@/utils/wrapControllerResponse'

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: 등록된 팀 수 조회
 *     description: 등록된 팀의 개수를 반환합니다.
 *     tags:
 *       - Team
 *     responses:
 *       200:
 *         description: 성공적으로 팀 수를 반환합니다.
 */

export async function GET() {
  const [data, error] = await fetchTeamCount()
  const rspStatus = wrapControllerResponse(error)
  return NextResponse.json({ data, rspStatus }, { status: rspStatus.code })
}
