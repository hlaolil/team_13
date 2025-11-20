// app/register/page.tsx
import { Suspense } from 'react';
import  RegisterForm  from '@/app/ui/register/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br  via-slate-250 to-slate-500 px-4">
      <Suspense
        fallback={
          <div className="rounded-xl bg-slate-900/60 px-6 py-4 text-slate-200 shadow-lg">
            Loading registration form...
          </div>
        }
      >
        <RegisterForm />
      </Suspense>
    </main>
  );
}
