import { useEffect, useState, useMemo } from "react";
import { fetchBlogs, deleteBlog, toggleBlogStatus } from "../../services/BlogApi";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BlogListAdmin = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
    const [togglingId, setTogglingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            setLoading(true);
            const data = await fetchBlogs();
            setBlogs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to extract blogs index:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you absolutely sure you want to delete this publication? This action cannot be undone.")) return;
        try {
            setDeletingId(id);
            await deleteBlog(id, token!);
            // Optimistic UI state update removes the need for a full loading flash
            setBlogs(prev => prev.filter(blog => blog._id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    const handleToggle = async (id: string) => {
        try {
            setTogglingId(id);
            await toggleBlogStatus(id, token!);
            // Map state change locally to keep transitions fluid
            setBlogs(prev => prev.map(blog => 
                blog._id === id ? { ...blog, isActive: !blog.isActive } : blog
            ));
        } catch (err) {
            console.error(err);
        } finally {
            setTogglingId(null);
        }
    };

    const getImage = (images: string[]) => {
        if (!images || images.length === 0) return null;
        const src = images[0];
        return src.startsWith("http") ? src : `${API_URL}${src}`;
    };

    const stripHtml = (html: string) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    };

    // Performance memoized filtering layer
    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => {
            const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 stripHtml(blog.description).toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || 
                                 (statusFilter === "active" && blog.isActive) || 
                                 (statusFilter === "inactive" && !blog.isActive);
            return matchesSearch && matchesStatus;
        });
    }, [blogs, searchTerm, statusFilter]);

    // Analytics Counter Map
    const stats = useMemo(() => {
        return {
            total: blogs.length,
            active: blogs.filter(b => b.isActive).length,
            inactive: blogs.filter(b => !b.isActive).length
        };
    }, [blogs]);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 lg:py-32">
                
                {/* ── HEADER & ACTIONS ── */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">System Content Management</h1>
                        <p className="text-sm  mt-1">
                            Review performance status, alter publication visibilities, or append platform documentation blueprints.
                        </p>
                    </div>
                    <div>
                        <Link
                            to="/admin/create-blog"
                            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition duration-200 shadow-sm shadow-slate-900/10 hover:shadow-md"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Create Article
                        </Link>
                    </div>
                </div>

                {/* ── METRICS DASHBOARD ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Publications</p>
                        <p className="text-3xl font-black text-slate-800 mt-2">{stats.total}</p>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Live Indexes</p>
                        <p className="text-3xl font-black text-emerald-600 mt-2">{stats.active}</p>
                    </div>
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">Draft / Hidden</p>
                        <p className="text-3xl font-black text-amber-600 mt-2">{stats.inactive}</p>
                    </div>
                </div>

                {/* ── CONTROLS / FILTERS BAR ── */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                    {/* Filter Tabs */}
                    <div className="flex bg-slate-100 p-1 rounded-lg self-start md:self-auto">
                        {(["all", "active", "inactive"] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setStatusFilter(type)}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md capitalize transition-all ${
                                    statusFilter === type 
                                        ? "bg-white text-slate-900 shadow-sm" 
                                        : "text-slate-500 hover:text-slate-900"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    {/* Search Field */}
                    <div className="relative flex-1 max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search title index or excerpt content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 transition duration-150"
                        />
                    </div>
                </div>

                {/* ── DATA CORE TABLE ── */}
                {loading ? (
                    <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin mx-auto mb-3" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 animate-pulse">Syncing Index Table</span>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-2xl mx-auto">
                        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100 text-lg">📝</div>
                        <h3 className="text-slate-900 font-bold text-base">No Matching Entries Documented</h3>
                        <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto leading-relaxed font-medium">
                            Adjust your active dashboard parameters or instantiate a modern corporate data log now.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-400">
                                        <th className="py-4 px-6">Information Identity</th>
                                        <th className="py-4 px-4 hidden sm:table-cell">Asset Metadata</th>
                                        <th className="py-4 px-4">Visibility Status</th>
                                        <th className="py-4 px-6 text-right">System Configuration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {filteredBlogs.map((blog) => (
                                        <tr 
                                            key={blog._id} 
                                            className={`hover:bg-slate-50/40 transition duration-150 group ${
                                                !blog.isActive ? "bg-slate-50/20" : ""
                                            }`}
                                        >
                                            {/* Left Meta Cell */}
                                            <td className="py-4 px-6 max-w-xs md:max-w-md">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                        {getImage(blog.images) ? (
                                                            <img src={getImage(blog.images)!} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-slate-300 text-sm">🖼</span>
                                                        )}
                                                    </div>
                                                    <div className="truncate">
                                                        <h4 className="font-semibold text-slate-900 group-hover:text-slate-700 truncate text-[14px]">
                                                            {blog.title || "Untitled Document Entry"}
                                                        </h4>
                                                        <p className="text-xs text-slate-400 truncate mt-0.5">
                                                            {stripHtml(blog.description)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Badges/Tags Hidden Column on Mobile */}
                                            <td className="py-4 px-4 hidden sm:table-cell">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {blog.images?.length > 1 && (
                                                        <span className="inline-flex text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                                                            {blog.images.length} Media assets
                                                        </span>
                                                    )}
                                                    {blog.youtubeLink && (
                                                        <span className="inline-flex text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                                                            Stream asset
                                                        </span>
                                                    )}
                                                    {!blog.images?.length && !blog.youtubeLink && (
                                                        <span className="text-slate-300 text-xs italic">Plain prose text</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Status Badge Control */}
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                                                    blog.isActive 
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${blog.isActive ? "bg-emerald-500" : "bg-amber-500"}`} />
                                                    {blog.isActive ? "Active" : "Hidden"}
                                                </span>
                                            </td>

                                            {/* Actions Group Aligned to Right */}
                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <div className="inline-flex items-center gap-1">
                                                    <Link
                                                        to={`/blogs/${blog._id}?ref=admin`}
                                                        title="Read Public Layout View"
                                                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </Link>

                                                    <Link
                                                        to={`/admin/edit-blog/${blog._id}`}
                                                        title="Edit Metadata Blueprint"
                                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                        </svg>
                                                    </Link>

                                                    <button
                                                        onClick={() => handleToggle(blog._id)}
                                                        disabled={togglingId === blog._id}
                                                        title={blog.isActive ? "Hide from Clients" : "Deploy Live to Client Feed"}
                                                        className={`p-1.5 rounded-md transition ${
                                                            blog.isActive 
                                                                ? "text-slate-400 hover:text-amber-600 hover:bg-amber-50" 
                                                                : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                                                        }`}
                                                    >
                                                        {togglingId === blog._id ? (
                                                            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                                                        ) : blog.isActive ? (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
                                                        disabled={deletingId === blog._id}
                                                        title="Erase Records"
                                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition disabled:opacity-40"
                                                    >
                                                        {deletingId === blog._id ? (
                                                            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                                                        ) : (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default BlogListAdmin;