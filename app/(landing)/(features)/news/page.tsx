"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

import 'tailwindcss/tailwind.css';

interface Article {
  title: string;
  description: string;
  url: string;
}

interface NewsResponse {
  articles: Article[];
}

const Home: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = '780bfe8c9b6c4e08bd1e755df0cc8ef7';
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=${apiKey}`;

        console.log('API Request URL:', apiUrl);

        const response = await axios.get<NewsResponse>(apiUrl);

        console.log('API Response:', response.data);

        if (response.data.articles && response.data.articles.length > 0) {
          setNews(response.data.articles);
        } else {
          setError('No articles found in the response');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Error fetching news. Please try again later.');
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Cyber Crime News</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, index) => (
            <div key={index} className="bg-gray-700 opacity-90 text-white rounded-lg overflow-hidden shadow-lg">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                <p className="text-gray-200 mb-2">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
