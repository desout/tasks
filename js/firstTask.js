document.getElementById('name_input').addEventListener('change', (e) => e.target.defaultValue !== e.target.value
  ? e.target.classList.add('red')
  : e.target.classList.remove('red'));
