document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("Scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);



  const stickySection = document.querySelector(".steps");
  const stickyHeigt = window.innerHeight * 7;
  const cards = document.querySelectorAll(".card");
  const countContainer = document.querySelector(".count-container");
  const totalCards = cards.length;

  ScrollTrigger.create({
    trigger: stickySection,
    start: "top top",
    end: `+=${stickyHeigt}px`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      positionCards(self.progress);
    }
  });

  const getRadius = () => {
    return window.innerWidth < 900
      ? window.innerWidth * 7.5
      : window.innerWidth * 2.5;
  };

  const arcAngel = Math.PI * 0.4;
  const startAngel = Math.PI / 2 - arcAngel / 2;

  function positionCards(progress = 0) {
    const radius = getRadius();
    const totalTravel = 1 + totalCards / 7.5;
    const adjustedProgress = (progress * totalTravel - 1) * 0.75;

    cards.forEach((card, i) => {
      const normalizedProgress = (totalCards - 1 - i) /
        totalCards;
      const cardProgress = normalizedProgress +
        adjustedProgress;
      const angle = startAngel + arcAngel * cardProgress;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

      gsap.set(card, {
        x: x,
        y: -y + radius,
        rotation: -rotation,
        transformOrigin: "center center",

      });
    });
  }

  positionCards(0);
});
