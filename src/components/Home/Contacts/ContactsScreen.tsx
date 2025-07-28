import { Contacts } from '@/constants/contacts';
import { Contact } from '@/types/contacts';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactsScreen() {
  return (
    <div
      id="contacts"
      className="w-full min-h-[50dvh] flex flex-col justify-center items-center gap-10 scroll-mt-28 pb-10"
    >
      <h2 className="text-4xl">Contacts</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {Contacts.map((item: Contact, index) => (
          <Link
            key={index}
            href={item.link}
            className="bg-[#262626] w-40 h-40 flex justify-center items-center rounded-xl"
          >
            <Image src={item.icon} alt={item.title} width={60} height={60} />
          </Link>
        ))}
      </div>
    </div>
  );
}
