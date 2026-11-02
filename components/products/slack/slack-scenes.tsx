import { AGENTS, PEOPLE } from "./slack-people";
import {
  AgentDmHeader,
  ApprovalButtons,
  Avatar,
  BlockHeader,
  ButtonRow,
  Card,
  ChannelHeader,
  Ctx,
  DataTable,
  DateDivider,
  Mention,
  Message,
  Quote,
  Reactions,
  SlackButton,
  SlackWindow,
  Speech,
  slackStyles as s,
} from "./slack-ui";

/*
 * Illustrative Slack scenes for the Layer for Slack page.
 * All people, companies and data are fictional. Card titles, state emoji and
 * buttons follow the shipped Slack renderer (render/cards.ts, postcall/announce.ts).
 */

const { maya, nova, leo, sol, iris } = AGENTS;
const { even, theo, priya, jordan, rosa, dana, marcus } = PEOPLE;

/* Hero — channel thread → renewal plan (shared-channel audience discipline). */
export function SceneRenewal() {
  return (
    <SlackWindow
      label="Illustrative Slack scene: Even asks Maya, a personal Layer Agent, for a renewal plan in a deal thread"
      user={even}
      channels={[
        { name: "general" },
        { name: "ae-team", unread: true },
        { name: "deals-halcyon-renewal", active: true },
        { name: "pipeline-review" },
      ]}
      dms={[priya, jordan]}
      agent={maya}
      agentActive={false}
      agentUnread={1}
      header={<ChannelHeader name="deals-halcyon-renewal" />}
      tabs={["Messages", "Canvas", "Files"]}
      composer="Message #deals-halcyon-renewal"
      mainWidth={360}
      thread={{
        title: "Thread",
        channel: "# deals-halcyon-renewal",
        composer: "Reply…",
        children: (
          <>
            <Message author={even} time="9:33 AM">
              <Speech>
                <Mention>@Maya</Mention> turn this thread into a renewal plan. What&apos;s at risk and
                what needs my approval?
              </Speech>
            </Message>
            <Message author={maya} time="9:34 AM">
              <Speech>On it. Honestly? This one&apos;s very savable — and Dana&apos;s clearly on your side.</Speech>
              <Ctx layer>Read 6 thread messages · Salesforce · 3 Gong calls · Renewal Playbook</Ctx>
              <BlockHeader>Halcyon Freight — renewal plan</BlockHeader>
              <div className={s.fields}>
                <span>
                  <strong>Renews</strong>
                  <br />
                  Dec 14 · 41 days
                </span>
                <span>
                  <strong>ARR</strong>
                  <br />
                  $186,000 · Negotiation
                </span>
              </div>
              <ol className={s.list}>
                <li>
                  <strong>Price pressure.</strong> Marcus wants 15% off. Usage is up 22%, which supports
                  holding price for a 2-year term.
                </li>
                <li>
                  <strong>Stalled rollout.</strong> Ops is still on the v1 plan; Dana owns the fix.
                </li>
                <li>
                  <strong>Security review.</strong> New questionnaire due Fri, Nov 6.
                </li>
              </ol>
              <span className={s.personLine}>
                <Avatar src={marcus.face} size={18} />
                <strong>Marcus Lee</strong>
                <span className={s.muted}>CFO · economic buyer</span>
              </span>
              <span className={s.personLine}>
                <Avatar src={dana.face} size={18} />
                <strong>Dana Okafor</strong>
                <span className={s.muted}>VP Operations · champion</span>
              </span>
            </Message>
            <Message author={maya} time="9:34 AM" tone="muted">
              <Ctx>Only visible to you</Ctx>
              <Card title="📋 Follow-up email to Dana Okafor">
                <span>
                  Written in your voice — short, no exclamation marks. Proposes a 30-min rollout review
                  before Marcus&apos;s Dec 1 budget lock. Not sent.
                </span>
                <ButtonRow>
                  <SlackButton variant="primary">Review in DM</SlackButton>
                  <SlackButton>Dismiss</SlackButton>
                </ButtonRow>
              </Card>
            </Message>
          </>
        ),
      }}
    >
      <DateDivider label="Today" />
      <Message author={jordan} time="9:12 AM">
        <Speech>
          Halcyon renewal is 41 days out. Marcus asked for 15% off on yesterday&apos;s call, and their ops
          team is still on the v1 rollout plan.
        </Speech>
        <Reactions
          items={[
            { emoji: "👀", count: 2, mine: true },
            { emoji: "✅", count: 1 },
          ]}
        />
        <span className={s.personLine}>
          <Avatar src={priya.face} size={20} />
          <Avatar src={even.face} size={20} />
          <Avatar src={maya.face} size={20} />
          <span className={s.link}>4 replies</span>
          <span className={s.muted}>Last reply just now</span>
        </span>
      </Message>
      <Message author={maya} time="9:34 AM" tone="highlight">
        <Ctx>replied to a thread: Halcyon renewal is 41 days out…</Ctx>
        <Speech>Plan&apos;s in the thread. Short version: savable, three risks, and Dana is the key.</Speech>
        <Reactions items={[{ emoji: "🙌", count: 3 }]} />
      </Message>
    </SlackWindow>
  );
}

/* Before the call — Meeting Preparation routine + Practice this call. */
export function SceneMeetingBrief() {
  return (
    <SlackWindow
      label="Illustrative Slack scene: Maya posts a morning meeting brief and offers a practice call"
      user={even}
      channels={[{ name: "ae-team" }, { name: "deals-halcyon-renewal" }]}
      dms={[priya, jordan]}
      agent={maya}
      header={<AgentDmHeader agent={maya} />}
      composer="Message Maya"
    >
      <DateDivider label="Today" />
      <Message author={maya} time="7:30 AM">
        <Speech>
          Morning, Even ☕ Big one today. I kept 9:15–10 clear so you can prep without Slack pinging you —
          everything&apos;s below.
        </Speech>
        <Ctx layer>Meeting Preparation · daily at 7:30 · Preparation playbook</Ctx>
        <BlockHeader>Meeting brief · Halcyon Freight QBR · 10:00–10:45 AM</BlockHeader>
        <div className={s.fields}>
          <span>
            <strong>Why meet</strong>
            <br />
            Agree the rollout fix before Marcus&apos;s Dec 1 budget lock
          </span>
          <span>
            <strong>Last touch</strong>
            <br />
            Oct 29 — Marcus asked for 15% off; Dana backed the expansion
          </span>
        </div>
        <span className={s.personLine}>
          <Avatar src={dana.face} size={18} />
          <span>
            <strong>Dana Okafor · VP Operations</strong> — <em>Connect:</em> shipped v1 in 6 weeks.{" "}
            <em>Relevance:</em> owns the v2 date; ask what blocks it.
          </span>
        </span>
        <span className={s.personLine}>
          <Avatar src={marcus.face} size={18} />
          <span>
            <strong>Marcus Lee · CFO</strong> — <em>Connect:</em> new budget process this year.{" "}
            <em>Relevance:</em> price vs. term; ask what a 2-year commitment unlocks.
          </span>
        </span>
        <Card>
          <div className={s.fields}>
            <span>
              <strong>Meeting goal</strong>
              <br />A dated v2 plan and a renewal path
            </span>
            <span>
              <strong>Where we may fit</strong>
              <br />
              Usage is up 22% — expansion for the new region
            </span>
            <span>
              <strong>Questions</strong>
              <br />
              Who signs off on v2? What does a 2-year term need?
            </span>
            <span>
              <strong>Prepare yourself</strong>
              <br />
              Practise holding price for term
            </span>
          </div>
        </Card>
      </Message>
      <Message time="7:31" continuation>
        <Card>
          <div className={s.cardRowEnd}>
            <span>
              <strong className={s.cardTitle}>Practice this call?</strong>
              <br />
              Last QBR you said Marcus&apos;s price push caught you off guard. Ten minutes with him first?
              I&apos;ll play the grumpy CFO. Gently.
            </span>
            <SlackButton variant="primary">🎧 Practice this call</SlackButton>
          </div>
        </Card>
      </Message>
    </SlackWindow>
  );
}

/* After the call — flagship "Call wrapped" DM with governed follow-ups in a thread. */
export function ScenePostCall() {
  return (
    <SlackWindow
      label="Illustrative Slack scene: after a call, Maya posts a recap and follow-ups waiting for approval"
      user={even}
      channels={[{ name: "ae-team" }, { name: "deals-halcyon-renewal" }]}
      dms={[priya, jordan]}
      agent={maya}
      agentUnread={3}
      header={<AgentDmHeader agent={maya} />}
      composer="Message Maya"
      mainWidth={408}
      thread={{
        title: "Thread",
        channel: "Maya",
        composer: "Reply…",
        children: (
          <Message author={maya} time="10:47 AM" avatarSize={32}>
            <Card title="✅ Email draft to Dana Okafor — done">
              <span>Saved to your Gmail drafts · approved 10:49 AM</span>
              <ButtonRow>
                <span className={s.chip}>Pilot plan · written from the call</span>
                <span className={`${s.chip} ${s.chipWarn}`}>Attach SOC 2 — only you have it</span>
              </ButtonRow>
            </Card>
            <Card title="📋 Calendar event — Rollout review">
              <span>
                Thu, Nov 5 · 2:00–2:30 PM · Dana Okafor, Priya Nair
                <br />
                <span className={s.muted}>Agreed on the call at 32:10 · no invite sent yet</span>
              </span>
              <ApprovalButtons />
            </Card>
            <Card title="📋 Update Halcyon Freight — Renewal FY27 · 3 fields">
              <div className={s.fieldTable}>
                <span>Field</span>
                <span>Now</span>
                <span>Proposed</span>
                <span>Next step</span>
                <span className={s.muted}>Pricing call</span>
                <span>Rollout review Nov 5</span>
                <span>Champion</span>
                <span className={s.muted}>—</span>
                <span>Dana Okafor</span>
                <span>Economic buyer</span>
                <span className={s.muted}>—</span>
                <span>Marcus Lee</span>
              </div>
              <ApprovalButtons />
            </Card>
          </Message>
        ),
      }}
    >
      <Message author={maya} time="10:47 AM" tone="muted">
        <BlockHeader>📞 Call wrapped — follow-ups ready for review</BlockHeader>
        <Ctx>Halcyon Freight QBR · 45 min · Dana Okafor, Marcus Lee, Priya Nair</Ctx>
        <Speech>
          That went better than it felt — Dana said “let&apos;s lock this in” at 31:40. I&apos;ve done the
          boring part, so you can still make your 4:00 pickup.
        </Speech>
        <p className={s.small}>
          <strong>Decisions</strong> · Move ops to the v2 rollout plan by Nov 20
          <br />
          <strong>Commitments</strong> · You: pilot plan + SOC 2 report · Dana: ops owner by Friday
          <br />
          <strong>Unanswered</strong> · Marcus asked about a 2-year price lock
        </p>
        <Ctx layer>Recorded by Layer Co-Pilot · Automations playbook</Ctx>
        <span className={s.personLine}>
          <Avatar src={maya.face} size={20} />
          <span className={s.link}>4 replies</span>
          <span className={s.muted}>1 done, 3 to review</span>
        </span>
      </Message>
      <Message author={even} time="10:52 AM">
        <Speech>honestly thought I fumbled the price bit. thank you</Speech>
      </Message>
      <Message author={maya} time="10:52 AM">
        <Speech>
          You held price and moved it to term — exactly what we practised. Marcus nodded twice. I counted 😉
        </Speech>
      </Message>
    </SlackWindow>
  );
}

/* Private by audience — public safe reply, private warm path in the owner's DM. */
export function SceneRelationship() {
  return (
    <SlackWindow
      label="Illustrative Slack scene: Maya answers a teammate safely in a channel and shares private details only with Even"
      user={even}
      channels={[{ name: "general" }, { name: "ae-team", unread: true }, { name: "deals-halcyon-renewal" }]}
      dms={[priya, jordan]}
      agent={maya}
      header={<AgentDmHeader agent={maya} />}
      composer="Message Maya"
      mainWidth={450}
      thread={{
        title: "Thread",
        channel: "# ae-team",
        composer: "Reply…",
        children: (
          <>
            <Message author={priya} time="11:02 AM">
              <Speech>
                <Mention>@Maya</Mention> does Even&apos;s team know anyone in Halcyon finance?
              </Speech>
            </Message>
            <Message author={maya} time="11:02 AM">
              <Speech>
                Good news, Priya — there&apos;s a warm path to their finance lead. It runs through Even&apos;s
                private notes, so I&apos;ve handed it to Even to share. Won&apos;t be long, I suspect 🙂
              </Speech>
              <Ctx>Private context moved to Even&apos;s DM</Ctx>
              <Reactions items={[{ emoji: "🙏", count: 1 }]} />
            </Message>
          </>
        ),
      }}
    >
      <Message author={maya} time="11:03 AM">
        <Speech>
          Priya asked about a way into Halcyon finance. The good stuff came from your notes, so I kept it
          between us — your call what to share.
        </Speech>
        <Quote person={priya} meta="Posted in #ae-team · 11:02 AM · View thread">
          <Mention>@Maya</Mention> does Even&apos;s team know anyone in Halcyon finance?
        </Quote>
        <Card title="Warm path to Marcus Lee, CFO">
          <span className={s.chain}>
            <span>
              <Avatar src={even.face} size={20} />
              <strong>You</strong>
            </span>
            →
            <span>
              <Avatar src={priya.face} size={20} />
              <strong>Priya</strong>
            </span>
            →
            <span>
              <Avatar src={dana.face} size={20} />
              <strong>Dana</strong>
            </span>
            →
            <span>
              <Avatar src={marcus.face} size={20} />
              <strong>Marcus</strong>
            </span>
          </span>
          <span>
            • Priya – Dana: worked together at Kestrel Health, 2019–22 · <strong>strong</strong>
            <br />• Dana – Marcus: weekly ops review · <strong>medium</strong>
          </span>
          <Ctx layer>Your relationship graph · LinkedIn connections · your note from Oct 12</Ctx>
        </Card>
        <ButtonRow>
          <SlackButton>Draft intro request to Priya</SlackButton>
          <SlackButton>Show other paths</SlackButton>
        </ButtonRow>
      </Message>
    </SlackWindow>
  );
}

/* SDR — ICP leads → enrich → CRM records + multi-step routine. */
export function SceneSdr() {
  return (
    <SlackWindow
      label="Illustrative Slack scene: Nova, Theo's Layer Agent, sources leads and prepares an outreach routine"
      user={theo}
      channels={[{ name: "sdr-team" }, { name: "outbound-wins" }]}
      dms={[jordan, even]}
      agent={nova}
      header={<AgentDmHeader agent={nova} />}
      composer="Message Nova"
    >
      <Message author={theo} time="9:02 AM">
        <Speech>
          Find VPs and Directors of RevOps at 200–1,000 person B2B SaaS companies that match our ICP.
          Shortlist 10.
        </Speech>
      </Message>
      <Message author={nova} time="9:03 AM">
        <Speech>
          Morning, Theo! Fresh list — I skipped anyone you&apos;ve already emailed this quarter, and the two
          who ghosted you in June 😅
        </Speech>
        <Ctx layer>Layer Data &amp; Signals · ranked on fit with your ICP · 1,240 matched</Ctx>
        <BlockHeader>10 ICP-fit RevOps leaders</BlockHeader>
        <DataTable
          template="1fr 1fr 1fr 0.6fr 2fr"
          columns={["Name", "Title", "Company", "Size", "Why they fit"]}
          rows={[
            ["Ines Duarte", "VP RevOps", "Fieldline", "420", "Hiring 3 RevOps roles; runs Salesforce"],
            ["Kofi Mensah", "Dir. RevOps", "Ovenbird", "610", "New CRO in September"],
            ["Hana Sato", "VP RevOps", "Tallowbird", "280", "Posted about forecast accuracy last week"],
          ]}
        />
        <ButtonRow>
          <SlackButton variant="pressed">Enrich the top 5</SlackButton>
          <SlackButton>Show all 10</SlackButton>
        </ButtonRow>
      </Message>
      <Message time="9:05" continuation>
        <Speech>
          Five good ones. Hana&apos;s post on forecast accuracy is basically your opener, so I used it.
          Couldn&apos;t find Kofi&apos;s phone — left it blank rather than guess.
        </Speech>
        <div className={s.grid2}>
          <Card title="📋 Create 5 CRM records">
            <span>Salesforce leads · owner Theo Park · source “Layer outbound”</span>
            <ApprovalButtons approveLabel="Approve all 5" />
          </Card>
          <Card title="📋 Enroll 5 in “Outbound — RevOps leaders”">
            <span>
              1 · Intro email from each person&apos;s signal · 2 · LinkedIn invitation (under 200
              characters) · 3 · Wait 3 days · 4 · One follow-up
            </span>
            <span className={s.muted}>One approval covers every step. Stops for anyone who replies or bounces.</span>
            <ApprovalButtons />
          </Card>
        </div>
      </Message>
    </SlackWindow>
  );
}

/* AE — deal risk → Win Plan routine (Deal Intelligence preview). */
export function SceneWinPlan() {
  return (
    <SlackWindow
      label="Illustrative Slack scene: Maya flags a deal risk with evidence and proposes a Win Plan routine"
      user={even}
      channels={[{ name: "ae-team" }, { name: "deals-larkspur" }]}
      dms={[jordan]}
      agent={maya}
      header={<AgentDmHeader agent={maya} />}
      composer="Message Maya"
    >
      <Message author={maya} time="7:12 AM">
        <Speech>
          Morning, Even. Not panic territory, but Larkspur slipped overnight and it needs a nudge this week.
          I&apos;ve sketched a plan — you know Sam better than the data does, so change anything.
        </Speech>
        <Ctx layer>Deal health · rescored after the close date moved in Salesforce</Ctx>
        <BlockHeader>Larkspur Bank moved to At risk · 46</BlockHeader>
        <div className={`${s.fields} ${s.fields4}`}>
          <span className={s.band}>
            Stakeholder coverage<strong className={s.bandMixed}>Mixed</strong>
          </span>
          <span className={s.band}>
            Decision authority<strong className={s.bandWeak}>Weak</strong>
          </span>
          <span className={`${s.band} ${s.bandCritical}`}>
            Mutual next step<strong className={s.bandWeak}>Critical · new</strong>
          </span>
          <span className={s.band}>
            Close-date credibility<strong className={s.bandWeak}>Weak</strong>
          </span>
        </div>
        <p className={s.small}>
          <strong>Evidence</strong> · No next meeting since Oct 14 (Calendar, Gmail) · Close date moved Dec 5 →
          Dec 19, no reason logged (Salesforce) · Their CISO hasn&apos;t been on a call yet (Gong, Oct 29)
        </p>
        <Card title="📋 Win plan routine · Larkspur Bank · 4 steps">
          <div className={s.fields}>
            <span>
              <strong>Most at risk</strong>
              <br />
              Mutual next step
            </span>
            <span>
              <strong>Must become true</strong>
              <br />A dated security review with their CISO
            </span>
          </div>
          <span>
            1 · <strong>Email</strong> Sam Ortiz (CISO) — “Security review for the Larkspur rollout”
            <br />2 · <strong>Calendar event</strong> Security review · Tue, Nov 10 · 11:00–11:45
            <br />3 · <strong>CRM update</strong> Next step: — → Security review Nov 10
            <br />4 · <strong>Practice the ask</strong> 10 minutes with a skeptical CISO — you liked the last one
          </span>
          <span className={s.muted}>Approval needed · nothing external happens until you approve it.</span>
          <ApprovalButtons approveLabel="Review and approve routine" />
        </Card>
        <span className={s.link}>Open deal health in Layer →</span>
      </Message>
    </SlackWindow>
  );
}

/* CSM — Renewal & Expansion Review routine. */
export function SceneCsm() {
  return (
    <SlackWindow
      label="Illustrative Slack scene: Leo, Priya's Layer Agent, reviews renewals and prepares re-introductions"
      user={priya}
      channels={[{ name: "cs-team" }, { name: "deals-halcyon-renewal" }]}
      dms={[even]}
      agent={leo}
      header={<AgentDmHeader agent={leo} />}
      composer="Message Leo"
    >
      <Message author={leo} time="Thu 8:00 AM">
        <Speech>
          Happy Thursday, Priya. Mostly good news — Kestrel&apos;s new region is your expansion story. One
          account needs you, and I know you&apos;ll miss working with Ana.
        </Speech>
        <Ctx layer>Renewal &amp; Expansion Review · Thursdays 8:00 · Prepare changes and ask me each time</Ctx>
        <BlockHeader>Renewals in the next 90 days · 4 accounts · $612,000 ARR</BlockHeader>
        <DataTable
          template="1.1fr 0.6fr 0.8fr 1.6fr 1.3fr"
          columns={["Account", "Renews", "ARR", "Health signals", "Expansion signal"]}
          highlightRow={2}
          rows={[
            ["Halcyon Freight", "Dec 14", "$186,000", "Price pressure; rollout plan agreed", "Usage +22%"],
            ["Kestrel Health", "Jan 9", "$142,000", "2 escalations closed", "New region launching"],
            ["Orbit Mills", "Jan 22", "$98,000", "Champion left Oct 12", "—"],
            ["Wrenfield", "Jan 30", "$186,000", "Weekly active users up", "Asked about the API tier"],
          ]}
        />
        <Card title="Needs you this week">
          <span>
            Ana Ruiz left Orbit Mills on Oct 12 (Watch: job change), so the renewal has no executive contact.
            I drafted an intro to the new COO — and Ana&apos;s new company is a nice lead for Theo later.
          </span>
        </Card>
        <div className={s.grid2}>
          <Card title="📋 Email draft — intro to Orbit Mills' new COO">
            <span>“Keeping your rollout on track” · references Ana&apos;s handover and Q3 results</span>
            <ApprovalButtons />
          </Card>
          <Card title="📋 CRM follow-up task — Kestrel expansion">
            <span>Map stakeholders for the new region · due Mon, Nov 9 · owner Priya</span>
            <ApprovalButtons />
          </Card>
        </div>
      </Message>
    </SlackWindow>
  );
}

/* Manager — Weekly Team Forecast + Coaching Agenda (call scores preview). */
export function SceneManager() {
  return (
    <SlackWindow
      label="Illustrative Slack scene: Sol, Jordan's Layer Agent, rolls up the team forecast and a coaching agenda"
      user={jordan}
      channels={[{ name: "ae-team" }, { name: "pipeline-review" }, { name: "sales-leadership" }]}
      dms={[even, rosa]}
      agent={sol}
      header={<AgentDmHeader agent={sol} />}
      composer="Message Sol"
    >
      <Message author={sol} time="Mon 8:00 AM">
        <Speech>
          Morning, Jordan. Good week, honestly — Even held price on Halcyon exactly like you coached. Ada&apos;s
          had a heavy month (three new accounts), so maybe open your 1:1 with a win before the discovery
          feedback.
        </Speech>
        <Ctx layer>Weekly Team Forecast + Coaching Agenda · Mondays 8:00 · Read only — reports, changes nothing</Ctx>
        <BlockHeader>Your team&apos;s week · Q4 commit $298k of $400k</BlockHeader>
        <DataTable
          template="1fr 0.8fr 0.8fr 0.8fr 1.6fr"
          columns={["Seller", "Commit", "Best case", "At risk", "Coaching focus"]}
          highlightRow={1}
          rows={[
            ["Even", "$186,000", "$398,000", "1 deal", "Holding price for term — strong"],
            ["Ada Moreno", "$72,000", "$240,000", "2 deals", "Discovery and questioning"],
            ["Ken Ito", "$40,000", "$155,000", "—", "Advancement and commitment"],
          ]}
        />
        <Card>
          <div className={s.cardRowEnd}>
            <span>
              <strong>Ada · Discovery and questioning · 2.4 / 5</strong> across 6 scored calls
              <br />
              <span className={s.muted}>“Three questions in 40 minutes” — Wrenfield discovery, 12:40</span>
            </span>
            <SlackButton>Replay this moment</SlackButton>
          </div>
        </Card>
        <Card>
          <div className={s.cardRowEnd}>
            <span>
              <strong>Ken · Advancement and commitment · 2.7 / 5</strong>
              <br />
              <span className={s.muted}>Ended 4 of 5 calls without a dated next step</span>
            </span>
            <SlackButton>Replay this moment</SlackButton>
          </div>
        </Card>
        <ButtonRow>
          <SlackButton>Prep my 1:1 with Ada</SlackButton>
          <SlackButton>Open Team Progress in Layer</SlackButton>
        </ButtonRow>
        <Ctx>Sol reports to Jordan. Each seller&apos;s own Agent handles — and asks before — their follow-ups.</Ctx>
      </Message>
    </SlackWindow>
  );
}

/* Executive — Leadership Operating Brief (read only). */
export function SceneExec() {
  return (
    <SlackWindow
      label="Illustrative Slack scene: Iris, Rosa's Layer Agent, posts a read-only leadership operating brief"
      user={rosa}
      channels={[{ name: "exec-staff" }, { name: "sales-leadership" }]}
      dms={[jordan]}
      agent={iris}
      header={<AgentDmHeader agent={iris} />}
      composer="Message Iris"
    >
      <Message author={iris} time="Mon 7:00 AM">
        <Speech>
          Morning, Rosa. About six minutes of reading — then your board-prep block, which I&apos;ve kept clear
          until 10. One decision needs you; the rest is context.
        </Speech>
        <Ctx layer>Leadership Operating Brief · Mondays 7:00 · Read only — reports, changes nothing</Ctx>
        <BlockHeader>Operating brief · week of Nov 2</BlockHeader>
        <div className={`${s.fields} ${s.fields4}`}>
          <span className={s.metric}>
            Q4 commit<strong>$1.31M</strong>of $1.60M target
          </span>
          <span className={s.metric}>
            Open pipeline<strong>$4.2M</strong>+6% this week
          </span>
          <span className={s.metric}>
            New risk since last week<strong>5 deals</strong>$820k combined
          </span>
          <span className={s.metric}>
            Renewals, next 90 days<strong>$1.9M</strong>14 accounts
          </span>
        </div>
        <Card title="Weighted pipeline · 8 weeks · $3.1M → $3.6M">
          <svg
            className={s.sparkline}
            viewBox="0 0 600 80"
            preserveAspectRatio="none"
            role="img"
            aria-label="Weighted pipeline rose from 3.1 to 3.6 million dollars over eight weeks"
          >
            <path d="M0 20H600M0 50H600" stroke="#eeeeee" strokeWidth="1" />
            <path d="M0 60L86 56L171 62L257 48L343 40L429 44L514 30L600 22V80H0Z" fill="#1264a3" opacity="0.14" />
            <path d="M0 60L86 56L171 62L257 48L343 40L429 44L514 30L600 22" fill="none" stroke="#1264a3" strokeWidth="2.5" />
          </svg>
        </Card>
        <p className={s.small}>
          <strong>Three operating risks</strong>
          <br />
          1. <strong>$290k commit gap.</strong> Two enterprise deals slipped to Q1 (Salesforce, Oct 28–30).
          <br />
          2. <strong>Discovery is the weakest skill.</strong> 2.6 / 5 across 41 scored calls.
          <br />
          3. <strong>Renewals without an executive contact.</strong> Including Orbit Mills.
        </p>
        <Card title="Decision for you">
          <span>
            Larkspur Bank asks for a 2-year price lock. Jordan recommends yes with a usage floor — his note
            and the deal evidence are in the thread.
          </span>
        </Card>
        <ButtonRow>
          <SlackButton>Show the slipped deals</SlackButton>
          <SlackButton>Which teams need discovery coaching?</SlackButton>
          <SlackButton>Draft my board update</SlackButton>
        </ButtonRow>
      </Message>
    </SlackWindow>
  );
}
