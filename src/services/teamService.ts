import { countTeams } from '@/db/teamRepository'
import { wrapServiceResponse } from '@/utils/wrapServiceResponse'

export async function fetchTeamCount() {
  return wrapServiceResponse({
    fn: () => countTeams().then((count) => ({ count })),
    options: {
      failureMessage: '팀 수 조회 실패',
      onError: (e) => console.error('[teamService]', e),
    },
  })
}
