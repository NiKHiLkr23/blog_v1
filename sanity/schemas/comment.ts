import { defineField, defineType } from "sanity";

export default defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "comments won't show on the site without approval",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "comment",
      type: "text",
    }),
    defineField({
      name: "image",
      type: "string",
    }),
    defineField({
      name: "post",
      type: "reference",
      to: { type: "post" },
    }),
  ],
});
