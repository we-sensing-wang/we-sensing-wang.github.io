(function () {
  'use strict';

  function resolveSiteAsset(path) {
    var siteRoot = document.documentElement.dataset.siteRoot || '/';
    if (siteRoot === '/') return '/' + path.replace(/^\//, '');
    return siteRoot.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
  }

  function createPortrait(member) {
    var frame = document.createElement('div');
    frame.className = 'team-card__portrait';

    if (member.portrait) {
      var image = document.createElement('img');
      image.src = resolveSiteAsset(member.portrait);
      image.alt = member.portraitAlt;
      image.width = 1500;
      image.height = 1500;
      image.loading = 'lazy';
      frame.appendChild(image);
    } else {
      frame.classList.add('team-card__portrait--placeholder');
      frame.setAttribute('role', 'img');
      frame.setAttribute('aria-label', member.portraitAlt);
      var silhouette = document.createElement('span');
      silhouette.className = 'team-card__silhouette';
      silhouette.setAttribute('aria-hidden', 'true');
      var initials = document.createElement('strong');
      initials.textContent = member.initials;
      initials.setAttribute('aria-hidden', 'true');
      frame.appendChild(silhouette);
      frame.appendChild(initials);
    }

    return frame;
  }

  function createMemberCard(member, group) {
    var article = document.createElement('article');
    article.className = 'team-card team-card--' + group.emphasis;
    article.dataset.memberId = member.id;
    article.appendChild(createPortrait(member));

    var body = document.createElement('div');
    body.className = 'team-card__body';

    var name = document.createElement('h3');
    name.textContent = member.name;
    var role = document.createElement('p');
    role.className = 'team-card__role';
    role.textContent = member.role;
    body.appendChild(name);
    body.appendChild(role);

    if (member.biography) {
      var biography = document.createElement('p');
      biography.className = 'team-card__biography';
      biography.textContent = member.biography;
      body.appendChild(biography);
    }

    article.appendChild(body);
    return article;
  }

  function createGroup(group) {
    var section = document.createElement('section');
    section.className = 'team-group team-group--' + group.emphasis;
    section.id = group.id;

    var heading = document.createElement('div');
    heading.className = 'team-group__heading';
    var label = document.createElement('p');
    label.className = 'team-group__index';
    label.textContent = String(group.order).padStart(2, '0');
    var text = document.createElement('div');
    var title = document.createElement('h2');
    title.textContent = group.title;
    var description = document.createElement('p');
    description.textContent = group.description;
    text.appendChild(title);
    text.appendChild(description);
    heading.appendChild(label);
    heading.appendChild(text);

    var grid = document.createElement('div');
    grid.className = 'team-group__grid';
    group.members.forEach(function (member) {
      grid.appendChild(createMemberCard(member, group));
    });

    section.appendChild(heading);
    section.appendChild(grid);
    return section;
  }

  function renderPreview(target, groups) {
    var founders = groups.find(function (group) { return group.id === 'co-founders'; });
    if (!founders) return;
    var fragment = document.createDocumentFragment();
    founders.members.forEach(function (member) {
      fragment.appendChild(createMemberCard(member, founders));
    });
    target.replaceChildren(fragment);
  }

  function renderFull(target, groups) {
    var fragment = document.createDocumentFragment();
    groups.forEach(function (group, index) {
      group.order = index + 1;
      fragment.appendChild(createGroup(group));
    });
    target.replaceChildren(fragment);
  }

  function renderTeams() {
    if (!window.WESensingTeam || !Array.isArray(window.WESensingTeam.groups)) return;
    document.querySelectorAll('[data-team-view]').forEach(function (target) {
      if (target.dataset.teamView === 'preview') renderPreview(target, window.WESensingTeam.groups);
      if (target.dataset.teamView === 'full') renderFull(target, window.WESensingTeam.groups);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderTeams);
  else renderTeams();
})();
