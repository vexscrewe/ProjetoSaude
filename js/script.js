document.addEventListener('DOMContentLoaded', () => {
  const btnAddHabit = document.getElementById('btn-add-habit');
  const habitSelector = document.getElementById('habit-selector');

  console.log('DOM totalmente carregado!');

  btnAddHabit.addEventListener('click', () => {
    console.log('Botão clicado!');
    habitSelector.classList.toggle('hidden');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const btnAddHabit = document.getElementById('btn-add-habit');
  const habitSelector = document.getElementById('habit-selector');
  const habitFormSection = document.getElementById('habit-form');
  const formFields = document.getElementById('form-fields');
  const formHabit = document.getElementById('form-habit');
  const summary = document.getElementById('summary');

  let totalExercicio = 0;
  let totalAgua = 0;

  btnAddHabit.addEventListener('click', () => {
    habitSelector.classList.remove('hidden');
    habitFormSection.classList.add('hidden');
  });

  document.querySelectorAll('.habit-options button').forEach(button => {
    button.addEventListener('click', () => {
      const type = button.getAttribute('data-type');
      habitSelector.classList.add('hidden');
      habitFormSection.classList.remove('hidden');
      generateFormFields(type);
    });
  });

  formHabit.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = formHabit.getAttribute('data-type');
    const dias = Array.from(formHabit.querySelectorAll('input[name="dias"]:checked')).map(cb => cb.value);

    if (type === 'exercicio') {
      const tempo = parseFloat(formHabit.querySelector('input[name="tempo"]').value) || 0;
      totalExercicio += tempo;
    } else if (type === 'agua') {
      const litros = parseFloat(formHabit.querySelector('input[name="litros"]').value) || 0;
      totalAgua += litros;
    }

    updateSummary();
    formHabit.reset();
    habitFormSection.classList.add('hidden');
  });

  function generateFormFields(type) {
    formHabit.setAttribute('data-type', type);
    formFields.innerHTML = '';

    if (type === 'exercicio') {
      formFields.innerHTML = `
        <label for="tempo">Tempo (em horas):</label>
        <input type="number" name="tempo" min="0" step="0.1" required />
        <label for="calorias">Calorias queimadas (opcional):</label>
        <input type="number" name="calorias" min="0" step="1" />
      `;
    } else if (type === 'agua') {
      formFields.innerHTML = `
        <label for="litros">Litros por dia:</label>
        <input type="number" name="litros" min="0" step="0.1" required />
      `;
    } else if (type === 'personalizado') {
      formFields.innerHTML = `
        <label for="descricao">Descrição do hábito:</label>
        <input type="text" name="descricao" required />
      `;
    }
  }

  function updateSummary() {
    summary.textContent = `Total: ${totalExercicio}h de exercício, ${totalAgua}L de água`;
  }
});
