document.addEventListener('DOMContentLoaded', function() {
    // Simulação de login e autenticação
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simulação de autenticação
            if (username === 'professor' && password === 'senha123') {
                sessionStorage.setItem('role', 'professor');
                window.location.href = 'home.html';
            } else if (username === 'aluno' && password === 'senha123') {
                sessionStorage.setItem('role', 'aluno');
                window.location.href = 'home.html';
            } else {
                errorMessage.textContent = 'Usuário ou senha incorretos!';
            }
        });
    }

    // Controle de acesso nas páginas
    const role = sessionStorage.getItem('role');

    if (role) {
        const navLinks = document.getElementById('nav-links');
        if (navLinks) {
            if (role === 'professor') {
                navLinks.innerHTML = `
                    <ul>
                        <li><a href="cadastro_professor.html">Cadastro de Professor</a></li>
                        <li><a href="cadastro_turma.html">Cadastro de Turma</a></li>
                        <li><a href="cadastro_disciplina.html">Cadastro de Disciplina</a></li>
                        <li><a href="cadastro_sala.html">Cadastro de Sala</a></li>
                    </ul>
                `;
            } else if (role === 'aluno') {
                navLinks.innerHTML = `
                    <ul>
                        <li><a href="visualizacao_professor.html">Visualização de Professor</a></li>
                        <li><a href="visualizacao_turma.html">Visualização de Turma</a></li>
                        <li><a href="visualizacao_disciplina.html">Visualização de Disciplina</a></li>
                        <li><a href="visualizacao_sala.html">Visualização de Sala</a></li>
                    </ul>
                `;
            }
        }

        // Redirecionar se não tiver permissão para a página atual
        const restrictedPagesForAluno = [
            'cadastro_professor.html',
            'cadastro_turma.html',
            'cadastro_disciplina.html',
            'cadastro_sala.html'
        ];
        const restrictedPagesForProfessor = [
            'visualizacao_professor.html',
            'visualizacao_turma.html',
            'visualizacao_disciplina.html',
            'visualizacao_sala.html'
        ];

        const currentPage = window.location.pathname.split('/').pop();

        if (role === 'aluno' && restrictedPagesForAluno.includes(currentPage)) {
            alert('Acesso negado! Você não tem permissão para acessar esta página.');
            window.location.href = 'home.html';
        } else if (role === 'professor' && restrictedPagesForProfessor.includes(currentPage)) {
            alert('Acesso negado! Você não tem permissão para acessar esta página.');
            window.location.href = 'home.html';
        }
    } else {
        // Redirecionar para a página de login se não estiver autenticado
        const publicPages = ['index.html'];
        const currentPage = window.location.pathname.split('/').pop();

        if (!publicPages.includes(currentPage)) {
            window.location.href = 'index.html';
        }
    }
});
