// ========================================
// SCRIPT.JS - AGRINHO 2026
// Interatividade e comportamento dinâmico
// ========================================

document.addEventListener('DOMContentLoaded', function () {

  // ---------- 1. MENU MOBILE (HAMBÚRGUER) ----------
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('nav-ativo');
      menuToggle.classList.toggle('ativo');
    });

    // Fecha o menu ao clicar em um link (mobile)
    document.querySelectorAll('.nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-ativo');
        menuToggle.classList.remove('ativo');
      });
    });
  }

  // ---------- 2. CABEÇALHO COM EFEITO AO ROLAR ----------
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('header-scroll');
    } else {
      header.classList.remove('header-scroll');
    }
  });

  // ---------- 3. ROLAGEM SUAVE (SMOOTH SCROLL) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- 4. ANIMAÇÃO DE ENTRADA AO ROLAR (SCROLL REVEAL) ----------
  const elementosAnimados = document.querySelectorAll('.animar, section, .card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
      }
    });
  }, { threshold: 0.15 });

  elementosAnimados.forEach(el => observer.observe(el));

  // ---------- 5. VALIDAÇÃO DO FORMULÁRIO DE CONTATO ----------
  const formulario = document.querySelector('#form-contato');

  if (formulario) {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();

      let valido = true;

      const nome = formulario.querySelector('#nome');
      const email = formulario.querySelector('#email');
      const mensagem = formulario.querySelector('#mensagem');

      // Limpa mensagens de erro anteriores
      formulario.querySelectorAll('.erro-msg').forEach(el => el.remove());
      formulario.querySelectorAll('input, textarea').forEach(el => el.classList.remove('campo-erro'));

      // Validação: nome
      if (!nome.value.trim()) {
        mostrarErro(nome, 'Por favor, digite seu nome.');
        valido = false;
      }

      // Validação: e-mail
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email.value.trim())) {
        mostrarErro(email, 'Digite um e-mail válido.');
        valido = false;
      }

      // Validação: mensagem
      if (mensagem.value.trim().length < 10) {
        mostrarErro(mensagem, 'Sua mensagem deve ter pelo menos 10 caracteres.');
        valido = false;
      }

      if (valido) {
        mostrarSucesso();
        formulario.reset();
      }
    });
  }

  function mostrarErro(campo, texto) {
    campo.classList.add('campo-erro');
    const erro = document.createElement('span');
    erro.classList.add('erro-msg');
    erro.textContent = texto;
    campo.insertAdjacentElement('afterend', erro);
  }

  function mostrarSucesso() {
    const aviso = document.createElement('div');
    aviso.classList.add('aviso-sucesso');
    aviso.textContent = '✅ Mensagem enviada com sucesso! Em breve retornaremos o contato.';
    formulario.appendChild(aviso);

    setTimeout(() => aviso.remove(), 4000);
  }

  // ---------- 6. BOTÃO "VOLTAR AO TOPO" ----------
  const botaoTopo = document.querySelector('.botao-topo');

  if (botaoTopo) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        botaoTopo.classList.add('visivel');
      } else {
        botaoTopo.classList.remove('visivel');
      }
    });

    botaoTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- 7. CONTADOR ANIMADO (ESTATÍSTICAS) ----------
  const contadores = document.querySelectorAll('.contador');

  const iniciarContador = (el) => {
    const valorFinal = parseInt(el.getAttribute('data-valor'), 10);
    let valorAtual = 0;
    const incremento = Math.ceil(valorFinal / 60);

    const intervalo = setInterval(() => {
      valorAtual += incremento;
      if (valorAtual >= valorFinal) {
        valorAtual = valorFinal;
        clearInterval(intervalo);
      }
      el.textContent = valorAtual;
    }, 30);
  };

  const observerContador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        iniciarContador(entry.target);
        observerContador.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  contadores.forEach(c => observerContador.observe(c));

  // ---------- 8. ACCORDION (PERGUNTAS FREQUENTES / DETALHES) ----------
  document.querySelectorAll('details').forEach(detalhe => {
    detalhe.addEventListener('toggle', function () {
      if (this.open) {
        document.querySelectorAll('details').forEach(outro => {
          if (outro !== this) outro.removeAttribute('open');
        });
      }
    });
  });

});
