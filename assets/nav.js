(function() {
  function getAttr(el, name, fallback) {
    return (el && el.getAttribute && el.getAttribute(name)) || fallback;
  }

  function createNav(totalPages, homeHref) {
    // Expect file names like page_1.html, page_2.html, etc.
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1);
    var match = file.match(/page_(\d+)\.html/i);
    var current = match ? parseInt(match[1], 10) : 1;

    function pageHref(n) {
      return "page_" + n + ".html";
    }

    var container = document.createElement('div');
    container.style.marginTop = "20px";
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.alignItems = "center";
    container.style.padding = "12px 16px";
    container.style.borderTop = "1px solid rgba(0,0,0,0.08)";
    container.style.background = "rgba(255,255,255,0.7)";
    container.style.backdropFilter = "blur(4px)";
    container.style.position = "sticky";
    container.style.bottom = "0";
    container.style.zIndex = "999";

    var left = document.createElement('div');
    var middle = document.createElement('div');
    var right = document.createElement('div');

    // Home link
    var home = document.createElement('a');
    home.href = homeHref || "../index.html";
    home.textContent = "🏠 홈";
    home.style.marginRight = "12px";
    left.appendChild(home);

    // Prev link
    if (current > 1) {
      var prev = document.createElement('a');
      prev.href = pageHref(current - 1);
      prev.textContent = "◀ 이전";
      prev.style.marginRight = "12px";
      left.appendChild(prev);
    }

    // Page status
    middle.textContent = current + " / " + totalPages;

    // Next link
    if (current < totalPages) {
      var next = document.createElement('a');
      next.href = pageHref(current + 1);
      next.textContent = "다음 ▶";
      right.appendChild(next);
    } else {
      var first = document.createElement('a');
      first.href = pageHref(1);
      first.textContent = "⏮ 첫 페이지";
      right.appendChild(first);
    }

    container.appendChild(left);
    container.appendChild(middle);
    container.appendChild(right);

    document.body.appendChild(container);
  }

  // Auto-run
  document.addEventListener('DOMContentLoaded', function() {
    // Read configuration from the script tag attributes
    var scripts = document.getElementsByTagName('script');
    var thisScript = null;
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.indexOf('assets/nav.js') !== -1) {
        thisScript = scripts[i];
        break;
      }
    }
    var total = parseInt(getAttr(thisScript, 'data-total', '10'), 10);
    var home = getAttr(thisScript, 'data-home', '../index.html');
    createNav(total, home);
  });
})();
