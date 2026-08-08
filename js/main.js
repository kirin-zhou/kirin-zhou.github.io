document.addEventListener("DOMContentLoaded", () => {
  // Dynamic year
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Add repository link and refined description for the SecKill project.
  const secKillHeading = [...document.querySelectorAll("#projects .project-card h3")].find(
    (heading) => heading.textContent.trim() === "High-Performance & High-Concurrency Flash Sale System"
  );

  if (secKillHeading) {
    const secKillCard = secKillHeading.closest(".project-card");
    const projectUrl = "https://github.com/kirin-zhou/SecKill_GraduationProject/tree/master";

    const description = secKillCard.querySelector("h3 + p");
    if (description) {
      description.textContent =
        "Designed and implemented a high-performance flash-sale platform for small and medium-sized e-commerce businesses, addressing challenges such as sudden traffic surges that can overwhelm conventional online transaction systems. The system supports high-concurrency purchasing scenarios and is engineered for strong performance, scalability and stability through asynchronous processing, distributed caching and database optimisation.";
    }

    const headingLink = document.createElement("a");
    headingLink.href = projectUrl;
    headingLink.target = "_blank";
    headingLink.rel = "noreferrer";
    headingLink.textContent = secKillHeading.textContent;
    secKillHeading.textContent = "";
    secKillHeading.appendChild(headingLink);

    if (!secKillCard.querySelector(".project-links")) {
      const projectLinks = document.createElement("div");
      projectLinks.className = "project-links";
      projectLinks.innerHTML = `<a href="${projectUrl}" target="_blank" rel="noreferrer">View code ↗</a>`;
      secKillCard.appendChild(projectLinks);
    }
  }

  // Reveal-on-scroll animation
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("visible"));
  }

  // Active nav link while scrolling
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 140;
    let currentId = "home";

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const target = link.getAttribute("href");
      link.classList.toggle("active", target === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();
});
