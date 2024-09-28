import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { Webhook } from "svix"
import { buffer } from "micro"

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
)

const webhookSecret = "REPLACE"

export async function GET(req: Request) {
    return NextResponse.json({"hello": "world"})
}

export async function POST(req: Request) {
    // try {
    //     const svix_id = req.headers.get("svix-id") ?? "";
    //     const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
    //     const svix_signature = req.headers.get("svix-signature") ?? "";
    //     const body = await req.text();

    //     const sivx = new Webhook(webhookSecret);

    //     const msg = sivx.verify(body, {
    //         "svix-id": svix_id,
    //         "svix-timestamp": svix_timestamp,
    //         "svix-signature": svix_signature,
    //       });
    //     console.log(msg)
        
    // } catch (error) {
    //     console.log('Unauthorized usage')
    //     return NextResponse.json({ error }, { status: 400})
    // }

    try {
        const event: WebhookEvent = await req.json();
        const eventType = event.type;
        if ('email_addresses' in event.data) {
            const { id, email_addresses } = event.data;
            
            if (eventType === 'user.created') {
                const { data, error } = await supabase
                    .from('users')
                    .insert({
                        id: id,
                        email: email_addresses[0].email_address
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
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}