import { prisma } from '@/lib/prisma'

export const countTeams = () => {
  return prisma.team.count()
}
