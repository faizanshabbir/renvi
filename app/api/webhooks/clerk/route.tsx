import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { Webhook } from "svix"

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
)

const webhookSecret = process.env.CLERK_SVIX_WEBHOOK_SECRET_KEY

export async function GET(req: Request) {
    return NextResponse.json({"hello": "world"})
}

export async function POST(req: Request) {
    console.log(webhookSecret)
    try {
        const svix_id = req.headers.get("svix-id") ?? "";
        const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
        const svix_signature = req.headers.get("svix-signature") ?? "";
        const body = await req.text();

        // Ensure webhookSecret is not undefined
        if (!webhookSecret) {
            throw new Error("Webhook secret is not defined");
        }

        const svix = new Webhook(webhookSecret);

        const msg = svix.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
          });
        console.log(msg)
        
    } catch (error) {
        console.log('Unauthorized usage')
        return NextResponse.json({ error }, { status: 400})
    }

    try {
        const event: WebhookEvent = await req.json();
        const eventType = event.type;
        if ('email_addresses' in event.data) {
            const { id, email_addresses } = event.data;
            
            if (eventType === 'user.created') {
                const { data, error } = await supabase
                    .from('users')
                    .insert({
                        clerk_user_id: id,
                        email_address: email_addresses[0].email_address
                    });

                if (error) throw error;
            } else if (eventType === 'user.deleted') {
                const { data, error } = await supabase
                    .from('users')
                    .delete()
                    .match({ id: id });

                if (error) throw error;
            }

            return NextResponse.json({ success: true });
        }
        console.log(event.data)
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}