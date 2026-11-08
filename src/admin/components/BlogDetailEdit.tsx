import { useParams } from "react-router-dom";
import { BlogEditor } from "./BlogEditor";

export function BlogDetailEdit() {
  const { slug } = useParams();
  return <BlogEditor slug={slug} />;
}
