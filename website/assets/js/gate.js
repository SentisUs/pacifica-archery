/* Temporary owner-review password gate.
   NOTE: this is a light client-side gate (deters casual visitors); the page
   markup still exists in the source, so it is NOT real security. Remove this
   file + the <script src="assets/js/gate.js"> tags before public launch. */
(function () {
  var KEY = 'pa_review_ok';
  var PASS = 'Aiming';
  try { if (sessionStorage.getItem(KEY) === '1' || localStorage.getItem(KEY) === '1') return; } catch (e) {}

  // Hide everything except the gate until unlocked.
  var hide = document.createElement('style');
  hide.id = 'pa-gate-hide';
  hide.textContent = 'body > *:not(#pa-gate){visibility:hidden !important}';
  (document.head || document.documentElement).appendChild(hide);

  function build() {
    var g = document.createElement('div');
    g.id = 'pa-gate';
    g.setAttribute('role', 'dialog');
    g.setAttribute('aria-modal', 'true');
    g.setAttribute('aria-label', 'Private preview');
    g.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:#14181f;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif';
    g.innerHTML =
      '<div style="max-width:360px;width:100%;text-align:center;color:#fff">' +
        '<svg width="60" height="60" viewBox="0 0 48 48" aria-hidden="true" style="margin:0 auto 18px;display:block"><circle cx="24" cy="24" r="22" fill="#f6f1e7"/><circle cx="24" cy="24" r="17.6" fill="#14181f"/><circle cx="24" cy="24" r="13.6" fill="#2f6fb0"/><circle cx="24" cy="24" r="9.4" fill="#d2452b"/><circle cx="24" cy="24" r="5.2" fill="#d8a43c"/><circle cx="24" cy="24" r="1.9" fill="#14181f"/></svg>' +
        '<div style="font-family:Archivo,system-ui,sans-serif;font-weight:800;font-size:1.45rem;letter-spacing:.04em;text-transform:uppercase">Pacifica Archery</div>' +
        '<div style="color:#d8a43c;font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;margin-top:4px">Private Preview</div>' +
        '<p style="color:#aab2c0;font-size:.95rem;margin:18px 0 18px">Enter the password to view this preview.</p>' +
        '<form id="pa-gate-form" autocomplete="off">' +
          '<input id="pa-gate-input" type="password" aria-label="Password" placeholder="Password" style="width:100%;padding:13px 16px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.07);color:#fff;font-size:1rem;text-align:center;outline:none;box-sizing:border-box">' +
          '<p id="pa-gate-err" style="color:#f0a08c;min-height:1.1em;font-size:.85rem;margin:10px 0 0;visibility:hidden">Incorrect password — try again.</p>' +
          '<button type="submit" style="margin-top:12px;width:100%;padding:13px 22px;border-radius:999px;border:0;background:#d2452b;color:#fff;font-family:Archivo,system-ui,sans-serif;font-weight:700;font-size:1rem;letter-spacing:.02em;cursor:pointer">Enter 🏹</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(g);

    var input = g.querySelector('#pa-gate-input');
    var err = g.querySelector('#pa-gate-err');
    var form = g.querySelector('#pa-gate-form');
    setTimeout(function () { try { input.focus(); } catch (e) {} }, 40);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value === PASS) {
        try { sessionStorage.setItem(KEY, '1'); localStorage.setItem(KEY, '1'); } catch (e2) {}
        var s = document.getElementById('pa-gate-hide');
        if (s) s.parentNode.removeChild(s);
        g.parentNode.removeChild(g);
      } else {
        err.style.visibility = 'visible';
        input.value = '';
        input.focus();
      }
    });
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
