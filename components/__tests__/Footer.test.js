/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { UserContext } from "../../lib/context";
import Footer from "../../components/Footer";

jest.mock("../../lib/context");
jest.mock("../../pages/index.js");
jest.mock("firebase/auth");

describe("Footer", () => {
  beforeEach(() => {
    UserContext._currentValue = { username: "username" };
  });
  it("renders sign out button when logged in", () => {
    // Given
    // When
    const {} = render(<Footer />);
    // Then
    expect(getByText("Sign Out")).toBeTruthy();
  });

  it("renders sign up button when not logged in", () => {
    // Given
    UserContext._currentValue = { username: null };

    // When
    const { getByText } = render(<Footer />);
    // Then
    expect(getByText("Sign up/Login")).toBeTruthy();
  });
});
