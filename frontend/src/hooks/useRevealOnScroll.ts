import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const revealSelectors = [
  ".section",
  ".section-lite",
  ".catalog-toolbar",
  ".auto-card",
  ".card",
  ".pick-card",
  ".quick-chips span",
  ".result-item",
  ".partner-copy",
  ".partner-form",
  ".benefit-card",
  ".register-copy",
  ".register-form",
  ".cabinet-hero",
  ".account-panel",
  ".action-card",
  ".inner-hero",
  ".partner-choice",
].join(", ");

export function useRevealOnScroll() {
  const location = useLocation();

  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelectors)).filter(
      (element) => !element.closest(".topbar") && !element.closest(".login-modal"),
    );

    elements.forEach((element) => {
      element.dataset.reveal = "true";

      const siblings = element.parentElement
        ? Array.from(element.parentElement.children).filter((child): child is HTMLElement =>
            elements.includes(child as HTMLElement),
          )
        : [];
      const localIndex = Math.max(0, siblings.indexOf(element));
      const delay = Math.min(localIndex * 65, 390);
      element.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [location.pathname, location.hash]);
}
