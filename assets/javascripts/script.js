// Elementos do DOM
const btnCreate   = document.getElementById('btn-create');
const sectionStart = document.getElementById('start');
const sectionTypes = document.getElementById('types');
const sectionForms = document.getElementById('forms');
const statsList   = document.getElementById('stats-list');
const sectionSummary = document.getElementById('summary');

// Estatísticas básicas
let stats = { exercise: 0, food: 0 };

// 1) Clicar em “Criar Hábito”
btnCreate.addEventListener('click', () => {
  sectionStart.classList.add('hidden');
  sectionTypes.classList.remove('hidden');
});

// 2) Selecionar tipo e mostrar form
document.querySelectorAll('.type-card').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    sectionTypes.classList.add('hidden');
    sectionForms.classList.remove('hidden');
    document.querySelectorAll('.habit-form').forEach(f => f.classList.add('hidden'));
    document.getElementById(`form-${type}`).classList.remove('hidden');
  });
});

// 3) Submissão de cada form
document.querySelectorAll('.habit-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const id = form.id.split('-')[1];

    if (id === 'exercise') {
      const time = parseFloat(form.querySelector('#exercise-time').value);
      stats.exercise += time;
      addStat(`Exercício: +${time.toFixed(1)} h (total ${stats.exercise.toFixed(1)} h)`);
    }
    else if (id === 'food') {
      const calories = form.querySelector('#food-calories').value;
      stats.food += calories ? parseInt(calories) : 0;
      addStat(`Alimentação: ${form.querySelector('#food-name').value}` 
              + (calories ? ` (+${calories} kcal)` : ''));
    }
    else {
      addStat(`Diversos: ${form.querySelector('#misc-desc').value}`);
    }

    // reset e volta para seleção
    form.reset();
    sectionForms.classList.add('hidden');
    sectionTypes.classList.remove('hidden');
    updateSummary();
  });
});

// 4) Atualiza o sumário
function updateSummary() {
  sectionSummary.classList.remove('hidden');
  statsList.innerHTML = `
    <li>Total Exercício: ${stats.exercise.toFixed(1)} h</li>
    <li>Total Alimentação (kcal): ${stats.food}</li>
  `;
}

function addStat(text) {
  const li = document.createElement('li');
  li.textContent = text;
  statsList.appendChild(li);
}
