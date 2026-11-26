/* THROWAWAY: A refined three columns; B focused journal; C editorial top navigation.
 * Same real routes/data. Prototype controls are injected only by the local server.
 * No storage, no production entry points. Verdict pending user comparison.
 */
(() => {
  const variants = {
    D: ['参考图方案', '顶部导航 · 插画欢迎区 · 近期文章列表'],
    A: ['精简三栏', '左侧导航 · 文章卡片 · 专题辅助栏'],
    B: ['专注双栏', '左侧导航 · 开放式文章列表'],
    C: ['编辑式首页', '顶部导航 · 最新文章优先 · 宽幅排版'],
    original: ['当前版', '现有博客的原始布局，对照用']
  };
  const params = new URLSearchParams(location.search);
  const variant = Object.hasOwn(variants, params.get('variant')) ? params.get('variant') : 'D';
  const articleCount = params.get('count') === '4' ? 4 : 5;
  document.body.dataset.proto = variant;
  const isHome = Boolean(document.querySelector('.bo-hero'));
  const isPost = Boolean(document.querySelector('article[data-toc]'));
  document.body.classList.toggle('proto-home', isHome);
  document.body.classList.toggle('proto-post', isPost);
  document.title = `${variants[variant][0]} · 博客结构原型`;

  if (variant !== 'original') {
    if (variant !== 'D') {
      document.querySelector('.bo-eyebrow')?.remove();
      document.querySelector('.bo-hero-art')?.remove();
    }
    document.querySelectorAll('#post-list h1').forEach(old => {
      const heading = document.createElement('h3');
      heading.className = old.className;
      heading.textContent = old.textContent;
      old.replaceWith(heading);
    });
    document.querySelectorAll('.bo-about, #access-lastmod').forEach(node => node.remove());
    if (isPost) document.querySelector('#panel-wrapper .access')?.remove();
    if (isHome) {
      const topic = document.querySelector('.bo-topics');
      if (topic) topic.querySelector('h2').textContent = '按专题阅读';
      if (variant === 'B') {
        document.querySelectorAll('#post-list .card-body').forEach(body => {
          const category = document.createElement('div');
          category.className = 'proto-category';
          category.textContent = body.querySelector('.categories')?.textContent.trim() || '';
          body.prepend(category);
        });
      }
      if (variant === 'C') {
        const first = document.querySelector('#post-list .card-wrapper');
        if (first) {
          first.classList.add('proto-featured');
          const read = document.createElement('span');
          read.className = 'proto-read';
          read.innerHTML = '阅读全文 <i class="fas fa-arrow-right" aria-hidden="true"></i>';
          first.querySelector('.card-body').append(read);
          document.querySelector('.bo-hero').append(first);
          document.querySelector('.bo-list-heading h2').textContent = '继续阅读';
        }
      }
    }
    if (variant === 'C') {
      const topbar = document.querySelector('#topbar');
      const brand = document.createElement('a');
      brand.className = 'proto-brand';
      brand.href = '/';
      brand.innerHTML = '<img src="/assets/img/starship.jpg" alt="" width="36" height="36"><span>吴博的网络日志</span>';
      const nav = document.createElement('nav');
      nav.className = 'proto-nav';
      nav.setAttribute('aria-label', '主导航');
      document.querySelectorAll('#sidebar .nav-link').forEach(link => {
        const copy = link.cloneNode(true);
        copy.querySelector('i')?.remove();
        copy.removeAttribute('class');
        if (link.parentElement.classList.contains('active')) copy.setAttribute('aria-current', 'page');
        nav.append(copy);
      });
      topbar.prepend(brand, nav);
    }
    if (isPost && variant === 'B') {
      const outline = document.createElement('details');
      outline.className = 'proto-inline-toc';
      const summary = document.createElement('summary');
      summary.textContent = '本篇目录';
      const nav = document.createElement('nav');
      nav.setAttribute('aria-label', '文章章节');
      document.querySelectorAll('article > .content h2').forEach(heading => {
        const a = document.createElement('a');
        a.textContent = heading.textContent;
        a.href = `#${heading.id}`;
        nav.append(a);
      });
      outline.append(summary, nav);
      document.querySelector('article > .content').before(outline);
    }
    // Short mobile name retains the author's identity without a second introduction.
    if (isHome) document.querySelector('#topbar-title').textContent = '吴博的网络日志';
  }

  // Requested desktop composition: reference 1 navigation/list + reference 2 hero.
  if (variant === 'D') {
    const topbar = document.querySelector('#topbar');
    const brand = document.createElement('a');
    brand.className = 'proto-brand';
    brand.href = '/';
    brand.innerHTML = '<img src="/assets/img/starship.jpg" alt="" width="48" height="48"><span>吴博的网络日志</span>';
    const nav = document.createElement('nav');
    nav.className = 'proto-nav';
    nav.setAttribute('aria-label', '主导航');
    nav.innerHTML = `<a href="/" ${isHome ? 'aria-current="page"' : ''}>文章</a><a href="/categories/">专题</a><a href="/archives/">归档</a>`;
    topbar.prepend(brand, nav);
    document.querySelector('#search-input').placeholder = '搜索';
    if (isHome) {
      const main = document.querySelector('main');
      const hero = main.querySelector('.bo-hero');
      const realPosts = [...main.querySelectorAll('#post-list .card-wrapper')].map(card => ({
        title: card.querySelector('.card-title').textContent.trim(),
        summary: card.querySelector('.card-text p').textContent.trim(),
        date: card.querySelector('time').textContent.trim(),
        category: card.querySelector('.categories').textContent.trim(),
        href: card.querySelector('a').getAttribute('href')
      }));
      const samples = [
        {title: '把复杂任务拆成可验收的小步骤', summary: '从一个明确的结果出发，逐步拆解任务范围，让每一步都有具体的交付要求。'},
        {title: '用一份交接文档保留上下文', summary: '把目标、约束和已经做出的选择写下来，减少下一轮协作中反复解释的时间。'},
        {title: '先写清验收标准，再交给 AI', summary: '在开始之前说明怎样判断任务完成，用可检查的结果帮助双方对齐预期。'}
      ].map(post => ({...post, sample: true}));
      const section = document.createElement('section');
      section.className = 'reference-recent';
      section.setAttribute('aria-labelledby', 'reference-recent-title');
      section.innerHTML = '<header class="reference-section-head"><h2 id="reference-recent-title">最近的文章</h2><a href="/archives/">全部文章 <i class="fas fa-arrow-right" aria-hidden="true"></i></a></header>';
      const list = document.createElement('div');
      list.className = 'reference-list';
      [...realPosts, ...samples].slice(0, articleCount).forEach(post => {
        const article = document.createElement('article');
        article.className = 'reference-post';
        const row = document.createElement(post.sample ? 'div' : 'a');
        row.className = 'reference-post-inner';
        if (post.href) row.href = post.href;
        const heading = document.createElement('h3');
        heading.textContent = post.title;
        const summary = document.createElement('p');
        summary.textContent = post.summary;
        const meta = document.createElement('div');
        meta.className = 'reference-meta';
        if (post.sample) {
          meta.innerHTML = '<span class="reference-sample">排版示例</span><span>仅用于预览文章列表密度</span>';
        } else {
          const date = document.createElement('time');
          date.textContent = post.date;
          const category = document.createElement('span');
          category.textContent = post.category;
          meta.append(date, category);
        }
        row.append(heading, summary, meta);
        article.append(row);
        list.append(article);
      });
      section.append(list);
      main.replaceChildren(hero, section);
    }
    const footer = document.querySelector('footer');
    if (isPost) {
      // Merge related and adjacent articles, excluding this page and duplicate URLs.
      const recommendations = new Map();
      document.querySelectorAll('#related-posts a[href], .post-navigation a[href]').forEach(link => {
        const path = new URL(link.href).pathname;
        if (path === location.pathname || recommendations.has(path)) return;
        const title = link.querySelector('h4, h3, p')?.textContent.trim();
        if (!title) return;
        recommendations.set(path, {
          path,
          title,
          date: link.querySelector('time')?.textContent.trim(),
          summary: link.querySelector('.text-muted p')?.textContent.trim()
        });
      });
      document.querySelectorAll('#related-posts, .post-navigation').forEach(node => node.remove());
      if (recommendations.size) {
        const section = document.createElement('section');
        section.id = 'related-posts';
        section.className = 'reference-related';
        section.setAttribute('aria-labelledby', 'related-label');
        section.innerHTML = '<h2 id="related-label">相关文章推荐</h2>';
        const list = document.createElement('ul');
        [...recommendations.values()].slice(0, 5).forEach(post => {
          const item = document.createElement('li');
          const link = document.createElement('a');
          link.href = post.path;
          const heading = document.createElement('h3');
          heading.textContent = post.title;
          link.append(heading);
          if (post.date) {
            const date = document.createElement('time');
            date.textContent = post.date;
            link.append(date);
          }
          if (post.summary) {
            const summary = document.createElement('p');
            summary.textContent = post.summary;
            link.append(summary);
          }
          item.append(link);
          list.append(item);
        });
        section.append(list);
        footer.before(section);
      }
    }
    const social = document.createElement('nav');
    social.className = 'reference-social';
    social.setAttribute('aria-label', '关注与订阅');
    document.querySelectorAll('#sidebar .sidebar-bottom a').forEach(link => {
      if (['github', 'rss'].includes(link.getAttribute('aria-label'))) {
        const copy = link.cloneNode(true);
        copy.title = copy.getAttribute('aria-label') === 'github' ? 'GitHub' : 'RSS 订阅';
        copy.setAttribute('aria-label', copy.title);
        social.append(copy);
      }
    });
    footer.replaceChildren(social);
  }

  const arrow = direction => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="${direction < 0 ? 'm14 6-6 6 6 6' : 'm10 6 6 6-6 6'}"/></svg>`;
  const switcher = document.createElement('aside');
  switcher.id = 'prototype-switcher';
  switcher.setAttribute('aria-label', '原型方案切换');
  switcher.innerHTML = `
    <div class="prototype-controls"><span class="prototype-mark">布局原型</span>
    <button type="button" data-step="-1" aria-label="上一个方案">${arrow(-1)}</button>
    <div class="prototype-current" aria-live="polite"><strong>${variant === 'original' ? '' : variant + ' / '}${variants[variant][0]}</strong><span>${variants[variant][1]}</span></div>
    <button type="button" data-step="1" aria-label="下一个方案">${arrow(1)}</button>
    ${variant === 'D' && isHome ? `<div class="prototype-count" aria-label="预览文章数量"><button data-count="4" aria-pressed="${articleCount === 4}">4 条</button><button data-count="5" aria-pressed="${articleCount === 5}">5 条</button></div>` : ''}
    <button type="button" id="prototype-original" aria-pressed="${variant === 'original'}">${variant === 'original' ? '返回 D' : '对照当前版'}</button></div>
    <div class="prototype-tabs">${['D','A','B','C'].map(key => `<button type="button" data-variant="${key}" aria-pressed="${variant === key}">${key} ${variants[key][0]}</button>`).join('')}</div>`;
  document.body.append(switcher);
  function go(next) {
    const url = new URL(location.href);
    url.searchParams.set('variant', next);
    location.replace(url);
  }
  function step(direction) {
    const keys = ['D', 'A', 'B', 'C'];
    go(keys[(Math.max(0, keys.indexOf(variant)) + direction + keys.length) % keys.length]);
  }
  switcher.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.count) {
      const url = new URL(location.href);
      url.searchParams.set('count', button.dataset.count);
      location.replace(url);
    }
    else if (button.dataset.variant) go(button.dataset.variant);
    else if (button.dataset.step) step(Number(button.dataset.step));
    else go(variant === 'original' ? 'D' : 'original');
  });
  document.addEventListener('keydown', event => {
    if (event.target.closest('input,textarea,select,[contenteditable]') || event.altKey || event.metaKey || event.ctrlKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  // Keep the selected layout when navigating real articles, categories and tags.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.getAttribute('href').startsWith('#')) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && !url.pathname.startsWith('/assets/')) {
      url.searchParams.set('variant', variant);
      link.href = url.href;
    }
  }, true);
})();
