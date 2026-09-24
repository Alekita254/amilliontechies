import { FormEvent, useEffect, useMemo, useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StoryComment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface StoryActionsProps {
  storySlug: string;
  storyTitle: string;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export function StoryActions({ storySlug, storyTitle }: StoryActionsProps) {
  const likesKey = useMemo(() => `story-likes-${storySlug}`, [storySlug]);
  const likedKey = useMemo(() => `story-liked-${storySlug}`, [storySlug]);
  const commentsKey = useMemo(() => `story-comments-${storySlug}`, [storySlug]);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<StoryComment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  useEffect(() => {
    const storedLikes = Number(localStorage.getItem(likesKey) || "0");
    const storedLiked = localStorage.getItem(likedKey) === "true";
    const storedComments = localStorage.getItem(commentsKey);

    setLikes(Number.isNaN(storedLikes) ? 0 : storedLikes);
    setLiked(storedLiked);

    if (storedComments) {
      try {
        const parsed = JSON.parse(storedComments) as StoryComment[];
        setComments(Array.isArray(parsed) ? parsed : []);
      } catch {
        setComments([]);
      }
    }
  }, [commentsKey, likedKey, likesKey]);

  const handleLike = () => {
    const nextLiked = !liked;
    const nextLikes = nextLiked ? likes + 1 : Math.max(0, likes - 1);

    setLiked(nextLiked);
    setLikes(nextLikes);

    localStorage.setItem(likedKey, String(nextLiked));
    localStorage.setItem(likesKey, String(nextLikes));
  };

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: storyTitle,
          text: `Check out this story: ${storyTitle}`,
          url,
        });
        setShareFeedback("Shared successfully.");
      } else {
        await navigator.clipboard.writeText(url);
        setShareFeedback("Story link copied.");
      }
    } catch {
      setShareFeedback("Unable to share right now.");
    }

    window.setTimeout(() => setShareFeedback(null), 2200);
  };

  const handleAddComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    const newComment: StoryComment = {
      id: `${Date.now()}`,
      name: name.trim() || "Anonymous",
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const nextComments = [newComment, ...comments];
    setComments(nextComments);
    localStorage.setItem(commentsKey, JSON.stringify(nextComments));
    setMessage("");
    setName("");
  };

  return (
    <section className="space-y-6">
      <Card className="border-border/70">
        <CardContent className="flex flex-wrap items-center gap-3 p-4 sm:p-6">
          <Button
            type="button"
            variant={liked ? "default" : "outline"}
            className="gap-2"
            onClick={handleLike}
          >
            <Heart className="h-4 w-4" />
            {liked ? "Liked" : "Like"} ({likes})
          </Button>

          <Button type="button" variant="outline" className="gap-2" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>

          <div className="inline-flex items-center gap-2 rounded-md border border-border/70 px-3 py-2 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            {comments.length} comments
          </div>
        </CardContent>
      </Card>

      {shareFeedback && <p className="text-sm text-primary">{shareFeedback}</p>}

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-xl">Comments</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <form className="space-y-3" onSubmit={handleAddComment}>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name (optional)"
              maxLength={80}
            />
            <Textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your comment"
              className="min-h-24"
              maxLength={600}
              required
            />
            <Button type="submit">Post comment</Button>
          </form>

          <div className="space-y-3">
            {comments.length === 0 && (
              <p className="text-sm text-muted-foreground">No comments yet. Start the conversation.</p>
            )}

            {comments.map((comment) => (
              <div key={comment.id} className="rounded-xl border border-border/70 bg-background/80 p-3 sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{comment.name}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{comment.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
