import AboutMe from '@/components/Home/AboutMe';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full min-h-[90dvh] flex flex-col px-3 sm:px-10 xl:px-20">
      <main className="w-full min-h-[90dvh] flex lg:flex-row flex-col justify-between">
        <AboutMe />
        <div className="lg:w-2/5 w-full lg:h-[90dvh] sm:h-[60dvh] h-[55dvh] flex lg:justify-end justify-center items-center">
          <div className="lg:min-w-[440px] sm:w-[360px] w-[310px] lg:h-[580px] sm:h-[480px] h-[400px] bg-[#262626] rounded-4xl relative">
            <Image
              src={'/9c30ffef-d5e9-4e2a-b0e0-feccd2dd83bb.png'}
              alt="Photo"
              fill
              className="rounded-4xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
