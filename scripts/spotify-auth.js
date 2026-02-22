import express from 'express';
import axios from 'axios';
import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client_id = process.env.SPOTIFY_CLIENT_ID?.trim();
const client_secret = process.env.SPOTIFY_CLIENT_SECRET?.trim();
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI?.trim() || 'http://127.0.0.1:3000';
const scope = 'user-read-currently-playing user-read-recently-played user-top-read';

if (!client_id || !client_secret) {
	console.error('\x1b[31m%s\x1b[0m', 'Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local');
	process.exit(1);
}

const app = express();
const port = 3000;

const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

app.get('/', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.send('No code found in the URL. Please try again.');
    }

    try {
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
        const response = await axios.post('https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri
            }).toString(),
            {
                headers: {
                    'Authorization': `Basic ${basic}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const { refresh_token } = response.data;

        console.log('\n\x1b[32m--- SUCCESS! ---\x1b[0m');
        console.log('Your Refresh Token is:');
        console.log('\x1b[33m%s\x1b[0m', refresh_token);
        console.log('\nPaste this into your .env.local and Vercel dashboard.');

        res.send(`
			<div style="font-family: sans-serif; padding: 40px; text-align: center;">
				<h1 style="color: #1DB954;">Success!</h1>
				<p>You can close this window now. Check your terminal for the token.</p>
			</div>
		`);

        process.exit(0);
    } catch (error) {
        console.error('\n\x1b[31m--- ERROR ---\x1b[0m');
        console.error(error.response?.data || error.message);
        res.status(500).send('Error exchanging code for token. Check terminal.');
    }
});

app.listen(port, () => {
    console.log('\x1b[36m%s\x1b[0m', '\n--- SPOTIFY AUTOMATIC TOKEN FETCHER ---');
    console.log('1. Ensure http://127.0.0.1:3000 is added as a Redirect URI in your dashboard.');
    console.log('2. Opening your browser for authorization...');
    console.log('\x1b[34m%s\x1b[0m', authUrl);

    // Open browser automatically
    exec(`open "${authUrl}"`);
});
