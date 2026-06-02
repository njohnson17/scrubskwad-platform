type AdminBookingNotification = {
  bookingId: string;
  customerName?: string;
  customerEmail?: string;
  serviceType: string;
  priceEstimate: number;
};

type CustomerEmailInput = {
  to: string;
  subject: string;
  heading: string;
  preview: string;
  body: string;
  ctaLabel?: string;
  ctaUrl?: string;
};

async function sendEmail(input: CustomerEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ADMIN_NOTIFICATION_FROM;

  if (!apiKey || !from) {
    return { skipped: true, reason: "Resend environment variables are not configured." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: input.to,
      subject: input.subject,
      html: renderPremiumEmail(input)
    })
  });

  if (!response.ok) return { skipped: false, error: await response.text() };
  return { skipped: false, sent: true };
}

export async function sendAdminBookingNotification(input: AdminBookingNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_TO;
  const from = process.env.ADMIN_NOTIFICATION_FROM;

  if (!apiKey || !to || !from) {
    return { skipped: true, reason: "Resend environment variables are not configured." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New ScrubSkwad quote request: ${input.serviceType}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#272727">
          <h1>New quote request</h1>
          <p><strong>Booking:</strong> ${input.bookingId}</p>
          <p><strong>Customer:</strong> ${input.customerName ?? "Not provided"}</p>
          <p><strong>Email:</strong> ${input.customerEmail ?? "Not provided"}</p>
          <p><strong>Service:</strong> ${input.serviceType}</p>
          <p><strong>Estimate:</strong> £${input.priceEstimate.toFixed(2)}</p>
        </div>
      `
    })
  });

  if (!response.ok) {
    return { skipped: false, error: await response.text() };
  }

  return { skipped: false, sent: true };
}

export async function sendBookingApprovedEmail(to: string, bookingId: string, depositUrl?: string) {
  return sendEmail({
    to,
    subject: "Your ScrubSkwad quote has been approved",
    heading: "Your quote is approved",
    preview: "Your ScrubSkwad booking is ready for deposit.",
    body: `Your quote request ${bookingId} has been reviewed and approved. Pay the 50% deposit to confirm your booking.`,
    ctaLabel: depositUrl ? "Pay deposit" : undefined,
    ctaUrl: depositUrl
  });
}

export async function sendDepositRequestedEmail(to: string, bookingId: string, depositUrl: string) {
  return sendEmail({
    to,
    subject: "Deposit required to confirm your ScrubSkwad booking",
    heading: "Deposit required",
    preview: "Your booking is awaiting deposit payment.",
    body: `Booking ${bookingId} is awaiting the 50% deposit. Once paid, your booking will move to confirmed status.`,
    ctaLabel: "Pay deposit",
    ctaUrl: depositUrl
  });
}

export async function sendPaymentConfirmationEmail(to: string, bookingId: string) {
  return sendEmail({
    to,
    subject: "ScrubSkwad deposit received",
    heading: "Deposit received",
    preview: "Your payment has been confirmed.",
    body: `Your deposit for booking ${bookingId} has been received. The team will prepare the final service schedule.`
  });
}

export async function sendBookingRejectedEmail(to: string, bookingId: string) {
  return sendEmail({
    to,
    subject: "Update on your ScrubSkwad quote request",
    heading: "Quote request update",
    preview: "We are unable to approve this request as submitted.",
    body: `We reviewed booking ${bookingId} and are unable to approve it as submitted. The team may contact you if an alternative is possible.`
  });
}

export async function sendBookingReminderEmail(to: string, bookingId: string) {
  return sendEmail({
    to,
    subject: "Reminder for your upcoming ScrubSkwad booking",
    heading: "Upcoming booking reminder",
    preview: "Your ScrubSkwad booking is coming up.",
    body: `This is a reminder for booking ${bookingId}. Please make sure access details and instructions are up to date.`
  });
}

function renderPremiumEmail(input: CustomerEmailInput) {
  const cta = input.ctaUrl
    ? `<p style="margin:28px 0"><a href="${input.ctaUrl}" style="background:#272727;color:#fff;padding:13px 20px;border-radius:8px;text-decoration:none;font-weight:700">${input.ctaLabel}</a></p>`
    : "";

  return `
    <div style="margin:0;background:#f2f2f2;padding:32px 16px;font-family:Arial,sans-serif;color:#272727">
      <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #e6e2e2">
        <p style="margin:0 0 12px;color:#858585;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">ScrubSkwad</p>
        <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2">${input.heading}</h1>
        <p style="margin:0 0 20px;color:#858585">${input.preview}</p>
        <p style="margin:0;font-size:16px;line-height:1.6">${input.body}</p>
        ${cta}
      </div>
    </div>
  `;
}
