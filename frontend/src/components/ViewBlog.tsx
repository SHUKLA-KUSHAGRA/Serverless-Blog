import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { AppBar } from "./AppBar";
import { Skeleton } from "./Skeleton";

export const ViewBlog = () => {
    const {id} = useParams();
    const {loading,blog} = useBlog({
        id : id || ""
    });
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
        <div className="grid grid-cols-12 sm:m-20 text-center md:text-left">
            <div className="col-span-12 sm:col-span-8 sm:px-5">
                <div className="text-3xl font-extrabold">
                    {blog?.title}
                </div>
                <div className="py-5 text-slate-500">
                    Blog Id : {blog?.id}
                </div>
                <div className="py-10 text-xl">
                    {blog?.content}
                </div>
            </div>
            <div className="col-span-4 px-5 hidden md:block">
                Author :
                <div className="text-2xl font-extrabold pt-2">
                    {blog?.author.name || 'Anonymous'}
                </div>
                <div className="py-5">About : Random details about the author</div>
            </div>
        </div>
        </>
    )
}