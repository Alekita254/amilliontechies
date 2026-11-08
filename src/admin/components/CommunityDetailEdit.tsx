import { useParams } from "react-router-dom";
import { PostEditor } from "./PostEditor";

export function CommunityDetailEdit() {
  const { slug } = useParams();
  return <PostEditor kind="event" slug={slug} />;
}
