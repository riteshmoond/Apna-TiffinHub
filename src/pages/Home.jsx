import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MealPlans from "../components/MealPlans";
import WeeklyMenu from "../components/WeeklyMenu";
import WhyChooseUs from "../components/WhyChooseUs";
import Gallery from "../components/Gallery";
import Reviews from "../components/Reviews";
import SubscriptionPlans from "../components/SubscriptionPlans";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import OrderModal from "../components/OrderModal";
import UserAuthModal from "../components/UserAuthModal";
import MyOrdersModal from "../components/MyOrdersModal";
import { clearUserSession, getStoredUser, getUserToken } from "../lib/userAuth";

const Home = () => {
  const [orderPlan, setOrderPlan] = useState(null);
  const [pendingPlan, setPendingPlan] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState(false);
  const [user, setUser] = useState(() => getStoredUser());

  const openOrder = (plan) => {
    const nextPlan = plan || { name: "Basic Veg Plan", amount: 60 };

    if (!getUserToken()) {
      setPendingPlan(nextPlan);
      setIsAuthOpen(true);
      return;
    }

    setOrderPlan(nextPlan);
  };

  const handleAuthSuccess = (nextUser) => {
    setUser(nextUser);
    setIsAuthOpen(false);
    setOrderPlan(pendingPlan || { name: "Basic Veg Plan", amount: 60 });
    setPendingPlan(null);
  };

  const handleUserLogout = () => {
    clearUserSession();
    setUser(null);
    setOrderPlan(null);
    setIsMyOrdersOpen(false);
  };

  return (
    <>
      <Navbar
        user={user}
        onLogin={() => setIsAuthOpen(true)}
        onUserLogout={handleUserLogout}
        onMyOrders={() => setIsMyOrdersOpen(true)}
      />
      <HeroSection onOrder={openOrder} />
      <MealPlans onOrder={openOrder} />
      <WeeklyMenu />
      <WhyChooseUs />
      <Gallery />
      <Reviews />
      <SubscriptionPlans />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <OrderModal
        isOpen={Boolean(orderPlan)}
        selectedPlan={orderPlan}
        user={user}
        onClose={() => setOrderPlan(null)}
        onOrderPlaced={() => {
          setOrderPlan(null);
          setIsMyOrdersOpen(true);
        }}
      />
      <UserAuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setPendingPlan(null);
        }}
        onSuccess={handleAuthSuccess}
      />
      <MyOrdersModal isOpen={isMyOrdersOpen} onClose={() => setIsMyOrdersOpen(false)} />
    </>
  );
};

export default Home;
