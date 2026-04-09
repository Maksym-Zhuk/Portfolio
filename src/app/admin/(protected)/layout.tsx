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
    <div className="min-h-dvh bg-background flex">
      <AdminSidebar />
      <main className="flex-1 min-h-dvh overflow-auto p-6">{children}</main>
    </div>
  );
}
