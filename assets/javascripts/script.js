// DOM Elements
const btnCreate   = document.getElementById('btn-create');
const sectionTypes = document.getElementById('types');
const sectionForms = document.getElementById('forms');
const sectionStart = document.getElementById('start');
const statsList   = document.getElementById('stats-list');

let stats = { water: 0, exercise: 0 };

// 1) Mostrar seleção de tipos
btnCreate.addEventListener('click', () => {
  sectionStart.classList.add('hidden');
  sectionTypes.classList.remove('hidden');
});

// 2) Quando clica em um tipo, mostra o form correspondente
document.querySelectorAll('.type-card').forEach(btn =>
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    sectionTypes.classList.add('hidden');
    sectionForms.classList.remove('hidden');
    document.querySelectorAll('.habit-form').forEach(f => f.classList.add('hidden'));
    document.getElementById(`form-${type}`).classList.remove('hidden');
  })
);

// 3) Handler de submissão de cada form
document.querySelectorAll('.habit-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const id = form.id.split('-')[1];

    if (id === 'exercise') {
      const time = parseFloat(document.getElementById('exercise-time').value);
      stats.exercise += time;
      addStat(`Exercício: +${time} h (total: ${stats.exercise.toFixed(1)} h)`);
    }
    else if (id === 'water') {
      const liters = parseFloat(document.getElementById('water-amount').value);
      stats.water += liters;
      addStat(`Água: +${liters} L (total: ${stats.water.toFixed(1)} L)`);
    }
    else {
      const desc = document.getElementById('custom-desc').value;
      addStat(`Personalizado: ${desc}`);
    }

    // voltar à seleção
    sectionForms.classList.add('hidden');
    sectionTypes.classList.remove('hidden');
    form.reset();
    updateSummary();
  });
});

// 4) Renderiza o sumário
function updateSummary() {
  document.getElementById('summary').classList.remove('hidden');
  statsList.innerHTML = '';
  statsList.querySelectorAll('li');  
  statsList.insertAdjacentHTML('beforeend',
    `<li>Total Água: ${stats.water.toFixed(1)} L</li>
     <li>Total Exercício: ${stats.exercise.toFixed(1)} h</li>`
  );
}

function addStat(text) {
  const li = document.createElement('li');
  li.textContent = text;
  statsList.appendChild(li);
}
