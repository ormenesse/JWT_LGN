import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    // verificando usuário
    const verifiedUser = await fetch('/api/auth/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!verifiedUser) {
      router.push('/login');
    } else {
      setEmail(localStorage.getItem("email"));
    }
  }, [router]);

  return (
    <Layout>
      <div className="h-56 grid grid-cols-3 gap-4 content-around">
        <h1><b>Dashboard</b></h1>
      </div>
      <div>
        {email ? <p>Welcome, {email}</p> : <p>Loading...</p>}
      </div>
    </Layout>
  );
}