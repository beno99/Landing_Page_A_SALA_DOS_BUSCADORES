import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { setMatchMedia } from "@/vitest.setup";
import { Salas } from "./Salas";
import { CosmosVideo } from "@/components/motion/CosmosVideo";

describe("Salas", () => {
  it("tunnel: title and one link with each Sala's name", () => {
    setMatchMedia(() => false);
    render(<Salas content={site.salas} />);
    expect(screen.getByRole("heading", { name: "Conhecimentos que abrem novas perspectivas." })).toBeInTheDocument();
    // Each of the eight covers is reachable exactly once; the closing repeat is hidden from AT and Tab.
    for (const sala of site.salas.salas) {
      expect(screen.getByRole("link", { name: sala.name })).toHaveAttribute("href", sala.href);
    }
    expect(screen.getAllByRole("link")).toHaveLength(8);
    const all = document.querySelectorAll("#salas a");
    expect(all).toHaveLength(9);
    const repeat = [...all].filter((a) => a.getAttribute("aria-hidden") === "true");
    expect(repeat).toHaveLength(1);
    expect(repeat[0]).toHaveAttribute("tabindex", "-1");
    expect(document.querySelector("[data-tunnel]")).toBeInTheDocument();
  });

  it("YouTube covers open in a new tab, Portal Salas in the same tab", () => {
    setMatchMedia(() => false);
    render(<Salas content={site.salas} />);
    for (const sala of site.salas.salas) {
      const link = screen.getByRole("link", { name: sala.name });
      if (sala.external) expect(link).toHaveAttribute("target", "_blank");
      else expect(link).not.toHaveAttribute("target");
    }
  });

  it("reduced motion: grid with no tunnel", () => {
    setMatchMedia((q) => q.includes("reduce"));
    render(<Salas content={site.salas} />);
    expect(document.querySelector("[data-tunnel]")).not.toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(site.salas.salas.length);
    setMatchMedia(() => false);
  });
});

describe("CosmosVideo", () => {
  it("renders the looping cosmos video (muted, inline, no controls) with both sources", () => {
    setMatchMedia(() => false);
    render(<CosmosVideo />);
    const video = screen.getByTestId("cosmos-video") as HTMLVideoElement;
    expect(video).toHaveAttribute("poster", "/images/salas/space.webp");
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.autoplay).toBe(true);
    expect(video).not.toHaveAttribute("controls");
    expect([...video.querySelectorAll("source")].map((s) => s.getAttribute("src"))).toEqual([
      "/assets/hero/cosmos-1920.webm",
      "/assets/hero/cosmos-1920.mp4",
      "/assets/hero/cosmos-1080.webm",
      "/assets/hero/cosmos-1080.mp4",
    ]);
  });

  it("reduced motion: renders the still poster, no video", () => {
    setMatchMedia((q) => q.includes("reduce"));
    const { container } = render(<CosmosVideo />);
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("img")).toHaveAttribute("src", expect.stringContaining("space.webp"));
    setMatchMedia(() => false);
  });
});
