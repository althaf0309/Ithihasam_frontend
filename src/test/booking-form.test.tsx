import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { QuickBookingForm } from "@/components/QuickBookingForm";
import { LangProvider } from "@/contexts/LangContext";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const { toast } = await import("sonner");

function renderForm(props: Partial<Parameters<typeof QuickBookingForm>[0]> = {}) {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <LangProvider>
        <QuickBookingForm {...props} />
      </LangProvider>
    </QueryClientProvider>,
  );
}

async function fillValidBooking(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Anjana K");
  await user.type(screen.getByLabelText(/phone number/i), "9400096518");
  await user.selectOptions(screen.getByLabelText(/service required/i), "Painting Services");
  await user.type(screen.getByLabelText(/city \/ area/i), "Thalassery");
}

describe("QuickBookingForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // The form drops anything submitted within 3s of mount as bot traffic.
    vi.spyOn(Date, "now").mockReturnValue(1_000_000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("labels every field so it is reachable by name, not placeholder", () => {
    renderForm({ showMessageField: true });

    for (const label of [/full name/i, /email address/i, /phone number/i, /whatsapp number/i, /service required/i, /city \/ area/i, /preferred date/i, /message/i]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
  });

  it("blocks submission and reports the field when the phone number is invalid", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup({ advanceTimers: () => {} });

    renderForm();
    await user.type(screen.getByLabelText(/full name/i), "Anjana K");
    await user.type(screen.getByLabelText(/phone number/i), "12345");
    await user.selectOptions(screen.getByLabelText(/service required/i), "Painting Services");
    await user.type(screen.getByLabelText(/city \/ area/i), "Thalassery");

    vi.spyOn(Date, "now").mockReturnValue(1_010_000);
    await user.click(screen.getByRole("button", { name: /submit booking/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/10-digit mobile number/i);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("posts to the Django API, which is the system of record for leads", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ message: "Thank you! Your booking request has been received." }),
    });
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup({ advanceTimers: () => {} });

    renderForm();
    await fillValidBooking(user);

    vi.spyOn(Date, "now").mockReturnValue(1_010_000);
    await user.click(screen.getByRole("button", { name: /submit booking/i }));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalled());

    const [url, init] = fetchSpy.mock.calls[0];
    expect(String(url)).toMatch(/\/api\/contact\/$/);
    expect(JSON.parse(init.body)).toMatchObject({
      name: "Anjana K",
      phone: "9400096518",
      service: "Painting Services",
      city: "Thalassery",
    });
    await waitFor(() => expect(toast.success).toHaveBeenCalled());
  });

  it("does not fall back to email when the server throttles the request", async () => {
    const fetchSpy = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ detail: "Request was throttled." }),
    });
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup({ advanceTimers: () => {} });

    renderForm();
    await fillValidBooking(user);

    vi.spyOn(Date, "now").mockReturnValue(1_010_000);
    await user.click(screen.getByRole("button", { name: /submit booking/i }));

    // Exactly one call: routing a throttled request to Web3Forms would defeat
    // the rate limit the backend just applied.
    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("silently drops submissions that fill the honeypot", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup({ advanceTimers: () => {} });

    const { container } = renderForm();
    await fillValidBooking(user);

    const honeypot = container.querySelector<HTMLInputElement>('input[name="company_website"]');
    expect(honeypot).not.toBeNull();
    honeypot!.value = "https://spam.example";

    vi.spyOn(Date, "now").mockReturnValue(1_010_000);
    await user.click(screen.getByRole("button", { name: /submit booking/i }));

    await waitFor(() => expect(toast.success).toHaveBeenCalled());
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects a submission completed faster than a human could read the form", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const user = userEvent.setup({ advanceTimers: () => {} });

    renderForm();
    await fillValidBooking(user);

    // Date.now() is still at mount time, so no time has passed.
    await user.click(screen.getByRole("button", { name: /submit booking/i }));

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
