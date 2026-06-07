import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!isValidEmail(String(email))) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (String(message).length > 5000) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? "rohityadav.nitkkr@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    if (!apiKey) {
      // Allow local dev without a key: log and succeed so the UI flow can be tested.
      console.warn("[contact] RESEND_API_KEY not set — submission logged only:", {
        name,
        email,
        message,
      });
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to: [to],
      replyTo: String(email),
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: "Could not send. Try emailing directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
