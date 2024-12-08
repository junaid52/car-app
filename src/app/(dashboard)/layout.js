import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOut } from '@/auth/auth';
import { Toaster } from 'react-hot-toast';
export default function Layout({ children }) {
  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-gray-900 text-gray-50'>
        <div className='container max-auto p-4 flex items-center justify-between h-16'>
          <div className='flex items-center gap-4'>
            <Link href='/' className='text-lg font-bold'>
              Car App
            </Link>
            <nav>
              <ul className='flex gap-4'>
                <li>
                  <Link href='/cars'>Cars</Link>
                </li>
                <li>
                  <Link href='/about'>About</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className='flex items-center gap-4'>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <button type='submit'>Sign Out</button>
            </form>
          </div>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
      <Toaster />
      <footer className='bg-gray-900 text-gray-50'>
        <div className='container h-16 flex items-center justify-center'>
          <p>&copy; 2024 Car App</p>
        </div>
      </footer>
    </div>
  );
}
