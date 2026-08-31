/* =========================================
   CURSOR FOLLOWING GLOW
========================================= */

const cursorGlow =
  document.getElementById("cursorGlow");


if (cursorGlow) {

  let mouseX = 0;
  let mouseY = 0;

  let glowX = 0;
  let glowY = 0;


  /* =========================================
     MOUSE POSITION
  ========================================= */

  document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    document.body.classList.add("cursor-active");

  });


  /* =========================================
     SMOOTH FOLLOW
  ========================================= */

  function animateGlow() {

    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;


    cursorGlow.style.transform =
      `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;


    requestAnimationFrame(animateGlow);

  }


  animateGlow();


  /* =========================================
     HIDE WHEN MOUSE LEAVES WINDOW
  ========================================= */

  document.addEventListener("mouseleave", () => {

    document.body.classList.remove("cursor-active");

  });


  document.addEventListener("mouseenter", () => {

    document.body.classList.add("cursor-active");

  });

}