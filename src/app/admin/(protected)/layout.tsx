import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import AdminSidebar from '../AdminSidebar';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isAdmin) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-dvh bg-background md:flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-auto p-4 sm:p-6">{children}</main>
    </div>
  );
}
