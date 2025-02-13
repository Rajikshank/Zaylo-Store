import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  avatarUploader: f({ image: { maxFileSize: "2MB" } })
    // Set permissions and file types for this FileRoute

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
    }),
    variantUploader:f({image:{maxFileSize:"4MB",maxFileCount:10}}).onUploadComplete(async({metadata,file})=>{
console.log(file)
    }),
    dicountUploader:f({image:{maxFileSize:"4MB",maxFileCount:1}}).onUploadComplete(async({metadata,file})=>{
      console.log(file)
          })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
