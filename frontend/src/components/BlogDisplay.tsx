import { Link } from "react-router-dom";

interface BlogDisplayProps {
    name : string;
    title : string;
    content : string;
    id : string;
}
export const BlogDisplay = ({name,title,content,id} : BlogDisplayProps) => {
    return (
        <>
        <Link to={`/blog/${id}`}>
        <div className="p-8 lg:mx-32 cursor-pointer">
        <div className="flex">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full">
                <span className="font-medium text-gray-600">{name[0]}</span>
            </div>
            <div className="mx-5 py-2 font-semibold text-grey-600">
                {name} &nbsp;&nbsp;✨Free
            </div>
        </div>
        <div className="mx-5 px-10">
            <div className="text-2xl font-bold pb-2">
                {title}
            </div>
            <div className="text-slate-700 pb-2">
                {(content.length>100)?content.slice(0,100) + "..." : content}
            </div>
            <div className="mx-1 my-2">
                <span className="bg-slate-100 p-1 rounded">{Math.ceil(content.length/250)} min read</span>
            </div>
        </div>
        <div className="bg-slate-200 h-1 w-full"></div>
        </div>
        </Link>
        </>
    )
}