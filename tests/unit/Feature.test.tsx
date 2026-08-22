import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMockRoom } from "@baditaflorin/mesh-common/testing";
import { Feature } from "../../src/Feature";
import { config } from "../../src/config";

describe("Feature (component)", () => {
  it("adds a peer-attributed shared note", () => {
    const room = createMockRoom();
    render(<Feature room={room} config={config} />);
    fireEvent.change(screen.getByLabelText("New note"), {
      target: { value: "Keep it shared" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add note" }));
    expect(screen.getByText("Keep it shared")).toBeInTheDocument();
    expect(screen.getByText("1 shared note")).toBeInTheDocument();
  });

  it("shows a connecting state when room is null", () => {
    render(<Feature room={null} config={config} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Note Pile");
  });
});
