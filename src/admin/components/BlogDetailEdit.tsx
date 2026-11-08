import { useParams } from "react-router-dom";
import { PostEditor } from "./PostEditor";

export function BlogDetailEdit() {
  const { slug } = useParams();
  return <PostEditor kind="blog" slug={slug} />;
}
