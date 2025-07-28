import MarketingBanner from '@/components/banner/marketing';
import MainLayout from '@/layout/main';
import BestSellers from '@/components/product/bestSellers';
import Gift from '@/components/product/gift';
import Collections from '@/components/product/collections';
import Guarantee from '@/components/guarantee';

function HomePage() {
  return (
    <MainLayout>
      <div>
        <MarketingBanner />
        <BestSellers />
        <Gift />
        <Collections />
        {/* <Reviews /> */}
        {/* <Community /> */}
        <Guarantee />
      </div>
    </MainLayout>
  );
}

export default HomePage;
