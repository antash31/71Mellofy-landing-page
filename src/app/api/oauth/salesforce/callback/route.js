import { createClient } from '@/utils/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
  
    if (error || !code) {
      return NextResponse.redirect(new URL(`/dashboard?error=${error || 'Missing code'}`, request.url));
    }
  
    const { userId } = JSON.parse(decodeURIComponent(state));
  
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.CRM_SALESFORCE_CLIENT_ID, 
      client_secret: process.env.CRM_SALESFORCE_CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_SALESFORCE_CALL_BACK,
    });
  
    const response = await fetch('https://login.salesforce.com/services/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL('/dashboard?error=Token exchange failed', request.url));
    }

     const tokenData = await response.json();
    
    if (!tokenData.access_token || !tokenData.issued_at || !tokenData.instance_url) {
      console.error('Invalid token data received:', tokenData);
      return NextResponse.redirect(new URL('/dashboard?error=Invalid token data', request.url));
    }
    
    
    const SALESFORCE_TOKEN_LIFETIME = 2 * 60 * 60; 
    const issuedAtMs = parseInt(tokenData.issued_at, 10);
    const expiresAtMs = issuedAtMs + (SALESFORCE_TOKEN_LIFETIME * 1000);
      
    const supabase = await createClient(); 
    const { error: dbError } = await supabase
      .from('crm_connections')
      .upsert({
        user_id: userId, 
        crm_type: 'salesforce',
         access_token: tokenData.access_token,
         refresh_token: tokenData.refresh_token,
         expires_at: new Date(expiresAtMs).toISOString(),
         instance_url: tokenData.instance_url,
         created_at: new Date(issuedAtMs).toISOString(),
      });
  
    if (dbError) {
      return NextResponse.redirect(new URL('/dashboard?error=Failed to save', request.url));
    }
  
    return NextResponse.redirect(new URL('/dashboard?success=Connected', request.url));
  }
  