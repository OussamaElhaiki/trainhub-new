import { render, screen } from "@testing-library/react" 
import { trainFormSchema } from "@/types/train-t"
import { stationFormSchema } from "@/types/station-t"
import { registerSchema } from "@/dto/register-dto"
import { loginSchema } from "@/utils/login-validator"
import { cn } from "@/lib/utils"
import { ScheduleStatus } from "@/constants/status"
import { Role } from "@/constants/role"

// ── UI ──────────────────────────────────────────────────────────────────────

function Greeting({ name }: { name: string }) {
  return <h1>Hello {name}</h1>
}

test("renders greeting", () => {
  render(<Greeting name="Vilnius" />)
  expect(screen.getByText("Hello Vilnius")).toBeInTheDocument()
})

// ── cn() utility ─────────────────────────────────────────────────────────────

test("cn merges class names", () => {
  expect(cn("text-white", "bg-black")).toBe("text-white bg-black")
})

test("cn handles conditional classes", () => {
  expect(cn("base", false && "hidden", "visible")).toBe("base visible")
})

// ── trainFormSchema ──────────────────────────────────────────────────────────

test("trainFormSchema accepts valid train number", () => {
  const result = trainFormSchema.safeParse({ trainNumber: "IC-001" })
  expect(result.success).toBe(true)
})

test("trainFormSchema rejects empty train number", () => {
  const result = trainFormSchema.safeParse({ trainNumber: "" })
  expect(result.success).toBe(false)
})

test("trainFormSchema rejects numbers-only train number", () => {
  const result = trainFormSchema.safeParse({ trainNumber: "12345" })
  expect(result.success).toBe(false)
})

// ── stationFormSchema ────────────────────────────────────────────────────────

test("stationFormSchema accepts valid station name", () => {
  const result = stationFormSchema.safeParse({ name: "Kaunas" })
  expect(result.success).toBe(true)
})

test("stationFormSchema rejects station name with numbers", () => {
  const result = stationFormSchema.safeParse({ name: "Station123" })
  expect(result.success).toBe(false)
})

// ── registerSchema ───────────────────────────────────────────────────────────

test("registerSchema rejects mismatched passwords", () => {
  const result = registerSchema.safeParse({
    name: "Napo",
    email: "napo@panko.lt",
    password: "12345678",
    confirmPassword: "different",
  })
  expect(result.success).toBe(false)
})

test("registerSchema accepts valid registration data", () => {
  const result = registerSchema.safeParse({
    name: "Napo",
    email: "napo@panko.lt",
    password: "12345678",
    confirmPassword: "12345678",
  })
  expect(result.success).toBe(true)
})

// ── loginSchema ──────────────────────────────────────────────────────────────

test("loginSchema rejects invalid email", () => {
  const result = loginSchema.safeParse({ email: "not-an-email", password: "12345678" })
  expect(result.success).toBe(false)
})

// ── enums ────────────────────────────────────────────────────────────────────

test("ScheduleStatus enum has OnTime value", () => {
  expect(ScheduleStatus.OnTime).toBe("on-time")
})

test("Role enum has Administrator value", () => {
  expect(Role.Administrator).toBe("administrator")
})
