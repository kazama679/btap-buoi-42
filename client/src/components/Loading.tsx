import React, { useState } from 'react';

export default function Loading() {
    const [loading, setLoading] = useState(false);

    return (
        <div className={`loading-overlay ${loading ? 'active' : ''}`}>
            <div className="spinner"></div>
        </div>
    );
}