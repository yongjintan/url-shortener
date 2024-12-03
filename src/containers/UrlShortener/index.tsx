import React, { useState } from 'react';
import axios from 'axios';
import './UrlShortener.css';

const UrlShortener: React.FC = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleClick = async () => {
        if (!originalUrl || !isValidUrl(originalUrl)) {
            alert('Please enter a valid URL.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/shorten`, {
                longUrl: originalUrl,
            });

            if (response.status !== 200) {
                throw new Error('Failed to shorten URL');
            }

            const data = response.data;
            if (data.shortUrl) {
                setShortenedUrl(data.shortUrl);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
            alert('An error occurred while shortening the URL.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="header">URL Shortener</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="input"
                />
                <br />
                <button onClick={handleClick} className="button" disabled={loading}>
                    {loading ? 'Shortening...' : 'Shorten'}
                </button>
            </div>
            {shortenedUrl && (
                <div className="shortened-url-container">
                    <p>Short URL:</p>
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="shortened-url">
                        {shortenedUrl}
                    </a>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(shortenedUrl);
                            alert('Copied to clipboard');
                        }}
                        className="copy-button"
                    >
                        Copy
                    </button>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;