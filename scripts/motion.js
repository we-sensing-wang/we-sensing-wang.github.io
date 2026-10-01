/* WE-Sensing motion system
 * Scroll-linked scenes, the live hero interface, the monitoring story,
 * carousels, and pointer spotlights. Every effect degrades to a static,
 * fully readable layout when JavaScript is unavailable or when the visitor
 * prefers reduced motion.
 */
(function () {
  'use strict';

  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var desktopQuery = window.matchMedia('(min-width: 834px)');
  var reduceMotion = reduceQuery.matches;

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function smoothstep(edge0, edge1, value) {
    var x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return x * x * (3 - 2 * x);
  }
  function onMediaChange(query, handler) {
    if (query.addEventListener) query.addEventListener('change', handler);
    else if (query.addListener) query.addListener(handler);
  }

  /* ------------------------------------------------------------------
   * Scroll scene engine: one rAF-throttled pass over visible scenes.
   * ------------------------------------------------------------------ */
  var scenes = [];
  var ticking = false;
  var sceneObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var scene = entry.target.__scene;
          if (scene) scene.visible = entry.isIntersecting;
        });
        requestTick();
      }, { rootMargin: '30% 0px 30% 0px' })
    : null;

  function registerScene(element, update) {
    var scene = { element: element, update: update, visible: !sceneObserver };
    element.__scene = scene;
    scenes.push(scene);
    if (sceneObserver) sceneObserver.observe(element);
    return scene;
  }

  function requestTick() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(runScenes);
  }

  function runScenes() {
    ticking = false;
    var viewport = window.innerHeight;
    // Read every rectangle before writing any style to avoid layout thrashing.
    var active = [], rects = [];
    for (var i = 0; i < scenes.length; i++) {
      if (!scenes[i].visible) continue;
      active.push(scenes[i]);
      rects.push(scenes[i].element.getBoundingClientRect());
    }
    for (var j = 0; j < active.length; j++) active[j].update(rects[j], viewport);
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);

  /* Hero copy recedes as the page scrolls. */
  function initHeroScene() {
    if (reduceMotion) return;
    document.querySelectorAll('[data-scene="hero"]').forEach(function (hero) {
      registerScene(hero, function (rect) {
        var progress = clamp(-rect.top / (rect.height * 0.72), 0, 1);
        hero.style.setProperty('--p', progress.toFixed(4));
      });
    });
  }

  /* Statement text: words light up as the paragraph crosses the viewport. */
  function initWordScenes() {
    document.querySelectorAll('[data-words]').forEach(function (block) {
      if (reduceMotion) return;
      var words = [];
      Array.from(block.childNodes).forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
          var fragment = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { fragment.appendChild(document.createTextNode(part)); return; }
            var span = document.createElement('span');
            span.className = 'word';
            span.textContent = part;
            fragment.appendChild(span);
            words.push(span);
          });
          block.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.classList.add('word');
          words.push(node);
        }
      });
      registerScene(block, function (rect, viewport) {
        var progress = clamp((viewport * 0.9 - rect.top) / (viewport * 0.6), 0, 1);
        var count = words.length;
        for (var i = 0; i < count; i++) {
          var amount = clamp(progress * (count + 1.2) - i, 0, 1);
          words[i].style.opacity = (0.16 + amount * 0.84).toFixed(3);
        }
      });
    });
  }

  /* Exploded technology stack. */
  function initStackScenes() {
    document.querySelectorAll('[data-stack-scene]').forEach(function (scene) {
      var layers = Array.from(scene.querySelectorAll('.stack-layer[data-layer]'));
      var articles = Array.from(scene.querySelectorAll('.stack-copy [data-layer]'));
      var visual = scene.querySelector('.stack-visual');
      var current = -1;

      function setActive(index) {
        if (index === current) return;
        current = index;
        scene.dataset.active = String(index);
        scene.classList.toggle('has-active', index > 0);
        layers.forEach(function (layer) { layer.classList.toggle('is-active', Number(layer.dataset.layer) === index); });
        articles.forEach(function (article) { article.classList.toggle('is-active', Number(article.dataset.layer) === index); });
      }

      registerScene(scene, function (rect, viewport) {
        if (desktopQuery.matches) {
          var progress = clamp(-rect.top / Math.max(1, rect.height - viewport), 0, 1);
          var explode = reduceMotion ? 1 : smoothstep(0, 0.26, progress);
          scene.style.setProperty('--e', explode.toFixed(4));
          setActive(progress < 0.24 ? 0 : Math.min(4, 1 + Math.floor((progress - 0.24) / 0.76 * 4)));
        } else {
          var box = visual.getBoundingClientRect();
          var mobileProgress = clamp((viewport * 0.92 - box.top) / (viewport * 0.62), 0, 1);
          scene.style.setProperty('--e', (reduceMotion ? 1 : smoothstep(0, 1, mobileProgress)).toFixed(4));
          setActive(0);
        }
      });
    });
  }

  /* Rounded media that grows to full bleed as it scrolls into place. */
  function initExpandScenes() {
    document.querySelectorAll('[data-expand]').forEach(function (element) {
      if (reduceMotion) { element.style.setProperty('--x', '1'); return; }
      registerScene(element, function (rect, viewport) {
        var progress = clamp((viewport - rect.top) / (viewport * 0.85), 0, 1);
        element.style.setProperty('--x', smoothstep(0, 1, progress).toFixed(4));
      });
    });
  }

  /* Gentle depth for floating product renders. */
  function initParallax() {
    if (reduceMotion) return;
    document.querySelectorAll('[data-parallax]').forEach(function (element) {
      var speed = parseFloat(element.dataset.parallax) || 0;
      registerScene(element, function (rect, viewport) {
        var offset = (rect.top + rect.height / 2 - viewport / 2) * speed;
        element.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
    });
  }

  /* Photography settles from a slight zoom. */
  function initZoom() {
    if (reduceMotion) return;
    document.querySelectorAll('[data-zoom]').forEach(function (element) {
      registerScene(element, function (rect, viewport) {
        var progress = clamp((viewport - rect.top) / (viewport * 0.9 + rect.height * 0.3), 0, 1);
        element.style.setProperty('--z', progress.toFixed(4));
      });
    });
  }

  /* ------------------------------------------------------------------
   * Monitoring story: sticky visual with three states.
   * ------------------------------------------------------------------ */
  function initStories() {
    document.querySelectorAll('[data-story]').forEach(function (story) {
      var steps = Array.from(story.querySelectorAll('[data-step]'));
      var media = story.querySelector('.monitor');
      var active = -1;
      var timer = null;
      var mediaVisible = false;

      function setActive(index) {
        if (index === active) return;
        active = index;
        story.dataset.active = String(index);
        steps.forEach(function (step, i) { step.classList.toggle('is-active', i === index); });
      }
      setActive(0);

      if (!('IntersectionObserver' in window)) return;

      var stepObserver = new IntersectionObserver(function (entries) {
        if (!desktopQuery.matches) return;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.step));
        });
      }, { rootMargin: '-46% 0px -46% 0px' });
      steps.forEach(function (step) { stepObserver.observe(step); });

      // Narrow screens: the visual is not sticky, so it plays its three states once in view.
      function playOnce() {
        window.clearTimeout(timer);
        if (desktopQuery.matches || !mediaVisible) return;
        if (reduceMotion) { setActive(steps.length - 1); return; }
        setActive(0);
        var next = 1;
        (function advance() {
          timer = window.setTimeout(function () {
            setActive(next);
            next += 1;
            if (next < steps.length) advance();
          }, 2600);
        })();
      }

      new IntersectionObserver(function (entries) {
        var wasVisible = mediaVisible;
        mediaVisible = entries[0].isIntersecting;
        if (mediaVisible && !wasVisible) playOnce();
      }, { threshold: 0.45 }).observe(media);

      onMediaChange(desktopQuery, function () {
        window.clearTimeout(timer);
        if (!desktopQuery.matches) playOnce();
      });
    });
  }

  /* ------------------------------------------------------------------
   * Hero: fluid flowing over an interdigitated electrode interface.
   * Particles brighten near the sensing surface and around the pointer;
   * contacts send pulses down the electrode fingers and into the HUD trace.
   * ------------------------------------------------------------------ */
  function initHeroCanvas() {
    var canvas = document.querySelector('[data-hero-canvas]');
    if (!canvas || !canvas.getContext) return;
    var hero = canvas.closest('.hero');
    var ctx = canvas.getContext('2d');
    var spark = hero.querySelector('.hud-spark');
    var sparkCtx = spark ? spark.getContext('2d') : null;

    var TRAIL = 14;
    var W = 0, H = 0, dpr = 1, surfaceY = 0, electrodeY = 0, time = 0;
    var particles = [];
    var fingers = [];
    var pulses = [];
    var plane = null, planeTop = 0;
    var pointer = { x: -9999, y: -9999 };
    var running = false, frameId = 0, lastTime = 0, inView = true;
    var activity = new Float32Array(56), activityHead = 0, contacts = 0, sparkTick = 0;

    var palette = [
      { tail: 'rgba(58,132,214,0.10)', head: 'rgba(72,156,232,0.34)', width: 1.1 },
      { tail: 'rgba(44,186,206,0.14)', head: 'rgba(64,204,226,0.52)', width: 1.15 },
      { tail: 'rgba(64,226,214,0.20)', head: 'rgba(110,242,228,0.78)', width: 1.4 },
      { tail: 'rgba(150,255,242,0.26)', head: 'rgba(224,255,251,0.96)', width: 1.6 }
    ];

    function readGeometry() {
      var styles = window.getComputedStyle(hero);
      var surface = parseFloat(styles.getPropertyValue('--surface')) / 100 || 0.63;
      var electrode = parseFloat(styles.getPropertyValue('--electrode')) / 100 || 0.86;
      surfaceY = H * surface;
      electrodeY = H * electrode;
    }

    function surfaceAt(x) {
      return surfaceY + Math.sin(x * 0.0062 + time * 1.1) * 7 + Math.sin(x * 0.0141 - time * 1.7) * 3.5;
    }

    function spawn(particle, x) {
      particle.x = x;
      particle.y = surfaceY + 8 + Math.random() * Math.max(10, electrodeY - surfaceY - 14);
      particle.len = 0;
      particle.glow = 0;
      particle.seed = Math.random() * 6.283;
      return particle;
    }

    function seed() {
      var area = W * Math.max(0, electrodeY - surfaceY);
      var cap = W < 700 ? 380 : 1050;
      var count = Math.round(clamp(area / 240, 140, cap));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push(spawn({ hist: new Float32Array(TRAIL * 2) }, Math.random() * W));
      }
    }

    function buildPlane() {
      var top = electrodeY;
      var bottom = H + 2;
      planeTop = Math.floor(top - 4);
      var height = Math.max(1, Math.ceil(bottom - planeTop));
      plane = document.createElement('canvas');
      plane.width = Math.max(1, Math.round(W * dpr));
      plane.height = Math.max(1, Math.round(height * dpr));
      var p = plane.getContext('2d');
      p.setTransform(dpr, 0, 0, dpr, 0, -planeTop * dpr);

      var xt0 = W * 0.15, xt1 = W * 0.85, xb0 = -W * 0.08, xb1 = W * 1.08;
      var fill = p.createLinearGradient(0, top, 0, bottom);
      fill.addColorStop(0, 'rgba(20,58,74,0.96)');
      fill.addColorStop(0.35, 'rgba(8,24,32,0.98)');
      fill.addColorStop(1, 'rgba(2,6,9,1)');
      p.beginPath();
      p.moveTo(xt0, top); p.lineTo(xt1, top); p.lineTo(xb1, bottom); p.lineTo(xb0, bottom);
      p.closePath();
      p.fillStyle = fill;
      p.fill();

      function at(f, depth) {
        var xt = xt0 + (xt1 - xt0) * f;
        var xb = xb0 + (xb1 - xb0) * f;
        return { x: xt + (xb - xt) * depth, y: top + (bottom - top) * depth };
      }

      fingers = [];
      var count = W < 700 ? 18 : 30;
      for (var i = 0; i < count; i++) {
        var f = (i + 0.5) / count;
        var fromTop = i % 2 === 0;
        var d0 = fromTop ? 0.07 : 0.16;
        var d1 = fromTop ? 0.84 : 0.93;
        var a = at(f, d0), b = at(f, d1);
        var widthTop = 0.8 + 0.6 * d0, widthBottom = 1.2 + 2.4 * d1;
        var grad = p.createLinearGradient(0, a.y, 0, b.y);
        var colour = fromTop ? '77,141,255' : '47,211,194';
        grad.addColorStop(0, 'rgba(' + colour + ',0.75)');
        grad.addColorStop(1, 'rgba(' + colour + ',0.16)');
        p.beginPath();
        p.moveTo(a.x - widthTop, a.y); p.lineTo(a.x + widthTop, a.y);
        p.lineTo(b.x + widthBottom, b.y); p.lineTo(b.x - widthBottom, b.y);
        p.closePath();
        p.fillStyle = grad;
        p.fill();
        fingers.push({ f: f, fromTop: fromTop, cooldown: 0 });
      }

      // Bus bars
      [[0.07, '77,141,255', 0.7], [0.93, '47,211,194', 0.35]].forEach(function (bus) {
        var start = at(0.5 / count, bus[0]), end = at(1 - 0.5 / count, bus[0]);
        p.beginPath(); p.moveTo(start.x, start.y); p.lineTo(end.x, end.y);
        p.strokeStyle = 'rgba(' + bus[1] + ',' + bus[2] + ')';
        p.lineWidth = 1 + bus[0] * 2.4;
        p.stroke();
      });

      // Leading edge of the sensing surface
      var edge = p.createLinearGradient(xt0, 0, xt1, 0);
      edge.addColorStop(0, 'rgba(95,240,224,0)');
      edge.addColorStop(0.5, 'rgba(95,240,224,0.95)');
      edge.addColorStop(1, 'rgba(95,240,224,0)');
      p.beginPath(); p.moveTo(xt0, top); p.lineTo(xt1, top);
      p.strokeStyle = edge; p.lineWidth = 1.4; p.stroke();
      p.globalAlpha = 0.18; p.lineWidth = 7; p.stroke(); p.globalAlpha = 1;

      plane.__map = { xt0: xt0, xt1: xt1, xb0: xb0, xb1: xb1, top: top, bottom: bottom, at: at };
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      if (!W || !H) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (spark) {
        spark.width = Math.round(96 * dpr);
        spark.height = Math.round(22 * dpr);
        sparkCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      readGeometry();
      buildPlane();
      seed();
    }

    function pushHistory(p) {
      var h = p.hist;
      if (p.len < TRAIL) {
        h[p.len * 2] = p.x; h[p.len * 2 + 1] = p.y; p.len += 1;
      } else {
        h.copyWithin(0, 2);
        h[TRAIL * 2 - 2] = p.x; h[TRAIL * 2 - 1] = p.y;
      }
    }

    function nearestFinger(x) {
      var map = plane.__map;
      var f = clamp((x - map.xt0) / (map.xt1 - map.xt0), 0, 0.9999);
      return fingers[Math.floor(f * fingers.length)];
    }

    function step(dt) {
      time += dt / 60;
      var span = Math.max(1, electrodeY - surfaceY);
      var radius = W < 700 ? 110 : 160;
      var radius2 = radius * radius;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var s = clamp((p.y - surfaceY) / span, 0, 1);
        var speed = 0.32 + 1.45 * 4 * s * (1 - s);
        var angle = 0.38 * Math.sin(p.x * 0.0042 + time * 0.55 + p.seed)
          + 0.32 * Math.sin(p.y * 0.019 - time * 0.8)
          + 0.22 * Math.sin((p.x + p.y) * 0.0065 + time * 0.35);
        var vx = Math.cos(angle) * speed;
        var vy = Math.sin(angle) * speed * 0.55;
        var target = smoothstep(0.72, 1, s) * 0.95;

        var dx = p.x - pointer.x, dy = p.y - pointer.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < radius2) {
          var d = Math.sqrt(d2) || 1;
          var force = 1 - d / radius;
          vx += (-dy / d) * force * 2.4 + (dx / d) * force * 0.7;
          vy += (dx / d) * force * 2.4 + (dy / d) * force * 0.7;
          target = Math.max(target, force * 1.25);
        }

        var top = surfaceAt(p.x) + 5;
        if (p.y < top) vy += (top - p.y) * 0.12;
        if (p.y > electrodeY - 3) vy -= (p.y - electrodeY + 3) * 0.2;

        p.x += vx * dt;
        p.y = clamp(p.y + vy * dt, surfaceY - 12, electrodeY - 1.5);
        p.glow += (target - p.glow) * 0.08 * dt;

        if (s > 0.93 && Math.random() < 0.028 * dt) {
          var finger = nearestFinger(p.x);
          if (finger && finger.cooldown <= 0 && pulses.length < 46) {
            pulses.push({ finger: finger, life: 0 });
            finger.cooldown = 22;
            contacts += 1;
          }
        }

        if (p.x > W + 24) spawn(p, -20);
        else if (p.x < -48) spawn(p, W + 12);
        pushHistory(p);
      }

      for (var f = 0; f < fingers.length; f++) fingers[f].cooldown -= dt;
      for (var k = pulses.length - 1; k >= 0; k--) {
        pulses[k].life += dt / 46;
        if (pulses[k].life >= 1) pulses.splice(k, 1);
      }

      sparkTick += dt;
      if (sparkTick >= 4) {
        sparkTick = 0;
        activity[activityHead] = clamp(contacts / 3.2, 0, 1);
        activityHead = (activityHead + 1) % activity.length;
        contacts = 0;
      }
    }

    function drawFluid() {
      var body = ctx.createLinearGradient(0, surfaceY - 12, 0, electrodeY);
      body.addColorStop(0, 'rgba(47,211,194,0.11)');
      body.addColorStop(0.45, 'rgba(26,130,196,0.08)');
      body.addColorStop(1, 'rgba(50,119,245,0.16)');
      ctx.beginPath();
      ctx.moveTo(0, surfaceAt(0));
      for (var x = 16; x <= W + 16; x += 16) ctx.lineTo(x, surfaceAt(x));
      ctx.lineTo(W, electrodeY);
      ctx.lineTo(0, electrodeY);
      ctx.closePath();
      ctx.fillStyle = body;
      ctx.fill();
    }

    function drawSurface() {
      ctx.beginPath();
      ctx.moveTo(0, surfaceAt(0));
      for (var x = 12; x <= W + 12; x += 12) ctx.lineTo(x, surfaceAt(x));
      var edge = ctx.createLinearGradient(0, 0, W, 0);
      edge.addColorStop(0, 'rgba(95,240,224,0.15)');
      edge.addColorStop(0.5, 'rgba(95,240,224,0.9)');
      edge.addColorStop(1, 'rgba(95,240,224,0.15)');
      ctx.strokeStyle = edge;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 9;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function drawParticles() {
      var tails = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      var heads = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      var mid = Math.floor(TRAIL / 2);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (p.len < 2) continue;
        var bucket = p.glow < 0.2 ? 0 : p.glow < 0.45 ? 1 : p.glow < 0.72 ? 2 : 3;
        var h = p.hist;
        var split = Math.min(mid, p.len - 1);
        var tail = tails[bucket], head = heads[bucket];
        tail.moveTo(h[0], h[1]);
        for (var j = 1; j <= split; j++) tail.lineTo(h[j * 2], h[j * 2 + 1]);
        head.moveTo(h[split * 2], h[split * 2 + 1]);
        for (var k = split + 1; k < p.len; k++) head.lineTo(h[k * 2], h[k * 2 + 1]);
      }
      ctx.lineCap = 'round';
      for (var b = 0; b < 4; b++) {
        ctx.lineWidth = palette[b].width;
        ctx.strokeStyle = palette[b].tail; ctx.stroke(tails[b]);
        ctx.strokeStyle = palette[b].head; ctx.stroke(heads[b]);
      }
    }

    function drawPulses() {
      if (!pulses.length) return;
      var map = plane.__map;
      ctx.lineCap = 'round';
      for (var i = 0; i < pulses.length; i++) {
        var pulse = pulses[i];
        var depth = 0.02 + pulse.life * 0.86;
        var a = map.at(pulse.finger.f, Math.max(0, depth - 0.12));
        var b = map.at(pulse.finger.f, depth);
        var alpha = Math.sin(pulse.life * Math.PI);
        var grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, 'rgba(95,240,224,0)');
        grad.addColorStop(1, 'rgba(210,255,250,' + (0.9 * alpha).toFixed(3) + ')');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6 + depth * 2.6;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }

    function drawSpark() {
      if (!sparkCtx) return;
      sparkCtx.clearRect(0, 0, 96, 22);
      sparkCtx.beginPath();
      var n = activity.length;
      for (var i = 0; i < n; i++) {
        var value = activity[(activityHead + i) % n];
        var wobble = Math.sin(time * 6 + i * 0.7) * 0.05;
        var x = (i / (n - 1)) * 96;
        var y = 19 - clamp(value * 0.82 + 0.1 + wobble, 0, 1) * 16;
        if (i === 0) sparkCtx.moveTo(x, y); else sparkCtx.lineTo(x, y);
      }
      sparkCtx.strokeStyle = 'rgba(95,240,224,0.95)';
      sparkCtx.lineWidth = 1.3;
      sparkCtx.lineJoin = 'round';
      sparkCtx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      drawFluid();
      if (plane && plane.width > 1) ctx.drawImage(plane, 0, planeTop, W, plane.height / dpr);
      ctx.globalCompositeOperation = 'lighter';
      drawParticles();
      drawPulses();
      ctx.globalCompositeOperation = 'source-over';
      drawSurface();
      drawSpark();
    }

    function frame(now) {
      if (!running) return;
      var dt = lastTime ? clamp((now - lastTime) / 16.667, 0.2, 3) : 1;
      lastTime = now;
      if (W && H) {
        step(dt);
        draw();
      }
      frameId = window.requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduceMotion || !inView || document.hidden) return;
      running = true;
      lastTime = 0;
      frameId = window.requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      window.cancelAnimationFrame(frameId);
    }

    function renderStill() {
      for (var i = 0; i < 110; i++) step(1);
      draw();
    }

    function rebuild() {
      resize();
      if (reduceMotion && W && H) renderStill();
    }

    // Size from the canvas itself: covers late layout, zoom, rotation and window resizes,
    // while ignoring mobile toolbar collapses (the hero uses svh, so its box stays put).
    var resizeTimer = 0;
    function scheduleRebuild() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        var rect = canvas.getBoundingClientRect();
        if (Math.abs(rect.width - W) < 1 && Math.abs(rect.height - H) < 1) return;
        rebuild();
      }, W ? 160 : 0);
    }
    if ('ResizeObserver' in window) new ResizeObserver(scheduleRebuild).observe(canvas);
    else window.addEventListener('resize', scheduleRebuild);
    rebuild();

    if (!reduceMotion) {
      hero.addEventListener('pointermove', function (event) {
        var rect = canvas.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
      }, { passive: true });
      hero.addEventListener('pointerleave', function () { pointer.x = -9999; pointer.y = -9999; });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
          if (inView) start(); else stop();
        }).observe(hero);
      }
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
      });
      start();
    }
  }

  /* ------------------------------------------------------------------
   * Carousel (EVA product views)
   * ------------------------------------------------------------------ */
  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function (root) {
      var viewport = root.querySelector('[data-carousel-viewport]');
      var items = Array.from(root.querySelectorAll('[data-carousel-item]'));
      var prev = root.querySelector('[data-carousel-prev]');
      var next = root.querySelector('[data-carousel-next]');
      var dotsWrap = root.querySelector('[data-carousel-dots]');
      if (!viewport || !items.length) return;
      var index = 0;
      var dots = items.map(function (item, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        var title = item.querySelector('h3');
        dot.setAttribute('aria-label', 'Show ' + (title ? title.textContent : 'item ' + (i + 1)));
        dot.addEventListener('click', function () { go(i); });
        if (dotsWrap) dotsWrap.appendChild(dot);
        return dot;
      });

      // Remember where a smooth scroll is heading so quick repeated clicks keep advancing.
      var pending = { index: 0, time: 0 };
      function paddingStart() { return parseFloat(window.getComputedStyle(viewport).scrollPaddingLeft) || 0; }
      function base() { return window.performance.now() - pending.time < 650 ? pending.index : index; }
      function go(i) {
        var target = clamp(i, 0, items.length - 1);
        pending = { index: target, time: window.performance.now() };
        viewport.scrollTo({ left: items[target].offsetLeft - paddingStart(), behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      function sync() {
        var left = viewport.scrollLeft + paddingStart();
        var best = 0, bestDistance = Infinity;
        items.forEach(function (item, i) {
          var distance = Math.abs(item.offsetLeft - left);
          if (distance < bestDistance) { bestDistance = distance; best = i; }
        });
        var atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 4;
        if (atEnd) best = items.length - 1;
        index = best;
        dots.forEach(function (dot, i) {
          if (i === index) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
        });
        items.forEach(function (item, i) { item.classList.toggle('is-current', i === index); });
        if (prev) prev.disabled = viewport.scrollLeft <= 4;
        if (next) next.disabled = atEnd;
      }

      var syncQueued = false;
      viewport.addEventListener('scroll', function () {
        if (syncQueued) return;
        syncQueued = true;
        window.requestAnimationFrame(function () { syncQueued = false; sync(); });
      }, { passive: true });
      if (prev) prev.addEventListener('click', function () { go(base() - 1); });
      if (next) next.addEventListener('click', function () { go(base() + 1); });
      viewport.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') { event.preventDefault(); go(base() + 1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); go(base() - 1); }
      });
      window.addEventListener('resize', sync);
      sync();
    });
  }

  /* Pointer-following light on tiles. */
  function initSpotlights() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    document.querySelectorAll('[data-spotlight]').forEach(function (tile) {
      tile.addEventListener('pointermove', function (event) {
        var rect = tile.getBoundingClientRect();
        tile.style.setProperty('--mx', (event.clientX - rect.left).toFixed(0) + 'px');
        tile.style.setProperty('--my', (event.clientY - rect.top).toFixed(0) + 'px');
      }, { passive: true });
    });
  }

  function init() {
    initHeroScene();
    initWordScenes();
    initStackScenes();
    initExpandScenes();
    initParallax();
    initZoom();
    initStories();
    initHeroCanvas();
    initCarousels();
    initSpotlights();
    requestTick();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
