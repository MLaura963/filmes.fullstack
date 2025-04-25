// js/filmes.js

const filmForm = document.getElementById('filmForm');
const filmList = document.getElementById('filmList');
const logoutButton = document.getElementById('logout');
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

// Carregar filmes na tela ao iniciar
async function loadFilms() {
  const res = await fetch('/api/films', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const films = await res.json();

  // Limpar lista
  filmList.innerHTML = '';

  // Verificar se existem filmes
  if (films.length === 0) {
    filmList.innerHTML = '<p>Nenhum filme adicionado.</p>';
    return;
  }

  // Renderizar cada filme
  films.forEach(film => {
    const div = document.createElement('div');
    div.className = 'film';

    div.innerHTML = `
      <img src="${film.foto || 'img/default-film.jpg'}" alt="${film.nome}">
      <h3>${film.nome}</h3>
      <p>${film.descricao}</p>
      <p><strong>Diretor:</strong> ${film.diretor}</p>
      <p><strong>Lançamento:</strong> ${film.anoLancamento}</p>
      ${film.anoAssistiu ? `<p><strong>Assistido em:</strong> ${film.anoAssistiu}</p>` : ''}
      ${film.nota ? `<p><strong>Nota:</strong> ${film.nota}</p>` : ''}
      <button onclick="deleteFilm('${film._id}')">Remover</button>
    `;

    filmList.appendChild(div);
  });
}

// Adicionar filme
filmForm.addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(filmForm));

  const res = await fetch('/api/films', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) {
    alert(result.message);
    return;
  }

  filmForm.reset();
  loadFilms();
});

// Remover filme
async function deleteFilm(id) {
  const res = await fetch(`/api/films/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });

  const result = await res.json();

  if (!res.ok) {
    alert(result.message);
    return;
  }

  loadFilms();
}

// Logout
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

// Inicializar
loadFilms();
