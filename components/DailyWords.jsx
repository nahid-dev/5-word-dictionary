"use client";

import { useState, useEffect } from "react";

const DailyWords = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch("/api/daily-words");
      const data = await response.json();
      setWords(data.words || []);
    };

    fetchWords();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Today&apos;s Words</h2>
      <ul>
        {words.map((wordObj, index) => (
          <li key={index} className="mb-3">
            <span className="font-semibold">{wordObj.word}</span>: {wordObj.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyWords;
