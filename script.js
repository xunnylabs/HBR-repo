const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.classList.toggle("is-open");
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const rotator = document.querySelector(".text-rotator");

if (rotator) {
  const items = JSON.parse(rotator.dataset.rotate || "[]");
  let index = 0;

  if (items.length > 1) {
    setInterval(() => {
      index = (index + 1) % items.length;
      rotator.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 420,
          easing: "ease-out"
        }
      );
      rotator.textContent = items[index];
    }, 2600);
  }
}

const yearTargets = document.querySelectorAll("[data-current-year]");

yearTargets.forEach((target) => {
  target.textContent = new Date().getFullYear();
});

const modalOpeners = document.querySelectorAll("[data-modal-open]");
const modalClosers = document.querySelectorAll("[data-modal-close]");
const modals = document.querySelectorAll(".modal-backdrop");

const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

modalOpeners.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(`[data-modal="${button.dataset.modalOpen}"]`);
    openModal(modal);
  });
});

modalClosers.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".modal-backdrop"));
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal-backdrop.is-open").forEach((modal) => closeModal(modal));
  }
});
