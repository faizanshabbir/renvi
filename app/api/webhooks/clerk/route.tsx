import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { Webhook } from "svix"

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
)

const webhookSecret = process.env.CLERK_SVIX_WEBHOOK_SECRET_KEY

export async function GET(req: Request) {
    return NextResponse.json({"hello": "world"})
}

export async function POST(req: Request) {
    const body = await req.text();

    try {
        const svix_id = req.headers.get("svix-id") ?? "";
        const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
        const svix_signature = req.headers.get("svix-signature") ?? "";

        // Ensure webhookSecret is not undefined
        if (!webhookSecret) {
            throw new Error("Webhook secret is not defined");
        }

        const svix = new Webhook(webhookSecret);
        let msg;
        msg = svix.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
        
    } catch (error) {
        return NextResponse.json({ error }, { status: 400})
    }

    try {
        // Convert the request body to JSON before processing
        const requestBody = JSON.parse(body);
        const event: WebhookEvent = requestBody;
        const eventType = event.type;

        const id = event.data.id;
        
        if (eventType === 'user.created') {
            const email_addresses = event.data.email_addresses
            const { data, error } = await supabase
                .from('users')
                .insert({
                    clerk_user_id: id,
                    email_address: email_addresses[0].email_address
                });

            if (error) throw error;
            // TODO: this may need to be fixed to prevent abuse?
            // Works if user deletes account, recreates. Which is good and bad
            // Best in the future is to probably "deactivate" account instead of full delete
            const creditsInsertResult = await supabase
                .from('credits')
                .upsert({
                    clerk_user_id: id,
                    num_credits: 5
                })
            if (creditsInsertResult.error) throw creditsInsertResult.error;
            
        } else if (eventType === 'user.deleted') {
            console.log("Deleting user")
            const { data, error } = await supabase
                .from('users')
                .delete()
                .match({ clerk_user_id: id });

            if (error) throw error;
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
