const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Configured via VITE_WEB3FORMS_ACCESS_KEY. There is deliberately no hardcoded
// fallback: any key committed here ships in the JS bundle, and anyone reading it
// can post unlimited mail to the business inbox. With no key configured the
// email fallback is simply skipped and the backend stays the only destination.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

export class ApiError extends Error {
  details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.details = details;
  }
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string;
  featured: boolean;
  published_at: string;
  published_label: string;
  read_time_minutes: number;
  read_time_label: string;
  author_name: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
  meta_title: string;
  meta_description: string;
}

export interface BookingSubmissionPayload {
  name: string;
  email?: string;
  phone: string;
  whatsapp?: string;
  service: string;
  city: string;
  preferred_date?: string | null;
  message?: string;
}

export interface BookingSubmissionResponse {
  success: boolean;
  message: string;
  data?: BookingSubmissionPayload & {
    access_key?: string;
    subject?: string;
    from_name?: string;
    replyto?: string;
    source_page?: string;
    page_url?: string;
  };
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const details = payload;
    const message =
      typeof payload === "object" && payload !== null && "message" in payload
        ? String(payload.message)
        : "Something went wrong while talking to the server.";
    throw new ApiError(message, details);
  }

  return payload as T;
}

export function fetchBlogPosts() {
  return apiRequest<BlogPostSummary[]>("/blog/");
}

export function fetchBlogPost(slug: string) {
  return apiRequest<BlogPostDetail>(`/blog/${slug}/`);
}

function extractWeb3FormsMessage(payload: unknown) {
  if (typeof payload === "object" && payload !== null) {
    if ("message" in payload && typeof payload.message === "string") {
      return payload.message;
    }

    if (
      "body" in payload &&
      typeof payload.body === "object" &&
      payload.body !== null &&
      "message" in payload.body &&
      typeof payload.body.message === "string"
    ) {
      return payload.body.message;
    }
  }

  return "Your enquiry has been sent successfully.";
}

async function submitToBackend(payload: BookingSubmissionPayload, subject: string) {
  const response = await fetch(`${API_BASE_URL}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...payload, subject }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // 429 is the server's throttle. Surface it plainly rather than retrying,
    // and never fall through to the email fallback — that would defeat the limit.
    if (response.status === 429) {
      throw new ApiError(
        "You have sent several booking requests recently. Please call or WhatsApp us instead.",
        data,
      );
    }
    throw new ApiError("Backend rejected the booking.", data);
  }

  return data;
}

async function submitToWeb3Forms(payload: BookingSubmissionPayload, subject: string) {
  if (!WEB3FORMS_ACCESS_KEY) {
    throw new ApiError(
      "We couldn't reach our booking service. Please call or WhatsApp us and we'll take your request directly.",
    );
  }

  const sourcePage = typeof window !== "undefined" ? window.location.pathname : "/";
  const pageUrl = typeof window !== "undefined" ? window.location.href : undefined;

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject,
      from_name: "Ithihasam Website",
      replyto: payload.email || undefined,
      source_page: sourcePage,
      page_url: pageUrl,
      ...payload,
    }),
  });

  const data = await response.json().catch(() => null);
  const message = extractWeb3FormsMessage(data);

  if (!response.ok || !data?.success) {
    throw new ApiError(message || "Unable to send your enquiry right now.", data);
  }

  return { message, data };
}

/**
 * Submits a booking.
 *
 * The Django API is the system of record: it persists the enquiry so it appears
 * in the admin and survives an email failure, and it enforces the per-IP rate
 * limit. Web3Forms is only a fallback for when the backend is unreachable, so a
 * lead is never silently lost — previously it was the *only* destination, which
 * meant no booking was ever stored anywhere.
 */
export async function createBookingSubmission(payload: BookingSubmissionPayload) {
  const subject = `New ${payload.service} enquiry from ${payload.name}`;

  try {
    const data = await submitToBackend(payload, subject);
    return {
      success: true,
      message:
        typeof data === "object" && data !== null && "message" in data
          ? String((data as { message: unknown }).message)
          : "Booking request received.",
      data: undefined,
    } satisfies BookingSubmissionResponse;
  } catch (error) {
    // A throttle rejection is a decision, not an outage. Do not route around it.
    if (error instanceof ApiError && error.message.startsWith("You have sent several")) {
      throw error;
    }

    if (import.meta.env.DEV) {
      console.warn("Booking API unavailable, falling back to Web3Forms.", error);
    }

    const { message } = await submitToWeb3Forms(payload, subject);
    return { success: true, message, data: undefined } satisfies BookingSubmissionResponse;
  }
}

export { API_BASE_URL };
