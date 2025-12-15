'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudentAdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/student-admin/events');
  }, [router]);

  return null;
}
