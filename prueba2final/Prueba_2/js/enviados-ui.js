// Render de lista de formularios enviados (demo en frontend)
// Nota: como no hay backend, guardamos envíos en localStorage.

(function () {
  const STORAGE_KEY = "formularios-enviados";

  const form = document.getElementById("registro-form");
  const container = document.getElementById("enviados-container");

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function sanitizeText(s) {
    return String(s ?? "").replace(/[<>]/g, "");
  }

  function render() {
    if (!container) return;

    const items = load();

    if (!items.length) {
      container.innerHTML = "";
      return;
    }

    const ul = document.createElement("ul");
    ul.className = "list-group mt-3";

    // Mostrar más recientes arriba
    const copy = [...items].reverse();
    for (const it of copy) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      const when = it.when ? new Date(it.when).toLocaleString() : "";

      li.innerHTML = `
        <div class="d-flex align-items-start justify-content-between gap-3">
          <div>
            <div class="fw-semibold">${sanitizeText(it.username)}</div>
            <div class="text-muted small">${sanitizeText(it.comuna)} · ${sanitizeText(it.telefono)}</div>
          </div>
          <div class="text-muted small text-nowrap">${sanitizeText(when)}</div>
        </div>
      `;
      ul.appendChild(li);
    }

    container.innerHTML = "";
    container.appendChild(ul);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      // Valida antes de guardar: si falla, no se agrega a la lista.
      const ok = typeof validar === "function" ? validar() : true;
      if (!ok) {
        e.preventDefault();
        return;
      }

      const username = document.getElementById("username")?.value;
      const comuna = document.getElementById("comuna")?.value;
      const telefono = document.getElementById("telefono")?.value;

      const items = load();
      items.push({
        when: new Date().toISOString(),
        username,
        comuna,
        telefono,
      });
      save(items);
      render();
    });
  }

  render();
})();


