import React, { useEffect, useState } from 'react';
import { fetchJoinUsConfig } from '@/backend/functions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JoinForm } from './JoinForm';

export const JoinUsPage = () => {
  const [config, setConfig] = useState(null);
  const [thankYou, setThankYou] = useState(null);
  const [showForm, setShowForm] = useState(false);  
  useEffect(() => {
    const getConfig = async () => {
      const res = await fetchJoinUsConfig();
      setConfig(res);
    };
    getConfig();
  }, []);

  if (!config) {
    return <p className="text-center py-10 text-muted-foreground">Loading...</p>;
  }

  if (thankYou) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">Success 🎉</h2>
        <p className="text-lg text-black dark:text-white">{thankYou}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10 ">
      {!showForm ? (
        <Card className="bg-white dark:bg-zinc-900 shadow-lg border border-green-600 dark:border-green-400">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-green-700 dark:text-green-400">
              {config.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-black dark:text-white">{config.description}</p>
            <div
              className="prose prose-green text-muted-foreground dark:text-white max-w-none"
              dangerouslySetInnerHTML={{ __html: config.highlights }}
            />
            <div className="flex justify-center mt-6">
              <button
                className="bg-green-600 dark:bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-700 dark:hover:bg-green-800"
                onClick={() => setShowForm(true)}
              >
                Register Now
              </button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <JoinForm setThankYou={setThankYou} />
      )}
    </div>
  );
};
