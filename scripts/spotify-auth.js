import express from 'express';
import axios from 'axios';
import { exec } from 'child_process';

const client_id = '241bfbbc9ef64ceba42a8aa0217c6320'.trim();
const client_secret = 'ee37794e46f6442f87fba77aed59cc48'.trim();
const redirect_uri = 'http://127.0.0.1:3000';
const scope = 'user-read-currently-playing user-read-recently-played user-top-read';

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
