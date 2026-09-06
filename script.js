  // Scroll progress bar
  var progressBar = document.getElementById('progressBar');
  function updateProgress(){
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Scrollspy: highlight active nav link as sections pass
  var sections = ['about','skills','projects','education','contact'].map(function(id){
    return document.getElementById(id);
  });
  var navLinks = document.querySelectorAll('.navlinks a');
  function updateActiveNav(){
    var pos = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function(sec){
      if(sec && sec.offsetTop <= pos) current = sec;
    });
    navLinks.forEach(function(link){
      link.classList.toggle('active', current && link.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Scroll-triggered reveal, staggered within each group
  var revealGroups = [
    document.querySelectorAll('.sec-head'),
    document.querySelectorAll('.skill-row'),
    document.querySelectorAll('[data-project]'),
    document.querySelectorAll('.edu-row'),
    document.querySelectorAll('.ach-item'),
    document.querySelectorAll('.about-facts .fact'),
    document.querySelectorAll('.contact-inner')
  ];
  revealGroups.forEach(function(group){
    group.forEach(function(el, idx){
      el.classList.add('reveal');
      el.style.transitionDelay = (idx * 70) + 'ms';
    });
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealGroups.forEach(function(group){
    group.forEach(function(el){ io.observe(el); });
  });

  // Tilt + spotlight effect on the terminal card
  var term = document.querySelector('.term');
  if(term){
    term.addEventListener('mousemove', function(e){
      var rect = term.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      term.style.transform = 'perspective(900px) rotateX(' + (y * -6) + 'deg) rotateY(' + (x * 8) + 'deg)';
    });
    term.addEventListener('mouseleave', function(){
      term.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // Magnetic pull on primary buttons
  document.querySelectorAll('.btn, .project-toggle').forEach(function(btn){
    btn.addEventListener('mousemove', function(e){
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.18) + 'px,' + (y * 0.35) + 'px)';
    });
    btn.addEventListener('mouseleave', function(){
      btn.style.transform = 'translate(0,0)';
    });
  });

  // Accordion for project details
  document.querySelectorAll('[data-project]').forEach(function(proj){
    var head = proj.querySelector('.project-head');
    var toggle = proj.querySelector('.project-toggle');
    head.addEventListener('click', function(){
      var isOpen = proj.classList.contains('open');
      document.querySelectorAll('[data-project]').forEach(function(p){
        p.classList.remove('open');
        p.querySelector('.project-toggle').textContent = 'Details';
      });
      if(!isOpen){
        proj.classList.add('open');
        toggle.textContent = 'Close';
      }
    });
  });

  // One orchestrated hero moment: type out a JS-object introduction
  var lines = [
    { k: 'name', v: '"Kondapaka Venkataramana"' },
    { k: 'role', v: '"Frontend Developer / Intern"' },
    { k: 'stack', v: '["React", "Next.js", "Tailwind", "Supabase"]' },
    { k: 'location', v: '"Hyderabad, IN"' },
    { k: 'status', v: '"open_to_work"' }
  ];
  var body = document.getElementById('termBody');
  var html = 'const developer = {<br>';
  var i = 0, j = 0, out = '';

  function typeNext(){
    if(i >= lines.length){
      out += '}<span class="cursor"></span>';
      body.innerHTML = html + out;
      return;
    }
    var line = lines[i];
    var full = '&nbsp;&nbsp;<span class="k">' + line.k + '</span>: <span class="s">' + line.v + '</span>' + (i < lines.length - 1 ? ',' : '') + '<br>';
    var plain = line.k + ': ' + line.v + (i < lines.length - 1 ? ',' : '');
    if(j <= plain.length){
      var partial = plain.slice(0, j);
      body.innerHTML = html + out + '&nbsp;&nbsp;' + partial.replace(line.k, '<span class="k">'+line.k+'</span>').replace(line.v, '<span class="s">'+line.v+'</span>') + '<span class="cursor"></span>';
      j += 2;
      setTimeout(typeNext, 18);
    } else {
      out += full;
      i++; j = 0;
      setTimeout(typeNext, 120);
    }
  }
  typeNext();
