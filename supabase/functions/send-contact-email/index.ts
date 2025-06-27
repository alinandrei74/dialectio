import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Parse request body
    const { name, email, subject, message }: ContactFormData = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, and message are required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Get Resend API key from environment
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not found in environment variables");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Prepare email content
    const emailSubject = subject ? `[dialectio.xyz] ${subject}` : `[dialectio.xyz] Nuevo mensaje de contacto`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nuevo mensaje de contacto - dialectio.xyz</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2563eb, #3b82f6);
              color: white;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .content {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #2563eb;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
              color: #2563eb;
              display: block;
              margin-bottom: 5px;
            }
            .value {
              background: white;
              padding: 10px;
              border-radius: 4px;
              border: 1px solid #e5e7eb;
            }
            .message {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              font-size: 12px;
              color: #6b7280;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🌐 dialectio.xyz</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Nuevo mensaje de contacto</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">👤 Nombre:</span>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <span class="label">📧 Email:</span>
              <div class="value">${email}</div>
            </div>
            
            ${subject ? `
            <div class="field">
              <span class="label">📋 Asunto:</span>
              <div class="value">${subject}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <span class="label">💬 Mensaje:</span>
              <div class="value message">${message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de dialectio.xyz</p>
            <p>Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</p>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Nuevo mensaje de contacto - dialectio.xyz

Nombre: ${name}
Email: ${email}
${subject ? `Asunto: ${subject}` : ''}

Mensaje:
${message}

---
Este mensaje fue enviado desde el formulario de contacto de dialectio.xyz
Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
    `;

    // Send email using Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "dialectio.xyz <noreply@dialectio.xyz>", // Replace with your verified sender domain
        to: ["team@dialectio.xyz"], // Updated to team@dialectio.xyz
        reply_to: email,
        subject: emailSubject,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error("Resend API error:", errorData);
      
      return new Response(
        JSON.stringify({ 
          error: "Failed to send email",
          details: resendResponse.status === 422 ? "Invalid email configuration" : "Email service error"
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const resendData = await resendResponse.json();
    console.log("Email sent successfully:", resendData);

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully",
        id: resendData.id 
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});