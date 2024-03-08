'use client';
import AuthForm from "../../../components/AuthForm/AuthForm";

import { useParams } from 'next/navigation';

type Slug = {
  code: string;
};

export default function AuthUser({ params} : {params: { code: string }}) {

  const { code } = useParams<Slug>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <AuthForm code={code} />
    </main>
  );
}


