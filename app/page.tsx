import PostButton from "@/components/Post-Button";
import createPost from "@/server/actions/create-posts";
import getPosts from "@/server/actions/get-posts";

export default async function Home() {
  const {error,success} = await getPosts();


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>WelCome To AgroStore </h1>
      <div>
        {success?.map(item=><div key={item.id}>{item.title}</div>)}
      </div>
      <form action={createPost}>
        <input className="bg-black " type="text" name="title" placeholder="Title" />
       <PostButton/>
      </form>
    </div>
  );
}
