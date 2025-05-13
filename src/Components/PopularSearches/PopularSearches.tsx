import React, { useEffect, useState } from "react";
import "./PopularSearches.css";

interface SearchStats {
    [term: string]: number;
}

const PopularSearches: React.FC = () => {
    const [popularTerms, setPopularTerms] = useState<[string, number][]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("searchStats");
        if (stored) {
            const stats: SearchStats = JSON.parse(stored);
            const sorted = Object.entries(stats)
                .sort((a, b) => b[1] - a[1]) // sort by frequency descending
                .slice(0, 5); // top 5
            setPopularTerms(sorted);
        }
    }, []);

    return (
        <div className="popular-searches-container">
            <h3>Popular Searches</h3>
            <ul>
                {popularTerms.map(([term, count]) => (
                    <li key={term}>
                        <span>{term}</span>
                        <span className="count">{count}×</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularSearches;
