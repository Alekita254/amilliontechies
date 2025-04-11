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
        <h2 className="text-3xl font-bold text-green-700 mb-4">Success 🎉</h2>
        <p className="text-lg text-black">{thankYou}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {!showForm ? (
        <Card className="bg-white shadow-lg border border-green-600">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-green-700">
              {config.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-black">{config.description}</p>
            <div
              className="prose prose-green text-muted-foreground max-w-none"
              dangerouslySetInnerHTML={{ __html: config.highlights }}
            />
            <div className="flex justify-center mt-6">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
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
