import NavHeader from "../nav-v2/NavHeader";
import DashboardWidgets from "./_components/DashboardWidgets";
import AlertsTasksPanel from "./_components/AlertsTasksPanel";
import QuickActions from "./_components/QuickActions";
import RecentActivity from "./_components/RecentActivity";
import PromoBanner from "./_components/PromoBanner";
import QuickLinks from "./_components/QuickLinks";

export default function StartV2Page() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] space-y-10 px-6 py-10">
        <DashboardWidgets />
        <AlertsTasksPanel />
        <QuickActions />
        <RecentActivity />
        <PromoBanner />
        <QuickLinks />
      </main>
    </div>
  );
}
