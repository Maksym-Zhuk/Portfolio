import { Skill } from '@/types/skills';
import SkillPageCard from './SkillPageCard';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface MonthGroup {
  month: number;
  label: string;
  skills: Skill[];
}

interface YearGroup {
  year: number;
  months: MonthGroup[];
  total: number;
}

function buildTimeline(skills: Skill[]): YearGroup[] {
  const sorted = [...skills].sort(
    (a, b) => new Date(a.firstTried).getTime() - new Date(b.firstTried).getTime(),
  );

  const byYear = new Map<number, Map<number, Skill[]>>();

  for (const skill of sorted) {
    const d = new Date(skill.firstTried);
    const y = d.getFullYear();
    const m = d.getMonth();
    if (!byYear.has(y)) byYear.set(y, new Map());
    const monthMap = byYear.get(y)!;
    if (!monthMap.has(m)) monthMap.set(m, []);
    monthMap.get(m)!.push(skill);
  }

  return Array.from(byYear.entries()).map(([year, monthMap]) => ({
    year,
    total: Array.from(monthMap.values()).reduce((s, arr) => s + arr.length, 0),
    months: Array.from(monthMap.entries()).map(([month, skills]) => ({
      month,
      label: MONTHS[month],
      skills,
    })),
  }));
}

interface Props {
  skills: Skill[];
}

export default function SkillTimeline({ skills }: Props) {
  const groups = buildTimeline(skills);

  return (
    <div className="flex flex-col gap-16" aria-label="Skills timeline">
      {groups.map((group) => (
        <section key={group.year} aria-label={`Skills learned in ${group.year}`}>
          {/* Year header */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl font-bold font-mono text-primary">
              {group.year}
            </span>
            <div className="h-px flex-1 bg-border" aria-hidden="true" />
            <span className="text-xs font-mono text-muted-foreground/60">
              {group.total} {group.total === 1 ? 'skill' : 'skills'}
            </span>
          </div>

          {/* Month rows */}
          <div className="relative flex flex-col gap-0">
            {/* Vertical timeline line */}
            <div
              className="absolute left-[3.25rem] top-3 bottom-3 w-px bg-border"
              aria-hidden="true"
            />

            {group.months.map((m, i) => (
              <div key={m.month} className="flex items-start gap-0 min-h-[3rem]">
                {/* Month label */}
                <span className="w-12 shrink-0 pt-2.5 text-right text-xs font-mono text-muted-foreground select-none">
                  {m.label}
                </span>

                {/* Dot */}
                <div className="relative w-7 shrink-0 flex justify-center pt-2.5">
                  <div
                    className="w-2 h-2 rounded-full bg-primary ring-4 ring-background shrink-0"
                    aria-hidden="true"
                  />
                  {/* Connector to next row */}
                  {i < group.months.length - 1 && (
                    <div
                      className="absolute top-[1.375rem] bottom-0 w-px bg-border left-1/2 -translate-x-1/2"
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 pl-3 pt-1.5 pb-6">
                  {m.skills.map((skill) => (
                    <SkillPageCard key={skill.title} data={skill} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
