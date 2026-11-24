/* Goal OS · rules engine (no DOM). Loaded by the app and by node tests. */
(function (G) {
  const pad = n => String(n).padStart(2, '0');
  const dkey = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const pd = k => { const [a, b, c] = k.split('-').map(Number); return new Date(a, b - 1, c, 12); };
  const addD = (k, n) => { const d = pd(k); d.setDate(d.getDate() + n); return dkey(d); };
  const dow = k => pd(k).getDay();                      // 0 = Sunday
  const monday = k => addD(k, -((dow(k) + 6) % 7));     // a week's id is its Monday
  const diffD = (a, b) => Math.round((pd(a) - pd(b)) / 864e5);

  const SEED_GOALS = [
    { id: 'move', e: '🏋️', name: 'Move & Train', color: '#e2703a', target: 4, noMin: true,
      cue: 'Morning: water, then gym clothes on',
      floor: 'Warm-up + the first lift only', min: 'Tick on gym days only', std: '60–75 min session + 10-min warm-up', cap: '2h30',
      approach: 'Have a strong, mobile body: train every major muscle group and move through the day without desk stiffness.',
      milestone: '12 weeks of 4×/week upper/lower training with load added on the main lifts; morning stiffness rarely above 2/10',
      plans: { start: "If I've had my glass of water after waking on a gym day, then I put on gym clothes and leave; the warm-up starts at the gym.",
        obstacle: "If I don't feel like the full session, then I do the warm-up and the first lift only and decide after. Stopping there still counts.",
        back: 'If I missed a gym day, then I do the next session in the rotation, not the missed one, and never two in one day.' },
      relq: 'How does the session itself (not the result) connect to what you value now?',
      seq: ['Upper A · push', 'Lower A · squat', 'Upper B · pull', 'Lower B · hinge'], detail: 'move' },
    { id: 'job', e: '💼', name: 'Job Hunt', color: '#3566d6', target: 5,
      cue: 'Back from Move: coffee + laptop open, before email or feeds',
      floor: '1 tailored application or 1 cold email (10 min)', min: '5 applications or 5 cold emails', std: 'Apply → Source → Reach out, 3 × 50 min', cap: '3h',
      approach: "Run an outreach engine I'm proud of: tailored applications and cold emails that turn my skills into interviews.",
      milestone: '8 first conversations (recruiter screens or interviews), with templates tuned from reply rates',
      plans: { start: "If I'm back from Move and my coffee is ready, then I open the pipeline and start applying before email or any feed.",
        obstacle: 'If a rejection or silence makes me think "why bother", then I remind myself: replies come from volume and fit, not from my worth. Then I send 3 and may close the session.',
        back: 'If it is the first day back after a disruption, then I follow up with my 3 warmest leads, then send 2 applications from the queue.' },
      relq: 'Which part of this work do you actually enjoy or value?',
      rot: { 5: 'Apply → Automation block (replaces Source today) → Reach out' }, focus: 'Apply (before lunch) → Source → Reach out',
      links: [['LinkedIn Jobs (no feed)', 'https://www.linkedin.com/jobs/']], detail: 'job' },
    { id: 'german', e: '🇩🇪', name: 'German', color: '#c2952b', target: 6,
      cue: 'When I close the after-lunch Job Hunt block',
      floor: '10 min flashcards or one short video', min: '10 min flashcards or one short video', std: '60 min: Anki 15 · focus 35 · output 10', cap: '1h',
      approach: 'Reach solid A2: follow everyday conversations and handle simple exchanges in German.',
      milestone: 'A2 grammar core done (cases, Perfekt, modal verbs, weil/dass clauses) and an A2 mock test passed',
      plans: { start: "If I close the after-lunch Job Hunt block, then I open today's German session before checking the phone.",
        obstacle: 'If a grammar topic feels confusing, then I switch to 10 min of video and note one question for the next grammar day.',
        back: 'If it is the first day back after a disruption, then I do 10 min of flashcards before anything else.' },
      relq: 'What does German open up for you that you want, now?',
      rot: { 1: 'Grammar + exercises', 4: 'Grammar + exercises', 2: 'Course unit (Nicos Weg)', 5: 'Course unit (Nicos Weg)', 3: 'Video + shadowing', 6: 'Video + shadowing + journal', 0: 'Flashcards only' },
      links: [['Nicos Weg (DW)', 'https://learngerman.dw.com/de/c-36519687'], ['Easy German', 'https://www.youtube.com/@easygerman'], ['Goethe A2 practice test', 'https://www.goethe.de/de/spr/kup/prf/prf/sd2/ueb.html']], detail: 'german' },
    { id: 'tech', e: '🧠', name: 'Tech Readiness', color: '#7a55d6', target: 5,
      cue: 'When I close the German session (after a 10-min walk)',
      floor: 'One due flashcard round, or one design explained aloud (10 min)', min: 'One due flashcard round, or one design explained aloud (10 min)', std: '60–90 min on the day’s rotation', cap: '1h30',
      approach: 'Be able to explain and apply cloud, networking, Linux, system design, Git, coding and DevOps clearly in any interview.',
      milestone: 'Interview deck fully seen with steady retention, 12 system designs explained aloud, and one 2-hour mock interview with a gap list',
      plans: { start: "If I close the German session, then I take a 10-min walk and open today's rotation.",
        obstacle: 'If a problem or design stalls me for 20 min, then I read a reference solution, explain it aloud, and redo it from memory next session.',
        back: 'If it is the first day back after a disruption, then I clear one round of due flashcards before anything else.' },
      relq: 'Which area do you genuinely find interesting, and why?',
      rot: { 1: 'Deck: all due + 10–15 new · then 1 timed coding problem', 3: 'Deck: all due + 10–15 new · then 1 timed coding problem', 5: 'Deck: all due + 10–15 new · then 1 timed coding problem',
        2: 'System design · learn one building block · AI: one primary source', 4: 'System design · design one system in 30 min, explain aloud', 6: 'System design · mock: redo Thursday’s design from memory', 0: 'Minimum only' },
      detail: 'tech' },
    { id: 'frn', e: '🃏', name: 'French · Notes', color: '#1f9d8f', target: 6,
      cue: 'When I close the Tech block',
      floor: '5 min of Rappel on the phone', min: "Finish today's Rappel phase in Lexiloop", std: '45 min: Rappel → Oral → Phrases, then pick 3 expressions', cap: '1h',
      approach: 'Turn my French notes into expressions I naturally reach for when I speak and write.',
      milestone: '30 notes at 10+ encounters in Lexiloop and 3 monthly check-ins with a longer written paragraph each time',
      plans: { start: "If I close the Tech block, then I open Lexiloop and start the day's session before anything else.",
        obstacle: "If I don't feel like the full session, then I do Rappel only and stop.",
        back: 'If it is the first day back after a disruption, then I do the Rappel phase on my phone before unpacking.' },
      relq: 'How does this practice change the way you think and write?', detail: 'frn' },
    { id: 'frs', e: '🗣️', name: 'French · Speaking', color: '#d64f7a', target: 6,
      cue: 'After dinner, I open Discord',
      floor: 'A 2-min voice note, or 10 min of AI role-play', min: '30 min speaking aloud', std: '60–90 min on Discord or AI role-play + 10 min feeding Lexiloop', cap: '2h · ends 1h before bed',
      approach: 'Be able to hold a relaxed 15-minute spontaneous conversation in French on everyday and work topics.',
      milestone: 'Hold a 15-min Discord conversation without switching language, 3 times in one week',
      plans: { start: 'If I finish dinner, then I open Discord and join a voice channel within 5 minutes.',
        obstacle: 'If the channel is empty or I feel nervous, then I do 10 min of AI role-play first and retry Discord after.',
        back: 'If it is the first day back after a disruption, then I record a 2-min voice note about the trip before anything else.' },
      relq: 'What does speaking French let you do or be that you care about now?',
      links: [['Discord', 'https://discord.com/app']], detail: 'frs' }
  ];

  function fresh(today) {
    const goals = {}; SEED_GOALS.forEach(g => goals[g.id] = Object.assign({ stage: 0, next: '', t: 1 }, g));
    return { v: 1, goals, order: SEED_GOALS.map(g => g.id), days: {}, weeks: {}, notes: [], audits: {},
      german: { units: {}, diag: false, t: 1 }, flags: {}, settings: { start: today, nudge: '20:30', notif: false, t: 1 }, t: 1 };
  }
  const active = S => S.order.map(i => S.goals[i]).filter(g => g && !g.arch);
  const ticks = d => d && d.ticks ? Object.keys(d.ticks).filter(i => d.ticks[i]) : [];

  /* Day mode: decided from yesterday, the day before, off-routine and Sunday. */
  function mode(S, k) {
    const day = S.days[k] || {}; if (day.off) return 'off';
    let gap = 0, c = addD(k, -1);
    while (c >= S.settings.start && gap < 60) { const d = S.days[c] || {}; if (d.off || ticks(d).length) break; gap++; c = addD(c, -1); }
    if ((S.days[addD(k, -1)] || {}).off) return 'back';
    if (gap >= 2) return 'restart';
    if (gap === 1) return 'lapse';
    return dow(k) === 0 ? 'light' : 'normal';
  }
  const MODES = {
    normal: ['Normal day', 'At each cue, start with the minimum; continue if it goes well. One tap per goal, nothing else.', 'std'],
    light: ['Light Sunday', 'Minimums only, then the 5-minute review. Rest is part of the plan.', 'min'],
    off: ['Off-routine', 'Travel or disruption: floors only (10 min, anywhere). Keep the cues; the week still counts by its target.', 'floor'],
    back: ['First day back', 'Run each goal’s transition plan first. Floors count today; no catching up.', 'floor'],
    lapse: ['Restart day', 'Yesterday was empty. Name it, do the floor of each goal today, move on. No doubling.', 'floor'],
    restart: ['Back after a gap', 'A multi-day gap: floor within 24 hours using the transition plans. At the review, name the trigger and adjust one variable.', 'floor']
  };
  function focus(S, g, k) {
    if (g.seq) { let n = 0; for (const d in S.days) if (d < k && S.days[d].ticks && S.days[d].ticks[g.id]) n++; return g.seq[n % g.seq.length]; }
    return (g.rot && g.rot[dow(k)]) || g.focus || '';
  }
  function weekCount(S, id, wk) { let n = 0; for (let i = 0; i < 7; i++) { const d = S.days[addD(wk, i)]; if (d && d.ticks && d.ticks[id]) n++; } return n; }
  const weekStats = (S, wk) => active(S).map(g => ({ g, n: weekCount(S, g.id, wk), ok: weekCount(S, g.id, wk) >= g.target }));

  /* Which week needs a review today (Sunday → this week; otherwise an uncleared last week). */
  function reviewWeek(S, k) {
    if (dow(k) === 0) { const w = monday(k); return (S.weeks[w] || {}).cleared ? null : w; }
    const w = addD(monday(k), -7); if (w < monday(S.settings.start)) return null;
    return (S.weeks[w] || {}).cleared ? null : w;
  }
  const TRIG = {
    setting: ['🧳 Setting change', 'Run the transition plan on day one back, and make sure the floor works from a phone, anywhere.'],
    device: ['📱 Device', 'Fewer temptations beats more resistance: phone in another room, autoplay off. Change the environment, not the effort.'],
    discomfort: ['😣 Uncomfortable moment', 'Before starting: name the feeling, accept it, do 5 minutes of the smallest step.'],
    why: ['🤷 Why bother', 'An ownership question: write a relevance note for this goal this week. If it repeats, re-run its reason audit.']
  };
  function auditVerdict(a) {
    const au = (a.c + a.d + a.e) / 3, co = (a.a + a.b) / 2;
    const v = au >= 4.5 ? (co >= 4.5 ? 'Keep · drop the controlling props (comparison, approval)' : 'Keep') : (co >= 4.5 ? 'Reframe around the part you own, or replace' : 'Reframe: find what would make it yours');
    return { au, co, v };
  }
  /* Everything the review asks for on week `wk`, derived from the data. */
  function reviewItems(S, wk) {
    const out = [], idx = Math.round(diffD(wk, monday(S.settings.start)) / 7), prev = addD(wk, -7), W = S.weeks[wk] || {}, P = S.weeks[prev] || {};
    const st = weekStats(S, wk);
    st.filter(s => !s.ok).forEach(s => {
      out.push({ k: 'gap', g: s.g, n: s.n });
      if (prev >= monday(S.settings.start) && weekCount(S, s.g.id, prev) < s.g.target) out.push({ k: 'modify', g: s.g });
    });
    if (W.energy === 'drained' && P.energy === 'drained') out.push({ k: 'trim' });
    const tw = S.weeks[addD(wk, -14)]; if (tw && tw.decision === 'change' && tw.change) out.push({ k: 'test', text: tw.change });
    if (idx % 2 === 1) { const gs = active(S).map(g => ({ g, last: (S.notes.filter(n => n.goal === g.id).map(n => n.date).sort().pop() || '') })).sort((a, b) => a.last < b.last ? -1 : 1); if (gs[0]) out.push({ k: 'note', g: gs[0].g }); }
    const lastAudit = Object.values(S.audits).flat().map(a => a.date).sort().pop();
    if (!lastAudit || diffD(wk, monday(lastAudit)) >= 35) out.push({ k: 'audit' });
    return out;
  }
  /* Standing alerts shown in the inbox (and counted on the bell). */
  function alerts(S, k) {
    const out = [], rw = reviewWeek(S, k);
    if (rw) out.push({ id: 'review', icon: '🗓️', title: 'Weekly review is ready', body: '5 minutes: counts are filled in, you decide one thing.', go: 'review' });
    active(S).forEach(g => {
      if (g.stage === 2 && !g.next) out.push({ id: 'ms-' + g.id, icon: '🪜', title: g.name + ': write the next milestone now', body: 'You are ~75% there. Choosing the next one before finishing prevents the drop after success. The daily routine does not change.', go: 'goal', gid: g.id });
      if (g.stage === 3) out.push({ id: 'done-' + g.id, icon: '✅', title: g.name + ': milestone reached', body: 'Hand over to the next milestone. Change the target, never the routine.', go: 'goal', gid: g.id });
    });
    const fr = S.goals.frs; if (fr && fr.stage === 3 && !S.flags.realloc && S.goals.german && S.goals.frn) out.push({ id: 'realloc', icon: '↔️', title: 'Move 30 min from French · Notes to German?', body: 'Your reallocation rule fired. Decide it at the Sunday review, never mid-day.', go: 'review' });
    if (!S.flags.setup) out.push({ id: 'setup', icon: '🚀', title: 'First-time setup (~15 min per goal)', body: 'Environment, your own wording for each goal, first reason audit.', go: 'setup' });
    const m = mode(S, k); if (m === 'lapse' || m === 'restart') out.push({ id: 'lapse', icon: '🔁', title: MODES[m][0], body: MODES[m][1], go: 'today' });
    return out;
  }
  /* Evening nudge text, or null when nothing is left. */
  function nudge(S, k) {
    const done = ticks(S.days[k]), m = mode(S, k), left = active(S).filter(g => !done.includes(g.id) && !((S.days[k] || {}).skip || {})[g.id] && !(g.noMin));
    if (!left.length) return null;
    const lv = MODES[m][2] === 'std' ? 'min' : MODES[m][2];
    return { title: left.length + ' goal' + (left.length > 1 ? 's' : '') + ' still open', body: left[0].e + ' ' + left[0].name + ': ' + left[0][lv] };
  }

  /* German: which units to work on today. */
  function germanPlan(S, k, PATH) {
    const U = S.german.units, due = [], st = id => U[id] || {};
    Object.keys(U).forEach(id => { const u = U[id]; if (u.next && u.next <= k && u.stage > 0) due.push(id); });
    let group = PATH.find(g => g.some(id => { const u = st(id); return !(u.stage > 0) && !(u.park && u.park > k); }));
    const fresh = group ? group.filter(id => { const u = st(id); return !(u.stage > 0) && !(u.park && u.park > k); }) : [];
    return { due: due.slice(0, 3), fresh };
  }
  const LADDER = [0, 3, 7, 21, 56];
  function germanScore(S, id, pct, k) {
    const u = S.german.units[id] || (S.german.units[id] = { stage: 0 });
    u.last = k; u.score = pct; u.t = Date.now(); delete u.park;
    if (pct >= 80) { u.stage = Math.min((u.stage || 0) + 1, 5); u.next = u.stage >= 5 ? null : addD(k, LADDER[u.stage]); return u.stage === 1 ? 'Passed. First re-test in 3 days.' : (u.stage >= 5 ? 'Solid: this unit leaves the review ladder.' : 'Held. Next re-test in ' + LADDER[u.stage] + ' days.'); }
    if (pct >= 50) { if (u.stage > 0) { u.stage = Math.max(1, u.stage - 1); u.next = addD(k, 3); return 'Shaky: re-test in 3 days.'; } return 'Shaky: it comes back on the next grammar day.'; }
    if (u.stage > 0) { u.stage = 0; u.next = null; return 'Forgotten: it goes back into the lesson queue.'; }
    u.park = addD(k, 7); return 'Set aside for a week. Move on; it will come back.';
  }

  /* Sync merge: every record carries t (last change); the newer record wins. */
  function mergeMap(a, b) { const o = Object.assign({}, a); for (const k in b) if (!o[k] || (b[k].t || 0) > (o[k].t || 0)) o[k] = b[k]; return o; }
  function merge(A, B) {
    if (!B || !B.goals) return A; if (!A || !A.goals) return B;
    const newer = (A.t || 0) >= (B.t || 0) ? A : B, S = Object.assign({}, newer);
    S.goals = mergeMap(A.goals, B.goals); S.days = mergeMap(A.days, B.days); S.weeks = mergeMap(A.weeks, B.weeks);
    S.german = Object.assign({}, newer.german, { units: mergeMap(A.german.units, B.german.units), diag: A.german.diag || B.german.diag });
    const seen = {}; S.notes = A.notes.concat(B.notes).filter(n => seen[n.id] ? false : (seen[n.id] = 1));
    S.audits = Object.assign({}, B.audits, A.audits); for (const g in S.audits) { const s2 = {}; S.audits[g] = (A.audits[g] || []).concat(B.audits[g] || []).filter(a => s2[a.date] ? false : (s2[a.date] = 1)); }
    S.order = newer.order.concat(Object.keys(S.goals).filter(i => !newer.order.includes(i)));
    S.settings = (A.settings.t || 0) >= (B.settings.t || 0) ? A.settings : B.settings;
    S.settings.start = A.settings.start < B.settings.start ? A.settings.start : B.settings.start;
    S.flags = Object.assign({}, A.flags, B.flags); S.t = Math.max(A.t || 0, B.t || 0);
    return S;
  }
  G.Core = { dkey, pd, addD, dow, monday, diffD, fresh, active, ticks, mode, MODES, focus, weekCount, weekStats, reviewWeek, reviewItems, TRIG, auditVerdict, alerts, nudge, germanPlan, germanScore, merge, SEED_GOALS };
})(typeof window !== 'undefined' ? window : globalThis);
