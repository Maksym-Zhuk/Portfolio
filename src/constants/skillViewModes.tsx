import type { SkillViewMode } from '@/types/skills';

export const SKILL_VIEW_MODES: { id: SkillViewMode; label: string; icon: React.ReactNode }[] = [
  {
    id: 'category',
    label: 'Stack',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="8"
          y="1"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="1"
          y="8"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="8"
          y="8"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
    ),
  },
  {
    id: 'timeline',
    label: 'Timeline',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="3" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        <circle
          cx="3"
          cy="11"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <line
          x1="3"
          y1="4.5"
          x2="3"
          y2="5.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="8.5"
          x2="3"
          y2="9.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="6"
          y1="3"
          x2="13"
          y2="3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="6"
          y1="7"
          x2="11"
          y2="7"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <line
          x1="6"
          y1="11"
          x2="9"
          y2="11"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];
