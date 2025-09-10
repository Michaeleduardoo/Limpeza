document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        const mobileMenu = document.getElementById("mobile-menu");
        const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
        if (mobileMenu && mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          mobileMenuToggle.innerHTML = "<span>☰</span>";
        }
      }
    });
  });

  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      mobileMenu.classList.toggle("active");

      if (mobileMenu.classList.contains("active")) {
        mobileMenuToggle.innerHTML = "<span>✕</span>";
      } else {
        mobileMenuToggle.innerHTML = "<span>☰</span>";
      }
    });

    document.addEventListener("click", function (e) {
      if (
        !mobileMenu.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)
      ) {
        mobileMenu.classList.remove("active");
        mobileMenuToggle.innerHTML = "<span>☰</span>";
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove("active");
        mobileMenuToggle.innerHTML = "<span>☰</span>";
      }
    });
  }

  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    ".service-card, .value-card, .testimonial-card"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  const stats = document.querySelectorAll(".stat-number");
  const animateCounters = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        const isNumeric = !isNaN(parseInt(finalValue));

        if (isNumeric) {
          const endValue = parseInt(finalValue);
          let currentValue = 0;
          const increment = endValue / 50;

          const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= endValue) {
              target.textContent = finalValue;
              clearInterval(counter);
            } else {
              target.textContent = Math.floor(currentValue) + "+";
            }
          }, 30);
        }
      }
    });
  };

  const counterObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5,
  });
  stats.forEach((stat) => counterObserver.observe(stat));

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroParticles = document.querySelector(".hero-particles");
    if (heroParticles) {
      heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    setTimeout(typeWriter, 1000);
  }

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      const inputs = form.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "#e74c3c";
          input.style.boxShadow = "0 0 0 3px rgba(231, 76, 60, 0.1)";
        } else {
          input.style.borderColor = "#E0E0E0";
          input.style.boxShadow = "none";
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    });
  }
});
