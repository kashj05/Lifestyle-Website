/* SECTION 4 — WHAT WE COVER (vanilla JS) */
(function () {
  const section = document.querySelector(".on-cover");
  if (!section) return;

  const tabs       = section.querySelectorAll(".on-cover__tab");
  const pillsWrap  = section.querySelector("[data-pills]");
  const pills      = pillsWrap.querySelectorAll(".on-cover__pill");
  const activeLbl  = section.querySelector("[data-active-label]");

  const modal      = section.querySelector("[data-modal]");
  const mEmoji     = modal.querySelector("[data-modal-emoji]");
  const mTitle     = modal.querySelector("[data-modal-title]");
  const mBlurb     = modal.querySelector("[data-modal-blurb]");
  const mGroup     = modal.querySelector("[data-modal-group]");

  function applyTab(group) {
    tabs.forEach(t => t.classList.toggle("is-active", t.dataset.group === group));
    activeLbl.textContent = group === "All" ? "Culture" : group;

    let i = 0;
    pills.forEach(p => {
      const show = group === "All" || p.dataset.group === group;
      p.style.display = show ? "" : "none";
      if (show) {
        p.style.animation = "none";
        // re-trigger stagger animation
        void p.offsetWidth;
        p.style.animation = `on-scale-in 0.35s ease-out both`;
        p.style.animationDelay = `${i * 60}ms`;
        i++;
      }
    });
  }

  tabs.forEach(t => t.addEventListener("click", () => applyTab(t.dataset.group)));

  pills.forEach(p => {
    p.addEventListener("click", () => {
      mEmoji.textContent = p.dataset.emoji;
      mTitle.textContent = p.dataset.name;
      mBlurb.textContent = p.dataset.blurb;
      mGroup.textContent = p.dataset.group;
      modal.hidden = false;
    });
  });

  modal.querySelectorAll("[data-modal-close]").forEach(el =>
    el.addEventListener("click", () => { modal.hidden = true; })
  );
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.hidden = true;
  });
})();
