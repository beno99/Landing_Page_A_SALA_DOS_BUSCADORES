import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { Faq } from "./Faq";

// jsdom never scrolls, so the in-view cascade would leave cards at opacity 0: test the content with motion reduced.
vi.mock("@/lib/useMediaQuery", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/useMediaQuery")>()),
  usePrefersReducedMotion: () => true,
}));

describe("Faq", () => {
  it("title, the six questions as buttons, all collapsed at first", () => {
    render(<Faq content={site.faq} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Sua busca começa com uma pergunta.");
    expect(site.faq.items).toHaveLength(6);
    for (const item of site.faq.items) {
      const button = screen.getByRole("button", { name: item.question });
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(document.getElementById(button.getAttribute("aria-controls")!)).not.toBeVisible();
    }
  });

  it("opens and closes an answer from its button, independently of the others", async () => {
    render(<Faq content={site.faq} />);
    const [first, second] = site.faq.items;
    const button = screen.getByRole("button", { name: first.question });
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(first.answer)).toBeVisible();
    expect(screen.getByRole("button", { name: second.question })).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("two independent columns whose reading order follows the numbers", () => {
    render(<Faq content={site.faq} />);
    const columns = document.querySelectorAll("#faq ul");
    expect(columns).toHaveLength(2);
    const order = [...document.querySelectorAll("#faq button")].map((b) => b.textContent);
    expect(order.map((t) => Number(t!.match(/^\d+/)![0]))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("has the contact line", () => {
    render(<Faq content={site.faq} />);
    expect(screen.getByRole("link", { name: site.faq.contact.label })).toHaveAttribute("href", site.faq.contact.href);
  });
});
