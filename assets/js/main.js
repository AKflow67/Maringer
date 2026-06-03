    // Nav sticky
    var nav = document.getElementById('nav');
    function updateNav() {
      nav.classList.toggle('stuck', window.scrollY > 60);
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // Active les animations JS (fallback : tout reste visible)
    document.body.classList.add('js-ready');

    // ── REVEAL ON SCROLL ──
    var reveals = document.querySelectorAll('.r');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function(el) { io.observe(el); });
    } else {
      reveals.forEach(function(el) { el.classList.add('on'); });
    }

    // ── BARRE DE PROGRESSION SCROLL ──
    var progressBar = document.createElement('div');
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#7a1728,#c8a882);z-index:9999;width:0%;transition:width .1s linear;pointer-events:none;';
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', function() {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (window.scrollY / total * 100) + '%';
    }, { passive: true });

    // ── COMPTEUR ANIMÉ (badge 15+ ans) ──
    var badge = document.querySelector('.badge-num');
    if (badge && 'IntersectionObserver' in window) {
      var badgeIo = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          var n = 0;
          var timer = setInterval(function() {
            n++; badge.textContent = n + '+';
            if (n >= 15) clearInterval(timer);
          }, 80);
          badgeIo.disconnect();
        }
      }, { threshold: 0.5 });
      badgeIo.observe(badge);
    }

    // ── SECTION-LABELS : apparition lettre par lettre ──
    if ('IntersectionObserver' in window) {
      var labels = document.querySelectorAll('.section-label');
      var lIo = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            var el = e.target, txt = el.textContent;
            el.textContent = ''; el.style.opacity = '1';
            var i = 0;
            var t = setInterval(function() {
              el.textContent += txt[i++];
              if (i >= txt.length) clearInterval(t);
            }, 38);
            lIo.unobserve(el);
          }
        });
      }, { threshold: 0.9 });
      labels.forEach(function(l) { l.style.opacity = '0'; lIo.observe(l); });
    }

    // ── LINE DRAW SUR LES TITRES ──
    var headings = document.querySelectorAll('.h2, .h3, .forge-title');
    headings.forEach(function(h) { h.classList.add('line-target'); });
    if ('IntersectionObserver' in window) {
      var hIo = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { e.target.classList.add('line-drawn'); hIo.unobserve(e.target); }
        });
      }, { threshold: 0.3 });
      headings.forEach(function(h) { hIo.observe(h); });
    }

    // ── METIERS : dimming des autres au hover ──
    var metiers = document.querySelectorAll('.metier');
    metiers.forEach(function(m) {
      m.addEventListener('mouseenter', function() {
        metiers.forEach(function(o) { if (o !== m) o.style.opacity = '.4'; });
      });
      m.addEventListener('mouseleave', function() {
        metiers.forEach(function(o) { o.style.opacity = '1'; });
      });
    });

    // ── TILT PHOTO FORGE ──
    var fSection = document.querySelector('.forge-section');
    var fImg = document.querySelector('.forge-photo-inner img');
    if (fSection && fImg) {
      fSection.addEventListener('mousemove', function(e) {
        var r = fSection.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        fImg.style.transform = 'scale(1.05) rotate(' + (x*1.5) + 'deg) translateY(' + (y*-6) + 'px)';
      });
      fSection.addEventListener('mouseleave', function() { fImg.style.transform = ''; });
    }

    // ── PARALLAXE SPLITS ──
    var splitImgs = document.querySelectorAll('.split-img img');
    function parallaxSplits() {
      splitImgs.forEach(function(img) {
        var rect = img.closest('.split-img').getBoundingClientRect();
        var center = rect.top + rect.height / 2 - window.innerHeight / 2;
        img.style.transform = 'translateY(' + (center * 0.08) + 'px)';
      });
    }
    window.addEventListener('scroll', parallaxSplits, { passive: true });
    parallaxSplits();

    // ── PARALLAXE HERO ──
    var heroBg = document.querySelector('.hero-bg img');
    function heroParallax() {
      if (heroBg) heroBg.style.transform = 'translateY(' + (window.scrollY * 0.28) + 'px) scale(1.12)';
    }
    window.addEventListener('scroll', heroParallax, { passive: true });
    heroParallax();

    // ── BOUTON RETOUR EN HAUT ──
    var scrollBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', function() {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── EMAIL ANTI-OBFUSCATION ──
    (function(){
      var u='contact', d='metalleriemaringer.com', addr=u+'@'+d;
      var el = document.getElementById('cmail');
      if(el && !el.querySelector('a')){
        var a = document.createElement('a');
        a.href = 'mailto:'+addr; a.textContent = addr;
        a.style.cssText = 'text-decoration:underline;text-underline-offset:3px;';
        el.appendChild(a);
      }
      var fe = document.getElementById('footer-email');
      if(fe){ fe.href = 'mailto:'+addr; fe.textContent = addr; }
    })();

// ── FERMETURE MODALES LÉGALES (touche Échap) ──
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') {
    document.querySelectorAll('.legal-modal').forEach(function(m){ m.style.display = 'none'; });
  }
});
