// Goal OS · optional push sender. Runs every 15 min (see schema.sql) and sends the evening nudge
// and the Sunday review reminder to devices where the app is closed.
// Secrets needed: VAPID_PUBLIC, VAPID_PRIVATE (npx web-push generate-vapid-keys), VAPID_SUBJECT (mailto:you@…).
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
webpush.setVapidDetails(Deno.env.get("VAPID_SUBJECT")!, Deno.env.get("VAPID_PUBLIC")!, Deno.env.get("VAPID_PRIVATE")!);
const inWindow = (hm: string, at: string) => { const m = (s: string) => +s.slice(0, 2) * 60 + +s.slice(3); const d = m(hm) - m(at); return d >= 0 && d < 15; };

Deno.serve(async () => {
  const { data: rows } = await db.from("goal_state").select("user_id,data");
  let sent = 0;
  for (const r of rows ?? []) {
    const S = r.data, tz = S.settings?.tz || "UTC";
    const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false, weekday: "short" }).formatToParts(new Date()).map(x => [x.type, x.value]));
    const key = `${p.year}-${p.month}-${p.day}`, hm = `${p.hour === "24" ? "00" : p.hour}:${p.minute}`;
    const day = S.days?.[key] || {}, msgs: { title: string; body: string; tag: string }[] = [];
    if (inWindow(hm, S.settings?.nudge || "20:30")) {
      const left = (S.order || []).map((i: string) => S.goals[i]).filter((g: any) => g && !g.arch && !g.noMin && !day.ticks?.[g.id] && !day.skip?.[g.id]);
      if (left.length) msgs.push({ title: `${left.length} goal${left.length > 1 ? "s" : ""} still open`, body: `${left[0].e} ${left[0].name}: ${day.off ? left[0].floor : left[0].min}`, tag: "nudge" });
    }
    if (p.weekday === "Sun" && inWindow(hm, "18:00")) msgs.push({ title: "Weekly review is ready", body: "5 minutes: the counts are filled in.", tag: "review" });
    if (!msgs.length) continue;
    const { data: subs } = await db.from("push_subs").select("endpoint,sub").eq("user_id", r.user_id);
    for (const s of subs ?? []) for (const m of msgs) {
      try { await webpush.sendNotification(s.sub, JSON.stringify(m)); sent++; }
      catch (e) { if ((e as any).statusCode === 404 || (e as any).statusCode === 410) await db.from("push_subs").delete().eq("endpoint", s.endpoint); }
    }
  }
  return new Response(JSON.stringify({ sent }), { headers: { "Content-Type": "application/json" } });
});
