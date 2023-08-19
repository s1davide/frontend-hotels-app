import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Index from "src/pages/index"

test("renders MyComponent", () => {
    render(<Index />)
    const linkElement = screen.getByText(/Index/i)
    expect(linkElement).toBeInTheDocument()
})
