import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  mensaje: z.string().min(10),
});

const CONTACT_EMAIL_TO = 'comunicacion@colonia.cloud';
const CONTACT_EMAIL_FROM = 'Colonia Cloud <onboarding@resend.dev>';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY no está configurada');
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  const { nombre, email, mensaje } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
    });

    if (error) {
      console.error('Error enviando email vía Resend:', error);
      return NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error inesperado enviando email de contacto:', err);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }
}
