import { Skills } from '@/constants/skills';
import { Skill } from '@/types/skills';
import SkillCard from './SkillCard';

export default function SkillsScreen() {
  return (
    <div
      id="skills"
      className="w-full min-h-[100dvh] flex flex-col items-center gap-5 scroll-mt-24 pb-10 mt-10"
    >
      <h2 className="text-4xl">Skills</h2>
      <div className="w-full flex flex-wrap justify-center gap-5">
        {Skills.map((skill: Skill, index) => (
          <SkillCard key={index} data={skill} />
        ))}
      </div>
    </div>
  );
}
