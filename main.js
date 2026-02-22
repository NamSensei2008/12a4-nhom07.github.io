document.addEventListener("DOMContentLoaded", () => {

  /* ===== LOADER ===== */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hide");
  });

  /* ===== SCROLL PROGRESS + BACK TO TOP ===== */
  const progressBar = document.getElementById("progress-bar");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // Progress bar
    if (progressBar && height > 0) {
      const percent = (scrollTop / height) * 100;
      progressBar.style.width = percent + "%";
    }

    // Back to top button
    if (backToTop) {
      backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===== THEME TOGGLE ===== */
  const themeBtn = document.getElementById("themeToggle");

  if (themeBtn) {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }

    themeBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    });
  }

  /* ===== SCROLL REVEAL ===== */
  if ("IntersectionObserver" in window) {
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach(el => revealObserver.observe(el));
  }

  /* ===== CURSOR GLOW ===== */
  const glow = document.getElementById("cursor-glow");

  if (glow) {
    document.addEventListener("mousemove", e => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  /* ===== RIPPLE EFFECT ===== */
  document.addEventListener("click", e => {
    const target = e.target.closest(".btn");
    if (!target) return;

    const circle = document.createElement("span");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;
    const rect = target.getBoundingClientRect();

    circle.style.width = circle.style.height = diameter + "px";
    circle.style.left = (e.clientX - rect.left - radius) + "px";
    circle.style.top = (e.clientY - rect.top - radius) + "px";
    circle.classList.add("ripple-effect");

    const existingRipple = target.querySelector(".ripple-effect");
    if (existingRipple) existingRipple.remove();

    target.appendChild(circle);
  });

});
