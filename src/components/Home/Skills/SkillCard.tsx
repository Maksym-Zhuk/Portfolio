import { Skill } from '@/types/skills';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

interface Props {
  data: Skill;
}
export default function SkillCard({ data }: Props) {
  const start = new Date(data.firstTried);
  const end = new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-[#262626] w-40 h-40 flex flex-col justify-between items-center rounded-xl py-7 px-3">
          <Image src={data.logo} alt={data.title} width={50} height={50} />
          <h2 className="text-center">{data.title}</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="w-full flex gap-5">
              <Image src={data.logo} alt={data.title} width={50} height={50} />
              <div className="flex flex-col gap-2">
                <h2>{data.title}</h2>
                <p className="text-sm">{data.category}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div>
          <h2>First tried: {data.firstTried}</h2>
          <h2>
            Experience: {years} years, {months} months, {days} days
          </h2>
        </div>
      </DialogContent>
    </Dialog>
  );
}
