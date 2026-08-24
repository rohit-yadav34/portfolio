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
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    if (!isValidEmail(String(email))) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (String(message).length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (max 5000 characters)." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || "rohityadav.nitkkr@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    // 1. If no API key is provided, log to server console and succeed gracefully (Dev Mode)
    if (!apiKey) {
      console.log("📬 [Contact Form Submission - Dev Mode]:", {
        name,
        email,
        message,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json({ ok: true, dev: true });
    }

    // 2. Send with Resend
    const resend = new Resend(apiKey);
    let sendResult = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to: [to],
      replyTo: String(email),
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // If custom domain failed, retry with default onboarding sender
    if (sendResult.error && from !== "onboarding@resend.dev") {
      console.warn(
        `[contact] Failed with ${from}, retrying with onboarding@resend.dev:`,
        sendResult.error
      );
      sendResult = await resend.emails.send({
        from: `Portfolio <onboarding@resend.dev>`,
        to: [to],
        replyTo: String(email),
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    }

    if (sendResult.error) {
      console.error("[contact] Resend delivery error:", sendResult.error);
      const errMsg =
        sendResult.error.message ||
        "Could not send email. Please use the direct email link below.";
      return NextResponse.json({ error: errMsg }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[contact] Unexpected submission error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please reach out via email directly." },
      { status: 500 }
    );
  }
}
