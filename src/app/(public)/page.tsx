export const dynamic = 'force-dynamic';

import AboutMe from '@/components/Home/AboutMe';
import ContactsScreen from '@/components/Home/Contacts/ContactsScreen';
import Image from 'next/image';
import { db } from '@/db';
import { aboutMe, contacts } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';

const DEFAULT_RUST = `// about_me.rs\n\n// No content yet — add it in /admin/about`;
const DEFAULT_TS = `// AboutMe.tsx\n\n// No content yet — add it in /admin/about`;
const DEFAULT_NEST = `// developer.controller.ts\n\n// No content yet — add it in /admin/about`;

export default async function Home() {
  const [aboutData, contactRows] = await Promise.all([
    db.select().from(aboutMe).where(eq(aboutMe.id, 1)).limit(1),
    db
      .select()
      .from(contacts)
      .orderBy(asc(contacts.sortOrder), asc(contacts.id)),
  ]);

  const about = aboutData[0];

  return (
    <main
      id="main-content"
      className="w-full flex flex-col px-3 sm:px-10 xl:px-20"
    >
      {/* Hero */}
      <div className="w-full min-h-[92dvh] flex lg:flex-row flex-col justify-between gap-10 lg:mt-0 mt-10">
        <AboutMe
          rustCode={about?.rustCode ?? DEFAULT_RUST}
          tsCode={about?.tsCode ?? DEFAULT_TS}
          nestCode={about?.nestCode ?? DEFAULT_NEST}
        />
        <div className="lg:w-2/5 w-full flex lg:justify-end justify-center items-center">
          <div
            className="lg:min-w-[440px] sm:w-[360px] w-[310px] lg:h-[580px] sm:h-[480px] h-[400px] rounded-2xl relative overflow-hidden border border-border"
            aria-label="Photo of Maksym Zhuk"
          >
            <Image
              src={'/MyPhoto.jpeg'}
              alt="Maksym Zhuk — Backend Engineer"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Contacts */}
      <ContactsScreen contacts={contactRows} />
    </main>
  );
}
