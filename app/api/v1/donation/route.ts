import { createDonation, getDonations, insertDonationSchema } from "@/lib/models/donations";


export async function POST(request: Request) {
    // TODO: Add auth
    const body = await request.json();
    const donation = insertDonationSchema.parse(body);
    const createdDonation = await createDonation(donation);
    return Response.json(createdDonation);
}

export async function GET(request: Request) {
    // TODO: Add auth
    const { searchParams } = new URL(request.url);

    // TODO: Get userId from auth
    const userId = searchParams.get('userId');
    if (!userId) {
        return Response.json({ error: 'userId is required' }, { status: 400 });
    }
    const donations = await getDonations(userId);
    // TODO: Add pagination
    return Response.json(donations);
}