require('../core.js'); require('../german.js');
const C = globalThis.Core, G = globalThis.Ger, assert = require('assert');
let S = C.fresh('2026-11-11'); assert.equal(C.mode(S, '2026-11-11'), 'normal'); S.settings.start = '2026-11-09';
const tick = (k, ids) => { S.days[k] = { ticks: Object.fromEntries(ids.map(i => [i, 1])), t: 1 }; };
assert.equal(C.mode(S, '2026-11-09'), 'normal');                     // first day: no history, no lapse
tick('2026-11-09', ['job']); assert.equal(C.mode(S, '2026-11-10'), 'normal');
assert.equal(C.mode(S, '2026-11-11'), 'lapse');                       // 10th empty
assert.equal(C.mode(S, '2026-11-12'), 'restart');                     // 10th + 11th empty
S.days['2026-11-11'] = { off: true, ticks: {} }; assert.equal(C.mode(S, '2026-11-11'), 'off'); assert.equal(C.mode(S, '2026-11-12'), 'back');
tick('2026-11-14', ['job']); assert.equal(C.mode(S, '2026-11-15'), 'light');   // Sunday
// move rotation follows completed sessions, not the calendar
S = C.fresh('2026-11-09'); assert.equal(C.focus(S, S.goals.move, '2026-11-09'), 'Upper A · push');
tick('2026-11-09', ['move']); assert.equal(C.focus(S, S.goals.move, '2026-11-11'), 'Lower A · squat');
assert.equal(C.focus(S, S.goals.german, '2026-11-12'), 'Grammar + exercises');
// weekly review
['2026-11-10', '2026-11-11', '2026-11-12', '2026-11-13'].forEach(k => tick(k, ['move', 'job', 'german', 'tech', 'frn', 'frs']));
assert.equal(C.weekCount(S, 'job', '2026-11-09'), 4); assert.equal(C.reviewWeek(S, '2026-11-14'), null); assert.equal(C.reviewWeek(S, '2026-11-15'), '2026-11-09');
let it = C.reviewItems(S, '2026-11-09'); assert.ok(it.some(i => i.k === 'gap' && i.g.id === 'job')); assert.ok(!it.some(i => i.k === 'gap' && i.g.id === 'move')); assert.ok(it.some(i => i.k === 'audit')); assert.ok(!it.some(i => i.k === 'note'));
assert.equal(C.reviewWeek(S, '2026-11-17'), '2026-11-09');           // still open on Tuesday
S.weeks['2026-11-09'] = { cleared: true, energy: 'drained', gap: {}, t: 5 }; assert.equal(C.reviewWeek(S, '2026-11-17'), null);
S.weeks['2026-11-16'] = { energy: 'drained', gap: {}, t: 5 }; it = C.reviewItems(S, '2026-11-16');
assert.ok(it.some(i => i.k === 'trim')); assert.ok(it.some(i => i.k === 'modify' && i.g.id === 'job')); assert.ok(it.some(i => i.k === 'note'));
// alerts
S.goals.tech.stage = 2; assert.ok(C.alerts(S, '2026-11-18').some(a => a.id === 'ms-tech')); S.goals.frs.stage = 3; assert.ok(C.alerts(S, '2026-11-18').some(a => a.id === 'realloc'));
assert.ok(C.nudge(S, '2026-11-18').title.startsWith('5 goals'));     // move has no minimum
const v = C.auditVerdict({ a: 6, b: 5, c: 3, d: 4, e: 4 }); assert.ok(v.v.startsWith('Reframe'));
// german engine
let p = C.germanPlan(S, '2026-11-12', G.PATH); assert.deepEqual(p.fresh, ['A1-1', 'A1-2']);
assert.ok(C.germanScore(S, 'A1-1', 90, '2026-11-12').startsWith('Passed')); assert.equal(S.german.units['A1-1'].next, '2026-11-15');
C.germanScore(S, 'A1-2', 40, '2026-11-12'); p = C.germanPlan(S, '2026-11-13', G.PATH); assert.deepEqual(p.fresh, ['A1-3', 'A1-5', 'A1-12']);
p = C.germanPlan(S, '2026-11-20', G.PATH); assert.deepEqual(p.due, ['A1-1']); assert.deepEqual(p.fresh, ['A1-2']);
assert.ok(G.check('Fährst', 'fährst')); assert.ok(G.check('faehrst', 'fährst')); assert.ok(G.check('bin … gefahren', 'bin gefahren')); assert.ok(G.check('Ich stehe um 7 Uhr auf.', 'Ich stehe um 7 Uhr auf')); assert.ok(!G.check('der', 'die')); assert.ok(G.check('in dem', 'im|in dem'));
let n = 0; G.order.forEach(id => { const u = G.units[id]; assert.ok(u.items.length >= 8, id + ' has too few items'); assert.ok(u.rules.length, id); u.items.forEach(x => { assert.ok(x[0] && x[1], id); n++; }); });
G.PATH.flat().forEach(id => assert.ok(G.units[id], 'missing ' + id)); assert.equal(G.PATH.flat().length, G.order.length);
// merge: newer record wins per day, nothing is lost
const A = C.fresh('2026-11-09'), B = C.fresh('2026-11-09'); A.days.x = { ticks: { job: 1 }, t: 10 }; B.days.x = { ticks: { job: 1, tech: 1 }, t: 20 }; B.days.y = { ticks: { move: 1 }, t: 5 }; A.goals.job.cue = 'new'; A.goals.job.t = 99; A.t = 50; B.t = 60;
const M = C.merge(A, B); assert.equal(M.days.x.ticks.tech, 1); assert.ok(M.days.y); assert.equal(M.goals.job.cue, 'new');
console.log('all core tests passed ·', G.order.length, 'German units ·', n, 'exercise items');
