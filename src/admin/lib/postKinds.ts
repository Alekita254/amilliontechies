// Blogs and community events share the same shape and screens; this is what differs.
export const POST_KINDS = {
  blog: {
    resource: "blogs",
    base: "/admin/blog",
    siteBase: "/blog",
    noun: "blog",
    plural: "blogs",
    createHint: "Write a post and publish it to the site.",
    deleteNote: "along with its comments",
  },
  event: {
    resource: "community",
    base: "/admin/community",
    siteBase: "/events",
    noun: "event",
    plural: "events",
    createHint: "Add a community event and publish it to the site.",
    deleteNote: "",
  },
} as const;

export type PostKind = keyof typeof POST_KINDS;
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
