import { Footer } from '../components/Footer';
import WhatsAppForm from '../components/Wa';

export const Home = () => {
  return (
    <div className="w-full h-full">
      <header className="py-12"></header>
      <main className="px-4">
        <WhatsAppForm />
      </main>
      <Footer />
    </div>
  );
};
