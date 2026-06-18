/* =============================================================
   PACIFICA ARCHERY — site behavior
   - mobile nav
   - weekday/weekend pricing toggle (dynamic price swap)
   - scroll reveal
   - social sharing (TikTok, X, Instagram, Facebook, WhatsApp, SMS, native)
   - current-day hours highlight
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var burger = document.querySelector(".hamburger");
  var menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Pricing toggle: weekday <-> weekend ----------
     Any element with [data-weekday] and [data-weekend] will swap text.
     Buttons with [data-band] drive the global mode. */
  function setBand(band) {
    document.querySelectorAll("[data-weekday][data-weekend]").forEach(function (el) {
      var val = band === "weekend" ? el.getAttribute("data-weekend") : el.getAttribute("data-weekday");
      // fade swap
      el.style.opacity = "0";
      setTimeout(function () { el.textContent = val; el.style.opacity = "1"; }, 120);
    });
    document.querySelectorAll("[data-band-btn]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-band") === band);
    });
    document.querySelectorAll(".toggle-wrap").forEach(function (w) { w.setAttribute("data-mode", band); });
    // swap entire card groups (weekday vs weekend offers) where present
    document.querySelectorAll("[data-tier-group]").forEach(function (el) {
      el.style.display = (el.getAttribute("data-tier-group") === band) ? "" : "none";
    });
  }
  document.querySelectorAll("[data-band-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () { setBand(btn.getAttribute("data-band")); });
  });
  // default: pick weekend on Sat/Sun else weekday
  (function () {
    var d = new Date().getDay(); // 0 Sun .. 6 Sat
    setBand((d === 0 || d === 6) ? "weekend" : "weekday");
  })();

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Highlight today's hours ---------- */
  var todayRow = document.querySelector(".hours [data-day='" + new Date().getDay() + "']");
  if (todayRow) todayRow.classList.add("is-today");

  /* ---------- Social sharing ---------- */
  var shareUrl = (document.querySelector('link[rel="canonical"]') || {}).href || window.location.href;
  var shareTitle = document.title;
  var shareText = "Bay Area's #1 indoor archery range — book a lane, lesson, or date night at Pacifica Archery! 🏹";

  function open(u) { window.open(u, "_blank", "noopener,noreferrer,width=640,height=640"); }

  var actions = {
    fb: function () { open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl)); },
    x: function () { open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) + "&url=" + encodeURIComponent(shareUrl)); },
    wa: function () { open("https://wa.me/?text=" + encodeURIComponent(shareText + " " + shareUrl)); },
    sms: function () { window.location.href = "sms:?&body=" + encodeURIComponent(shareText + " " + shareUrl); },
    // TikTok & Instagram have no public web "share intent". Use native share if available,
    // otherwise copy the link and open the app/profile so users can paste into a post/story.
    tt: function () {
      if (navigator.share) { navigator.share({ title: shareTitle, text: shareText, url: shareUrl }).catch(function(){}); }
      else { copy(shareUrl, "Link copied! Paste it into your TikTok bio or video caption."); window.open("https://www.tiktok.com/", "_blank", "noopener"); }
    },
    ig: function () {
      if (navigator.share) { navigator.share({ title: shareTitle, text: shareText, url: shareUrl }).catch(function(){}); }
      else { copy(shareUrl, "Link copied! Paste it into your Instagram story or bio."); window.open("https://www.instagram.com/", "_blank", "noopener"); }
    },
    more: function () {
      if (navigator.share) { navigator.share({ title: shareTitle, text: shareText, url: shareUrl }).catch(function(){}); }
      else { copy(shareUrl, "Link copied to clipboard!"); }
    }
  };

  function copy(text, msg) {
    if (navigator.clipboard) { navigator.clipboard.writeText(text).then(function () { toast(msg); }); }
    else { toast(msg); }
  }
  function toast(msg) {
    var t = document.createElement("div");
    t.textContent = msg;
    t.style.cssText = "position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#14181f;color:#fff;padding:14px 22px;border-radius:999px;z-index:9999;box-shadow:0 14px 40px rgba(0,0,0,.3);font-weight:600;max-width:90vw;text-align:center";
    document.body.appendChild(t);
    setTimeout(function () { t.style.transition = "opacity .4s"; t.style.opacity = "0"; }, 2600);
    setTimeout(function () { t.remove(); }, 3100);
  }

  document.querySelectorAll("[data-share]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var fn = actions[btn.getAttribute("data-share")];
      if (fn) fn();
    });
  });

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
