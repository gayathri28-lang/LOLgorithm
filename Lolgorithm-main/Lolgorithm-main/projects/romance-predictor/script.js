function jaccard(list1, list2) {
  const s1 = new Set(list1);
  const s2 = new Set(list2);
  const inter = new Set([...s1].filter(x => s2.has(x)));
  const union = new Set([...s1, ...s2]);
  return union.size === 0 ? 0 : inter.size / union.size;
}

function keywordScore(bio) {
  const romantic = ["love","coffee","adventure","cat","romance","music","travel","date","kind","kindness"];
  const negative = ["busy","work","no time","hate","never"];
  let score = 0;
  const t = (bio||"").toLowerCase();
  romantic.forEach(w => { if (t.includes(w)) score += 5; });
  negative.forEach(w => { if (t.includes(w)) score -= 5; });
  return score;
}

function seededRngScore(seed) {
  let h = 0;
  for (let i=0;i<seed.length;i++){
    h = seed.charCodeAt(i) + ((h<<5)-h);
    h = h & h;
  }
  return Math.abs(h % 21);
}

function detectDoom(a,b){
  const doomPairs = [["quiet","festival"],["dog","cat"],["vegan","bbq"], ["early","nightlife"]];
  const all = ((a.bio||"") + " " + (b.bio||"") + " " + (a.interests||"") + " " + (b.interests||"")).toLowerCase();
  return doomPairs.some(pair => all.includes(pair[0]) && all.includes(pair[1]));
}

function makePickup(a,b){
  const aInt = (a.interests||"").split(",").map(s=>s.trim()).filter(Boolean);
  const bInt = (b.interests||"").split(",").map(s=>s.trim()).filter(Boolean);
  const shared = aInt.find(i => bInt.includes(i)) || aInt[0] || "mystery";
  return `Hey ${b.name || "there"}, if we were a playlist, we’d be ${shared} × ${aInt[0]||"vibes"} — want to collab?`;
}

const el = id => document.getElementById(id);
const calcBtn = el("calc");
const randBtn = el("randomize");

calcBtn.addEventListener("click", () => {
  const A = {
    name: el("a-name").value.trim(),
    bio: el("a-bio").value.trim(),
    interests: el("a-interests").value.trim(),
    dob: el("a-dob").value
  };
  const B = {
    name: el("b-name").value.trim(),
    bio: el("b-bio").value.trim(),
    interests: el("b-interests").value.trim(),
    dob: el("b-dob").value
  };

  calcBtn.disabled = true;
  calcBtn.innerHTML = 'Calculating<span class="spinner"></span>';
  el("result").style.display = "block";
  el("meterFill").style.width = "0%"; el("meterFill").textContent = "…";

  setTimeout(() => {
    const aInts = A.interests.split(",").map(s=>s.trim()).filter(Boolean);
    const bInts = B.interests.split(",").map(s=>s.trim()).filter(Boolean);
    const shared = jaccard(aInts, bInts) * 100;
    const bioBonus = keywordScore(A.bio) + keywordScore(B.bio);
    const rngChem = seededRngScore((A.name||"") + "|" + (B.name||""));
    const personality = ((A.bio.length % 2) === (B.bio.length % 2)) ? -5 : 5;
    const dobA = A.dob ? new Date(A.dob) : null;
    const dobB = B.dob ? new Date(B.dob) : null;
    const zodiacBonus = (dobA && dobB && dobA.getMonth()===dobB.getMonth()) ? 5 : -2;

    // If they share very few interests (<20%), force high compatibility
    if (shared < 20) {
    total = 90 + Math.random() * 10; // random between 90 and 100
    } else {
    let invertedShared = 100 - shared;
    total = 0.4*invertedShared + 0.25*bioBonus + 0.2*rngChem + 0.1*personality + 0.05*zodiacBonus;
    }



    // NEW: If profiles are identical, set compatibility below 0
    if (
      A.name.toLowerCase() === B.name.toLowerCase() &&
      A.bio.toLowerCase() === B.bio.toLowerCase() &&
      A.interests.toLowerCase() === B.interests.toLowerCase() &&
      A.dob === B.dob
    ) {
      total = -10; // less than 0%
    }

    total = Math.max(total, -10); // allow negatives now
    const totalRounded = Math.round(total*10)/10;

    el("scoreText").textContent = `Compatibility: ${totalRounded}%`;
    el("meterFill").style.width = Math.max(0,totalRounded) + "%";
    el("meterFill").textContent = `${totalRounded}%`;
    el("explain").textContent = `Shared interests: ${shared.toFixed(1)}%. Bio/vibe: ${bioBonus}. Fate: ${rngChem}.`;
    el("pickup").textContent = makePickup(A,B);
    const doomed = detectDoom(A,B);
    if (doomed){ el("doomed").style.display = "block"; el("doomed").textContent = "⚠ Doomed by Destiny!"; }
    else { el("doomed").style.display = "none"; }

    calcBtn.disabled = false;
    calcBtn.innerHTML = 'Calculate Chemistry';
  }, 650);
});

randBtn.addEventListener("click", () => {
  const names = [["Sam","Riley"],["Maya","Noah"],["Zoe","Ethan"],["Aria","Kai"]];
  const pairs = names[Math.floor(Math.random()*names.length)];
  el("a-name").value = pairs[0];
  el("b-name").value = pairs[1];
  const bios = [
    "Coffee lover, occasional traveler, sketchbook hoarder",
    "Night owl, indie-movie buff, pizza enthusiast",
    "Garden nerd, cat person, podcast addict",
    "Gym rat, festival goer, startup hustler"
  ];
  el("a-bio").value = bios[Math.floor(Math.random()*bios.length)];
  el("b-bio").value = bios[Math.floor(Math.random()*bios.length)];
  const interestSets = ["coffee,travel,music","cats,films,coffee","hiking,reading,vegan","music,parties,nightlife"];
  el("a-interests").value = interestSets[Math.floor(Math.random()*interestSets.length)];
  el("b-interests").value = interestSets[Math.floor(Math.random()*interestSets.length)];
  function randDate(){ const y = 1988 + Math.floor(Math.random()*12); const m = 1 + Math.floor(Math.random()*12); const d = 1 + Math.floor(Math.random()*28); return `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`;}
  el("a-dob").value = randDate();
  el("b-dob").value = randDate();
});
