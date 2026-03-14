import NavHeader from "../nav-v2/NavHeader";
import DashboardWidgets from "./_components/DashboardWidgets";
import AlertsTasksPanel from "./_components/AlertsTasksPanel";
import HeroBanner from "./_components/HeroBanner";
import QuickActions from "./_components/QuickActions";
import RecentActivity from "./_components/RecentActivity";
import QuickLinks from "./_components/QuickLinks";

export default function StartV2Page() {
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />

      <main className="mx-auto max-w-[1280px] space-y-10 px-6 py-10">
        <DashboardWidgets />
        <AlertsTasksPanel />

        {/* Hero banner + Quick Actions side by side */}
        <div className="grid gap-6 lg:grid-cols-2">
          <HeroBanner />
          <QuickActions />
        </div>

        <RecentActivity />
        <QuickLinks />
      </main>
    </div>
  );
}
