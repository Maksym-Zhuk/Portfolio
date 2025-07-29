import { ProjectImg } from '@/constants/projectImg';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { AspectRatio } from '../ui/aspect-ratio';

interface Props {
  name: string;
  description: string;
  topics: [];
  html_url: string;
  homepage: string;
}

export default function ProjectCard({
  name,
  description,
  topics,
  html_url,
  homepage,
}: Props) {
  return (
    <div className="w-full min-h-50 flex flex-col lg:flex-row items-center gap-10">
      <Image
        src={ProjectImg[name]}
        alt={name}
        width={500}
        height={100}
        className="hidden lg:flex"
      />
      <div className="w-full flex lg:hidden">
        <AspectRatio
          ratio={16 / 9}
          className="w-full flex justify-center items-center bg-muted rounded-lg"
        >
          <Image
            src={ProjectImg[name]}
            alt={name}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <h2 className="1text-xl sm:text-4xl">{name}</h2>
        <p className="min-w-75 text-sm sm:text-base">{description}</p>
        <div className="flex flex-wrap sm:gap-5 gap-3">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="p-3 bg-[#262626] rounded-lg text-sm sm:text-base"
            >
              # {topic}
            </div>
          ))}
        </div>
        <div className="flex gap-5">
          <Button className="py-5">
            <Link href={html_url}>
              <Image src={'/GitHub.svg'} alt="Github" width={30} height={30} />
            </Link>
          </Button>
          <Button className={homepage === '' ? 'hidden' : 'flex py-5'}>
            <Link href={homepage}>
              <Image
                src={'/link-icon-png-14.png'}
                alt="Github"
                width={30}
                height={30}
              />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
