import React, { useState } from 'react';

const UrlShortener: React.FC = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [urlMap, setUrlMap] = useState<Map<string, string>>(new Map());

    const handleClick = () => {
        if (!originalUrl) {
            alert('Please enter a valid URL.');
            return;
        }

        // Generate a fake shortened URL
        const fakeShortUrl = `https://short.ly/${Math.random().toString(36).substr(2, 8)}`;
        setShortenedUrl(fakeShortUrl);

        // Store the mapping between the shortened URL and the original URL
        setUrlMap((prevMap) => {
            const updatedMap = new Map(prevMap);
            updatedMap.set(fakeShortUrl, originalUrl);
            return updatedMap;
        });

        console.log(`Original URL: ${originalUrl}, Shortened URL: ${fakeShortUrl}`);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!shortenedUrl) {
            return;
        }

        // Prevent default anchor behavior
        e.preventDefault();

        // Retrieve the actual URL from the map and open it in a new tab
        const actualUrl = urlMap.get(shortenedUrl);
        if (actualUrl) {
            window.open(actualUrl, '_blank'); // Open in a new tab
        } else {
            alert('The original URL could not be found!');
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
