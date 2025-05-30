document.addEventListener('DOMContentLoaded', () => {
  const btnAddHabit = document.getElementById('btn-add-habit');
  const selector = document.getElementById('habit-selector');
  const formSection = document.getElementById('habit-form-section');
  const form = document.getElementById('habit-form');
  const summary = document.getElementById('summary');

  let stats = {
    agua: 0,
    exercicio: 0
  };

  function updateSummary() {
    summary.textContent = `
      ${stats.agua} litros de água consumidos,
      ${stats.exercicio} horas de exercício realizados.
    `;
  }

  function showForm(type) {
    form.innerHTML = '';

    let html = `
      <label>Nome do Hábito:</label>
      <input type="text" id="habit-name" required />
    `;

    if (type === 'exercicio') {
      html += `
        <label>Duração (em horas):</label>
        <input type="number" id="tempo" min="0" step="0.1" required />
        <label>Calorias queimadas (opcional):</label>
        <input type="number" id="calorias" min="0" step="1" />
      `;
    }

    if (type === 'agua') {
      html += `
        <label>Meta diária (litros):</label>
        <input type="number" id="litros" min="0" step="0.1" required />
      `;
    }

    html += `
      <label>Dias da semana:</label>
      <div class="days-checkbox">
        ${['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map(dia => `
          <label><input type="checkbox" value="${dia}" /> ${dia}</label>
        `).join('')}
      </div>

      <button type="submit">Salvar Hábito</button>
    `;

    form.innerHTML = html;
    formSection.classList.remove('hidden');

    form.onsubmit = e => {
      e.preventDefault();

      const name = document.getElementById('habit-name').value;
      if (type === 'agua') {
        const litros = parseFloat(document.getElementById('litros').value);
        stats.agua += litros;
      }
      if (type === 'exercicio') {
        const tempo = parseFloat(document.getElementById('tempo').value);
        stats.exercicio += tempo;
      }

      updateSummary();
      formSection.classList.add('hidden');
      selector.classList.add('hidden');
    };
  }

  btnAddHabit.addEventListener('click', () => {
    selector.classList.toggle('hidden');
  });

  document.querySelectorAll('[data-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      showForm(btn.dataset.type);
    });
  });

  updateSummary();
});
