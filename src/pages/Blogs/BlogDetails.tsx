import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const fetchBlogById = async (id: string) => {
  const res = await fetch(`${API_URL}/api/blogs/${id}`);
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getImage = (src: string) => {
  return src.startsWith("http") ? src : `${API_URL}${src}`;
};

const stripHtml = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const readingTime = (html: string) => {
  const text = stripHtml(html);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
};

const BlogDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const isAdminView = searchParams.get("ref") === "admin";
  const backLink = isAdminView ? "/admin/blogs" : "/blogs";

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await fetchBlogById(id);
        if (!data.isActive && !isAdminView) {
          setNotFound(true);
        } else {
          setBlog(data);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-[3px] border-gray-100 border-t-green-600 rounded-full animate-spin" />
          <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Loading</span>
        </div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-green-600 text-7xl font-extrabold mb-4 tracking-tight">404</p>
          <h2 className="text-gray-900 text-xl font-bold mb-2">Article not found</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            This post may have been removed, changed names, or is temporarily unavailable.
          </p>
          <Link
            to={backLink}
            className="inline-block bg-green-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition duration-300 shadow-sm w-full"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 selection:bg-green-100 selection:text-green-900">

      {/* ── Admin Banner ── */}
      {isAdminView && (
        <div className="bg-amber-50/80 backdrop-blur border-b border-amber-200/60 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
              Admin Preview
            </span>
            {!blog.isActive && (
              <span className="text-[11px] bg-red-50 text-red-600 border border-red-100 px-2.5 py-0.5 rounded-full font-medium">
                Draft — Not published to public
              </span>
            )}
          </div>
          <Link to="/admin/blogs" className="text-amber-700 text-xs font-semibold hover:text-amber-800 transition-colors flex items-center gap-1">
            ← Admin Panel
          </Link>
        </div>
      )}

      {/* ── Breadcrumb nav ── */}
      <div className="border-b border-gray-100 bg-gray-50/50 py-3.5 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2.5 text-xs font-medium tracking-wide text-gray-500">
          <Link to="/blogs" className="text-green-600 hover:text-green-700 transition-colors">
            Blog
          </Link>
          <span className="text-gray-300 text-sm">/</span>
          <span className="text-gray-700 truncate max-w-xs md:max-w-md">{blog.title}</span>
        </div>
      </div>

      {/* ── Page body: article + sidebar ── */}
      <div className="max-w-6xl mx-auto px-6 py-12 lg:flex lg:gap-12 xl:gap-16 items-start">

        {/* ══════════════════════════════════
            LEFT — Article
        ══════════════════════════════════ */}
        <article className="min-w-0 flex-1">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-gray-900 leading-[1.15] tracking-tight mb-6">
            {blog.title}
          </h1>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-sm border-b border-gray-100 pb-6 mb-8 text-gray-500">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-green-600/20">
                {blog.title?.[0]?.toUpperCase() ?? "B"}
              </div>
              <span className="text-gray-900 font-semibold">Our Team</span>
            </div>
            <span className="text-gray-300 select-none">•</span>
            <time className="font-medium">{formatDate(blog.createdAt)}</time>
            <span className="text-gray-300 select-none">•</span>
            <span className="font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">{readingTime(blog.description)}</span>
            
            {blog.youtubeLink && (
              <>
                <span className="text-gray-300 select-none">•</span>
                <span className="bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-red-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Video Guide
                </span>
              </>
            )}
            {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
              <>
                <span className="text-gray-300 select-none">•</span>
                <span className="text-gray-400 text-xs italic">Updated {formatDate(blog.updatedAt)}</span>
              </>
            )}
          </div>

          {/* Hero image */}
          {blog.images?.length > 0 && (
            <figure className="mb-10 group">
              <div className="w-full overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-md shadow-gray-100/40">
                <img
                  src={getImage(blog.images[0])}
                  alt={blog.title}
                  className="w-full object-cover max-h-[520px] group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                />
              </div>
            </figure>
          )}

          {/* ── Article body content ── */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* ── Gallery ── */}
          {blog.images?.length > 1 && (
            <div className="mt-16 pt-10 border-t border-gray-100">
              <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-6">
                Visual Gallery
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {blog.images.slice(1).map((img: string, i: number) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl bg-gray-50 aspect-square border border-gray-100 shadow-sm group cursor-zoom-in"
                  >
                    <img
                      src={getImage(img)}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── YouTube embed ── */}
          {blog.youtubeLink && (
            <div className="mt-16 pt-10 border-t border-gray-100">
              <p className="text-[11px] uppercase tracking-[3px] font-bold text-gray-400 mb-6">
                Video Companion
              </p>
              <div className="overflow-hidden rounded-2xl border border-gray-100 aspect-video bg-gray-50 shadow-lg shadow-gray-100">
                <iframe
                  src={blog.youtubeLink.replace("watch?v=", "embed/")}
                  className="w-full h-full"
                  allowFullScreen
                  title={blog.title}
                />
              </div>
            </div>
          )}

          {/* ── Footer ── */}
          <footer className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
            <Link
              to={backLink}
              className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-bold transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Articles
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs text-gray-400 hover:text-gray-600 font-semibold transition-colors uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100"
            >
              Top ↑
            </button>
          </footer>

        </article>

        {/* ══════════════════════════════════
            RIGHT — Sidebar
        ══════════════════════════════════ */}
        <aside className="hidden lg:flex flex-col gap-6 w-[280px] xl:w-[300px] flex-shrink-0 sticky top-12 self-start">

          {/* Author card */}
          <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-[2px] font-bold text-gray-400 mb-4">
              Published By
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-700 flex items-center justify-center font-bold text-sm border border-green-100">
                {blog.title?.[0]?.toUpperCase() ?? "B"}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-tight">Our Team</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">Insights & Research</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Expert articles, breaking features, and foundational blueprints gathered from across our tech ecosystem.
            </p>
          </div>

          {/* Article info */}
          <div className="border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] uppercase tracking-[2px] font-bold text-gray-400 mb-4">
              Metadata
            </p>
            <div className="space-y-3.5 text-xs font-medium text-gray-500">
              <div className="flex justify-between items-center gap-3">
                <span>Date Published</span>
                <span className="text-gray-900 font-semibold">{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center gap-3">
                <span>Read Intensity</span>
                <span className="text-gray-900 font-semibold">{readingTime(blog.description)}</span>
              </div>
              {blog.images?.length > 0 && (
                <div className="flex justify-between items-center gap-3">
                  <span>Visual Count</span>
                  <span className="text-gray-900 font-semibold">{blog.images.length} assets</span>
                </div>
              )}
              {blog.youtubeLink && (
                <div className="flex justify-between items-center gap-3 pt-1 border-t border-gray-50">
                  <span>Video Asset</span>
                  <a
                    href={blog.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 hover:underline inline-flex items-center gap-0.5"
                  >
                    Watch Hub ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Ad slot 1 — Clean Minimal Design */}
          <div className="border border-gray-100 rounded-2xl bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center text-center p-6 min-h-[250px] shadow-sm relative overflow-hidden">
            <div className="absolute top-2 right-3 text-[8px] uppercase tracking-[1.5px] text-gray-300 font-bold">Sponsor Space</div>
            <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center text-xs mb-2">3×2</div>
            <p className="text-xs font-bold text-gray-400">Contextual Placement</p>
            <p className="text-[11px] text-gray-300 mt-1 max-w-[180px]">Reserve this placement for custom campaigns.</p>
          </div>

        </aside>

      </div>

      {/* ── Typography styles for article body ── */}
      <style>{`
        .article-body {
          font-size: 1.1rem;
          line-height: 1.85;
          color: #2d3748;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        .article-body > * + * { margin-top: 1.6rem; }

        .article-body h1,
        .article-body h2,
        .article-body h3,
        .article-body h4 {
          color: #0f172a;
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.3;
          margin-top: 2.75rem;
          margin-bottom: 0.75rem;
        }
        .article-body h1 { font-size: 2rem; }
        .article-body h2 { font-size: 1.625rem; border-bottom: 1px solid #f8fafc; padding-bottom: 0.25rem; }
        .article-body h3 { font-size: 1.35rem; }
        .article-body h4 { font-size: 1.15rem; }

        .article-body p { color: #334155; margin-bottom: 0; }
        .article-body strong { color: #0f172a; font-weight: 700; }
        .article-body em { color: #475569; font-style: italic; }

        .article-body a {
          color: #16a34a;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: rgba(22,163,74,0.25);
          text-underline-offset: 4px;
          transition: all 0.2s;
        }
        .article-body a:hover { text-decoration-color: #16a34a; color: #15803d; }

        .article-body blockquote {
          border-left: 4px solid #16a34a;
          margin: 2.2rem 0;
          padding: 0.5rem 0 0.5rem 1.75rem;
          color: #475569;
          font-size: 1.15rem;
          font-style: italic;
          line-height: 1.8;
          background: #f8fafc;
          border-radius: 0 12px 12px 0;
        }

        .article-body img {
          border-radius: 14px;
          margin: 2.5rem 0;
          width: 100%;
          border: 1px solid #f1f5f9;
          shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
        }

        .article-body pre,
        .article-body .ql-syntax {
          background: #0f172a;
          border-radius: 12px;
          padding: 1.5rem;
          overflow-x: auto;
          font-size: 0.875rem;
          line-height: 1.7;
          color: #f8fafc;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          display: block;
          margin: 2rem 0;
          box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.3);
        }

        .article-body code {
          background: #f1f5f9;
          border-radius: 6px;
          padding: 0.2em 0.4em;
          font-size: 0.85em;
          color: #0f766e;
          font-weight: 600;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .article-body pre code,
        .article-body .ql-syntax code {
          background: none;
          border: none;
          padding: 0;
          color: inherit;
          font-weight: inherit;
        }

        .article-body ul {
          list-style: none;
          padding-left: 0;
          margin: 1.5rem 0;
        }
        .article-body ul li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.6rem;
          color: #334155;
        }
        .article-body ul li::before {
          content: "";
          position: absolute;
          left: 4px;
          top: 10px;
          width: 6px;
          height: 6px;
          background-color: #16a34a;
          border-radius: 50%;
        }
        .article-body ol {
          list-style: decimal;
          padding-left: 1.75rem;
          margin: 1.5rem 0;
          color: #334155;
        }
        .article-body ol li { margin-bottom: 0.6rem; padding-left: 0.25rem; }

        .article-body hr {
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 3.5rem 0;
        }

        .article-body table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 0.925rem;
          margin: 2rem 0;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }
        .article-body th {
          border-bottom: 2px solid #e2e8f0;
          padding: 0.85rem 1.25rem;
          text-align: left;
          font-weight: 700;
          color: #0f172a;
          background: #f8fafc;
        }
        .article-body td {
          border-bottom: 1px solid #f1f5f9;
          padding: 0.85rem 1.25rem;
          color: #475569;
        }
        .article-body tr:last-child td { border-bottom: none; }

        /* Quill alignments */
        .article-body .ql-align-center { text-align: center; }
        .article-body .ql-align-right  { text-align: right; }
        .article-body .ql-align-justify { text-align: justify; }
        .article-body u { text-decoration: underline; }
        .article-body s { text-decoration: line-through; color: #94a3b8; }
      `}</style>

    </div>
  );
};

export default BlogDetails;