(() => {
  "use strict";
  const C = window.SITE_CONFIG, D = window.I18N;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lang = "en";
  try { const s = localStorage.getItem("dbs-lang"); if (s === "ta" || s === "en") lang = s; } catch (e) {}
  const t = k => (D[lang] && D[lang][k]) || D.en[k] || k;

  /* ---------- language ---------- */
  function wrapWords() {
    ["#bq1", "#bq2"].forEach(s => { const el = $(s); if (!el) return;
      el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(" "); });
    updateBand();
  }
  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
    $$("[data-i18n-html]").forEach(el => el.innerHTML = t(el.dataset.i18nHtml));
    $$("[data-i18n-alt]").forEach(el => { el.alt = t(el.dataset.i18nAlt) + (el.dataset.n ? " " + el.dataset.n : ""); });
    $$("[data-i18n-ph]").forEach(el => el.placeholder = t(el.dataset.i18nPh));
    $$("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    $$("[data-i18n-title]").forEach(el => el.title = t(el.dataset.i18nTitle));
    $$(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.title = t("meta.title");
    const md = $('meta[name="description"]'); if (md) md.content = t("meta.desc");
    $$(".err").forEach(e => e.hidden = true); $$(".field.bad").forEach(f => f.classList.remove("bad"));
    $("#status").textContent = "";
    wrapWords(); updateLightboxText();
  }
  $$(".lang button").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang; try { localStorage.setItem("dbs-lang", lang); } catch (e) {} applyLang();
  }));

  /* ---------- links ---------- */
  $$("[data-ig]").forEach(a => a.href = C.instagram[a.dataset.ig]);
  ["#dir-link", "#loc-link"].forEach(s => { const a = $(s); if (a) a.href = C.directionsUrl; });
  $("#year").textContent = new Date().getFullYear();
  const waUrl = text => `https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(text)}`;
  $$("[data-wa]").forEach(a => a.href = waUrl(t("wa.quick")));
  document.addEventListener("click", e => { const a = e.target.closest("[data-wa]"); if (a) a.href = waUrl(t("wa.quick")); });

  /* ---------- loader, progress, header ---------- */
  const loader = $(".loader");
  const hideLoader = () => loader && loader.classList.add("done");
  if (document.readyState === "complete") setTimeout(hideLoader, 500); else window.addEventListener("load", () => setTimeout(hideLoader, 700));
  const bar = $("#progress"), header = $(".site-header");
  function onScroll() {
    const h = document.documentElement, max = h.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    header.classList.toggle("scrolled", scrollY > 20);
    h.style.setProperty("--nav-top", Math.max(header.getBoundingClientRect().bottom, 0) + "px");
    updateBand();
  }
  addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll);

  /* ---------- mobile nav ---------- */
  const menu = $(".menu-btn"), nav = $("#nav");
  const closeNav = () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); };
  menu.addEventListener("click", () => menu.setAttribute("aria-expanded", String(nav.classList.toggle("open"))));
  $$("a", nav).forEach(a => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeNav(); });

  /* ---------- hero: sparkles, slideshow, orbs, parallax ---------- */
  const sp = $("#sparkles");
  for (let i = 0; i < 22; i++) { const s = document.createElement("i"); s.className = "sp";
    s.style.cssText = `left:${Math.random() * 100}%;top:${20 + Math.random() * 75}%;--s:${4 + Math.random() * 7}px;--d:${4 + Math.random() * 5}s;--dl:${Math.random() * 6}s`; sp.appendChild(s); }
  const slides = $$(".slide"), dots = $$(".dot"); let cur = 0, timer = null; const DUR = 4800;
  $(".dots").style.setProperty("--dur", DUR + "ms");
  function go(n) { cur = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("on", i === cur));
    dots.forEach((d, i) => { d.classList.remove("on"); void d.offsetWidth; d.classList.toggle("on", i === cur); }); }
  function play() { clearInterval(timer); if (!reduce) timer = setInterval(() => go(cur + 1), DUR); }
  dots.forEach(d => d.addEventListener("click", () => { go(+d.dataset.slide); play(); }));
  document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : play());
  play();
  $$(".orb").forEach((o, k) => { const im = $$("img", o); if (reduce) return;
    setInterval(() => { const i = im.findIndex(x => x.classList.contains("on")); im[i].classList.remove("on"); im[(i + 1) % im.length].classList.add("on"); }, 5200 + k * 900); });
  const hero = $(".hero"), stage = $("#stage");
  if (matchMedia("(hover:hover)").matches && !reduce) {
    hero.addEventListener("pointermove", e => { const r = hero.getBoundingClientRect();
      stage.style.setProperty("--mx", ((e.clientX - r.left) / r.width - .5) * 2); stage.style.setProperty("--my", ((e.clientY - r.top) / r.height - .5) * 2); });
    hero.addEventListener("pointerleave", () => { stage.style.setProperty("--mx", 0); stage.style.setProperty("--my", 0); });
  }

  /* ---------- scroll reveal ---------- */
  $$('[data-rv="stagger"]').forEach(p => [...p.children].forEach((c, i) => c.style.setProperty("--i", i)));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
  $$("[data-rv]").forEach(el => io.observe(el));

  /* ---------- service panels ---------- */
  const panels = $$(".panel");
  function openPanel(p) { panels.forEach(x => { const on = x === p; x.classList.toggle("is-on", on); $(".panel-tab", x).setAttribute("aria-expanded", String(on)); }); }
  panels.forEach(p => { $(".panel-tab", p).addEventListener("click", () => openPanel(p));
    p.addEventListener("pointerenter", e => { if (e.pointerType === "mouse" && innerWidth >= 900) openPanel(p); }); });

  /* ---------- gallery filter + lightbox ---------- */
  const items = $$(".g-item");
  $$(".chip").forEach(c => c.addEventListener("click", () => {
    $$(".chip").forEach(x => { const on = x === c; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", String(on)); });
    items.forEach(i => { const hide = c.dataset.filter !== "all" && i.dataset.cat !== c.dataset.filter; i.hidden = hide; i.classList.remove("pop"); if (!hide) { void i.offsetWidth; i.classList.add("pop"); } });
  }));
  const lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-cap"); let list = [], idx = 0, opener = null;
  function updateLightboxText() { if (!list.length) return; const b = list[idx];
    lbImg.alt = `${t(b.dataset.altKey)} ${b.dataset.n}`; lbCap.textContent = `${t(b.dataset.catLabel)} · ${idx + 1} ${t("lb.of")} ${list.length}`; }
  const show = () => { lbImg.src = list[idx].dataset.full; updateLightboxText(); };
  const step = d => { idx = (idx + d + list.length) % list.length; show(); };
  $$(".g-btn").forEach(b => b.addEventListener("click", () => { list = $$(".g-item:not([hidden]) .g-btn"); idx = list.indexOf(b); opener = b; show(); lb.showModal(); $(".lb-close").focus(); }));
  lb.addEventListener("click", e => { const a = e.target.closest("[data-lb]"); if (a) { a.dataset.lb === "close" ? lb.close() : step(a.dataset.lb === "next" ? 1 : -1); } else if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", e => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); });
  lb.addEventListener("close", () => { lbImg.removeAttribute("src"); if (opener) opener.focus(); });
  let sx = 0; lb.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
  lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); });

  /* ---------- before / after (auto demo, then user control) ---------- */
  const ba = $("#ba"), range = $(".ba-range", ba); let touched = false;
  const setPos = v => { ba.style.setProperty("--pos", v + "%"); range.value = v; };
  range.addEventListener("input", () => { touched = true; setPos(range.value); });
  ["pointerdown", "keydown"].forEach(ev => ba.addEventListener(ev, () => touched = true));
  new IntersectionObserver((es, o) => { if (!es[0].isIntersecting || reduce) return; o.disconnect();
    const t0 = performance.now(), path = [50, 18, 82, 50], seg = 1100;
    (function tick(now) { if (touched) return; const k = (now - t0) / seg, i = Math.floor(k); if (i >= path.length - 1) return setPos(50);
      const f = k - i, e = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2; setPos(path[i] + (path[i + 1] - path[i]) * e); requestAnimationFrame(tick); })(t0);
  }, { threshold: .6 }).observe(ba);

  /* ---------- quote band: words light up on scroll ---------- */
  const band = $("#band");
  function updateBand() { if (!band) return; const ws = $$(".w", band); if (!ws.length) return;
    const r = band.getBoundingClientRect(), p = reduce ? 1 : Math.max(0, Math.min(1, (innerHeight * .92 - r.top) / (r.height * .9 + innerHeight * .1)));
    const n = Math.ceil(ws.length * p); ws.forEach((w, i) => w.classList.toggle("lit", i < n)); }

  /* ---------- enquiry wizard ---------- */
  const form = $("#enquiry"), status = $("#status"), dateEl = $("#f-date"); let stepN = 1;
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  dateEl.min = iso(new Date());
  const checked = () => $$('input[name="svc"]:checked').map(i => i.value);
  function flag(input, bad) { const f = input.closest(".field"), err = $("#" + input.getAttribute("aria-describedby")); f.classList.toggle("bad", bad); if (err) err.hidden = !bad; input.setAttribute("aria-invalid", String(bad)); return bad; }
  function validate(n) {
    if (n === 1) { const bad = checked().length === 0; $("#e-service").hidden = !bad; return !bad; }
    if (n === 2) return !flag(dateEl, dateEl.value !== "" && dateEl.value < dateEl.min);
    const name = $("#f-name"), phone = $("#f-phone"), digits = phone.value.replace(/[\s\-+()]/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    const b1 = flag(name, name.value.trim().length < 2), b2 = flag(phone, phone.value.trim() !== "" && !/^[6-9]\d{9}$/.test(digits));
    if (b1 || b2) { (b1 ? name : phone).focus(); } return !(b1 || b2);
  }
  function showStep(n) { stepN = n;
    $$(".step", form).forEach(s => s.classList.toggle("on", +s.dataset.step === n));
    $$(".wiz-steps li", form).forEach(li => { const k = +li.dataset.s; li.classList.toggle("on", k === n); li.classList.toggle("done", k < n); });
    $("#wbar").style.transform = `scaleX(${n / 3})`;
    $("#w-back").hidden = n === 1; $("#w-next").hidden = n === 3; $("#w-send").hidden = n !== 3; status.textContent = "";
    const first = $(".step.on input:not([type=checkbox]), .step.on textarea", form); if (n > 1 && first && !reduce) setTimeout(() => first.focus({ preventScroll: true }), 350); }
  $("#w-next").addEventListener("click", () => { if (validate(stepN)) showStep(stepN + 1); });
  $("#w-back").addEventListener("click", () => showStep(stepN - 1));
  $$('input[name="svc"]').forEach(i => i.addEventListener("change", () => { if (checked().length) $("#e-service").hidden = true; }));
  $$("[data-add]").forEach(b => b.addEventListener("click", () => {
    const box = $(`input[name="svc"][value="${b.dataset.add}"]`); box.checked = true; showStep(1); $("#e-service").hidden = true;
    const s = $("span", b); s.dataset.i18n = "svc.added"; s.textContent = t("svc.added"); b.closest(".panel").classList.add("added");
  }));
  form.addEventListener("submit", e => {
    e.preventDefault(); status.className = "status"; status.textContent = "";
    if (stepN < 3) { if (validate(stepN)) showStep(stepN + 1); return; }
    if (!validate(1)) return showStep(1); if (!validate(2)) return showStep(2); if (!validate(3)) return;
    const names = checked().map(v => v === "unsure" ? t("f.notsure") : t(`svc.${v}.name`)).join(", ");
    const L = [`${t("wa.hello")} ${names}.`, "", `${t("wa.name")}: ${$("#f-name").value.trim()}`];
    if ($("#f-phone").value.trim()) L.push(`${t("wa.phone")}: ${$("#f-phone").value.trim()}`);
    if (dateEl.value) { const [y, m, d] = dateEl.value.split("-"); L.push(`${t("wa.date")}: ${d}/${m}/${y}`); }
    if ($("#f-loc").value.trim()) L.push(`${t("wa.location")}: ${$("#f-loc").value.trim()}`);
    if ($("#f-msg").value.trim()) L.push(`${t("wa.message")}: ${$("#f-msg").value.trim()}`);
    const url = waUrl(L.join("\n")), w = window.open(url, "_blank");
    if (w) { w.opener = null; status.textContent = t("st.ok"); } else { status.className = "status warn"; status.innerHTML = `${t("st.fail")} <a href="${url}" target="_blank" rel="noopener noreferrer">${t("st.link")}</a>`; }
  });
  ["#f-name", "#f-phone", "#f-date"].forEach(s => $(s).addEventListener("input", () => { if ($(s).closest(".field").classList.contains("bad")) validate(stepN); }));

  applyLang(); onScroll();
})();
