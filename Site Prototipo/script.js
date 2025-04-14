// Tela de Loading
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loading = document.getElementById("loading-screen");
    if (loading) loading.style.display = "none";
  }, 3000);
});

// Botão de voltar ao topo
const topBtn = document.getElementById("topBtn");
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const heroSection = document.querySelector('.hero-section');
  const heroHeight = heroSection.offsetHeight;
  const currentScroll = window.pageYOffset;
  
  // Calcula se a animação do hero terminou (100vh da seção)
  const animationEndPoint = heroHeight / 2; // Metade da altura do hero (onde a animação termina)
  
  // Só aplica o fundo quando passar do ponto de animação
  if (currentScroll > animationEndPoint) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Mantém sua animação existente
  const texto = document.querySelector('.hero-texto');
  const sectionTop = heroSection.offsetTop;
  const sectionHeight = window.innerHeight;
  const progress = Math.min((currentScroll - sectionTop) / sectionHeight, 1);
  texto.style.transform = `translateY(${(1 - progress) * 100}%)`;
});

// Animação ao rolar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));
