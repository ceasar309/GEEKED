import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import VideoShowcase from "@/components/home/VideoShowcase";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import NewArrivals from "@/components/home/NewArrivals";
import TrendingProducts from "@/components/home/TrendingProducts";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";
import InstagramGallery from "@/components/home/InstagramGallery";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSlider />
      <VideoShowcase />
      <FeaturedCollections />
      <NewArrivals />
      <TrendingProducts />
      <Reviews />
      <Newsletter />
      <InstagramGallery />
      <Footer />
    </>
  );
}
