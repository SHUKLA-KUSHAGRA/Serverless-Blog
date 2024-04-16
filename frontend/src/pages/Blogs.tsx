import { AppBar } from "../components/AppBar"
import { BlogDisplay } from "../components/BlogDisplay"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading,blogs} = useBlogs();
    if(loading)
    {
        return (
            <div className="flex justify-center">
                <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                </div>
            </div>
        )
    }
    return (
        <>
        <AppBar/>
        {blogs.map((blog) => {
            return <BlogDisplay 
            key={blog.id}
            id = {blog.id}
            name={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            />
        })}
        </>
    )
}