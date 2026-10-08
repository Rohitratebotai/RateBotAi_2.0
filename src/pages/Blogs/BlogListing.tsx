import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const fetchBlogs = async () => {
    const res = await fetch(`${API_URL}/api/blogs`);
    return res.json();
};

const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const readingTime = (html: string) => {
    const text = stripHtml(html);
    const words = text.split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / 200));
    return `${mins} min read`;
};

const BlogList = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchBlogs();
                setBlogs(data.filter((b: any) => b.isActive));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const getImage = (images: string[]) => {
        if (!images?.length) return null;
        const img = images[0];
        return img.startsWith("http") ? img : `${API_URL}${img}`;
    };

    if (loading) {
        return (
            <section className="bg-white min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-900/[0.04] rounded-full blur-[120px] pointer-events-none" />

                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-[#05152D] rounded-full animate-spin" />

                    <span className="text-slate-500 text-xs tracking-[4px] font-semibold uppercase animate-pulse">
                        Loading
                    </span>
                </div>
            </section>
        );
    }

    const featured = blogs[0];
    const rest = blogs.slice(1);

    return (
        <section className="bg-white min-h-screen text-[#05152D] font-sans selection:bg-[#05152D]/10 selection:text-[#05152D] relative overflow-hidden">

            {/* Background Structural Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/[0.025] rounded-full blur-[140px] pointer-events-none" />

            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-slate-300/[0.12] rounded-full blur-[140px] pointer-events-none" />

            {/* ── Header ── */}
            <div className="border-b border-slate-200 bg-white/90 backdrop-blur-md py-16 text-center relative z-10">

                <div className="max-w-4xl mx-auto px-5">

                    <span className="inline-flex items-center text-[#05152D] text-[10px] font-bold tracking-[3px] uppercase bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-full">
                        The Chronicle
                    </span>

                    <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.05em] leading-[0.9] text-[#05152D]">
                        Insights
                        <span className="block text-slate-400 font-light tracking-[-0.04em] mt-2">
                            &amp; Ideas
                        </span>
                    </h1>

                    <p className="text-slate-500 mt-4 text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
                        Technical thoughts, ecosystem engineering blueprints, and production insights straight from our team.
                    </p>

                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">

                {/* ── Featured Section ── */}
                {featured && (
                    <div className="mb-20">

                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-1.5 bg-[#05152D] rounded-full" />

                            <p className="text-[11px] tracking-[3px] uppercase text-slate-500 font-bold">
                                Featured Publication
                            </p>
                        </div>

                        <Link
                            to={`/blogs/${featured._id}`}
                            className="group block relative bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-[#05152D]/30 transition-all duration-500 shadow-[0_8px_30px_rgba(5,21,45,0.04)] hover:shadow-[0_20px_50px_rgba(5,21,45,0.08)]"
                        >

                            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 xl:gap-12 items-center">

                                {/* Image Showcase */}
                                <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-slate-100 border border-slate-200 shadow-inner">

                                    {getImage(featured.images) ? (
                                        <img
                                            src={getImage(featured.images)!}
                                            alt={featured.title}
                                            className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300 text-6xl select-none">
                                            ✦
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#05152D]/20 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition duration-500" />

                                </div>

                                {/* Typography Content */}
                                <div>

                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500 font-medium mb-4">

                                        <time className="text-slate-600">
                                            {formatDate(featured.createdAt)}
                                        </time>

                                        <span className="text-slate-300 select-none">
                                            •
                                        </span>

                                        <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md text-[11px] border border-slate-200">
                                            {readingTime(featured.description)}
                                        </span>

                                        {featured.youtubeLink && (
                                            <>
                                                <span className="text-slate-300 select-none">
                                                    •
                                                </span>

                                                <span className="text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md text-[11px] border border-red-100 font-semibold inline-flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                                                    Video Guide
                                                </span>
                                            </>
                                        )}

                                    </div>

                                    <h2 className="text-2xl md:text-3xl lg:text-[32px] font-black text-[#05152D] leading-tight mb-4 group-hover:text-blue-900 transition duration-300 tracking-tight">
                                        {featured.title}
                                    </h2>

                                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 font-medium text-justify">
                                        {stripHtml(featured.description).slice(0, 180).trimEnd()}…
                                    </p>

                                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[2px] uppercase text-[#05152D] group-hover:text-blue-900 transition-colors duration-300">
                                        Read Deep Dive

                                        <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 text-sm">
                                            →
                                        </span>
                                    </span>

                                </div>
                            </div>

                        </Link>
                    </div>
                )}

                {/* ── Divider + Latest Heading ── */}
                {rest.length > 0 && (
                    <div className="flex items-center gap-4 mb-10">

                        <div className="flex items-center gap-2 whitespace-nowrap">

                            <span className="w-1.5 h-1.5 bg-[#05152D] rounded-full" />

                            <p className="text-[11px] tracking-[3px] uppercase text-slate-500 font-bold">
                                Latest Logs
                            </p>

                        </div>

                        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />

                    </div>
                )}

                {/* ── Grid Container ── */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">

                    {rest.map((blog) => (
                        <Link
                            key={blog._id}
                            to={`/blogs/${blog._id}`}
                            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#05152D]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-[0_5px_20px_rgba(5,21,45,0.03)] hover:shadow-[0_15px_35px_rgba(5,21,45,0.08)]"
                        >

                            {/* Thumbnail Container */}
                            <div className="h-48 overflow-hidden bg-slate-100 border-b border-slate-200 relative">

                                {getImage(blog.images) ? (
                                    <img
                                        src={getImage(blog.images)!}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-500 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300 text-4xl select-none">
                                        ✦
                                    </div>
                                )}

                            </div>

                            {/* Info Body */}
                            <div className="p-6 flex flex-col flex-1">

                                {/* Meta Strip */}
                                <div className="flex items-center justify-between mb-4">

                                    <span className="text-xs text-slate-500 font-medium">
                                        {formatDate(blog.createdAt)}
                                    </span>

                                    <div className="flex items-center gap-1.5">

                                        {blog.images?.length > 1 && (
                                            <span className="text-[10px] text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                                {blog.images.length} Media
                                            </span>
                                        )}

                                        {blog.youtubeLink && (
                                            <span className="text-[10px] text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-100">
                                                Video
                                            </span>
                                        )}

                                    </div>
                                </div>

                                {/* Grid Title */}
                                <h3 className="text-[#05152D] font-bold text-base lg:text-lg leading-snug mb-2 group-hover:text-blue-900 transition duration-200 line-clamp-2 tracking-tight">
                                    {blog.title}
                                </h3>

                                {/* Grid Excerpt */}
                                <p className="text-slate-500 text-xs lg:text-sm leading-relaxed line-clamp-3 flex-1 font-medium mt-1">
                                    {stripHtml(blog.description)}
                                </p>

                                {/* Interactive Card Actions */}
                                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">

                                    <span className="text-[10px] uppercase tracking-[1.5px] text-slate-500 font-bold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                                        {readingTime(blog.description)}
                                    </span>

                                    <span className="text-slate-400 group-hover:text-[#05152D] group-hover:translate-x-1 transition-all duration-300 text-sm font-bold">
                                        →
                                    </span>

                                </div>

                            </div>
                        </Link>
                    ))}

                </div>

                {/* Empty State Showcase */}
                {blogs.length === 0 && (
                    <div className="text-center py-24 bg-slate-50 border border-dashed border-slate-300 rounded-2xl max-w-md mx-auto">

                        <p className="text-slate-300 text-6xl mb-4 select-none">
                            ✦
                        </p>

                        <h4 className="text-[#05152D] text-base font-bold tracking-wide">
                            No Records Indexed
                        </h4>

                        <p className="text-slate-500 text-xs mt-1 max-w-[240px] mx-auto leading-relaxed font-medium">
                            Our publishers haven't compiled articles recently. Check back shortly.
                        </p>

                    </div>
                )}

            </div>
        </section>
    );
};

export default BlogList;
