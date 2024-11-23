import { redirect } from 'next/navigation';

function HomePage() {
  return redirect('/shop');
}

export default HomePage;
