import React from 'react';
import { AppShell } from '@/components';
import type { AppSidebarProps, SidebarTab, SidebarCategory } from '@/components/AppSidebar';
import type { GlobalHeaderProps } from '@/components/GlobalHeader';
import { c } from '../styles';
import styles from './Shell.module.css';

/** The destinations this prototype builds. Every other nav item shows a placeholder. */
export type NavKey = 'home' | 'objects' | 'datacache';

// ── Sidebar config — mirrors the product Insights and Data workspace nav (Nov 2026) ──
export type TabKey = 'insights' | 'data';
const SIDEBAR_TABS: SidebarTab[] = [
  { id: 'insights', label: 'Insights', headerTitle: 'Insights', showAddButton: true },
  { id: 'data', label: 'Data', headerTitle: 'Data workspace', showAddButton: true },
];

// "Included" on the Data Cache entry: leadership's ask (2 Nov). The plan includes
// caching; the nav says so before anyone opens the page.
export type NavBadge = 'included' | 'new';
const categories = (badge: NavBadge): Record<TabKey, SidebarCategory[]> => ({
  // The product Insights nav (Irene's screenshot, 5 Nov).
  insights: [
    {
      items: [
        { id: 'home', label: 'Home' },
        { id: 'spotter', label: 'Spotter' },
        { id: 'agentspot', label: 'AgentSpot', isExternal: true },
        { id: 'search-data', label: 'Search data' },
      ],
    },
    {
      title: 'Library',
      items: [
        { id: 'liveboards', label: 'Liveboards' },
        { id: 'answers', label: 'Answers' },
        { id: 'collections', label: 'Collections' },
      ],
    },
    {
      title: 'Analysis & alerts',
      items: [
        { id: 'liveboard-schedules', label: 'Liveboard schedules' },
        { id: 'monitor-subscriptions', label: 'Monitor subscriptions' },
        { id: 'spotiq-analysis', label: 'SpotIQ analysis' },
      ],
    },
    {
      title: 'Favorites',
      items: [
        { id: 'fav-free-trial-funnel', label: 'Free Trial Funnel' },
        { id: 'fav-adoption-scorecard', label: 'Adoption Strategy Scorecard (TSA + T…' },
        { id: 'fav-analyst-studio-tracker', label: 'Analyst Studio Adoption Tracker' },
      ],
    },
  ],
  data: [
    {
      items: [
        { id: 'objects', label: 'Data objects' },
        { id: 'connections', label: 'Connections' },
        { id: 'analyst-studio', label: 'Analyst Studio', isExternal: true },
        { id: 'utilities', label: 'Utilities' },
        { id: 'sync', label: 'Sync' },
      ],
    },
    {
      title: 'Spotter memory',
      items: [
        { id: 'memory-sources', label: 'Memory sources' },
        { id: 'context-center', label: 'Context Center' },
      ],
    },
    {
      title: 'Governance',
      items: [
        { id: 'data-catalog', label: 'Data catalog' },
        { id: 'usage', label: 'Usage' },
        { id: 'dbt', label: 'dbt' },
        { id: 'liveboard-verification', label: 'Liveboard verification' },
        { id: 'datacache', label: 'DataCache', badge: <span className={`${styles.navTag} ${badge === 'new' ? styles.navTagNew : styles.navTagIncluded}`}>{badge === 'new' ? 'New' : 'Included'}</span> },
      ],
    },
  ],
});

const navIds = (tab: TabKey) => categories('included')[tab].flatMap((cat) => cat.items);

export const NAV_LABELS: Record<string, string> = Object.fromEntries(
  [...navIds('insights'), ...navIds('data')].map((i) => [i.id, i.label]),
);

/** Nav items that live on the Insights tab, so the shell knows which tab a page belongs to. */
export const INSIGHTS_NAV = new Set(navIds('insights').map((i) => i.id));

// External links open nothing in the prototype.
const EXTERNAL_NAV = new Set(['agentspot', 'analyst-studio']);

// ── Shell ─────────────────────────────────────────────────────────────────────
export const Shell: React.FC<{
  active: string;
  onNavigate: (id: string) => void;
  tab: TabKey;
  onTabChange: (tab: TabKey) => void;
  navBadge: NavBadge;
  children: React.ReactNode;
}> = ({ active, onNavigate, tab, onTabChange, navBadge, children }) => {
  const headerProps: GlobalHeaderProps = {
    searchPlaceholder: 'Search your library',
    searchMode: 'trigger',
    userName: 'Vivek Sahi',
    notificationCount: 3,
    theme: 'dark',
  };

  const sidebarProps: AppSidebarProps = {
    tabs: SIDEBAR_TABS,
    activeTab: tab,
    onTabChange: (id) => onTabChange(id as TabKey),
    categories: categories(navBadge),
    selectedNav: active,
    onNavSelect: (id) => {
      if (!EXTERNAL_NAV.has(id)) onNavigate(id);
    },
  };

  return (
    <AppShell className={styles.shell} headerProps={headerProps} sidebarProps={sidebarProps} contentBackground={c['background-sunken']}>
      <div className={styles.content}>{children}</div>
    </AppShell>
  );
};
