/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { UserContext } from "../../lib/context";
import AuthCheck from "../AuthCheck";

jest.mock("../../lib/context");

describe("AuthCheck", () => {
  it("renders children when logged in", () => {
    // Given
    UserContext._currentValue = { username: "username" };
    // When
    const { getByText } = render(
      <AuthCheck>
        <p>Children</p>
      </AuthCheck>
    );
    // Then
    expect(getByText("Children")).toBeTruthy();
  });

  it("renders fallback when not logged in", () => {
    // Given
    UserContext._currentValue = { username: null };

    // When
    const { getByText } = render(
      <AuthCheck fallback={<p>Fallback</p>}>
        <p>Children</p>
      </AuthCheck>
    );
    // Then
    expect(getByText("Fallback")).toBeTruthy();
  });

  it("Renders a Link when no fallback is provided and not logged in", () => {
    // Given
    UserContext._currentValue = { username: null };

    // When
    const { getByText } = render(
      <AuthCheck>
        <p>Children</p>
      </AuthCheck>
    );
    // Then
    expect(getByText("You must be signed in...")).toBeTruthy();
  });
});
