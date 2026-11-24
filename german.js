/* German A1→A2 exercise bank. Format: "#id|title|German name", "!rule", "prompt => answer|alternative". */
(function (G) {
  const RAW = `
#A1-1|Recognising gender|Das Genus erkennen
!die: -ung, -heit, -keit, -schaft, -ion, -tät, -ie, most nouns in -e
!das: -chen, -lein, -ment, -um, verbs used as nouns (das Essen)
!der: days, months, seasons, -er (people), -ling, -ismus
___ Zeitung => die
___ Mädchen => das
___ Frühling => der
___ Museum => das
___ Freiheit => die
___ Lehrer => der
___ Dokument => das
___ Nation => die
___ Montag => der
___ Essen (the meal) => das
___ Universität => die
___ Optimismus => der
___ Häuschen => das
___ Freundschaft => die
#A1-2|nicht or kein|Negation
!kein negates a noun with ein or no article: kein Auto, keine Zeit, keinen Hunger
!nicht negates everything else: verbs, adjectives, places, nouns with der/mein
!nicht goes to the end, but before the separated prefix, adjectives and places
Ich habe ___ Zeit. => keine
Ich rufe dich morgen ___ an. => nicht
Das ist ___ mein Buch. => nicht
Ich habe ___ Hunger. => keinen
Wir trinken ___ Kaffee. => keinen
Er kommt heute ___. => nicht
Sie hat ___ Kinder. => keine
Ich wohne ___ in Berlin. => nicht
Das ist ___ Problem. => kein
Ich kann ___ schwimmen. => nicht
Negate: Er ist müde. => Er ist nicht müde
Negate: Wir kaufen das Buch. => Wir kaufen das Buch nicht
#A1-3|Accusative|Akkusativ
!Only masculine changes: der → den, ein → einen, kein → keinen, mein → meinen
!Some masculine nouns add -n/-en: den Studenten, Herrn Müller
Ich sehe ___ Mann. (der) => den
Wir brauchen ___ Tisch. (ein) => einen
Kennst du den ___? (Student) => Studenten
Ich habe ___ Bruder. (kein) => keinen
Sie kauft ___ Lampe. (ein) => eine
Er liest ___ Buch. (das) => das
Ich suche ___ Schlüssel. (mein) => meinen
Hast du ___ Hund? (ein) => einen
Kennst du ___ Müller? (Herr) => Herrn
Wir besuchen ___ Großeltern. (die) => die
#A1-4|Irregular verbs in the present|Verben mit Vokalwechsel
!Only du and er/sie/es change: e → i/ie (sprechen → du sprichst), a → ä (fahren → du fährst)
!wissen: ich weiß, du weißt, er weiß
Du ___ gut Deutsch. (sprechen) => sprichst
Er ___ ein Buch. (lesen) => liest
___ du nach Berlin? (fahren) => fährst
Sie ___ gern Pizza. (essen, she) => isst
Du ___ den Bus. (nehmen) => nimmst
Das Kind ___ schon. (schlafen) => schläft
Ich ___ es nicht. (wissen) => weiß
___ du den Film? (sehen) => siehst
Er ___ mir. (helfen) => hilft
Sie ___ schnell. (laufen, she) => läuft
Du ___ mir das Buch. (geben) => gibst
Er ___ einen Hut. (tragen) => trägt
#A1-5|Possessives|Possessivartikel
!mein, dein, sein (his/its), ihr (her/their), unser, euer, Ihr (formal)
!Endings follow ein: meine Mutter, meinen Bruder (accusative masculine); euer + e → eure
Kennst du ___ Bruder? (my) => meinen
Herr Klein, ist das ___ Schlüssel? (your, formal) => Ihr
Ist das ___ Wohnung? (your, plural) => eure
Das ist Anna und das ist ___ Mann. (her) => ihr
Paul liebt ___ Schwester. (his) => seine
Wir besuchen ___ Eltern. (our) => unsere
Wo ist ___ Handy? (your, du) => dein
Die Kinder suchen ___ Ball. (their) => ihren
Ich rufe ___ Mutter an. (my) => meine
Ist das ___ Auto? (your, plural) => euer
#A1-6|Separable verbs|Trennbare Verben
!The prefix goes to the end: aufstehen → Ich stehe um 7 Uhr auf.
!In questions the verb still comes first or second; the prefix stays last
Build: ich / aufstehen / um 7 Uhr => Ich stehe um 7 Uhr auf
Build a question: du / anrufen / mich / morgen => Rufst du mich morgen an
Build: der Zug / ankommen / um 10 Uhr => Der Zug kommt um 10 Uhr an
Build: wir / einkaufen / heute => Wir kaufen heute ein
Build a question: wann / anfangen / der Film => Wann fängt der Film an
Build: er / fernsehen / am Abend => Er sieht am Abend fern
Build: ich / mitkommen / gern => Ich komme gern mit
Build: sie (she) / zumachen / das Fenster => Sie macht das Fenster zu
Ich ___ dich später ___. (anrufen) => rufe an
Build: wir / abholen / dich / um acht => Wir holen dich um acht ab
#A1-7|Modal verbs|Modalverben
!Modal verb in position 2, the other verb as infinitive at the end
!ich/er forms have no ending: ich kann, er muss, ich will, er darf, ich soll, ich möchte
Ich ___ morgen früh aufstehen. (müssen) => muss
Er ___ nicht schwimmen. (können) => kann
___ du mir helfen? (können) => kannst
Hier ___ man nicht rauchen. (dürfen) => darf
Wir ___ einen Kaffee, bitte. (möchten) => möchten
Ihr ___ mehr schlafen. (sollen) => sollt
Ich ___ Arzt werden. (wollen) => will
___ ich hier parken? (dürfen) => darf
Build: ich / müssen / heute / arbeiten => Ich muss heute arbeiten
Build a question: du / können / gut / kochen => Kannst du gut kochen
#A1-8|Imperative|Imperativ
!du: drop "du" and "-st" (du kommst → Komm!); e → i stays (Sprich!), a → ä does not (Fahr!)
!ihr: drop "ihr" (Kommt!) · Sie: verb first (Kommen Sie!) · sein: Sei! Seid! Seien Sie!
du · sprechen => Sprich
du · fahren => Fahr
ihr · aufstehen => Steht auf
Sie · warten => Warten Sie
du · lesen => Lies
du · ruhig sein => Sei ruhig
du · mich anrufen => Ruf mich an
du · nehmen => Nimm
ihr · kommen => Kommt
du · essen => Iss
Sie · Platz nehmen => Nehmen Sie Platz
du · mir das Buch geben => Gib mir das Buch
#A1-9|Ordinal numbers & time|Ordinalzahlen und Uhrzeit
!1.–19. add -te (erste, dritte, siebte are irregular); from 20. add -ste
!Heute ist der dritte Mai. · am dritten Mai (dative: -ten / -sten)
!halb neun = 8:30 · Viertel vor acht = 7:45 · Viertel nach neun = 9:15
Heute ist der ___ Mai. (3.) => dritte
Am ___ Juli habe ich Geburtstag. (12.) => zwölften
Heute ist der ___ Januar. (1.) => erste
Wir kommen am ___ Mai. (7.) => siebten
Heute ist der ___ März. (20.) => zwanzigste
8:30 (informal) => halb neun
7:45 (informal) => Viertel vor acht
9:15 (informal) => Viertel nach neun
6:25 (informal) => fünf vor halb sieben
4:35 (informal) => fünf nach halb fünf
Silvester ist am ___ Dezember. (31.) => einunddreißigsten
#A1-10|Time prepositions|Temporale Präpositionen
!am + day / part of day (am Montag, am Abend; but in der Nacht) · im + month / season · um + clock time
!seit + dative = since / for (still going on) · von … bis · vor / nach + dative
___ Montag => am
___ Juli => im
___ 8 Uhr => um
Ich lerne ___ drei Monaten Deutsch. => seit
___ Wochenende => am
___ Winter => im
___ der Nacht => in
___ 9 ___ 17 Uhr => von bis
___ Abend => am
___ dem Essen (after) => nach
___ dem Kurs (before) => vor
___ Mittag => am
#A1-11|Dative|Dativ
!der/das → dem · die → der · plural die → den + noun gets -n (mit den Kindern)
!Always dative: aus, bei, mit, nach, seit, von, zu · verbs: helfen, danken, gehören, antworten
Ich helfe ___ Frau. (die) => der
Ich gebe ___ Kind ein Buch. (das) => dem
mit ___ Freunden (die, plural) => den
Das Auto gehört ___ Mann. (der) => dem
Ich danke ___ Mutter. (mein) => meiner
Er fährt mit ___ Bus. (der) => dem
Wir wohnen bei ___ Eltern. (unser) => unseren
Sie schenkt ___ Freund eine Uhr. (ihr) => ihrem
nach ___ Schule (die) => der
Ich antworte ___ Lehrerin. (die) => der
mit den ___ (Kind, plural) => Kindern
#A1-12|Accusative prepositions|Präpositionen mit Akkusativ
!Always accusative: für, durch, ohne, gegen, um, bis
für ___ Vater (mein) => meinen
durch ___ Park (der) => den
ohne ___ Bruder (ein) => einen
gegen ___ Wand (die) => die
um ___ Tisch (der) => den
für ___ (du) => dich
ohne ___ (ich) => mich
Das Geschenk ist für ___ Kind. (das) => das
Wir gehen um ___ See. (der) => den
für ___ Freundin (mein) => meine
#A1-13|Personal pronouns|Personalpronomen im Akkusativ und Dativ
!Accusative: mich, dich, ihn, sie, es, uns, euch, sie / Sie
!Dative: mir, dir, ihm, ihr, ihm, uns, euch, ihnen / Ihnen
Ich sehe ___. (er) => ihn
Kannst du ___ helfen? (ich) => mir
Das gefällt ___. (wir) => uns
Kennst du ___? (sie, they) => sie
Ich gebe ___ das Buch. (du) => dir
Ich liebe ___. (du) => dich
Gib ___ das Buch! (er) => ihm
Wie geht es ___? (Sie, formal) => Ihnen
Ich rufe ___ an. (ihr, you all) => euch
Das Buch gehört ___. (sie, she) => ihr
Er besucht ___. (wir) => uns
Schmeckt es ___? (ihr, you all) => euch
#A1-14|Where, where from, where to|Wo? Woher? Wohin?
!Wohin: nach + city/country, zu + person/place (zum Arzt), in + accusative (ins Kino, in die Schweiz), nach Hause
!Wo: in + dative (im Supermarkt), bei + person (beim Arzt), zu Hause
!Woher: aus + country/building, von + person (vom Arzt)
Ich gehe ___ Arzt. => zum
Ich komme ___ Arzt. => vom
Ich fahre ___ Berlin. => nach
Ich bin ___ Hause. => zu
Ich gehe ___ Hause. => nach
Ich komme ___ Tunesien. => aus
Wo bist du? — ___ Supermarkt. => im
Ich fahre ___ die Schweiz. => in
Ich bin gerade ___ Arzt. => beim
Sie kommt ___ der Türkei. => aus
Wir gehen ___ Kino. => ins
Ich wohne ___ meiner Tante. => bei
#A1-15|Perfect tense|Perfekt
!haben/sein in position 2 + participle at the end: Ich habe Pizza gegessen.
!sein with movement or change of state (fahren, gehen, kommen, aufstehen) and sein, bleiben
!ge-…-t (gemacht) · ge-…-en (gefahren) · no ge- with be-, ver-, -ieren · auf-ge-standen
Ich ___ gestern nach Hamburg ___. (fahren) => bin gefahren
Wir ___ Pizza ___. (essen) => haben gegessen
Er ___ um 7 Uhr ___. (aufstehen) => ist aufgestanden
___ du die Hausaufgaben ___? (machen) => hast gemacht
Ich ___ das Buch ___. (lesen) => habe gelesen
Sie ___ lange ___. (schlafen, she) => hat geschlafen
Wir ___ nach Hause ___. (gehen) => sind gegangen
Participle: kaufen => gekauft
Participle: trinken => getrunken
Participle: besuchen => besucht
Participle: einkaufen => eingekauft
Participle: studieren => studiert
Er ___ zu Hause ___. (bleiben) => ist geblieben
#A1-16|war and hatte|Präteritum von sein und haben
!sein: war, warst, war, waren, wart, waren · haben: hatte, hattest, hatte, hatten, hattet, hatten
Gestern ___ ich krank. => war
Wir ___ keine Zeit. => hatten
___ du gestern zu Hause? => warst
Er ___ Hunger. => hatte
Ihr ___ im Urlaub. => wart
Ich ___ viel Arbeit. => hatte
Sie ___ müde. (they) => waren
___ ihr Glück? => hattet
Du ___ recht. => hattest
Das Wetter ___ schön. => war
#A1-17|gern, lieber, am liebsten|Vorlieben
!verb + gern = like doing · lieber = prefer · am liebsten = like most · nicht gern = dislike
!mögen + noun: ich mag, du magst, er mag
Ich spiele ___ Tennis. (like to) => gern
Ich trinke ___ Tee als Kaffee. => lieber
___ esse ich Pizza. (most of all) => Am liebsten
Ich schwimme gern, aber ich laufe ___. (prefer) => lieber
Translate: I like reading. => Ich lese gern
Translate: Do you like drinking coffee? (du) => Trinkst du gern Kaffee
Translate: I don't like cooking. => Ich koche nicht gern
Ich ___ Schokolade. (mögen) => mag
___ du Hunde? (mögen) => magst
Translate: What do you like doing most? (du) => Was machst du am liebsten
#A2-1|Perfect tense in depth|Perfekt: haben oder sein, Partizip II
!sein: movement from A to B, change of state (einschlafen, aufwachen, passieren, umziehen), sein/bleiben/werden
!Separable: prefix + ge + stem (angerufen) · inseparable be-, ver-, er-, ent-: no ge- (vergessen, bezahlt)
Er ___ nach Berlin ___. (umziehen) => ist umgezogen
Ich ___ dich ___. (anrufen) => habe angerufen
Wir ___ den Film ___. (sehen) => haben gesehen
Sie ___ früh ___. (einschlafen, she) => ist eingeschlafen
Ich ___ den Schlüssel ___. (vergessen) => habe vergessen
Was ___ ___? (passieren) => ist passiert
Er ___ viel ___. (arbeiten) => hat gearbeitet
Wir ___ uns ___. (treffen) => haben getroffen
Ich ___ um 6 ___. (aufwachen) => bin aufgewacht
Sie ___ das Auto ___. (verkaufen, she) => hat verkauft
___ du schon ___? (bezahlen) => hast bezahlt
Der Zug ___ pünktlich ___. (abfahren) => ist abgefahren
#A2-2|Simple past|Präteritum
!Regular: stem + -te (sagte, wohnten) · modals lose the umlaut: konnte, musste, durfte, wollte, sollte
!Irregular: new stem, no ending for ich/er: ging, kam, gab, bekam, wusste
Ich ___ nicht kommen. (können) => konnte
Wir ___ lange warten. (müssen) => mussten
Er ___ Arzt werden. (wollen) => wollte
Als Kind ___ ich nicht fernsehen. (dürfen) => durfte
Du ___ mich anrufen. (sollen) => solltest
Es ___ viele Leute. (geben) => gab
Sie ___ nach Hause. (gehen, she) => ging
Er ___ nichts. (sagen) => sagte
Wir ___ in Paris. (wohnen) => wohnten
Ich ___ einen Brief. (bekommen) => bekam
Sie ___ es nicht. (wissen, she) => wusste
Er ___ früh. (kommen) => kam
#A2-3|Reflexive verbs|Reflexive Verben
!mich, dich, sich, uns, euch, sich
!If there is another accusative object, the reflexive is dative: Ich wasche mir die Hände.
Ich freue ___ auf das Wochenende. => mich
Er wäscht ___ die Hände. => sich
Wir treffen ___ um acht. => uns
Ich putze ___ die Zähne. => mir
Setz ___ bitte! => dich
Interessierst du ___ für Musik? => dich
Sie ärgert ___ über den Lärm. => sich
Ihr müsst ___ beeilen. => euch
Ich ziehe ___ an. => mich
Ich ziehe ___ die Jacke an. => mir
Wir haben ___ gut unterhalten. => uns
Er erinnert ___ nicht daran. => sich
#A2-4|Dative and accusative together|Dativ und Akkusativ im Satz
!Two nouns: dative first (Ich gebe dem Mann das Buch.)
!A pronoun comes before a noun; two pronouns: accusative first (Ich gebe es ihm.)
Ich gebe ___ Mann ___ Buch. (der / das) => dem das
Ich gebe es ___. (er) => ihm
Build: ich / schenken / meine Mutter / Blumen => Ich schenke meiner Mutter Blumen
Replace both nouns: Ich gebe dem Kind den Ball. => Ich gebe ihn ihm
Replace "die Stadt": Er zeigt der Frau die Stadt. => Er zeigt sie der Frau
Kannst du ___ ___ Salz geben? (ich / das) => mir das
Sie bringt ___ Gästen ___ Kaffee. (die / der) => den den
Ich erkläre ___ ___ Regel. (du / die) => dir die
Wir schicken ___ Chef eine E-Mail. (der) => dem
Er leiht ___ Freundin ___ Auto. (seine / sein) => seiner sein
Translate: I'll show it to you. (das Foto, du) => Ich zeige es dir
Translate: He gives her the key. => Er gibt ihr den Schlüssel
#A2-5a|Two-way prepositions|Wechselpräpositionen
!an, auf, hinter, in, neben, über, unter, vor, zwischen
!Wo? (position) → dative · Wohin? (movement to) → accusative
Das Buch liegt auf ___ Tisch. => dem
Ich lege das Buch auf ___ Tisch. => den
Wir gehen in ___ Park. => den
Wir sind ___ Park. (in + der) => im|in dem
Die Lampe hängt über ___ Tisch. => dem
Ich hänge das Bild an ___ Wand. => die
Das Bild hängt an ___ Wand. => der
Stell die Flasche in ___ Kühlschrank! => den
Die Katze sitzt unter ___ Stuhl. => dem
Er fährt das Auto vor ___ Haus. => das
Das Auto steht vor ___ Haus. => dem
Ich gehe ___ Kino. (in + das) => ins|in das
#A2-5b|Position verbs|liegen/legen, stehen/stellen, sitzen/setzen, hängen
!Position (Wo? + dative): liegen, stehen, sitzen, hängen · irregular: gelegen, gestanden, gesessen, gehangen
!Action (Wohin? + accusative): legen, stellen, setzen, hängen · regular: gelegt, gestellt, gesetzt, gehängt
Das Buch ___ auf dem Tisch. (liegen/legen) => liegt
Ich ___ das Buch auf den Tisch. (liegen/legen) => lege
Die Flasche ___ im Kühlschrank. (stehen/stellen) => steht
Er ___ die Flasche in den Kühlschrank. (stehen/stellen) => stellt
Das Bild ___ an der Wand. => hängt
Wir ___ das Bild an die Wand. => hängen
Ich ___ mich auf den Stuhl. (sitzen/setzen) => setze
Sie ___ auf dem Sofa. (sitzen/setzen, she) => sitzt
Ich habe das Buch auf den Tisch ___. (legen) => gelegt
Das Buch hat auf dem Tisch ___. (liegen) => gelegen
Er hat das Auto vor das Haus ___. (stellen) => gestellt
Wohin ___ du die Schlüssel ___? (legen, Perfekt) => hast gelegt
#A2-6|Verbs with prepositions|Verben mit Präpositionen
!Learn verb + preposition + case together: warten auf + Akk, denken an + Akk, träumen von + Dat
!Things: wo(r)- / da(r)- (Worauf? Darauf.) · People: preposition + pronoun (Auf wen? Auf sie.)
Ich warte ___ den Bus. => auf
Er denkt ___ seine Familie. => an
Wir sprechen ___ den Film. => über
Ich interessiere mich ___ Sport. => für
Sie träumt ___ einem Haus. => von
Ich freue mich ___ das Wochenende. (looking forward) => auf
Ich freue mich ___ das Geschenk. (pleased about) => über
Er nimmt ___ dem Kurs teil. => an
___ wartest du? — Auf den Bus. => Worauf
___ wartest du? — Auf meine Freundin. => Auf wen
Der Bus? Ich warte schon lange ___. => darauf
Hast du Angst ___ Hunden? => vor
Ich kümmere mich ___ die Kinder. => um
___ denkst du? (a thing) => Woran
#A2-7a|weil and dass|Nebensätze mit weil und dass
!In the subordinate clause the conjugated verb goes to the very end
!Separable verbs rejoin (anrufst) · modal after infinitive (arbeiten muss) · Perfekt: participle + haben/sein (geschlafen hat)
Join with weil: Ich bleibe zu Hause. Ich bin krank. => Ich bleibe zu Hause, weil ich krank bin
Join with dass: Er sagt: Er hat keine Zeit. => Er sagt, dass er keine Zeit hat
Join with weil: Ich lerne Deutsch. Ich möchte in Deutschland arbeiten. => Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte
Join with dass: Ich glaube: Sie kommt morgen. => Ich glaube, dass sie morgen kommt
Join with weil: Wir gehen nicht raus. Es regnet. => Wir gehen nicht raus, weil es regnet
Join with dass: Ich weiß: Du hast recht. => Ich weiß, dass du recht hast
Join with weil: Sie ist müde. Sie hat schlecht geschlafen. => Sie ist müde, weil sie schlecht geschlafen hat
Join with weil: Er kommt später. Er muss arbeiten. => Er kommt später, weil er arbeiten muss
Join with dass: Ich hoffe: Du rufst mich an. => Ich hoffe, dass du mich anrufst
Finish: Weil es regnet, ___ (wir bleiben zu Hause) => bleiben wir zu Hause
#A2-7b|wenn and ob|Nebensätze mit wenn und ob, indirekte Fragen
!wenn = if / whenever · ob = whether (indirect yes/no question) · W-word for indirect W-questions
!Subordinate clause first → main clause starts with its verb: Wenn ich Zeit habe, komme ich.
Join with wenn: Ich komme. Ich habe Zeit. => Ich komme, wenn ich Zeit habe
Finish: Wenn ich Zeit habe, ___ (ich komme) => komme ich
Kommt er? — Ich weiß nicht, ___ => ob er kommt
Wo wohnt sie? — Weißt du, ___ => wo sie wohnt
Hat sie Zeit? — Ich frage sie, ___ => ob sie Zeit hat
Wann beginnt der Kurs? — Können Sie mir sagen, ___ => wann der Kurs beginnt
Ich weiß nicht, ___ er heute arbeitet. (wenn/ob/dass) => ob
___ es regnet, nehme ich den Bus. (wenn/ob/dass) => Wenn
Ich denke, ___ das richtig ist. (wenn/ob/dass) => dass
Ruf mich an, ___ du ankommst. (wenn/ob/dass) => wenn
Wie heißt er? — Ich habe vergessen, ___ => wie er heißt
Kannst du mir sagen, ___ der Bahnhof ist? => wo
#A2-8|deshalb, trotzdem, obwohl|Konnektoren
!deshalb / trotzdem are adverbs: they take position 1, the verb follows (Deshalb bleibe ich …)
!weil / obwohl are conjunctions: verb at the end
Es regnet. ___ bleibe ich zu Hause. => Deshalb
Es regnet. ___ gehe ich spazieren. => Trotzdem
Ich gehe spazieren, ___ es regnet. => obwohl
Ich bleibe zu Hause, ___ es regnet. => weil
Join with deshalb: Ich bin müde. Ich gehe ins Bett. => Ich bin müde, deshalb gehe ich ins Bett
Join with trotzdem: Er ist krank. Er arbeitet. => Er ist krank, trotzdem arbeitet er
Join with obwohl: Er arbeitet. Er ist krank. => Er arbeitet, obwohl er krank ist
Join with trotzdem: Sie hat wenig Geld. Sie kauft das Auto. => Sie hat wenig Geld, trotzdem kauft sie das Auto
Join with deshalb: Der Bus kommt nicht. Wir nehmen ein Taxi. => Der Bus kommt nicht, deshalb nehmen wir ein Taxi
Ich lerne viel, ___ ich die Prüfung bestehen will. => weil
Ich habe viel gelernt, ___ habe ich die Prüfung nicht bestanden. => trotzdem
Finish: Obwohl er müde ist, ___ (er geht aus) => geht er aus
#MX-1|Mixed review: cases and prepositions|Wiederholung: Kasus
!Ask first: fixed preposition? two-way preposition (wo/wohin)? dative verb? Otherwise the direct object is accusative
Ich gebe ___ Bruder ___ Schlüssel. (mein / der) => meinem den
Sie fährt mit ___ Auto zu ___ Arbeit. (das / die) => dem der
Das Geschenk ist für ___ Eltern. (mein) => meine
Wir sitzen ___ Garten. (in + der) => im|in dem
Ich stelle die Tasse auf ___ Tisch. => den
Er hilft ___ Freund. (sein) => seinem
Kennst du ___ Lehrerin? (die) => die
Ohne ___ gehe ich nicht. (du) => dich
Bei ___ ist es schön. (wir) => uns
Ich warte auf ___ Bus. (der) => den
Seit ___ Jahr lerne ich Deutsch. (ein) => einem
Das Buch gehört ___. (ich) => mir
#MX-2|Mixed review: word order|Wiederholung: Satzbau
!Main clause: verb second · bracket: modal/haben/sein second, infinitive/participle/prefix last · subordinate clause: verb last
Build (start with "morgen"): morgen / ich / fahren / nach Berlin => Morgen fahre ich nach Berlin
Build: ich / können / heute / nicht / kommen => Ich kann heute nicht kommen
Build: er / anrufen / mich / jeden Tag => Er ruft mich jeden Tag an
Build (Perfekt): ich / gestern / einen Film / sehen => Ich habe gestern einen Film gesehen
Build: …, weil / ich / müssen / arbeiten => weil ich arbeiten muss
Build (Perfekt): …, dass / er / gestern / ankommen => dass er gestern angekommen ist
Build a question: wann / du / aufstehen => Wann stehst du auf
Build (start with "am Wochenende"): wir / besuchen / unsere Eltern => Am Wochenende besuchen wir unsere Eltern
Build: wenn / ich / Zeit / haben , ich / dich / anrufen => Wenn ich Zeit habe, rufe ich dich an
Build: ich / geben / es / dir / morgen => Ich gebe es dir morgen
#A2-9a|Adjective endings after der/die/das|Adjektivdeklination 1
!After der-words: -e in nominative singular (and accusative fem./neuter); -en everywhere else
der alt__ Mann => alte
Ich sehe den alt__ Mann. => alten
mit dem neu__ Auto => neuen
die klein__ Kinder => kleinen
das neu__ Haus => neue
Ich kaufe die rot__ Jacke. => rote
in der groß__ Stadt => großen
diese schön__ Blumen => schönen
#A2-9b|Adjective endings after ein/kein/mein|Adjektivdeklination 2
!The adjective shows the gender where ein does not: ein alter Mann, ein neues Auto, eine kleine Wohnung
!Dative, accusative masculine and all plurals after kein/mein: -en
ein alt__ Mann => alter
ein neu__ Auto => neues
eine klein__ Wohnung => kleine
Ich habe einen neu__ Computer. => neuen
mit einer gut__ Freundin => guten
meine alt__ Schuhe => alten
Das ist kein gut__ Film. => guter
mit meinem klein__ Bruder => kleinen
#A2-9c|Adjective endings without article|Adjektivdeklination 3
!No article → the adjective takes the ending of der/die/das: kalter Kaffee, kaltes Wasser, kalte Milch, mit kaltem Wasser
kalt__ Wasser (nominative) => kaltes
frisch__ Brot => frisches
gut__ Wein (nominative) => guter
mit frisch__ Milch => frischer
Schön__ Ferien! => schöne
Ich trinke gern schwarz__ Kaffee. => schwarzen
Lieb__ Anna, … => liebe
bei schlecht__ Wetter => schlechtem
#A2-10|Comparison|Komparativ und Superlativ
!-er + als (schneller als) · am -sten / der -ste · umlaut often: alt → älter, groß → größer
!Irregular: gut → besser → am besten · viel → mehr → am meisten · gern → lieber → am liebsten · so … wie
Comparative: gut => besser
Comparative: viel => mehr
Berlin ist ___ als Bonn. (groß) => größer
Er ist genauso alt ___ ich. => wie
Sie läuft ___ als ich. (schnell) => schneller
Das ist der ___ Berg. (hoch, superlative) => höchste
Im Januar ist es am ___. (kalt) => kältesten
Comparative: teuer => teurer
Mein Auto ist ___ als deins. (alt) => älter
Was isst du am ___? (gern) => liebsten
#A2-11|Genitive|Genitiv
!des + -(e)s for masculine/neuter (des Mannes), der for feminine and plural
!Names: Peters Buch · prepositions: wegen, während, trotz
das Auto ___ Mannes => des
die Tasche ___ Frau => der
das Spielzeug ___ Kinder => der
wegen ___ Wetters => des
während ___ Woche => der
trotz ___ Regens => des
das Haus mein__ Eltern => meiner
Das ist ___ Buch. (Peter) => Peters
der Name des ___ (Hund) => Hundes
am Ende ___ Monats => des
#A2-12|Konjunktiv II|Wünsche, Höflichkeit, Ratschläge
!hätte, wäre, könnte, sollte, dürfte, müsste · everything else: würde + infinitive
!Polite: Könnten Sie …? · Wish: Ich hätte gern … · Advice: Du solltest … / An deiner Stelle würde ich …
Ich ___ gern einen Kaffee. (haben) => hätte
___ Sie mir helfen? (können) => Könnten
Ich ___ gern reich. (sein) => wäre
Ich ___ gern nach Japan reisen. => würde
Wenn ich Zeit ___, würde ich kommen. (haben) => hätte
Du ___ mehr schlafen. (sollen, advice) => solltest
___ du bitte das Fenster öffnen? => Würdest
Wenn ich du ___, würde ich gehen. => wäre
Wir ___ gern ein Zimmer. (haben) => hätten
An deiner Stelle ___ ich zum Arzt gehen. => würde
___ ich Sie etwas fragen? (dürfen) => Dürfte
Translate: I would like to learn German. => Ich würde gern Deutsch lernen
#A2-13|Future and werden|Futur I
!werden (werde, wirst, wird, werden, werdet, werden) + infinitive at the end
!werden alone = become: Er wird Arzt. · German often uses the present + time word for the future
Ich ___ morgen kommen. => werde
Du ___ es schaffen. => wirst
Es ___ regnen. => wird
Wir ___ sehen. => werden
Ihr ___ Spaß haben. => werdet
Build: ich / werden / nächstes Jahr / in Deutschland / arbeiten => Ich werde nächstes Jahr in Deutschland arbeiten
Er ___ Arzt. (become) => wird
Sie ___ uns besuchen. (they) => werden
#A2-14|Passive|Passiv
!werden + participle: Das Haus wird gebaut. · past: wurde + participle
!The doer, if named: von + dative
Das Haus ___ gebaut. (present) => wird
Die Briefe ___ geschrieben. (present) => werden
Hier ___ Deutsch gesprochen. => wird
Das Auto ___ repariert. (past) => wurde
Die Fenster ___ geputzt. (past) => wurden
Passive: Man öffnet die Tür. => Die Tür wird geöffnet
Passive: Der Mechaniker repariert das Auto. => Das Auto wird vom Mechaniker repariert
Passive: Man spricht hier Englisch. => Hier wird Englisch gesprochen
Das Essen wird ___. (kochen) => gekocht
Ich ___ eingeladen. (present) => werde
#A2-15|Relative clauses|Relativsätze
!Relative pronoun = der/die/das in the case its own clause needs; verb at the end
!Dative: dem, der, dem, denen · after a preposition, the preposition decides the case
Der Mann, ___ dort steht, ist mein Lehrer. => der
Die Frau, ___ ich kenne, wohnt hier. => die
Das Buch, ___ ich lese, ist gut. => das
Der Mann, ___ ich geholfen habe, … => dem
Die Frau, mit ___ ich spreche, … => der
Die Kinder, ___ dort spielen, … => die
Der Film, ___ wir gesehen haben, … => den
Die Leute, mit ___ ich arbeite, … => denen
Das Kind, ___ ich das Buch gebe, … => dem
Join: Das ist der Freund. Er wohnt in Berlin. => Das ist der Freund, der in Berlin wohnt
Das ist die Stadt, in ___ ich wohne. => der
Der Stuhl, auf ___ du sitzt, … => dem
#A2-16|Infinitive with zu|Infinitiv mit zu
!After nouns/adjectives/most verbs: zu + infinitive at the end · separable: aufzustehen
!No zu after modal verbs, lassen, werden, gehen · um … zu = in order to
Ich habe keine Zeit, ins Kino ___. (gehen) => zu gehen
Es ist schön, dich ___. (sehen) => zu sehen
Ich versuche, früh ___. (aufstehen) => aufzustehen
Er hat vergessen, mich ___. (anrufen) => anzurufen
Ich lerne Deutsch, um in Deutschland ___. (arbeiten) => zu arbeiten
Ich kann gut ___. (schwimmen) => schwimmen
Ich habe Lust, Pizza ___. (essen) => zu essen
Wir hoffen, euch bald ___. (besuchen) => zu besuchen
Er fängt an ___. (kochen) => zu kochen
Ich möchte heute zu Hause ___. (bleiben) => bleiben
#A2-17|Indefinite pronouns|Indefinitpronomen
!jemand / niemand · etwas / nichts · alles (everything) / alle (everybody) · man (people in general)
!einer, eine, eins / keiner, keine, keins replace ein/kein + noun
Ist ___ da? (someone) => jemand
Nein, ___ ist da. (nobody) => niemand
Ich habe ___ gekauft. (something) => etwas
Ich habe ___ gesehen. (nothing) => nichts
___ kann hier nicht parken. (people in general) => Man
___ sind schon da. (everybody) => Alle
Hast du einen Stift? — Ja, ich habe ___. => einen
Hast du einen Stift? — Nein, ich habe ___. => keinen
Ich habe ___ verstanden. (everything) => alles
Möchtest du ___ trinken? (something) => etwas
#A2-18|lassen|lassen
!lassen + infinitive = have something done / let: Ich lasse mein Auto reparieren.
!du lässt, er lässt · Perfekt: hat … gelassen (alone), hat … reparieren lassen (with infinitive)
Ich ___ mein Auto reparieren. => lasse
Er ___ sich die Haare schneiden. => lässt
___ mich in Ruhe! (du) => Lass
Wir ___ die Kinder spielen. => lassen
Ich habe mein Handy zu Hause ___. => gelassen
Ich habe das Auto reparieren ___. => lassen
Du ___ mich immer warten. => lässt
___ uns gehen! => Lass
Translate: I'm having my hair cut. => Ich lasse mir die Haare schneiden
#A2-19|Word formation|Wortbildung
!A compound takes the gender of its last part: der Tisch + die Lampe = die Tischlampe
!-ung, -heit, -keit make feminine nouns · -chen makes neuter diminutives · un- = opposite · -los = without
der Tisch + die Lampe = ___ Tischlampe => die
das Haus + die Tür = ___ Haustür => die
die Kinder + das Zimmer = ___ Kinderzimmer => das
wohnen → die ___ => Wohnung
frei → die ___ => Freiheit
gesund → die ___ => Gesundheit
Opposite: glücklich => unglücklich
Diminutive: das Haus → das ___ => Häuschen
lehren → der ___ (person) => Lehrer
die Sonne → ___ (adjective) => sonnig
without work: arbeit + ___ => arbeitslos|los
der Freund → ___ (adjective) => freundlich
`;
  const units = {}, order = []; let cur = null;
  RAW.split('\n').forEach(l => {
    l = l.trim(); if (!l) return;
    if (l[0] === '#') { const [id, t, de] = l.slice(1).split('|'); cur = units[id] = { id, t, de, rules: [], items: [] }; order.push(id); }
    else if (l[0] === '!') cur.rules.push(l.slice(1));
    else { const i = l.lastIndexOf(' => '); cur.items.push([l.slice(0, i), l.slice(i + 4)]); }
  });
  /* Lesson path = the plan's grammar sessions G1–G19, then the rest of A2. */
  const PATH = [['A1-1', 'A1-2'], ['A1-3', 'A1-5', 'A1-12'], ['A1-11', 'A1-13'], ['A1-14', 'A1-10', 'A1-9'], ['A1-4', 'A1-8', 'A1-17'], ['A1-6', 'A1-7'], ['A1-15', 'A1-16'],
    ['A2-1'], ['A2-2'], ['A2-3'], ['A2-4'], ['A2-5a'], ['A2-5b'], ['A2-6'], ['A2-7a'], ['A2-7b'], ['A2-8'], ['MX-1'], ['MX-2'],
    ['A2-9a'], ['A2-9b'], ['A2-9c'], ['A2-10'], ['A2-11'], ['A2-12'], ['A2-13'], ['A2-14'], ['A2-15'], ['A2-16'], ['A2-17'], ['A2-18'], ['A2-19']];
  const norm = s => s.toLowerCase().replace(/…|\.\.\.|[.,!?;:/"“”„]/g, ' ').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/\s+/g, ' ').trim();
  const check = (given, answer) => answer.split('|').some(a => norm(a) === norm(given));
  const OUTPUT = { 1: 'Write 5 new sentences with today’s rule, notes closed.', 4: 'Write 5 true sentences about your own life using today’s rule.', 2: 'Retell the unit aloud in 5 sentences.', 5: 'Retell the unit aloud in 5 sentences and record it on your phone.',
    3: 'Say a 1-minute summary of the video aloud.', 6: 'Write a 6–8 sentence journal entry using this week’s grammar. Paste it to Claude for correction, then turn 2 corrected mistakes into cards.', 0: 'Flashcards only today.' };
  G.Ger = { units, order, PATH, check, norm, OUTPUT };
})(typeof window !== 'undefined' ? window : globalThis);
