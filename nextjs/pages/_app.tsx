import '../assets/sass/main.scss';
import type { AppProps } from 'next/app'
import { MenuProvider } from '../contexts/MenuContext/MenuProvider';
import  AuthProvider  from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <MenuProvider>
      <Component {...pageProps} />
    </MenuProvider>
  </AuthProvider>
}

export default MyApp
