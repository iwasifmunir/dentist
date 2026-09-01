/* =============================================================
   SmileLab — app.js  (identical for every client)
   ============================================================= */
(function () {
  'use strict';

  var D = window.CLINIC || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function get(p) { return p.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, D); }
  function el(t, c, x) { var n = document.createElement(t); if (c) n.className = c; if (x != null) n.textContent = x; return n; }
  function icon(id, cls) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if (cls) s.setAttribute('class', cls);
    var u = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    u.setAttribute('href', '#' + id); s.appendChild(u); return s;
  }

  /* ---------- 1. text binding ---------- */
  $$('[data-bind]').forEach(function (n) {
    var v = get(n.getAttribute('data-bind'));
    if (v != null) n.textContent = v;
  });

  /* ---------- 2. links ---------- */
  var waBase = 'https://wa.me/' + (D.whatsapp || '');
  var waHello = waBase + '?text=' + encodeURIComponent(
    'Hello! I would like to book an appointment at ' + (D.name || 'your clinic') + '.'
  );
  $$('[data-wa]').forEach(function (a) { a.href = waHello; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-tel]').forEach(function (a) { a.href = 'tel:' + (D.phoneRaw || ''); });
  $$('[data-mail]').forEach(function (a) { a.href = 'mailto:' + (D.email || ''); });
  $$('[data-tel-emergency]').forEach(function (a) { a.href = 'tel:' + (get('emergency.phoneRaw') || D.phoneRaw || ''); });

  var gl = $('#google-link');
  if (gl) gl.href = D.googleReviewsUrl || '#';

  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- 3. photos ---------- */
  var P = D.photos || {};
  function setImg(sel, src) { var n = $(sel); if (n && src) n.src = src; }
  setImg('#hero-photo-img', P.heroResult);

  (function avatars() {
    var box = $('#avatars');
    if (!box) return;
    (P.avatars || []).forEach(function (src) {
      if (!src) return;
      var img = document.createElement('img');
      img.src = src; img.alt = ''; img.loading = 'lazy';
      img.width = 54; img.height = 54;
      img.setAttribute('aria-hidden', 'true');
      box.appendChild(img);
    });
    box.appendChild(el('span', 'more', get('hero.patientCount') || '+2k'));
  })();

  /* ---------- 5. lists ---------- */
  // stats strip
  (function () {
    var box = $('#stats');
    if (!box || !D.stats) return;
    D.stats.forEach(function (s) {
      var c = el('div');
      var v = el('div', 'v', '0');
      v.dataset.to = s.value;
      v.dataset.suffix = s.suffix || '';
      v.dataset.decimals = s.decimals || 0;
      c.appendChild(v);
      c.appendChild(el('div', 'l', s.label));
      box.appendChild(c);
    });
  })();

  // why us
  (function () {
    var W = D.whyUs, box = $('#why-grid');
    if (!W || !box) return;
    var t = $('#why-title'); if (t) t.textContent = W.title;
    var x = $('#why-text');  if (x) x.textContent = W.text;
    W.items.forEach(function (item, i) {
      var a = el('article', 'reveal');
      a.style.setProperty('--d', Math.min(i, 3) * 70 + 'ms');
      var ic = el('span', 'why__icon');
      ic.appendChild(icon('i-' + (item.icon || 'check')));
      a.appendChild(ic);
      a.appendChild(el('h3', null, item.title));
      a.appendChild(el('p', null, item.text));
      box.appendChild(a);
    });
  })();

  // services
  (function () {
    var box = $('#services-list');
    if (!box || !D.services) return;
    var note = $('#services-note');
    if (note) note.textContent = D.servicesNote || '';

    D.services.forEach(function (s, i) {
      var row = el('article', 'svc reveal');
      row.style.setProperty('--d', Math.min(i, 4) * 60 + 'ms');
      row.appendChild(el('div', 'svc__n', s.n));

      var h = el('h3');
      if (s.slug) {
        var link = el('a', null, s.title);
        link.href = s.slug;
        h.appendChild(link);
      } else {
        h.textContent = s.title;
      }
      row.appendChild(h);

      var body = el('div', 'svc__body');
      body.appendChild(el('p', null, s.text));
      if (s.slug) {
        var more = el('a', 'svc__link', 'Read more');
        more.href = s.slug;
        more.appendChild(icon('i-arrow'));
        body.appendChild(more);
      }
      row.appendChild(body);

      box.appendChild(row);
    });
  })();

  // repeated CTA bands
  (function () {
    var C = D.cta;
    if (!C) return;
    $$('.cta').forEach(function (band) {
      var body = el('div', 'cta__body');
      body.appendChild(el('h2', null, C.title));
      body.appendChild(el('p', null, C.text));
      band.appendChild(body);

      var btn = el('a', 'btn btn--lime');
      btn.href = waHello; btn.target = '_blank'; btn.rel = 'noopener';
      btn.appendChild(icon('i-wa'));
      btn.appendChild(document.createTextNode(' ' + C.button));
      band.appendChild(btn);
    });
  })();

  // results
  (function () {
    var R = D.results; if (!R) return;
    var t = $('#results-title'); if (t) t.textContent = R.title;
    var x = $('#results-text');  if (x) x.textContent = R.text;
    var cap = $('#ba-caption');  if (cap) cap.textContent = R.caption || '';
    var ul = $('#results-points');
    if (ul && R.points) R.points.forEach(function (p) {
      var li = el('li');
      li.appendChild(icon('i-check'));
      li.appendChild(el('span', null, p));
      ul.appendChild(li);
    });
  })();

  // doctor facts + credentials
  (function () {
    var box = $('#doc-facts'), f = get('clinic.facts');
    if (box && f) f.forEach(function (x) {
      var d = el('div');
      d.appendChild(el('b', null, x.v));
      d.appendChild(el('span', null, x.l));
      box.appendChild(d);
    });
    var ul = $('#creds'), c = get('clinic.credentials');
    if (ul && c) c.forEach(function (x) { ul.appendChild(el('li', null, x)); });
  })();

  // process
  (function () {
    var box = $('#process');
    if (!box || !D.process) return;
    D.process.forEach(function (p, i) {
      var s = el('div', 'step reveal');
      s.style.setProperty('--d', i * 80 + 'ms');
      s.appendChild(el('div', 'step__n', String(i + 1)));
      s.appendChild(el('h3', null, p.title));
      s.appendChild(el('p', null, p.text));
      box.appendChild(s);
    });
  })();

  // reviews
  (function () {
    var box = $('#reviews-grid');
    if (!box || !D.reviews) return;
    D.reviews.forEach(function (r, i) {
      var a = el('article', 'reveal');
      a.style.setProperty('--d', Math.min(i, 3) * 80 + 'ms');
      a.appendChild(el('div', 'stars', '★★★★★'.slice(0, r.stars || 5)));
      a.appendChild(el('p', null, '“' + r.text + '”'));
      var f = el('footer');
      f.appendChild(el('span', 'av', (r.name || '?').charAt(0)));
      var w = el('div', 'who');
      w.appendChild(el('b', null, r.name));
      w.appendChild(el('span', null, r.treatment));
      f.appendChild(w);
      a.appendChild(f);
      box.appendChild(a);
    });
  })();

  // FAQ
  (function () {
    var F = D.faq, box = $('#faq-list');
    if (!F || !box) return;
    var t = $('#faq-title'); if (t) t.textContent = F.title;
    F.items.forEach(function (item, i) {
      var d = document.createElement('details');
      if (i === 0) d.open = true;
      var s = document.createElement('summary');
      s.textContent = item.q;
      d.appendChild(s);
      d.appendChild(el('p', null, item.a));
      box.appendChild(d);
    });
  })();

  // hours
  (function () {
    var ul = $('#hours');
    if (ul && D.hours) D.hours.forEach(function (h) {
      var li = el('li');
      li.appendChild(el('b', null, h.day));
      li.appendChild(el('span', null, h.time));
      ul.appendChild(li);
    });
  })();

  // emergency block
  (function () {
    var box = $('#emergency'), E = D.emergency;
    if (!box || !E) return;
    box.appendChild(el('b', null, 'Emergency line'));
    var a = el('a', null, E.phone);
    a.href = 'tel:' + (E.phoneRaw || '');
    box.appendChild(a);
    box.appendChild(el('p', null, E.note));
  })();

  // socials
  (function () {
    var ul = $('#socials');
    if (ul && D.socials) D.socials.forEach(function (s) {
      var li = el('li'), a = el('a', null, s.label);
      a.href = s.url; a.target = '_blank'; a.rel = 'noopener';
      li.appendChild(a); ul.appendChild(li);
    });
  })();

  // footer services
  (function () {
    var ul = $('#foot-services');
    if (ul && D.services) D.services.slice(0, 5).forEach(function (s) {
      var li = el('li'), a = el('a', null, s.title);
      a.href = s.slug || '#services';
      li.appendChild(a); ul.appendChild(li);
    });
  })();

  // booking select
  (function () {
    var sel = $('#f-service');
    if (sel && D.bookingServices) D.bookingServices.forEach(function (s) {
      var o = el('option', null, s); o.value = s; sel.appendChild(o);
    });
  })();

  /* ---------- 6. before / after slider ---------- */
  (function () {
    var box = $('#ba'), before = $('#ba-before'), after = $('#ba-after'), handle = $('#ba-handle');
    if (!box || !before || !after || !handle) return;
    var R = D.results || {};

    // Case photographs. Without a pair the section has nothing honest to show.
    if (!(R.real && R.beforeImg && R.afterImg)) { box.remove(); return; }
    var b = new Image(); b.src = R.beforeImg; b.alt = 'Before treatment'; b.loading = 'lazy'; before.appendChild(b);
    var a = new Image(); a.src = R.afterImg;  a.alt = 'After treatment';  a.loading = 'lazy'; after.appendChild(a);

    var pct = 50;
    function set(p) {
      pct = Math.max(0, Math.min(100, p));
      after.style.setProperty('--split', pct + '%');
      handle.style.top = pct + '%';
      box.setAttribute('aria-valuenow', Math.round(pct));
    }
    set(50);

    var dragging = false;
    var knob = $('#ba-handle .ba__knob') || handle;

    function from(e) {
      var r = box.getBoundingClientRect();
      set(((e.clientY - r.top) / r.height) * 100);
    }
    function start(e) {
      dragging = true;
      try { box.setPointerCapture(e.pointerId); } catch (err) {}
      from(e);
    }
    function stop() { dragging = false; }

    // The wipe runs up/down, which is also the direction a finger scrolls in —
    // the two can't be told apart mid-gesture. So on touch only the knob starts
    // a drag (it alone carries touch-action:none); anywhere else the page
    // scrolls as normal. Mouse and pen grab anywhere on the box.
    box.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch' && !knob.contains(e.target)) return;
      start(e);
    });
    box.addEventListener('pointermove', function (e) { if (dragging) from(e); });
    box.addEventListener('pointerup', stop);
    box.addEventListener('pointercancel', stop);
    box.addEventListener('lostpointercapture', stop);
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  { set(pct - 4); e.preventDefault(); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { set(pct + 4); e.preventDefault(); }
    });
  })();

  /* ---------- 7. map: load on demand, no ctrl+scroll overlay ---------- */
  (function () {
    var wrap = $('#map-wrap'), frame = $('#map'), veil = $('#map-veil');
    if (!wrap || !frame || !D.mapQuery) return;
    var src = 'https://www.google.com/maps?q=' + encodeURIComponent(D.mapQuery) + '&z=15&output=embed';
    frame.src = src;
    if (veil) veil.addEventListener('click', function () { wrap.classList.add('is-live'); });
  })();

  /* ---------- 8. reveal ---------- */
  (function () {
    var items = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduced) {
      items.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: .1 });
    items.forEach(function (n) { io.observe(n); });
  })();

  /* ---------- 9. count-up ---------- */
  (function () {
    var nums = $$('.strip .v');
    if (!nums.length) return;
    function run(n) {
      var to = parseFloat(n.dataset.to) || 0;
      var dec = parseInt(n.dataset.decimals, 10) || 0;
      var sfx = n.dataset.suffix || '';
      if (reduced) { n.textContent = to.toFixed(dec) + sfx; return; }
      var t0 = performance.now();
      (function f(now) {
        var t = Math.min((now - t0) / 1500, 1);
        n.textContent = (to * (1 - Math.pow(1 - t, 3))).toFixed(dec) + sfx;
        if (t < 1) requestAnimationFrame(f);
      })(t0);
    }
    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: .5 });
    nums.forEach(function (n) { io.observe(n); });
  })();

  /* ---------- 10. booking form -> WhatsApp ---------- */
  (function () {
    var form = $('#booking-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#f-name').value.trim(), phone = $('#f-phone').value.trim();
      if (!name || !phone) {
        var bad = !name ? $('#f-name') : $('#f-phone');
        bad.focus();
        bad.style.borderColor = '#C0472A';
        setTimeout(function () { bad.style.borderColor = ''; }, 2000);
        return;
      }
      var lines = ['Hello! I would like to book an appointment.', '',
        'Name: ' + name, 'Phone: ' + phone, 'Treatment: ' + $('#f-service').value];
      var w = $('#f-when').value.trim();
      if (w) lines.push('Preferred time: ' + w);
      window.open(waBase + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  })();

  /* ---------- 11. mobile nav ---------- */
  (function () {
    var nav = $('.nav'), btn = $('#nav-toggle'), links = $('#nav-links');
    if (!nav || !btn || !links) return;

    function setOpen(on) {
      nav.classList.toggle('is-open', on);
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      btn.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
    }

    btn.addEventListener('click', function () {
      setOpen(btn.getAttribute('aria-expanded') !== 'true');
    });

    // Tapping a link jumps down the page — leaving the panel open behind it
    // would cover the section the visitor just asked for.
    links.addEventListener('click', function (e) {
      if (e.target && e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    // Rotating to landscape can cross the breakpoint while the panel is open;
    // above it the panel is a plain flex row again and must not stay "open".
    window.addEventListener('resize', function () {
      if (window.innerWidth > 940) setOpen(false);
    });
  })();

  /* ---------- 12. LocalBusiness structured data ----------
     Built from data.js so a new client still only edits that one file.
     This is what feeds Google's local pack; without it the site ranks on
     text alone. Deliberately NO aggregateRating: review markup a business
     supplies about itself is self-serving and Google discounts or
     penalises it — real ratings belong on the Google listing.          */
  (function () {
    if (!D.name) return;

    var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var DASH = /\s*[–—-]\s*/;   // en dash, em dash or hyphen

    function dayIndex(s) {
      s = (s || '').trim().toLowerCase();
      if (!s) return -1;
      for (var i = 0; i < 7; i++) {
        if (DAYS[i].toLowerCase().indexOf(s) === 0) return i;
      }
      return -1;
    }

    // "Monday – Thursday" -> four day names; "Friday" -> one
    function daysFrom(label) {
      var parts = String(label).split(DASH);
      var a = dayIndex(parts[0]);
      if (a < 0) return null;
      var b = parts.length > 1 ? dayIndex(parts[1]) : a;
      if (b < 0) b = a;
      var out = [], i = a;
      for (var guard = 0; guard < 8; guard++) {
        out.push(DAYS[i]);
        if (i === b) return out;
        i = (i + 1) % 7;
      }
      return out;
    }

    function to24(t) {
      var m = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i.exec(t || '');
      if (!m) return null;
      var h = parseInt(m[1], 10);
      var ap = m[3].toLowerCase();
      if (ap === 'pm' && h !== 12) h += 12;
      if (ap === 'am' && h === 12) h = 0;
      return (h < 10 ? '0' : '') + h + ':' + (m[2] || '00');
    }

    // Anything that isn't a real time range (e.g. "Closed") is skipped
    // rather than guessed at — better no data than wrong data.
    function hoursSpec() {
      var out = [];
      (D.hours || []).forEach(function (row) {
        var days = daysFrom(row.day);
        if (!days) return;
        var t = String(row.time).split(DASH);
        if (t.length < 2) return;
        var opens = to24(t[0]), closes = to24(t[1]);
        if (!opens || !closes) return;
        out.push({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: days.map(function (d) { return 'https://schema.org/' + d; }),
          opens: opens,
          closes: closes
        });
      });
      return out;
    }

    function meta(prop) {
      var n = document.querySelector('meta[property="' + prop + '"]');
      return n ? n.content : '';
    }
    var canonical = document.querySelector('link[rel="canonical"]');
    var pageUrl = canonical ? canonical.href : location.href;

    // The address already ends with the city; don't repeat it in streetAddress.
    var street = String(D.address || '').replace(new RegExp(',\\s*' + (D.city || '') + '\\s*$', 'i'), '');

    var ld = {
      '@context': 'https://schema.org',
      '@type': 'Dentist',
      name: D.name,
      description: meta('og:description') || (D.hero && D.hero.text) || '',
      url: pageUrl,
      telephone: D.phoneRaw || D.phone || '',
      priceRange: '$$',
      medicalSpecialty: 'Dentistry'
    };

    var img = meta('og:image');
    if (img) ld.image = img;
    if (D.email) ld.email = D.email;
    if (D.city) ld.areaServed = D.city;

    if (D.address) {
      ld.address = {
        '@type': 'PostalAddress',
        streetAddress: street,
        addressLocality: D.city || '',
        addressCountry: D.country || 'PK'
      };
    }

    var hs = hoursSpec();
    if (hs.length) ld.openingHoursSpecification = hs;

    if (D.services && D.services.length) {
      ld.availableService = D.services.map(function (s) {
        return { '@type': 'MedicalProcedure', name: s.title };
      });
    }

    if (D.socials && D.socials.length) {
      ld.sameAs = D.socials.map(function (s) { return s.url; }).filter(Boolean);
    }

    var tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(ld, null, 2);
    document.head.appendChild(tag);
  })();

})();
