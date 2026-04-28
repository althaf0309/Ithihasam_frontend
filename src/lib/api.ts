const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "363780d2-d8e4-4fb3-ae62-ebfc13d91418";

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

export async function createBookingSubmission(payload: BookingSubmissionPayload) {
  const sourcePage = typeof window !== "undefined" ? window.location.pathname : "/";
  const pageUrl = typeof window !== "undefined" ? window.location.href : undefined;
  const subject = `New ${payload.service} enquiry from ${payload.name}`;

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject,
      from_name: "Ithihasam Website",
      replyto: payload.email || undefined,
      botcheck: false,
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

  return {
    success: true,
    message,
    data: typeof data === "object" && data !== null && "data" in data ? data.data as BookingSubmissionResponse["data"] : undefined,
  } satisfies BookingSubmissionResponse;
}

export { API_BASE_URL };
