import AboutMe from '@/components/Home/AboutMe';
import ContactsScreen from '@/components/Home/Contacts/ContactsScreen';
import SkillsScreen from '@/components/Home/Skills/SkillsScreen';
import Footer from '@/components/shared/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full min-h-[100dvh] flex flex-col px-3 sm:px-10 xl:px-20">
      <main className="w-full min-h-[92dvh] flex lg:flex-row flex-col justify-between gap-10 lg:mt-0 mt-10">
        <AboutMe />
        <div className="lg:w-2/5 w-full flex lg:justify-end justify-center items-center">
          <div className="lg:min-w-[440px] sm:w-[360px] w-[310px] lg:h-[580px] sm:h-[480px] h-[400px] bg-[#262626] rounded-4xl relative">
            <Image
              src={'/MyPhoto.jpeg'}
              alt="Photo"
              fill
              className="rounded-4xl"
            />
          </div>
        </div>
      </main>
      <SkillsScreen />
      <ContactsScreen />
      <Footer />
    </div>
  );
}
