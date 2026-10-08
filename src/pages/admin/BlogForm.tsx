import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogById, createBlog, updateBlog } from "../../services/BlogApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./blogform.css";
import { Quill } from "react-quill";
// @ts-ignore
import ImageUploader from "quill-image-uploader";

const MAX_IMAGES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// Register the module once outside the component
Quill.register("modules/imageUploader", ImageUploader);

const BlogForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");

    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    /* ================= React Quill ================= */

    const modules = useMemo(() => ({
        toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
        imageUploader: {
            upload: (file: File) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append("image", file);

                    const token = localStorage.getItem("token");

                    fetch("http://localhost:5000/api/blogs/upload-content-image", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((result) => {
                            resolve(result.url);
                        })
                        .catch((error) => {
                            reject("Upload failed");
                            console.error("Error:", error);
                        });
                });
            },
        },
    }), []);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "list",
        "bullet",
        "blockquote",
        "code-block",
        "color",
        "align",
        "link",
        "image",
        "video",
    ];

    /* ================= Fetch Blog (Edit Mode) ================= */

    useEffect(() => {
        if (id) fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) return;

            const data = await getBlogById(id!, token);

            setTitle(data.title);
            setDescription(data.description);
            setYoutubeLink(data.youtubeLink || "");
            setExistingImages(
                (data.images || []).map((img: string) =>
                    img.startsWith("http")
                        ? img
                        : `${import.meta.env.VITE_API_URL}${img}`
                )
            );
            setNewImages([]);
        } catch {
            setError("Failed to load blog.");
        } finally {
            setLoading(false);
        }
    };

    /* ================= Image Upload ================= */

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        if (
            existingImages.length +
            newImages.length +
            files.length >
            MAX_IMAGES
        ) {
            setError(`Maximum ${MAX_IMAGES} images allowed.`);
            e.target.value = "";
            return;
        }

        const oversized = files.find(file => file.size > MAX_SIZE);
        if (oversized) {
            setError(`"${oversized.name}" exceeds 5MB limit.`);
            e.target.value = "";
            return;
        }

        setError("");
        setNewImages(prev => [...prev, ...files]);
        e.target.value = "";
    };

    /* ================= Submit ================= */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("youtubeLink", youtubeLink);

            newImages.forEach(file => {
                formData.append("images", file);
            });

            formData.append(
                "existingImages",
                JSON.stringify(existingImages)
            )

            console.log(formData.getAll("images"));
            if (id) {
                await updateBlog(id, formData, token);
            } else {
                await createBlog(formData, token);
            }

            navigate("/admin/blogs");
        } catch {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    /* ================= Cleanup ================= */

    useEffect(() => {
        return () => {
            newImages.forEach(file =>
                URL.revokeObjectURL(file as any)
            );
        };
    }, [newImages]);

    console.log(existingImages, 'existingImages');

    /* ================= UI ================= */

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900 antialiased">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                
                {/* Form Header Header */}
                <div className="border-b border-slate-100 bg-slate-50/50 p-6 sm:px-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900">
                            {id ? "Edit Post Layout" : "Instantiate New Publication"}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Configure markdown metadata structures, layout definitions, and persistent streaming references.
                        </p>
                    </div>
                    <button 
                        type="button"
                        onClick={() => navigate("/admin/blogs")}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition px-3 py-1.5 rounded-lg hover:bg-slate-100"
                    >
                        Back to list
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

                    {/* Title Input Field */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Article Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g., Enterprise State Patterns in React 19"
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 transition shadow-sm"
                            required
                        />
                    </div>

                    {/* Rich Content Editor Wrapper */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Document Markup Body
                        </label>
                        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:border-slate-400 transition">
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={setDescription}
                                modules={modules}
                                formats={formats}
                                className="bg-white"
                            />
                        </div>
                    </div>

                    {/* YouTube Video Resource Endpoint */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            YouTube Embedded Link <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs font-medium">
                                URL
                            </div>
                            <input
                                type="url"
                                value={youtubeLink}
                                onChange={e => setYoutubeLink(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 transition"
                            />
                        </div>
                    </div>

                    {/* Gallery & Dropzone Area */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Featured Storage Assets
                        </label>
                        
                        <div className="relative group border-2 border-dashed border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-6 transition text-center cursor-pointer">
                            <input
                                type="file"
                                id="file-upload-input"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="space-y-1">
                                <div className="text-2xl text-slate-400 group-hover:scale-110 transition duration-200 inline-block">📁</div>
                                <p className="text-sm font-semibold text-slate-700">Click to load or drag asset targets</p>
                                <p className="text-xs text-slate-400">Image formats accepted up to 5MB maximum boundaries</p>
                            </div>
                        </div>

                        {/* Inventory Count Tracker */}
                        <div className="flex items-center justify-between bg-slate-100/70 border border-slate-200/60 rounded-xl px-4 py-2">
                            <span className="text-xs font-medium text-slate-500">Asset storage allocation status</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                                (existingImages.length + newImages.length) >= MAX_IMAGES 
                                    ? "bg-amber-100 text-amber-800" 
                                    : "bg-white border border-slate-200 text-slate-700"
                            }`}>
                                {existingImages.length + newImages.length} / {MAX_IMAGES} Slots filled
                            </span>
                        </div>
                    </div>

                    {/* Advanced Grid Dynamic Images Preview */}
                    {(existingImages.length > 0 || newImages.length > 0) && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border border-slate-100 bg-slate-50/30 p-4 rounded-2xl">
                            
                            {/* Rendering Server Assets */}
                            {existingImages.map((url, i) => (
                                <div key={`existing-${i}`} className="group relative aspect-video bg-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                    <img
                                        src={url.startsWith("http") ? url : `${import.meta.env.VITE_API_URL}${url}`}
                                        className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                                        alt="Server Cache Asset"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-start justify-between p-2">
                                        <span className="text-[10px] bg-slate-900/80 text-white font-medium px-1.5 py-0.5 rounded backdrop-blur-xs">Cloud Cache</span>
                                        <button
                                            type="button"
                                            onClick={() => setExistingImages(prev => prev.filter((_, index) => index !== i))}
                                            className="bg-red-600 hover:bg-red-500 text-white text-xs p-1 rounded-md shadow-sm transform hover:scale-110 transition active:scale-95"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Rendering Local Blobs Queue */}
                            {newImages.map((file, i) => (
                                <div key={`new-${i}`} className="group relative aspect-video bg-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                                        alt="Local Queue Staging"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-start justify-between p-2">
                                        <span className="text-[10px] bg-blue-600 text-white font-medium px-1.5 py-0.5 rounded shadow-sm">Staged Queue</span>
                                        <button
                                            type="button"
                                            onClick={() => setNewImages(prev => prev.filter((_, index) => index !== i))}
                                            className="bg-red-600 hover:bg-red-500 text-white text-xs p-1 rounded-md shadow-sm transform hover:scale-110 transition active:scale-95"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Operational Feedback Prompts */}
                    {error && (
                        <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl p-3.5 shadow-xs">
                            <span className="text-base leading-none">⚠️</span>
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Core Process Call to Action Bar */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => navigate("/admin/blogs")}
                            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition duration-150 shadow-sm shadow-slate-900/10 hover:shadow-md disabled:opacity-50 inline-flex items-center gap-2"
                        >
                            {loading && (
                                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            )}
                            {loading ? "Saving Changes..." : id ? "Update Publication" : "Deploy Document"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogForm;