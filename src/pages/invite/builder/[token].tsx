import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function InviteRedirect() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      // Redirect to the new builder invitation acceptance page
      router.replace(`/builder/invite/${token}`);
    }
  }, [token, router]);

  return (
    <Head>
      <title>Redirecting... - Detroit Commons</title>
      <meta name="description" content="Redirecting to invitation page" />
    </Head>
  );
}