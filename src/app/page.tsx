// src/app/portal/page.tsx
import PortalHero from '@/components/portal/PortalHero';
import FeatureShowcase from '@/components/portal/FeatureShowcase';
import ScenarioBuilder from '@/components/portal/ScenarioBuilder';
import QuickStart from '@/components/portal/QuickStart';

export default function PortalPage() {
  return (
    <div className="max-w-400 mx-auto p-4 space-y-12">
      <PortalHero />
      <FeatureShowcase />
      <ScenarioBuilder />
      <QuickStart />
    </div>
  );
}