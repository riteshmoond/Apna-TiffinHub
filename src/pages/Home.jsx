import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MealPlans from "../components/MealPlans";
import WeeklyMenu from "../components/WeeklyMenu";
import MenuCatalog from "../components/MenuCatalog";
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
import UserProfileModal from "../components/UserProfileModal";
import { clearUserSession, getStoredUser, getUserToken } from "../lib/userAuth";

const Home = () => {
  const [orderPlan, setOrderPlan] = useState(null);
  const [pendingPlan, setPendingPlan] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(() => getStoredUser());
  const [reorderDraft, setReorderDraft] = useState(null);

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
    setIsProfileOpen(false);
    setReorderDraft(null);
  };

  const handleReorder = (order) => {
    if (!order) return;
    setReorderDraft({
      customer: order.customer,
      phone: order.phone,
      address: order.address,
      quantity: order.quantity,
      mealTime: order.mealTime,
      deliveryDate: order.deliveryDate,
      instructions: order.instructions,
      paymentMode: order.paymentMode,
    });
    setOrderPlan({ name: order.plan });
    setIsMyOrdersOpen(false);
  };

  return (
    <>
      <Navbar
        user={user}
        onLogin={() => setIsAuthOpen(true)}
        onProfile={() => setIsProfileOpen(true)}
      />
      <HeroSection onOrder={openOrder} />
      <MealPlans onOrder={openOrder} />
      <WeeklyMenu />
      <MenuCatalog onOrder={openOrder} />
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
        prefillOrder={reorderDraft}
        onClose={() => setOrderPlan(null)}
        onOrderPlaced={() => {
          setOrderPlan(null);
          setReorderDraft(null);
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
      <MyOrdersModal
        isOpen={isMyOrdersOpen}
        onClose={() => setIsMyOrdersOpen(false)}
        onReorder={handleReorder}
      />
      <UserProfileModal
        isOpen={isProfileOpen}
        user={user}
        onClose={() => setIsProfileOpen(false)}
        onUpdated={setUser}
        onMyOrders={() => {
          setIsProfileOpen(false);
          setIsMyOrdersOpen(true);
        }}
        onLogout={handleUserLogout}
      />
    </>
  );
};

export default Home;
