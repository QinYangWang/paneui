import {
  KnockoutBracket,
  type BracketMatch,
  type BracketRound,
  type BracketTeam,
} from "@/registry/base-nova/blocks/knockout-bracket/knockout-bracket"

const t = (name: string, short: string, color: string): BracketTeam => ({ name, short, color })
const ARG = t("Argentina", "ARG", "oklch(0.7 0.11 230)")
const AUS = t("Australia", "AUS", "oklch(0.72 0.15 90)")
const NED = t("Netherlands", "NED", "oklch(0.7 0.17 50)")
const USA = t("United States", "USA", "oklch(0.5 0.14 260)")
const CRO = t("Croatia", "CRO", "oklch(0.58 0.2 25)")
const JPN = t("Japan", "JPN", "oklch(0.45 0.13 265)")
const BRA = t("Brazil", "BRA", "oklch(0.68 0.16 145)")
const KOR = t("South Korea", "KOR", "oklch(0.55 0.18 20)")
const ENG = t("England", "ENG", "oklch(0.55 0.02 260)")
const SEN = t("Senegal", "SEN", "oklch(0.6 0.15 150)")
const FRA = t("France", "FRA", "oklch(0.45 0.15 265)")
const POL = t("Poland", "POL", "oklch(0.6 0.2 20)")
const MAR = t("Morocco", "MAR", "oklch(0.5 0.17 25)")
const ESP = t("Spain", "ESP", "oklch(0.6 0.2 30)")
const POR = t("Portugal", "POR", "oklch(0.5 0.15 150)")
const SUI = t("Switzerland", "SUI", "oklch(0.58 0.21 25)")

const m = (
  id: string,
  date: string,
  home: [BracketTeam | null, number | null, number?],
  away: [BracketTeam | null, number | null, number?],
  winner?: "home" | "away"
): BracketMatch => ({
  id,
  date,
  home: { team: home[0], score: home[1], penalties: home[2] },
  away: { team: away[0], score: away[1], penalties: away[2] },
  winner,
})

const rounds: BracketRound[] = [
  {
    name: "Round of 16",
    matches: [
      m("r16-1", "Sat 3 Dec", [NED, 3], [USA, 1], "home"),
      m("r16-2", "Sat 3 Dec", [ARG, 2], [AUS, 1], "home"),
      m("r16-3", "Mon 5 Dec", [JPN, 1, 1], [CRO, 1, 3], "away"),
      m("r16-4", "Mon 5 Dec", [BRA, 4], [KOR, 1], "home"),
      m("r16-5", "Sun 4 Dec", [ENG, 3], [SEN, 0], "home"),
      m("r16-6", "Sun 4 Dec", [FRA, 3], [POL, 1], "home"),
      m("r16-7", "Tue 6 Dec", [MAR, 0, 3], [ESP, 0, 0], "home"),
      m("r16-8", "Tue 6 Dec", [POR, 6], [SUI, 1], "home"),
    ],
  },
  {
    name: "Quarter-finals",
    matches: [
      m("qf-1", "Fri 9 Dec", [NED, 2, 3], [ARG, 2, 4], "away"),
      m("qf-2", "Fri 9 Dec", [CRO, 1, 4], [BRA, 1, 2], "home"),
      m("qf-3", "Sat 10 Dec", [ENG, 1], [FRA, 2], "away"),
      m("qf-4", "Sat 10 Dec", [MAR, 1], [POR, 0], "home"),
    ],
  },
  {
    name: "Semi-finals",
    matches: [
      m("sf-1", "Tue 13 Dec", [ARG, 3], [CRO, 0], "home"),
      m("sf-2", "Wed 14 Dec", [FRA, 2], [MAR, 0], "home"),
    ],
  },
  { name: "Final", matches: [m("final", "Sun 18 Dec · 18:00", [ARG, null], [FRA, null])] },
]

export default function KnockoutBracketDemo() {
  return (
    <KnockoutBracket
      rounds={rounds}
      initialRound={1}
      thirdPlace={m("third", "Sat 17 Dec", [CRO, 2], [MAR, 1], "home")}
      className="max-w-190"
    />
  )
}
