// Datas das notícias vêm como texto ("20 de dezembro de 2025"), igual ao conteúdo
// migrado. Estas funções só leem esse texto; não criam um segundo campo de data.

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

/** "20 de dezembro de 2025" → 20251220. Data fora do formato vira 0 (vai para o fim). */
export function dateKey(date: string): number {
  const match = date.trim().toLowerCase().match(/^(\d{1,2}) de (\S+) de (\d{4})$/)
  if (!match) return 0
  const month = MESES.indexOf(match[2]) + 1
  if (month === 0) return 0
  return Number(match[3]) * 10000 + month * 100 + Number(match[1])
}

/** Da mais recente para a mais antiga; notícias do mesmo dia mantêm a ordem original. */
export function sortByDate<T extends { date: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => dateKey(b.date) - dateKey(a.date))
}

/** "Em números" (RC-3): só fatos cujo valor tem dígito; "Compartilhada" ou "Sisrev/MS" não entram. */
export function numericFacts<T extends { value: string }>(facts: readonly T[]): T[] {
  return facts.filter((fact) => /\d/.test(fact.value))
}
