import { Mail, Calendar, Globe, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiGetRequest } from "@/backend/functions";

type UserStats = {
  total_blogs?: number;
  total_communities?: number;
  total_views?: number;
};

type UserProfile = {
  full_name: string;
  role: string;
  email: string;
  joinDate: string;
  bio: string;
  website: string;
  avatar: string;
  cover: string;
  stats?: UserStats;
};

export function UserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const localUser = localStorage.getItem("user");
        
        if (!localUser) {
          throw new Error("User not found in local storage");
        }

        const { email } = JSON.parse(localUser);
        
        if (!email) {
          throw new Error("Email not found in user data");
        }

        const res = await apiGetRequest(`user/profile/${email}`);
        
        if (!res?.data) {
          throw new Error("Failed to fetch user profile");
        }

        setUser({
          full_name: res.data.data.full_name || "Anonymous User",
          role: res.data.data.role || "Member",
          email: res.data.data.email || email,
          joinDate: res.data.data.date_joined || "Joined recently",
          bio: res.data.data.bio || "No bio provided yet.",
          website: res.data.data.website || "example.com",
          avatar: res.data.data.profile_picture || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80",
          cover: res.data.data.cover || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          stats: {
            total_blogs: res.data.data.total_blogs || 0,
            total_communities: res.data.data.total_communities || 0,
            total_views: res.data.data.total_views || 0,
          }
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-2 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-red-500 mb-4">Error loading profile</div>
        <p className="text-gray-600">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No profile data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
        <img
          src={user.cover}
          alt="Cover"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
          }}
        />
        <div className="absolute -bottom-16 left-6">
          <img
            src={user.avatar}
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1180&q=80";
            }}
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 px-6 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.full_name}</h2>
            <p className="text-green-600">{user.role}</p>
          </div>
        </div>

        <p className="mt-4 text-gray-600">{user.bio}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            {user.email}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {user.joinDate}
          </div>
          {user.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-600 hover:underline"
              >
                {user.website}
              </a>
            </div>
          )}
        </div>

        {user.stats && (
          <div className="mt-8 flex gap-6 border-t border-gray-100 pt-6">
            {Object.entries(user.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <p className="text-2xl font-semibold text-gray-800">{value}</p>
                <p className="text-sm text-gray-500 capitalize">{key}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}