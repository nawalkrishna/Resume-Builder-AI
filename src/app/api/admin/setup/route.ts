import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// This is a one-time setup endpoint to create the initial admin user
// IMPORTANT: Remove or secure this endpoint after initial setup in production

const ADMIN_EMAIL = "vikas@networkershome.com";

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();

        // Get the currently logged in user
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Check if the user's email matches the admin email
        if (user.email !== ADMIN_EMAIL) {
            return NextResponse.json({
                error: "Unauthorized. Only " + ADMIN_EMAIL + " can become admin."
            }, { status: 403 });
        }

        // Check if already an admin
        const { data: existingAdmin } = await supabase
            .from("admin_users")
            .select("*")
            .eq("user_id", user.id)
            .single();

        if (existingAdmin) {
            return NextResponse.json({
                message: "Already an admin",
                role: existingAdmin.role
            });
        }

        // Make this user a super admin
        const { error } = await supabase
            .from("admin_users")
            .insert({
                user_id: user.id,
                role: "super_admin",
            });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "Successfully set up as super admin!",
            redirect: "/admin"
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        message: "Admin setup endpoint. POST to this endpoint while logged in as " + ADMIN_EMAIL + " to become admin."
    });
}
