import React, { useState } from 'react';

const UrlShortener: React.FC = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [urlMap, setUrlMap] = useState<Map<string, string>>(new Map());

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

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/shorten`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ longUrl: originalUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to shorten URL');
            }

            const data = await response.json();
            if (data.shortUrl) {
                setShortenedUrl(data.shortUrl);

                setUrlMap((prevMap) => {
                    const updatedMap = new Map(prevMap);
                    updatedMap.set(data.shortUrl, originalUrl);
                    return updatedMap;
                });
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
            alert('An error occurred while shortening the URL.');
        }
    };

    const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!shortenedUrl) {
            return;
        }

        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/${shortenedUrl}`);
            if (!response.ok) {
                throw new Error('Failed to retrieve the original URL');
            }

            const data = await response.json();
            const actualUrl = data.longUrl;
            if (actualUrl) {
                window.open(actualUrl, '_blank'); // Open in a new tab
            } else {
                alert('The original URL could not be found!');
            }
        } catch (error) {
            console.error('Error retrieving the original URL:', error);
            alert('An error occurred while retrieving the original URL.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>URL Shortener</h1>
            <input
                type="text"
                placeholder="Enter URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
            />
            <br />
            <button onClick={handleClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Shorten
            </button>
            <br />
            <br />
            {shortenedUrl && (
                <div>
                    <p>Shortened URL:</p>
                    <a href={shortenedUrl} onClick={handleLinkClick}>
                        {shortenedUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default UrlShortener;