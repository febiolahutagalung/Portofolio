// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      const navLinks = document.querySelector(".nav-links");
      const menuToggle = document.querySelector(".menu-toggle");
      if (navLinks && menuToggle && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// ========== DARK MODE TOGGLE ==========
const darkToggle = document.getElementById("darkToggle");
const body = document.body;

const userTheme = localStorage.getItem("theme");
if (userTheme === "dark") {
  body.classList.add("dark-mode");
  if (darkToggle) darkToggle.textContent = "☀️";
}

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    darkToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// ========== FOOTER YEAR ==========
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ========== CONTACT FORM – EMAILJS ==========
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const templateParams = {
      from_name: this.from_name.value,   // name="from_name"
      from_email: this.from_email.value, // name="from_email"
      message: this.message.value,       // name="message"
    };

    emailjs
      .send("service_dkk2c5k", "template_ntimpvh", templateParams)
      .then(
        () => {
          alert("Terima kasih! Pesan kamu sudah terkirim 💌");
          contactForm.reset();
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert(
            "Maaf, terjadi kesalahan saat mengirim pesan. Coba lagi nanti ya 🙏"
          );
        }
      );
  });
}

