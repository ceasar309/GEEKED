export async function initiateMpesaPayment(
  phone: string,
  amount: number,
  orderId: string
) {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const passkey = process.env.MPESA_PASSKEY;
  const shortCode = process.env.MPESA_SHORTCODE;

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const tokenRes = await fetch(
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const { access_token } = await tokenRes.json();

  const res = await fetch(
    "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(amount),
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: `${process.env.NEXT_PUBLIC_URL}/api/mpesa/callback`,
        AccountReference: orderId,
        TransactionDesc: "GEEKED Payment",
      }),
    }
  );

  return res.json();
}
