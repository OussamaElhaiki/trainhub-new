import { render, screen } from "@testing-library/react"

function Greeting({ name }: { name: string }) {
  return <h1>Hello {name}</h1>
}

test("renders greeting", () => {
  render(<Greeting name="Vilnius" />)
  expect(screen.getByText("Hello Vilnius")).toBeInTheDocument()
})