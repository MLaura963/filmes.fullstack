// Registro do Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado com sucesso'))
    .catch(err => console.error('Erro ao registrar o Service Worker:', err));
}

// Referência ao formulário
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();

    const emailOrUser = document.getElementById('emailOrUser').value.trim();
    const senha = document.getElementById('senha').value;

    // Validação rápida antes de enviar
    if (!emailOrUser || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUser, senha })
      });

      const result = await response.json();

      if (response.ok && result.token) {
        // Salva token e informações no localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.userId);
        localStorage.setItem('nome', result.nome);

        console.log('Login realizado com sucesso. Token salvo:', result.token);

        // Redireciona para a tela de filmes
        window.location.href = '/filmes.html';
      } else {
        alert(result.message || 'Erro ao fazer login.');
      }

    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Não foi possível conectar com o servidor. Verifique sua conexão ou tente novamente mais tarde.');
    }
  });
} else {
  console.error('Formulário de login não encontrado.');
}
