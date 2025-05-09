import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PersonalInformationButton from "../../../components/buttons/personal_information_button";
import { TestWrapper } from "../../test-utils";

describe("PersonalInformationButton Component", () => {
  test("renders personal information button", () => {
    render(
      <TestWrapper>
        <PersonalInformationButton />
      </TestWrapper>
    );
    
    const button = screen.getByTestId("personal-info-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/personal info/i);
  });
});
