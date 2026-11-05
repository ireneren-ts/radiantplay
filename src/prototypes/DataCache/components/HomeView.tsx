import React from 'react';
import { RadianceBackground } from '@/app-chrome/RadianceBackground/RadianceBackground';
import { SpotterPrompt, QuickAction } from '@spotter/chat';
import { Card } from '@components/Card';
import { Button } from '@components/Button';
import { Typography } from '@components/Typography';
import { Horizontal, Vertical } from '@components/Layout';
import { Icon } from '@components/icons';
import type { IconName } from '@components/icons';
import welcome from '@spotter/page/SpotterWelcome.module.css';
import styles from './HomeView.module.css';

/**
 * ThoughtSpot home, shown on the Insights tab (Irene's screenshot, 5 Nov).
 * Same build as the WorkbookInThoughtSpot home: the Radiance "home" pattern behind the
 * Spotter prompt, then Recents and Watchlist. Nothing here is wired; the page is context
 * for moving between Insights and the Data workspace.
 */

const ACTIONS: { id: string; label: string; icon: IconName }[] = [
  { id: 'quick-search', label: 'Quick search', icon: 'explore' },
  { id: 'deep-analysis', label: 'Deep analysis', icon: 'r-analysis' },
  { id: 'know-your-data', label: 'Know your data', icon: 'bulb' },
];

const RECENTS: { id: string; name: string; icon: IconName; when: string }[] = [
  { id: 'retail-sales', name: 'Retail sales - demo', icon: 'liveboard', when: '28 seconds ago' },
  { id: 'free-trial-funnel', name: 'Free Trial Funnel', icon: 'liveboard', when: '2 days ago' },
  { id: 'tsa-pro', name: 'TSA Pro customers to enable AgentSp…', icon: 'answer', when: '2 days ago' },
  { id: 'consumption', name: 'Consumption by Account', icon: 'liveboard', when: '4 days ago' },
  { id: 'adoption-scorecard', name: 'Adoption Strategy Scorecard (TSA + T…', icon: 'liveboard', when: '2 weeks ago' },
];

const WATCHLIST: { id: string; name: string; comparison: string; value?: string; change?: string; failed?: boolean }[] = [
  { id: 'mau', name: 'Monthly Active Users', comparison: 'Unable to load chart', failed: true },
  { id: 'sales-weekly', name: 'Sales Weekly', comparison: 'WoW', value: '2.71M', change: '15.44 %' },
];

export const HomeView: React.FC = () => (
  <div className={styles.home}>
    <RadianceBackground pattern="home" heroHeight={360} />
    <Vertical gap={24} align="center" className={styles.content}>
      <h1 className={welcome.greeting}>
        Let’s <span className={welcome.greetingAccent}>make sense</span> of your data together.
      </h1>
      <SpotterPrompt className={styles.prompt} placeholder="Enter your question" />
      <Horizontal gap={12} justify="center" align="center" wrap>
        {ACTIONS.map((a) => (
          <QuickAction key={a.id} label={a.label} icon={a.icon} />
        ))}
      </Horizontal>
      <div className={styles.widgets}>
        <Card>
          <Card.Header title="Recents" />
          <Card.Body>
            <Vertical gap={16}>
              {RECENTS.map((r) => (
                <Horizontal key={r.id} gap={12} align="center">
                  <Icon name={r.icon} size="l" />
                  <Vertical gap={0}>
                    <Typography variant="body-normal">{r.name}</Typography>
                    <Typography variant="footnote" color="gray">{r.when}</Typography>
                  </Vertical>
                </Horizontal>
              ))}
            </Vertical>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header title="Watchlist" actions={<Button variant="tertiary" icon="plus" iconPosition="leading" size="small">Add KPI</Button>} />
          <Card.Body>
            <Vertical gap={16}>
              {WATCHLIST.map((w) => (
                <Horizontal key={w.id} justify="space-between" align={w.failed ? 'center' : 'start'}>
                  <Vertical gap={0}>
                    <Typography variant="body-normal">{w.name}</Typography>
                    <Typography variant="footnote" color="gray">{w.comparison}</Typography>
                  </Vertical>
                  {w.failed ? (
                    <Icon name="exclamation-point-circle" size="s" color="var(--rd-sys-color-content-secondary)" />
                  ) : (
                    <Vertical gap={0} align="end">
                      <Typography variant="content-label">{w.value}</Typography>
                      {w.change && (
                        <Horizontal gap={2} align="center">
                          <Icon name="arrow-down" size="xs" color="var(--rd-sys-color-content-failure)" />
                          <Typography variant="footnote" color="failure">{w.change}</Typography>
                        </Horizontal>
                      )}
                    </Vertical>
                  )}
                </Horizontal>
              ))}
            </Vertical>
          </Card.Body>
        </Card>
      </div>
    </Vertical>
  </div>
);

export default HomeView;
