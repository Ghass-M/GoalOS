/* Goal OS · interface. State lives in localStorage and syncs through sync(). */
(function () {
  const C = window.Core, Ger = window.Ger, $ = s => document.querySelector(s), app = $('#app');
  const h = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const now = () => (window.__now ? new Date(window.__now) : new Date()), today = () => C.dkey(now());
  let S; try { S = JSON.parse(localStorage.goalos || 'null'); } catch (e) { S = null; }
  if (!S || !S.goals) S = C.fresh(today());
  let V = { tab: 'today', open: null, sheet: null }, Q = null, T = null, pushT = null;
  const day = k => S.days[k] || (S.days[k] = { ticks: {}, t: 0 });
  const week = k => S.weeks[k] || (S.weeks[k] = { gap: {}, t: 0 });
  function save(rec) { if (rec) rec.t = Date.now(); S.t = Date.now(); localStorage.goalos = JSON.stringify(S); clearTimeout(pushT); pushT = setTimeout(() => sync(), 2500); render(); }
  function toast(m) { const t = document.createElement('div'); t.className = 'toast'; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }

  /* ---------- static goal content carried over from the Notion pages ---------- */
  const DETAIL = {
    move: `<h3>Warm-up · 10 min, dynamic</h3><ol><li><b>Raise 3–5 min</b>: easy bike, rower or brisk incline walk.</li><li><b>Mobilise 3 min</b>: cat-cow ×8 · open-book ×6/side · leg swings ×10/side · 90/90 hip switches ×8 · world's greatest stretch ×4/side.</li><li><b>Activate 2 min</b>: glute bridge ×12 · band pull-aparts ×15 · arm circles ×10.</li><li><b>Ramp-up</b>: 2–3 lighter sets of the first lift (40 → 60 → 80%).</li></ol>
<h3>Upper A · push</h3><p>Bench press 3×6–10 · One-arm DB row 3×8–12 · Overhead press 3×6–10 · Lat pulldown 3×10–12 · Lateral raise 3×12–15 · Triceps pushdown 3×10–12 · Face pull 2×15</p>
<h3>Lower A · squat</h3><p>Back or goblet squat 3×6–10 · Romanian deadlift 3×8–10 · Bulgarian split squat 3×8/leg · Leg curl 3×10–12 · Standing calf raise 3×12–15 · Pallof press 3×10/side</p>
<h3>Upper B · pull</h3><p>Pull-up (or assisted) 3×6–10 · Chest-supported row 3×8–12 · Incline DB press 3×8–12 · Seated cable row 3×10–12 · Rear-delt fly 3×12–15 · Curl 3×10–12 · Push-ups 2× near failure</p>
<h3>Lower B · hinge</h3><p>Trap-bar or conventional deadlift 3×5–8 · Hip thrust 3×8–12 · Leg press 3×10–12 · Walking lunge 2×10/leg · Seated calf raise 3×12–15 · Dead bug 3×8/side · Farmer carry 3×30–40 m</p>
<p class="mut">Rest 1.5–2 min on main lifts, 1 min on accessories. When every set reaches the top of the range, add a little load. Keep a day between Lower A and Lower B.</p>
<h3>Recovery days · 20 min + a walk (optional, no tick)</h3><p>Hip-flexor 45 s/side · Hamstring 45 s/side · Figure-4 45 s/side · Doorway chest 30 s/side · Child's pose with side reach 45 s/side · Thoracic extension 60 s · Calf 30 s/side · Chin tucks ×10 + upper-trap 30 s/side.</p>
<h3>Travel version (counts as a gym day)</h3><p>Push-ups · split squats · single-leg RDL · backpack rows · plank. 3 rounds, 20–30 min.</p><p class="mut">Mild tension only, never sharp pain. Pain lasting over two weeks: see a physiotherapist.</p>`,
    job: `<h3>One connected pipeline</h3><table><tr><th>Block</th><th>Focus</th></tr><tr><td><b>Apply</b> 50 min · before lunch</td><td>Tailor and send applications to the offers sourced yesterday, with the resume generator.</td></tr><tr><td><b>Source</b> 50 min · after lunch</td><td>~10 offers for tomorrow, plus 1–2 people at each company you applied to today.</td></tr><tr><td><b>Reach out</b> 50 min</td><td>Cold emails to the people just sourced, mentioning the application. Follow up anything older than 5–7 working days.</td></tr><tr><td><b>Close</b> 5 min</td><td>Update your tracker.</td></tr></table>
<p><b>Automation rule</b>: improving the generator gets one block a week (Friday, in place of Source). Tool-building can become a comfortable way to avoid sending.</p><p><b>Search without the feed</b>: open offers at linkedin.com/jobs, never the home page. Check messages only in the Reach out block.</p>`,
    german: `<h3>Your daily hour</h3><table><tr><td>0–15</td><td><b>Anki</b>. Stop at 15 min. Instant = Good, slow = Hard, forgotten = Again.</td></tr><tr><td>15–50</td><td><b>Today's focus</b>: the session button below runs it.</td></tr><tr><td>50–60</td><td><b>Output</b>: write or say it from scratch.</td></tr></table><p class="mut">Anki setup: keep your old deck · New cards/day 0 for the first two weeks, then 8 · Max reviews 150 · FSRS on, desired retention 0.88.</p>`,
    tech: `<h3>Deck days · Mon Wed Fri</h3><ol><li>All due cards in the Interview Ready deck.</li><li>10–15 new cards from the focus subdeck (it changes weekly).</li><li>Last 5 min: explain 2 of today's cards aloud, as if to an interviewer.</li><li>Then one timed coding problem (20–30 min).</li></ol><h3>System design · Tue Thu Sat</h3><ul><li><b>Tue · Learn</b> one building block, add 5 cards about it.</li><li><b>Thu · Design</b> one classic system in 30 min, then explain it aloud.</li><li><b>Sat · Mock</b>: redo Thursday's design from memory in 35–45 min (requirements → estimates → API → data model → high-level → deep dive → trade-offs). Note 3 gaps.</li></ul><p><b>Interview booked?</b> That week the rotation follows the company's stack and format.</p>`,
    frn: `<h3>Session loop · Lexiloop's three phases</h3><ol><li><b>Rappel 15–20 min</b>: recall, reveal, rate honestly. Don't judge new notes the same day.</li><li><b>Oral 5–10 min</b>: one spoken sentence per word before the countdown ends.</li><li><b>Phrases 20–25 min</b>: one natural, one precise and one personal sentence per word.</li><li><b>Hand over 1 min</b>: pick the 3 expressions for tonight's speaking.</li></ol>`,
    frs: `<h3>Session loop</h3><ol><li><b>Before 2 min</b>: pick a topic and carry 3 expressions from today's Notes session.</li><li><b>Talk 45–75 min</b>: Discord first. Jot down every missing word, language switch, hesitation, or phrase you liked.</li><li><b>After 10 min</b>: look each one up and add it to Lexiloop.</li></ol><table><tr><th>Noticed</th><th>Add as</th></tr><tr><td>A word I didn't have</td><td><code>lexicon</code></td></tr><tr><td>A natural phrase / better wording</td><td><code>expression</code></td></tr><tr><td>A mistake</td><td><code>correction</code></td></tr><tr><td>A structure I hesitated on</td><td><code>rule</code></td></tr></table><h3>AI partner prompt</h3><pre id="aip">Tu es mon partenaire de conversation en français. Parle naturellement, à vitesse normale, sur le sujet suivant : [sujet]. Pose-moi des questions ouvertes et relance si je réponds trop court. Ne corrige pas pendant la conversation. À la fin, donne-moi 5 erreurs récurrentes avec la forme correcte et 5 expressions plus naturelles que j'aurais pu utiliser.</pre><button class="b" data-a="copy" data-sel="#aip">Copy prompt</button>`
  };
  const STAGES = ['🌱 Early', '🌿 Midway', '🎯 ~75%', '✅ Reached'];
  const AUD = [['a', 'Because someone else wants it or the situation demands it'], ['b', "Because I'd feel ashamed, guilty or anxious if I didn't"], ['c', 'Because I genuinely believe it is important'], ['d', 'Because it reflects who I am and what I value'], ['e', 'Because it is interesting or enjoyable']];

  /* ---------- views ---------- */
  function vToday() {
    const k = today(), m = C.mode(S, k), M = C.MODES[m], gs = C.active(S), d = S.days[k] || {}, done = C.ticks(d), wk = C.monday(k);
    const cards = gs.map(g => {
      const on = done.includes(g.id), sk = (d.skip || {})[g.id], n = C.weekCount(S, g.id, wk), fo = C.focus(S, g, k);
      let lv = M[2] === 'floor' ? ['Floor', g.floor] : M[2] === 'min' ? ['Minimum', g.min] : ['Start with', g.min];
      if (g.noMin) lv = n >= g.target && !on ? ['This week is done', 'Recovery: stretching + a walk, optional'] : m === 'light' ? ['Rest day', 'Light day'] : M[2] === 'floor' ? ['Floor', g.floor] : ['Today', g.std];
      const dots = Array.from({ length: g.target }, (_, i) => `<s class="${i < n ? 'f' : ''}"></s>`).join('');
      return `<article class="card ${on ? 'done' : ''} ${sk && !on ? 'skip' : ''}" style="--c:${h(g.color)}"><div class="row">
        <button class="tick" data-a="tick" data-id="${g.id}" aria-label="Tick ${h(g.name)}">${on ? '✓' : g.e}</button>
        <div class="bd" data-a="open" data-id="${g.id}"><div class="nm"><span>${h(g.name)}</span><span class="wk" title="${n} of ${g.target} this week">${dots}</span></div>
        ${fo ? `<div class="fo">${h(fo)}</div>` : ''}<div class="cue">${h(g.cue)}</div><div class="lv"><b>${lv[0]}:</b> ${h(lv[1])}</div></div></div>
        ${V.open === g.id ? vGoalOpen(g, on, sk, M) : ''}</article>`;
    }).join('');
    const tot = gs.length, p = tot ? Math.round(done.length / tot * 100) : 0;
    return `<div class="mode ${m === 'normal' || m === 'light' ? '' : 'alt'}"><div class="ring" style="--p:${p}"><em>${done.length}/${tot}</em></div><div><b>${M[0]}</b><span>${M[1]}</span></div></div>${cards}
      <p class="mut" style="text-align:center;margin-top:16px">No streaks here. Only the weekly targets count, and a missed day is never repaid.</p>`;
  }
  function vGoalOpen(g, on, sk, M) {
    const P = g.plans || {}, links = (g.links || []).map(l => `<a class="b" target="_blank" rel="noopener" href="${h(l[1])}">${h(l[0])} ↗</a>`).join('');
    return `<div class="ex">
      <div class="btns">${g.id === 'german' ? '<button class="b c" data-a="ger">Start today’s session</button>' : ''}${links}
        <button class="b" data-a="stuck" data-id="${g.id}">Not feeling it?</button>${on ? '' : `<button class="b" data-a="skip" data-id="${g.id}">${sk ? 'Un-skip' : 'Skip today'}</button>`}</div>
      <h3>Levels</h3><table><tr><td>Floor</td><td>${h(g.floor)}</td></tr><tr><td>Minimum</td><td>${h(g.min)}</td></tr><tr><td>Standard</td><td>${h(g.std)}</td></tr><tr><td>Cap</td><td>${h(g.cap)}</td></tr></table>
      <h3>If-then plans</h3>${P.start ? `<div class="plan"><b>Start</b>${h(P.start)}</div>` : ''}${P.obstacle ? `<div class="plan"><b>Obstacle</b>${h(P.obstacle)}</div>` : ''}${P.back ? `<div class="plan"><b>First day back</b>${h(P.back)}</div>` : ''}
      ${DETAIL[g.detail] || ''}${g.notes ? `<h3>Notes</h3><p>${h(g.notes).replace(/\n/g, '<br>')}</p>` : ''}</div>`;
  }
  function vReview() {
    const k = today(), rw = C.reviewWeek(S, k), wk = rw || C.monday(k), st = C.weekStats(S, wk), W = S.weeks[wk] || { gap: {} };
    const rows = st.map(s => `<tr><td>${s.g.e} ${h(s.g.name)}</td><td><b>${s.n}</b> / ${s.g.target}</td><td>${s.ok ? '✅' : rw ? '—' : ''}</td></tr>`).join('');
    let out = `<h2>${rw ? 'Weekly review · 5 minutes' : 'This week so far'}</h2><div class="box"><div class="mut">Week of ${wk}</div><table>${rows}</table>${rw ? '' : '<p class="mut">The review opens on Sunday. Until then there is nothing to decide.</p>'}</div>`;
    if (!rw) return out + vHistory();
    const items = C.reviewItems(S, wk), chip = (a, v, cur, label, extra) => `<button class="b ${cur === v ? 'sel' : ''}" data-a="${a}" data-v="${v}" ${extra || ''}>${label}</button>`;
    out += `<p class="mut">Information for one decision, not a grade.</p>`;
    items.filter(i => i.k === 'gap').forEach(i => {
      const cur = (W.gap || {})[i.g.id];
      out += `<div class="box"><b>${i.g.e} ${h(i.g.name)} missed its target (${i.n}/${i.g.target}).</b> What started the gap?<div class="btns">${Object.keys(C.TRIG).map(t => chip('gap', t, cur, C.TRIG[t][0], `data-id="${i.g.id}"`)).join('')}</div>${cur ? `<p>${C.TRIG[cur][1]}</p>` : ''}
        ${items.some(x => x.k === 'modify' && x.g.id === i.g.id) ? '<p><b>Second week running.</b> Modify one variable for this goal (cue, size or environment) and test it for two weeks.</p>' : ''}</div>`;
    });
    out += `<div class="box"><b>Decide</b><div class="btns">${chip('dec', 'keep', W.decision, 'Keep everything, deliberately')}${chip('dec', 'change', W.decision, 'Change one thing')}</div>
      ${W.decision === 'change' ? `<label>The one change (cue, size or environment), tested for two weeks</label><input type="text" data-f="change" value="${h(W.change || '')}" placeholder="e.g. German cue → right after lunch"><p class="mut">Then edit that goal in the Goals tab.</p>` : ''}</div>
      <div class="box"><b>Energy this week</b><div class="btns">${chip('en', 'ok', W.energy, '🔋 Sustainable')}${chip('en', 'drained', W.energy, '🪫 Drained')}</div>
      ${items.some(i => i.k === 'trim') ? '<p><b>Drained two weeks running.</b> Trim your biggest block by about 25% now (Goals tab). Ceiling hours are a limit, not a target.</p>' : ''}</div>`;
    items.forEach(i => {
      if (i.k === 'test') out += `<div class="box"><b>Your two-week test ends:</b> “${h(i.text)}”. Keep it or revert it; either is a fine result.</div>`;
      if (i.k === 'note') out += `<div class="box"><b>📝 Relevance note · ${i.g.e} ${h(i.g.name)}</b><p class="mut">${h(i.g.relq || 'How does the activity itself connect to what you value now?')} Your own words, 10–15 minutes at most; a few honest lines are enough.</p><textarea data-f="note" data-id="${i.g.id}">${h(W.note || '')}</textarea></div>`;
      if (i.k === 'audit') out += `<div class="box"><b>🔎 Reason audit is due</b><p class="mut">Every 4–6 weeks: rate why you pursue each goal. It takes about a minute per goal.</p><button class="b" data-a="sheet" data-v="audit">Open the audit</button></div>`;
    });
    if (C.alerts(S, k).some(a => a.id === 'realloc')) out += `<div class="box"><b>↔️ Reallocation rule</b><p>French · Speaking reached its milestone. Move 30 min from French · Notes to German?</p><div class="btns"><button class="b p" data-a="realloc" data-v="1">Yes, move it</button><button class="b" data-a="realloc" data-v="0">Not now</button></div></div>`;
    out += `<div class="box"><b>🪜 Milestones</b><p class="mut">Touch only what moved. At ~75% you'll be asked for the next one.</p>${C.active(S).map(g => `<div style="margin:8px 0"><div style="font-size:14px">${g.e} ${h(g.milestone || g.name)}</div><div class="btns" style="margin-top:4px">${STAGES.map((s, n) => `<button class="b ${g.stage === n ? 'sel' : ''}" style="padding:5px 9px;font-size:13px" data-a="stage" data-id="${g.id}" data-v="${n}">${s}</button>`).join('')}</div></div>`).join('')}</div>`;
    const ready = W.decision && W.energy && items.filter(i => i.k === 'gap').every(i => (W.gap || {})[i.g.id]);
    return out + `<button class="b p" style="width:100%;padding:14px" data-a="clear" ${ready ? '' : 'disabled'}>✓ Review cleared</button>${ready ? '' : '<p class="mut" style="text-align:center">Pick a trigger for each gap, a decision and your energy.</p>'}` + vHistory();
  }
  function vHistory() {
    const ws = Object.keys(S.weeks).filter(w => S.weeks[w].cleared).sort().reverse().slice(0, 8); if (!ws.length) return '';
    const tr = {}; Object.values(S.weeks).forEach(w => Object.values(w.gap || {}).forEach(t => tr[t] = (tr[t] || 0) + 1));
    return `<h2>Past weeks</h2><div class="box"><table>${ws.map(w => { const st = C.weekStats(S, w); return `<tr><td>${w}</td><td>${st.filter(s => s.ok).length}/${st.length} on target</td><td>${S.weeks[w].energy === 'drained' ? '🪫' : '🔋'}</td></tr>`; }).join('')}</table>
      ${Object.keys(tr).length ? `<p class="mut">What usually starts a gap: ${Object.keys(tr).sort((a, b) => tr[b] - tr[a]).map(t => C.TRIG[t][0] + ' ×' + tr[t]).join(' · ')}</p>` : ''}</div>`;
  }
  function vGoals() {
    return `<h2>Goals</h2><p class="mut">Best changed at the Sunday review, at a calm moment, never at a moment of friction.</p>` + S.order.map(i => S.goals[i]).filter(Boolean).map((g, n) => {
      const a = (S.audits[g.id] || []).slice(-1)[0], v = a && C.auditVerdict(a);
      return `<div class="box" style="border-left:5px solid ${h(g.color)};${g.arch ? 'opacity:.5' : ''}"><div class="nm"><span>${g.e} ${h(g.name)}</span><span><button data-a="mv" data-id="${g.id}" data-v="-1">↑</button> <button data-a="mv" data-id="${g.id}" data-v="1">↓</button></span></div>
        <p style="margin:6px 0">${h(g.approach)}</p><div class="mut">🪜 ${h(g.milestone || '—')} · <b>${STAGES[g.stage || 0]}</b>${g.next ? '<br>Next: ' + h(g.next) : ''}</div>
        ${v ? `<div class="mut" style="margin-top:4px">🔎 Autonomous ${v.au.toFixed(1)} · Controlled ${v.co.toFixed(1)} → <b>${v.v}</b></div>` : ''}
        <div class="btns"><button class="b" data-a="edit" data-id="${g.id}">Edit</button>${g.stage === 3 ? `<button class="b p" data-a="handover" data-id="${g.id}">Hand over to next milestone</button>` : ''}</div></div>`;
    }).join('') + `<div class="btns"><button class="b p" data-a="edit" data-id="">+ Add a goal</button><button class="b" data-a="sheet" data-v="audit">Reason audit</button></div>`;
  }

  /* ---------- sheets ---------- */
  const sheet = (title, body) => `<div class="sheet"><div><div class="sh"><h2 style="margin:0">${title}</h2><button class="ib" data-a="close">✕</button></div>${body}</div></div>`;
  function shEdit() {
    const g = V.sheet.g, f = (k, l, v, ta) => `<label>${l}</label>${ta ? `<textarea data-g="${k}">${h(v)}</textarea>` : `<input type="text" data-g="${k}" value="${h(v)}">`}`, P = g.plans || {}, D = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return sheet(g.id ? 'Edit goal' : 'New goal', `<div class="box">${f('e', 'Emoji', g.e || '🎯')}${f('name', 'Name', g.name || '')}<label>Colour</label><input type="color" data-g="color" value="${h(g.color || '#3566d6')}">
      ${f('approach', 'Approach goal: what you gain or become able to do, in your own words', g.approach || '', 1)}${f('cue', 'Portable cue (an event, not a clock time)', g.cue || '')}
      ${f('floor', 'Floor: 10 minutes or less, doable anywhere', g.floor || '')}${f('min', 'Minimum on a normal day', g.min || '')}${f('std', 'Standard session', g.std || '')}${f('cap', 'Cap', g.cap || '')}
      <label>Weekly target (days)</label><input type="number" min="1" max="7" data-g="target" value="${g.target || 5}"></div>
      <div class="box">${f('milestone', 'Quarterly milestone', g.milestone || '', 1)}${f('next', 'Next milestone (write it at ~75%)', g.next || '')}</div>
      <div class="box">${f('p_start', 'If-then · start', P.start || '', 1)}${f('p_obstacle', 'If-then · most likely obstacle', P.obstacle || '', 1)}${f('p_back', 'If-then · first day back', P.back || '', 1)}</div>
      <div class="box"><b>Focus by weekday</b> <span class="mut">(optional)</span>${[1, 2, 3, 4, 5, 6, 0].map(d => `<label>${D[d]}</label><input type="text" data-g="r${d}" value="${h((g.rot || {})[d] || '')}">`).join('')}
      ${f('links', 'Links, one per line: Label | https://…', (g.links || []).map(l => l.join(' | ')).join('\n'), 1)}${f('notes', 'Notes shown on the card', g.notes || '', 1)}</div>
      <div class="btns"><button class="b p" data-a="saveGoal">Save</button>${g.id ? `<button class="b" data-a="arch">${g.arch ? 'Restore' : 'Archive'}</button>` : ''}</div>`);
  }
  function shAudit() {
    const A = V.sheet.vals;
    return sheet('Reason audit', `<p class="mut">Rate 1–7 how much you pursue each goal for each reason. Autonomous = mean of the last three; controlled = mean of the first two. The 4.5 line is a working heuristic.</p>` + C.active(S).map(g => {
      const a = A[g.id], v = C.auditVerdict(a);
      return `<div class="box"><b>${g.e} ${h(g.name)}</b>${AUD.map(([k, l]) => `<label>${l} · <b>${a[k]}</b></label><input type="range" min="1" max="7" step="1" data-au="${g.id}:${k}" value="${a[k]}">`).join('')}<p>Autonomous <b>${v.au.toFixed(1)}</b> · Controlled <b>${v.co.toFixed(1)}</b> → <b>${v.v}</b></p></div>`;
    }).join('') + `<button class="b p" data-a="saveAudit">Save audit</button>`);
  }
  function shStuck() {
    const g = S.goals[V.sheet.id], st = V.sheet.step || 0;
    return sheet('Not feeling it?', `<div class="box"><div class="plan" style="--c:${h(g.color)}"><b>Your obstacle plan</b>${h((g.plans || {}).obstacle || 'Do the floor only, then decide.')}</div></div>
      <div class="box"><b>1 · Name it</b><div class="btns">${['uncertain', 'boring', 'exposing', 'tired', 'pointless'].map(x => `<button class="b ${V.sheet.feel === x ? 'sel' : ''}" data-a="feel" data-v="${x}">this feels ${x}</button>`).join('')}</div>
      <p><b>2 · Accept it.</b> It doesn't have to go away first.</p><p><b>3 · Five minutes</b> of the smallest step: <i>${h(g.floor)}</i>. Continue only if it flows.</p>
      ${st ? `<div class="big" id="clock">5:00</div><div class="btns"><button class="b c" style="--c:${h(g.color)}" data-a="tick" data-id="${g.id}" data-close="1">Done · it counts</button></div>` : `<button class="b p" data-a="five">Start 5 minutes</button>`}</div>
      <p class="mut">If skipping brings relief rather than enjoyment, use this routine before every session for a while.</p>`);
  }
  function shInbox() {
    const al = C.alerts(S, today());
    return sheet('Inbox', al.length ? al.map(a => `<div class="box al" data-a="go" data-v="${a.go}" data-id="${a.gid || ''}"><span>${a.icon}</span><div><b>${h(a.title)}</b><div class="mut">${h(a.body)}</div></div></div>`).join('') : '<div class="box">Nothing to do. Open the app at your next cue.</div>');
  }
  function shSetup() {
    return sheet('First-time setup', `<div class="box"><b>1 · Environment</b><p>Phone in another room during work blocks · YouTube autoplay off · non-essential notifications off, permanently.</p>
      <b>2 · Make each goal yours</b><p>The approach goals are drafts. Rewrite each one in your own words (Goals → Edit); only a self-written version counts.</p>
      <b>3 · First reason audit</b><p>One minute per goal. It decides keep, reframe or replace.</p><div class="btns"><button class="b" data-a="sheet" data-v="audit">Open the audit</button><button class="b p" data-a="setupDone">Setup done</button></div></div>`);
  }
  function shSettings() {
    const s = S.settings, y = SY;
    return sheet('Settings', `<div class="box"><b>Alerts</b><p class="mut">One evening nudge listing what is still open, and a Sunday review reminder. Cues stay events, not clock times.</p>
      <label>Evening nudge at</label><input type="time" data-s="nudge" value="${h(s.nudge)}"><div class="btns"><button class="b ${window.Notification && Notification.permission === 'granted' ? 'sel' : ''}" data-a="notif">${window.Notification && Notification.permission === 'granted' ? 'Notifications are on' : 'Turn on notifications'}</button><button class="b" data-a="testN">Send a test</button></div></div>
      <div class="box"><b>Sync between devices</b><p class="mut">${y.uid ? 'Signed in as ' + h(y.email) + ' · last sync ' + (y.last ? new Date(y.last).toLocaleString() : 'never') : 'Uses your own free Supabase project. See README, step 2.'}</p>
      <label>Project URL</label><input type="text" data-y="url" value="${h(y.url || '')}" placeholder="https://xxxx.supabase.co"><label>Anon (publishable) key</label><input type="text" data-y="key" value="${h(y.key || '')}">
      <label>Email</label><input type="email" data-y="email" value="${h(y.email || '')}"><label>Password</label><input type="password" id="pw">
      <label>Push key (VAPID public key, optional: alerts while the app is closed)</label><input type="text" data-y="vapid" value="${h(y.vapid || '')}">
      <div class="btns"><button class="b p" data-a="signin" data-v="0">Sign in</button><button class="b" data-a="signin" data-v="1">Create account</button><button class="b" data-a="syncNow">Sync now</button>${y.uid ? '<button class="b" data-a="signout">Sign out</button>' : ''}</div></div>
      <div class="box"><b>Data</b><label>Start date (days before it never count as gaps)</label><input type="date" data-s="start" value="${h(s.start)}"><div class="btns"><button class="b" data-a="export">Export backup</button><label class="b" style="margin:0;color:var(--ink)">Import backup<input type="file" id="imp" accept=".json" hidden></label></div></div>`);
  }

  /* ---------- German ---------- */
  function shGer() {
    const k = today(), d = C.dow(k), G = S.german, U = G.units, v = V.sheet;
    const badge = id => { const u = U[id] || {}; return u.stage >= 5 ? '<span class="tag g">solid</span>' : u.stage > 0 ? `<span class="tag g">re-test ${u.next || ''}</span>` : u.park ? '<span class="tag r">parked</span>' : u.score != null ? '<span class="tag y">shaky</span>' : u.diag === 'r' ? '<span class="tag r">rebuild</span>' : u.diag === 'y' ? '<span class="tag y">shaky</span>' : ''; };
    if (Q) return sheet('German', vQuiz());
    let body = `<div class="box"><b>1 · Anki</b> <span class="mut">15 min, stop even if cards remain</span><div class="btns"><button class="b" data-a="timer" data-v="15">Start 15:00</button><span class="big" id="clock" style="margin:0;font-size:26px"></span></div></div>`;
    const kind = v.kind || ({ 1: 'g', 4: 'g', 2: 'c', 5: 'c', 3: 'v', 6: 'v', 0: 's' })[d];
    body += `<div class="box"><b>2 · Focus</b> <span class="mut">35 min</span><div class="btns" style="margin:8px 0 4px">${[['g', 'Grammar'], ['c', 'Course'], ['v', 'Video']].map(x => `<button class="b ${kind === x[0] ? 'sel' : ''}" style="padding:6px 10px;font-size:13px" data-a="gkind" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>`;
    if (kind === 's') body += '<p>Light day: flashcards only. The review ladder waits until tomorrow.</p>';
    if (kind === 'g') {
      if (!G.diag) body += `<p><b>First, a 20-minute check of all 17 A1 units</b>, notes closed. It decides what you skip and what you rebuild.</p><button class="b c" style="--c:#c2952b" data-a="diag">Start the A1 check</button>`;
      else {
        const p = C.germanPlan(S, k, Ger.PATH), line = (id, t) => `<div class="al" data-a="unit" data-id="${id}" data-v="${t}" style="padding:8px 0;border-bottom:1px solid var(--line)"><span>${t === 'due' ? '🔁' : '📘'}</span><div><b>${h(Ger.units[id].t)}</b> <span class="mut">${id}</span><div class="mut">${t === 'due' ? 'Re-test: 5 items, notes closed' : 'Blurt what you remember, read the rule, then 10 items'}</div></div></div>`;
        body += (p.due.length || p.fresh.length) ? p.due.map(i => line(i, 'due')).join('') + p.fresh.map(i => line(i, 'new')).join('') : '<p>Everything on the path is done or scheduled. Pick any unit below for extra practice.</p>';
      }
    }
    if (kind === 'c') body += `<ol><li>Predict from the title what the unit is about (2 min).</li><li>Listen or read once for gist, then again with the transcript.</li><li>Do the course exercises.</li><li>Mine 5–8 words or chunks you met in context into Anki.</li></ol><a class="b" target="_blank" rel="noopener" href="https://learngerman.dw.com/de/c-36519687">Open Nicos Weg ↗</a><p class="mut">First time: take the A1 final test (Abschlusstest). 80% or more → start A2 lesson 1; under 80% → redo the A1 lessons that lost points.</p>`;
    if (kind === 'v') body += `<ol><li>Watch 20 min at your level with <b>German</b> subtitles. Note 3–5 useful sentences.</li><li>Shadow 10 min: a 1–2 min clip, repeat in chunks, then speak along 3 times.</li></ol><div class="btns"><a class="b" target="_blank" rel="noopener" href="https://www.youtube.com/@easygerman">Easy German ↗</a><button class="b" data-a="timer" data-v="10">Shadowing 10:00</button></div>`;
    body += `</div><div class="box"><b>3 · Output</b> <span class="mut">10 min</span><p>${h(Ger.OUTPUT[d])}</p><textarea id="gout" data-f="gout" placeholder="Schreib hier…">${h((G.out || {})[k] || '')}</textarea><div class="btns"><button class="b" data-a="copyOut">Copy for correction</button><button class="b c" style="--c:#c2952b" data-a="tick" data-id="german" data-close="1">Session done · tick</button></div></div>`;
    body += `<h3>All units</h3><div class="box">${Ger.order.map(id => `<div class="al" data-a="unit" data-id="${id}" data-v="free" style="padding:6px 0"><div style="flex:1">${h(Ger.units[id].t)} <span class="mut">${id}</span></div>${badge(id)}</div>`).join('')}</div>`;
    return sheet('German · today', body);
  }
  function startQuiz(ids, mode, n) {
    const items = []; ids.forEach(id => { let idx = Ger.units[id].items.map((_, i) => i); if (mode !== 'diag') idx.sort(() => Math.random() - .5); idx.slice(0, n).forEach(i => items.push([id, i])); });
    Q = { ids, mode, items, i: 0, res: {}, intro: mode === 'new' || mode === 'free', fb: null }; render();
  }
  function vQuiz() {
    const u0 = Ger.units[Q.ids[0]];
    if (Q.intro) return `<div class="box"><h3 style="margin-top:0">${u0.id} · ${h(u0.de)}</h3><div class="q">${h(u0.t)}</div><p class="mut">Blurt first: say or write everything you remember about this topic. Then check it against the rule.</p><details><summary class="b" style="display:inline-block">Show the rule</summary><ul>${u0.rules.map(r => `<li>${h(r)}</li>`).join('')}</ul></details><div class="btns"><button class="b p" data-a="qgo">Start the exercises</button><button class="b" data-a="qquit">Back</button></div></div>`;
    if (Q.i >= Q.items.length) return vQuizEnd();
    const [id, i] = Q.items[Q.i], it = Ger.units[id].items[i];
    return `<div class="bar"><i style="width:${Q.i / Q.items.length * 100}%"></i></div><div class="box"><div class="mut">${id} · ${h(Ger.units[id].t)} · ${Q.i + 1}/${Q.items.length}</div><div class="q">${h(it[0])}</div>
      ${Q.fb ? `<div class="fb ${Q.fb.ok ? 'y' : 'n'}">${Q.fb.ok ? '✓ Richtig' : '✗ ' + h(it[1].split('|')[0])}</div>${Q.fb.ok ? '' : `<p class="mut">You wrote: ${h(Q.fb.given || '—')}</p>`}<div class="btns"><button class="b p" data-a="qnext" id="qn">Next</button>${Q.fb.ok ? '' : '<button class="b" data-a="qover">I was right</button>'}</div>`
        : `<input type="text" id="qa" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Antwort"><div class="btns">${['ä', 'ö', 'ü', 'ß'].map(c => `<button class="b" data-a="ch" data-v="${c}">${c}</button>`).join('')}<button class="b p" data-a="qcheck">Check</button></div>`}</div><button class="b" data-a="qquit">Stop</button>`;
  }
  function vQuizEnd() {
    const k = today(), per = {}; Q.items.forEach(([id], n) => { per[id] = per[id] || [0, 0]; per[id][1]++; if (Q.res[n]) per[id][0]++; });
    if (!Q.done) {
      Q.done = Object.keys(per).map(id => {
        const [r, t] = per[id], pct = Math.round(r / t * 100); let msg;
        if (Q.mode === 'diag') { const wrong = t - r, u = S.german.units[id] = S.german.units[id] || { stage: 0 }; u.diag = wrong === 0 ? 'g' : wrong === 1 ? 'y' : 'r'; u.t = Date.now(); if (wrong === 0) { u.stage = 2; u.next = C.addD(k, 7); } msg = wrong === 0 ? 'Solid: skipped, re-tested in a week' : wrong === 1 ? 'Shaky: short lesson' : 'Rebuild'; }
        else msg = C.germanScore(S, id, pct, k);
        return [id, r, t, msg];
      });
      if (Q.mode === 'diag') S.german.diag = true; save(S.german); return vQuizEnd();
    }
    const fast = Q.mode === 'new' && Q.done.every(x => x[1] / x[2] >= .9);
    return `<div class="box"><div class="q">Result</div><table>${Q.done.map(x => `<tr><td>${x[0]} · ${h(Ger.units[x[0]].t)}</td><td><b>${x[1]}/${x[2]}</b></td><td>${h(x[3])}</td></tr>`).join('')}</table>${fast ? '<p><b>That came easily.</b> Take the next unit today as well if you have time.</p>' : ''}<button class="b p" data-a="qquit">Continue</button></div>`;
  }

  /* ---------- render + events ---------- */
  function render() {
    const k = today(), n = C.alerts(S, k).length, off = (S.days[k] || {}).off, a = document.activeElement, keep = a && a.dataset && (a.dataset.f || a.dataset.g) ? [a.dataset.f || a.dataset.g, a.selectionStart] : null;
    const tabs = [['today', '☀️', 'Today'], ['review', '🗓️', 'Review'], ['goals', '🎯', 'Goals']];
    app.innerHTML = `<header><div><div class="date">${now().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}</div><h1>Goal OS</h1></div>
      <div class="hb"><button class="ib ${off ? 'on' : ''}" data-a="off" title="Off-routine day">🧳</button><button class="ib" data-a="sheet" data-v="inbox" title="Inbox">🔔${n ? `<i>${n}</i>` : ''}</button><button class="ib" data-a="sheet" data-v="settings" title="Settings">⚙️</button></div></header>
      <main>${V.tab === 'today' ? vToday() : V.tab === 'review' ? vReview() : vGoals()}</main>
      <nav>${tabs.map(t => `<button class="${V.tab === t[0] ? 'on' : ''}" data-a="tab" data-v="${t[0]}"><b>${t[1]}</b>${t[2]}</button>`).join('')}</nav>
      ${V.sheet ? ({ edit: shEdit, audit: shAudit, stuck: shStuck, inbox: shInbox, setup: shSetup, settings: shSettings, ger: shGer })[V.sheet.k]() : ''}`;
    const qa = $('#qa'); if (qa) qa.focus(); const qn = $('#qn'); if (qn) qn.focus();
    if (keep) { const el = document.querySelector(`[data-f="${keep[0]}"],[data-g="${keep[0]}"]`); if (el) { el.focus(); try { el.setSelectionRange(keep[1], keep[1]); } catch (e) { } } }
  }
  function timer(min, done) { clearInterval(T); const end = Date.now() + min * 6e4; const f = () => { const c = $('#clock'), l = Math.max(0, end - Date.now()); if (c) c.textContent = Math.floor(l / 6e4) + ':' + String(Math.floor(l / 1e3) % 60).padStart(2, '0'); if (!l) { clearInterval(T); navigator.vibrate && navigator.vibrate(400); notify('Time', min + ' minutes are up.'); done && done(); } }; T = setInterval(f, 500); f(); }
  const A = {
    tab: v => { V.tab = v; V.open = null; render(); },
    open: (v, id) => { V.open = V.open === id ? null : id; render(); },
    tick: (v, id, el) => { const d = day(today()); d.ticks[id] = d.ticks[id] ? 0 : 1; if (d.ticks[id] && d.skip) delete d.skip[id]; if (el.dataset.close) { V.sheet = null; clearInterval(T); } navigator.vibrate && navigator.vibrate(15); save(d); },
    skip: (v, id) => { const d = day(today()); d.skip = d.skip || {}; d.skip[id] = d.skip[id] ? 0 : 1; save(d); toast(d.skip[id] ? 'Skipped. The cue passes to the next goal; the weekly target still counts.' : 'Back on the list.'); },
    off: () => { const d = day(today()); d.off = !d.off; save(d); toast(d.off ? 'Off-routine: floors only today.' : 'Back to the normal day.'); },
    sheet: v => { V.sheet = { k: v }; if (v === 'audit') { V.sheet.vals = {}; C.active(S).forEach(g => V.sheet.vals[g.id] = Object.assign({ a: 4, b: 4, c: 4, d: 4, e: 4 }, (S.audits[g.id] || []).slice(-1)[0])); } render(); },
    close: () => { V.sheet = null; Q = null; clearInterval(T); render(); },
    go: (v, id) => { V.sheet = null; if (v === 'review' || v === 'today') V.tab = v; else if (v === 'goal') V.tab = 'goals'; else if (v === 'setup') V.sheet = { k: 'setup' }; render(); },
    stuck: (v, id) => { V.sheet = { k: 'stuck', id }; render(); }, feel: v => { V.sheet.feel = v; render(); }, five: () => { V.sheet.step = 1; render(); timer(5); },
    edit: (v, id) => { V.sheet = { k: 'edit', g: id ? JSON.parse(JSON.stringify(S.goals[id])) : { plans: {}, target: 5, stage: 0 } }; render(); },
    saveGoal: () => { const g = V.sheet.g; document.querySelectorAll('[data-g]').forEach(el => { const k = el.dataset.g, val = el.value.trim(); if (k[0] === 'p' && k[1] === '_') (g.plans = g.plans || {})[k.slice(2)] = val; else if (/^r\d$/.test(k)) { g.rot = g.rot || {}; if (val) g.rot[k[1]] = val; else delete g.rot[k[1]]; } else if (k === 'links') g.links = val.split('\n').map(l => l.split('|').map(x => x.trim())).filter(l => l[1]); else if (k === 'target') g.target = Math.min(7, Math.max(1, +val || 5)); else g[k] = val; });
      if (!g.name) return toast('Give it a name.'); if (!g.id) { g.id = 'g' + Date.now().toString(36); S.order.push(g.id); } S.goals[g.id] = g; V.sheet = null; save(g); },
    arch: () => { const g = S.goals[V.sheet.g.id]; g.arch = !g.arch; V.sheet = null; save(g); },
    mv: (v, id) => { const i = S.order.indexOf(id), j = i + +v; if (j < 0 || j >= S.order.length) return; S.order.splice(j, 0, S.order.splice(i, 1)[0]); save(); },
    stage: (v, id) => { const g = S.goals[id]; g.stage = +v; save(g); if (g.stage === 2 && !g.next) toast('~75%: write the next milestone now (Goals → Edit).'); },
    handover: (v, id) => { const g = S.goals[id]; if (!g.next) return toast('Write the next milestone first (Edit).'); g.milestone = g.next; g.next = ''; g.stage = 0; save(g); toast('New milestone set. The daily routine stays the same.'); },
    saveAudit: () => { const k = today(); for (const id in V.sheet.vals) (S.audits[id] = S.audits[id] || []).push(Object.assign({ date: k }, V.sheet.vals[id])); V.sheet = null; save(); toast('Audit saved.'); },
    setupDone: () => { S.flags.setup = 1; V.sheet = null; save(); },
    gap: (v, id) => { const w = week(C.reviewWeek(S, today())); (w.gap = w.gap || {})[id] = v; save(w); }, dec: v => { const w = week(C.reviewWeek(S, today())); w.decision = v; save(w); }, en: v => { const w = week(C.reviewWeek(S, today())); w.energy = v; save(w); },
    realloc: v => { S.flags.realloc = 1; if (+v) { const g = S.goals.german, f = S.goals.frn; g.std = '90 min: Anki 15 · focus 60 · output 15'; g.cap = '1h30'; f.std = '15–20 min: Rappel, then pick 3 expressions'; f.cap = '30 min'; g.t = f.t = Date.now(); } save(); },
    clear: () => { const wk = C.reviewWeek(S, today()), w = week(wk); if (w.note) { const it = C.reviewItems(S, wk).find(i => i.k === 'note'); if (it) S.notes.push({ id: wk + it.g.id, goal: it.g.id, date: today(), text: w.note }); } w.cleared = true; save(w); toast('Review cleared. See you at the next cue.'); },
    copy: (v, id, el) => { navigator.clipboard.writeText($(el.dataset.sel).textContent); toast('Copied.'); },
    ger: () => { V.sheet = { k: 'ger' }; render(); }, gkind: v => { V.sheet.kind = v; render(); }, timer: v => timer(+v),
    diag: () => startQuiz(Ger.order.filter(i => i.startsWith('A1')), 'diag', 3), unit: (v, id) => startQuiz([id], v, v === 'due' ? 5 : 10),
    qgo: () => { Q.intro = false; render(); }, qquit: () => { Q = null; render(); },
    qcheck: () => { const el = $('#qa'), [id, i] = Q.items[Q.i], ok = Ger.check(el.value, Ger.units[id].items[i][1]); Q.fb = { ok, given: el.value }; Q.res[Q.i] = ok; render(); },
    qover: () => { Q.res[Q.i] = true; Q.fb = null; Q.i++; render(); }, qnext: () => { Q.fb = null; Q.i++; render(); }, ch: v => { const el = $('#qa'); el.value += v; el.focus(); },
    copyOut: () => { navigator.clipboard.writeText('Please correct my German (level A1–A2). List each mistake with the rule, then give the corrected text:\n\n' + $('#gout').value); toast('Copied. Paste it to Claude.'); },
    notif: async () => { if (!window.Notification) return toast('This browser has no notifications.'); const p = await Notification.requestPermission(); S.settings.notif = p === 'granted'; save(S.settings); if (p === 'granted') subscribePush(); },
    testN: () => notify('Goal OS', 'Notifications work.'),
    signin: v => signIn(+v), signout: () => { SY = { url: SY.url, key: SY.key, vapid: SY.vapid }; saveSY(); render(); }, syncNow: () => sync(true),
    export: () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: 'application/json' })); a.download = 'goalos-' + today() + '.json'; a.click(); }
  };
  document.addEventListener('click', e => { const el = e.target.closest('[data-a]'); if (!el || !A[el.dataset.a]) return; if (el.tagName !== 'A') e.preventDefault(); A[el.dataset.a](el.dataset.v, el.dataset.id, el); });
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'qa') { e.preventDefault(); A.qcheck(); } });
  document.addEventListener('input', e => { const el = e.target, d = el.dataset;
    if (d.au) { const [g, k] = d.au.split(':'); V.sheet.vals[g][k] = +el.value; render(); }
    if (d.f === 'change' || d.f === 'note') { const w = week(C.reviewWeek(S, today())); w[d.f] = el.value; w.t = Date.now(); localStorage.goalos = JSON.stringify(S); }
    if (d.f === 'gout') { (S.german.out = S.german.out || {})[today()] = el.value; S.german.t = Date.now(); localStorage.goalos = JSON.stringify(S); }
    if (d.y) { SY[d.y] = el.value.trim(); saveSY(); } });
  document.addEventListener('change', e => { const el = e.target;
    if (el.dataset.s) { S.settings[el.dataset.s] = el.value; save(S.settings); }
    if (el.id === 'imp' && el.files[0]) el.files[0].text().then(t => { S = C.merge(S, JSON.parse(t)); save(); toast('Backup merged.'); }); });

  /* ---------- notifications ---------- */
  async function notify(title, body) { try { if (!window.Notification || Notification.permission !== 'granted') return; const r = await navigator.serviceWorker.ready; r.showNotification(title, { body, icon: 'icon-192.png', badge: 'icon-192.png', tag: title }); } catch (e) { } }
  function minute() {
    const k = today(), t = now(), hm = String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0');
    if (hm >= S.settings.nudge && localStorage.goalos_nudged !== k) { localStorage.goalos_nudged = k; const n = C.nudge(S, k); if (n) notify(n.title, n.body); }
    if (C.dow(k) === 0 && hm >= '18:00' && localStorage.goalos_rev !== k && C.reviewWeek(S, k)) { localStorage.goalos_rev = k; notify('Weekly review is ready', '5 minutes: the counts are filled in.'); }
    if (localStorage.goalos_day !== k) { localStorage.goalos_day = k; render(); }
  }

  /* ---------- sync (Supabase REST, no library) ---------- */
  let SY = {}; try { SY = JSON.parse(localStorage.goalos_sync || '{}'); } catch (e) { }
  const saveSY = () => localStorage.goalos_sync = JSON.stringify(SY);
  async function sb(path, opt = {}) { const r = await fetch(SY.url.replace(/\/$/, '') + path, Object.assign({}, opt, { headers: Object.assign({ apikey: SY.key, 'Content-Type': 'application/json', Authorization: 'Bearer ' + (SY.access || SY.key) }, opt.headers) })); const t = await r.text(); let j = null; try { j = t ? JSON.parse(t) : null; } catch (e) { } if (!r.ok) throw new Error((j && (j.msg || j.message || j.error_description)) || r.status); return j; }
  function setSession(j) { SY.access = j.access_token; SY.refresh = j.refresh_token; SY.uid = j.user.id; SY.exp = Date.now() + (j.expires_in - 60) * 1e3; saveSY(); }
  async function signIn(create) {
    try { if (!SY.url || !SY.key) return toast('Enter the project URL and key first.'); const body = JSON.stringify({ email: SY.email, password: $('#pw').value }); SY.access = null;
      const j = await sb(create ? '/auth/v1/signup' : '/auth/v1/token?grant_type=password', { method: 'POST', body });
      if (!j.access_token) return toast('Account created. Confirm the email, then sign in.'); setSession(j); await sync(true); subscribePush(); } catch (e) { toast('Sign-in failed: ' + e.message); }
  }
  async function sync(loud) {
    if (!SY.uid || !navigator.onLine) return;
    try { if (Date.now() > SY.exp) setSession(await sb('/auth/v1/token?grant_type=refresh_token', { method: 'POST', headers: { Authorization: 'Bearer ' + SY.key }, body: JSON.stringify({ refresh_token: SY.refresh }) }));
      const rows = await sb('/rest/v1/goal_state?select=data&user_id=eq.' + SY.uid), before = JSON.stringify(S);
      if (rows[0]) S = C.merge(S, rows[0].data);
      S.settings.tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      await sb('/rest/v1/goal_state?on_conflict=user_id', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates' }, body: JSON.stringify({ user_id: SY.uid, data: S, updated_at: new Date().toISOString() }) });
      SY.last = Date.now(); saveSY(); localStorage.goalos = JSON.stringify(S); if (JSON.stringify(S) !== before || loud) render(); if (loud) toast('Synced.');
    } catch (e) { if (loud) toast('Sync failed: ' + e.message); }
  }
  async function subscribePush() {
    try { if (!SY.vapid || !SY.uid || Notification.permission !== 'granted') return; const reg = await navigator.serviceWorker.ready, pad = '='.repeat((4 - SY.vapid.length % 4) % 4), raw = atob((SY.vapid + pad).replace(/-/g, '+').replace(/_/g, '/'));
      const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: Uint8Array.from(raw, c => c.charCodeAt(0)) });
      await sb('/rest/v1/push_subs?on_conflict=endpoint', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates' }, body: JSON.stringify({ endpoint: sub.endpoint, user_id: SY.uid, sub: sub.toJSON() }) }); } catch (e) { }
  }

  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js');
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { sync(); minute(); } });
  setInterval(minute, 30000); localStorage.goalos_day = today(); render(); sync();
  window.GoalOS = { get S() { return S; }, render };
})();
