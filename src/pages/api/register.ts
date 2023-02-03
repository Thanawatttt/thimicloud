// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    error: string | undefined
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { email, password } = req.body;
    const supabase = createServerSupabaseClient({ req, res }, { supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY });
    const rs2 = await supabase
        .from('allowedEmails')
        .select('*')
        .eq('email', email);
    if (rs2.error) {
        return res.status(500).json({ error: rs2.error.message });
    }
    if (rs2.data.length !== 1) {
        return res.status(401).json({ error: "This email is not on the allowed list. Ask admin for permission." });
    }
    if (rs2.data[0].used) {
        return res.status(401).json({ error: "This email is already in use" });
    }
    const rs3 = await supabase
        .from('allowedEmails')
        .update({ used: true })
        .eq('id', rs2.data[0].id);
    const rs1 = await supabase.auth.signUp({ email, password })
    if (!rs1.error) {
        const rs = await supabase
            .from('userPlans')
            .insert({ plan: 1, userid: rs1?.data?.user?.id });
        if (rs.error) {
            return res.status(400).json({ error: rs.error.message });
        }
    }
    res.status(200).json({ error: rs1?.error?.message })
}
