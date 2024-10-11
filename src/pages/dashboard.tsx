import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    // verificando usuário
    const verifiedUser = fetch('/api/auth/user', {
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
      <div class="center text-center content-around h-100 m-1">
        <h1><b>Dashboard</b></h1>
      </div>
      <div class="bottom">
        {email ? <p>Welcome, {email}</p> : <p>Loading...</p>}
      </div>
     <div class="h-full">
        <iframe src="https://www.ormait.com.br" class="h-full w-full"></iframe>
      </div>
      
    </Layout>
  );
}