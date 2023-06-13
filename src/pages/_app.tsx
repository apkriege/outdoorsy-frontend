import "@/app/globals.css";
import Layout from '@/components/layout';
import { Helmet } from 'react-helmet';
 
export default function App({ Component, pageProps }: any) {
  return (
    <>
    <Helmet>
      <script rel="stylesheet" src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></script>   
    </Helmet>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  );
}