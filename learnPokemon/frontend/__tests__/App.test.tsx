import React from "react"
import {render, screen} from "@testing-library/react"
import '@testing-library/jest-dom/jest-globals';
import {it, expect} from '@jest/globals';
import App from "..//src/App"

it("should have Vite text", () => {
    render(<App />) //ARRANGE

    const myElem = screen.getByText("Vite") // ACT

    expect(myElem).toBeInTheDocument() // ASSERT
})