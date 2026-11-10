import type { CSSProperties, ReactNode } from "react";
import { LAYER_MARK_SRC, type SlackAgent, type SlackPerson } from "./slack-people";
import styles from "./slack-ui.module.css";

/*
 * Slack-faithful mock primitives for the Layer for Slack page.
 * These render illustrative product scenes (not live Slack). Slack-native
 * structure mirrors what PitchBots' Slack projection emits: header, section,
 * card, data_table, data_visualization, actions and context blocks.
 */

type Speaker = SlackPerson | SlackAgent;

function isAgent(person: Speaker): person is SlackAgent {
  return "owner" in person;
}

export function Avatar({
  src,
  size = 36,
  className,
}: {
  src: string;
  size?: 16 | 18 | 20 | 24 | 28 | 32 | 36;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small decorative SVG avatar
    <img
      src={src}
      alt=""
      aria-hidden
      className={`${styles.avatar} ${styles[`avatar${size}`]} ${className ?? ""}`}
    />
  );
}

export function LayerMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- official Layer mark SVG at text size
    <img src={LAYER_MARK_SRC} alt="" aria-hidden className={`${styles.layerMark} ${className ?? ""}`} />
  );
}

export function AppBadge() {
  return <span className={styles.appBadge}>APP</span>;
}

export function Mention({ children }: { children: ReactNode }) {
  return <span className={styles.mention}>{children}</span>;
}

export function Speech({ children }: { children: ReactNode }) {
  return <p className={styles.speech}>{children}</p>;
}

export function Ctx({ children, layer = false }: { children: ReactNode; layer?: boolean }) {
  return (
    <p className={styles.ctx}>
      {layer ? <LayerMark /> : null}
      <span>{children}</span>
    </p>
  );
}

export function BlockHeader({ children }: { children: ReactNode }) {
  return <p className={styles.blockHeader}>{children}</p>;
}

export function Card({
  title,
  children,
  className,
}: {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.card} ${className ?? ""}`}>
      {title ? <p className={styles.cardTitle}>{title}</p> : null}
      {children}
    </div>
  );
}

type ButtonVariant = "default" | "primary" | "danger" | "pressed";

export function SlackButton({
  children,
  variant = "default",
  onClick,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
}) {
  const className = `${styles.button} ${styles[`button_${variant}`]}`;
  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
  return <span className={className}>{children}</span>;
}

/** The four buttons every Layer approval card carries (lib/integrations/slack/render/cards.ts). */
export function ApprovalButtons({ approveLabel = "Approve" }: { approveLabel?: string }) {
  return (
    <div className={styles.buttonRow}>
      <SlackButton variant="primary">{approveLabel}</SlackButton>
      <SlackButton>Edit</SlackButton>
      <SlackButton>Dismiss</SlackButton>
      <SlackButton>Why?</SlackButton>
    </div>
  );
}

export function ButtonRow({ children }: { children: ReactNode }) {
  return <div className={styles.buttonRow}>{children}</div>;
}

export function DataTable({
  columns,
  rows,
  template,
  highlightRow,
}: {
  columns: string[];
  rows: string[][];
  template: string;
  highlightRow?: number;
}) {
  const gridStyle = { "--cols": template } as CSSProperties;
  return (
    <div className={styles.table} role="table">
      <div className={`${styles.tableRow} ${styles.tableHead}`} style={gridStyle} role="row">
        {columns.map((column) => (
          <span key={column} role="columnheader">
            {column}
          </span>
        ))}
      </div>
      {rows.map((row, index) => (
        <div
          key={row[0]}
          className={`${styles.tableRow} ${index === highlightRow ? styles.tableRowAlert : ""}`}
          style={gridStyle}
          role="row"
        >
          {row.map((cell, cellIndex) => (
            <span key={`${row[0]}-${cellIndex}`} role="cell">
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Reactions({ items }: { items: { emoji: string; count: number; mine?: boolean }[] }) {
  return (
    <div className={styles.reactions}>
      {items.map((item) => (
        <span key={item.emoji} className={`${styles.reaction} ${item.mine ? styles.reactionMine : ""}`}>
          {item.emoji} {item.count}
        </span>
      ))}
    </div>
  );
}

export function Quote({ person, children, meta }: { person: Speaker; children: ReactNode; meta: string }) {
  return (
    <div className={styles.quote}>
      <span className={styles.quoteAuthor}>
        <Avatar src={person.face} size={16} />
        <strong>{person.name}</strong>
      </span>
      <span className={styles.quoteText}>{children}</span>
      <span className={styles.quoteMeta}>{meta}</span>
    </div>
  );
}

export function Message({
  author,
  time,
  children,
  tone = "default",
  continuation = false,
  avatarSize = 36,
}: {
  author?: Speaker;
  time: string;
  children: ReactNode;
  tone?: "default" | "highlight" | "muted";
  continuation?: boolean;
  avatarSize?: 32 | 36;
}) {
  const toneClass = tone === "highlight" ? styles.messageHighlight : tone === "muted" ? styles.messageMuted : "";
  return (
    <div className={`${styles.message} ${toneClass}`}>
      {continuation || !author ? (
        <span className={styles.gutterTime}>{time}</span>
      ) : (
        <Avatar src={author.face} size={avatarSize} />
      )}
      <div className={styles.messageBody}>
        {!continuation && author ? (
          <p className={styles.messageMeta}>
            <strong className={styles.messageName}>
              {isAgent(author) ? `${author.name} · AI Agent` : author.name}
            </strong>
            {isAgent(author) ? <AppBadge /> : null}
            <span className={styles.messageTime}>{time}</span>
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}

export function DateDivider({ label }: { label: string }) {
  return (
    <div className={styles.dateDivider}>
      <span>{label}</span>
    </div>
  );
}

type SidebarChannel = { name: string; active?: boolean; unread?: boolean };

export type SlackWindowProps = {
  label: string;
  user: SlackPerson;
  channels: SidebarChannel[];
  dms: SlackPerson[];
  agent: SlackAgent;
  agentActive?: boolean;
  agentUnread?: number;
  /** Main pane header — channel name or DM identity. */
  header: ReactNode;
  tabs?: string[];
  children: ReactNode;
  composer: string;
  /** Fixed main-pane width (design px) when a thread pane is open. */
  mainWidth?: number;
  thread?: {
    title: string;
    channel: string;
    children: ReactNode;
    composer: string;
  };
  overlay?: ReactNode;
};

function NavIcon({ name }: { name: string }) {
  return (
    <span className={`material-symbols-rounded ${styles.navIcon}`} aria-hidden>
      {name}
    </span>
  );
}

export function SlackWindow({
  label,
  user,
  channels,
  dms,
  agent,
  agentActive = true,
  agentUnread,
  header,
  tabs,
  children,
  composer,
  mainWidth,
  thread,
  overlay,
}: SlackWindowProps) {
  const mainStyle = mainWidth ? ({ "--main-w": mainWidth } as CSSProperties) : undefined;
  return (
    <div className={styles.window} role="group" aria-label={label}>
      <div className={styles.titleBar} aria-hidden>
        <span className={styles.lights}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.history}>
          <NavIcon name="arrow_back" />
          <NavIcon name="arrow_forward" />
          <NavIcon name="schedule" />
        </span>
        <span className={styles.search}>
          <NavIcon name="search" />
          Search Brightline
        </span>
      </div>

      <div className={styles.body}>
        <nav className={styles.rail} aria-hidden>
          <span className={styles.workspace}>B</span>
          <span className={styles.railItem}>
            <span className={styles.railIcon}>
              <NavIcon name="home" />
            </span>
            Home
          </span>
          <span className={`${styles.railItem} ${styles.railItemActive}`}>
            <span className={styles.railIcon}>
              <NavIcon name="chat_bubble" />
            </span>
            DMs
          </span>
          <span className={styles.railItem}>
            <span className={styles.railIcon}>
              <NavIcon name="notifications" />
            </span>
            Activity
          </span>
          <Avatar src={user.face} size={32} className={styles.railUser} />
        </nav>

        <div className={styles.panel}>
          <aside className={styles.sidebar} aria-hidden>
            <p className={styles.sidebarWorkspace}>Brightline ▾</p>
            <span className={styles.sidebarItem}>Threads</span>
            <span className={styles.sidebarItem}>Drafts &amp; sent</span>
            <span className={styles.sidebarSection}>▾ Channels</span>
            {channels.map((channel) => (
              <span
                key={channel.name}
                className={`${styles.sidebarItem} ${channel.active ? styles.sidebarActive : ""} ${
                  channel.unread ? styles.sidebarUnread : ""
                }`}
              >
                <span className={styles.hash}>#</span>
                {channel.name}
              </span>
            ))}
            <span className={styles.sidebarSection}>▾ Direct messages</span>
            {dms.map((person) => (
              <span key={person.name} className={styles.sidebarItem}>
                <Avatar src={person.face} size={20} />
                {person.name}
              </span>
            ))}
            <span className={styles.sidebarSection}>▾ Apps</span>
            <span className={`${styles.sidebarItem} ${agentActive ? styles.sidebarActive : styles.sidebarUnread}`}>
              <Avatar src={agent.face} size={20} />
              {agent.name}
              {agentUnread ? <span className={styles.unreadBadge}>{agentUnread}</span> : null}
            </span>
          </aside>

          <section className={`${styles.pane} ${mainWidth ? styles.paneFixed : ""}`} style={mainStyle}>
            <header className={styles.paneHeader}>{header}</header>
            {tabs ? (
              <div className={styles.tabs} aria-hidden>
                {tabs.map((tab, index) => (
                  <span key={tab} className={index === 0 ? styles.tabActive : undefined}>
                    {tab}
                  </span>
                ))}
              </div>
            ) : null}
            <div className={styles.messages}>{children}</div>
            <div className={styles.composer} aria-hidden>
              {composer}
            </div>
          </section>

          {thread ? (
            <section className={`${styles.pane} ${styles.threadPane}`}>
              <header className={styles.paneHeader}>
                <span>
                  <strong className={styles.paneTitle}>{thread.title}</strong>
                  <span className={styles.paneSub}>{thread.channel}</span>
                </span>
              </header>
              <div className={styles.messages}>{thread.children}</div>
              <div className={styles.composer} aria-hidden>
                {thread.composer}
              </div>
            </section>
          ) : null}
        </div>
      </div>
      {overlay}
    </div>
  );
}

/** DM header: agent face, "Name · AI Agent", APP badge and owner line. */
export function AgentDmHeader({ agent }: { agent: SlackAgent }) {
  return (
    <span className={styles.dmHeader}>
      <Avatar src={agent.face} size={24} />
      <strong className={styles.paneTitle}>{agent.name} · AI Agent</strong>
      <AppBadge />
      <span className={styles.paneSub}>{agent.owner}&apos;s Layer Agent</span>
    </span>
  );
}

export function ChannelHeader({ name }: { name: string }) {
  return <strong className={styles.paneTitle}># {name}</strong>;
}

export const slackStyles = styles;
