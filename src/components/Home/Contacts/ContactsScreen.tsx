import type { Contact } from '@/db/schema';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  contacts: Contact[];
}

export default function ContactsScreen({ contacts }: Props) {
  return (
    <section
      id="contacts"
      aria-label="Contact links"
      className="w-full flex flex-col justify-center gap-10 scroll-mt-28 py-24"
    >
      <div className="flex flex-col gap-3">
        <span className="text-primary font-mono text-sm tracking-widest uppercase">
          Reach out
        </span>
        <h2 className="text-4xl font-bold">Contacts</h2>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {contacts.map((item: Contact) => (
          <Link
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.title}: ${item.handle ?? item.title}`}
            className="group flex flex-col items-center justify-center gap-4 py-10 px-6 bg-card border border-border rounded-2xl hover:border-primary/50 hover:glow-primary-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary min-h-[160px]"
          >
            <Image
              src={item.iconUrl}
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="font-semibold text-base text-foreground">
                {item.title}
              </span>
              {item.handle && (
                <span className="text-xs font-mono text-muted-foreground">
                  {item.handle}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
