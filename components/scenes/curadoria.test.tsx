import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { setMatchMedia } from "@/vitest.setup";
import { Curadoria } from "./Curadoria";

vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "font-proposta" }),
  Inter: () => ({ className: "font-inter" }),
}));
beforeEach(() => setMatchMedia(() => false));
afterEach(() => { vi.useRealTimers(); setMatchMedia(() => false); });

function trigger(index: number) {
  return screen.getByRole("button", { name: site.curadoria.principles[index].title });
}

describe("Curadoria", () => {
  it("starts with three equally closed panels and keeps the approved text", () => {
    render(<Curadoria content={site.curadoria} />);
    expect(document.getElementById("curadoria")).toHaveAttribute("aria-labelledby", "curadoria-title");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(`${site.curadoria.line1} ${site.curadoria.line2}`);
    expect(screen.getByText(site.curadoria.text)).toBeInTheDocument();
    for (let i = 0; i < 3; i++) {
      expect(trigger(i)).toHaveAttribute("aria-expanded", "false");
      const panel = document.getElementById(trigger(i).getAttribute("aria-controls")!)!;
      expect(panel).toHaveAttribute("aria-hidden", "true");
      expect(panel).toHaveTextContent(site.curadoria.principles[i].text);
    }
  });

  it("opens one mobile panel at a time and closes it on a second tap", async () => {
    const user = userEvent.setup();
    render(<Curadoria content={site.curadoria} />);
    await user.click(trigger(0));
    expect(trigger(0)).toHaveAttribute("aria-expanded", "true");
    await user.click(trigger(1));
    expect(trigger(0)).toHaveAttribute("aria-expanded", "false");
    expect(trigger(1)).toHaveAttribute("aria-expanded", "true");
    await user.click(trigger(1));
    expect(trigger(1)).toHaveAttribute("aria-expanded", "false");
  });

  it("opens immediately with desktop keyboard focus and closes with Escape", async () => {
    setMatchMedia(query => query.includes("min-width: 1024px"));
    const user = userEvent.setup();
    render(<Curadoria content={site.curadoria} />);
    await user.tab();
    expect(trigger(0)).toHaveFocus();
    expect(trigger(0)).toHaveAttribute("aria-expanded", "true");
    await user.tab();
    expect(trigger(0)).toHaveAttribute("aria-expanded", "false");
    expect(trigger(1)).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(trigger(1)).toHaveAttribute("aria-expanded", "false");
    expect(trigger(1)).toHaveFocus();
  });

  it("waits for hover intent and cancels a pending opening when the pointer leaves", () => {
    vi.useFakeTimers();
    setMatchMedia(query => query.includes("min-width: 1024px"));
    render(<Curadoria content={site.curadoria} />);
    const first = trigger(0).closest("li")!;
    fireEvent.pointerEnter(first, { pointerType: "mouse" });
    expect(trigger(0)).toHaveAttribute("aria-expanded", "false");
    act(() => vi.advanceTimersByTime(120));
    expect(trigger(0)).toHaveAttribute("aria-expanded", "true");
    fireEvent.pointerLeave(first);
    const second = trigger(1).closest("li")!;
    fireEvent.pointerEnter(second, { pointerType: "mouse" });
    fireEvent.pointerLeave(second);
    act(() => vi.advanceTimersByTime(120));
    expect(screen.getAllByRole("button").every(button => button.getAttribute("aria-expanded") === "false")).toBe(true);
  });
});
