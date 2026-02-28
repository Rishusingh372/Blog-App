import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const API = import.meta.env.VITE_API_URL;

function Detail() {
  const { id } = useParams();
  const { blogs } = useAuth();

  // ✅ Demo blogs data (same as Home/Blogs demo)
  const demoMap = useMemo(
    () => ({
      "demo-1": {
        _id: "demo-1",
        title: "How to Build a MERN Blog App (Step-by-Step)",
        category: "Coding",
        about:
          "Learn how to create a complete MERN blog app with authentication, CRUD, image upload, and admin approval workflow.\n\nIn this blog we cover:\n1) Project setup\n2) Auth flow\n3) CRUD APIs\n4) Image upload\n5) Admin approval workflow\n6) Deployment tips",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=60",
        },
        createdAt: new Date().toISOString(),
      },
      "demo-2": {
        _id: "demo-2",
        title: "Cricket Mindset: Consistency Beats Motivation",
        category: "Sports",
        about:
          "Consistency is what builds champions.\n\n✅ Small daily habits\n✅ Practice with intent\n✅ Track progress weekly\n✅ Learn from failures\n\nIf you want to improve in cricket (or any skill), focus on systems not motivation.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&auto=format&fit=crop&q=60",
        },
        createdAt: new Date().toISOString(),
      },
      "demo-3": {
        _id: "demo-3",
        title: "Money Habits That Actually Work for Students",
        category: "Business",
        about:
          "Simple money rules:\n\n1) Track expenses\n2) Save first (even ₹100)\n3) Avoid unnecessary EMI\n4) Learn one income skill\n5) Build emergency buffer\n\nThese habits reduce stress and improve long-term stability.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=60",
        },
        createdAt: new Date().toISOString(),
      },
      "demo-4": {
        _id: "demo-4",
        title: "Entertainment Picks: Web Series You’ll Finish in a Weekend",
        category: "Entertainment",
        about:
          "Weekend binge list:\n\n✅ Short seasons\n✅ Strong story\n✅ Easy to finish\n\nPick something light, finish fast, and enjoy your break without guilt.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&auto=format&fit=crop&q=60",
        },
        createdAt: new Date().toISOString(),
      },
      "demo-5": {
        _id: "demo-5",
        title: "Devotion & Discipline: Daily Routine for Peace",
        category: "Devotion",
        about:
          "A simple daily routine:\n\n1) 5 min gratitude\n2) 10 min prayer/meditation\n3) 15 min reading\n4) Avoid negativity\n\nPeace is a habit. Start small and stay consistent.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=1200&auto=format&fit=crop&q=60",
        },
        createdAt: new Date().toISOString(),
      },
      "demo-6": {
        _id: "demo-6",
        title: "React + Tailwind UI: Make Your App Look Premium",
        category: "Coding",
        about:
          "UI upgrade tips:\n\n✅ consistent spacing\n✅ reusable components\n✅ responsive grids\n✅ typography scale\n✅ subtle shadows\n\nWith Tailwind you can build premium UI fast—focus on layout patterns and consistency.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=60",
        },
        createdAt: new Date().toISOString(),
      },
    }),
    []
  );

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState({ code: null, message: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setErrorState({ code: null, message: "" });

        // ✅ DEMO BLOG: show local data, no API call
        if (id?.startsWith("demo-")) {
          const demoBlog = demoMap[id];
          if (!demoBlog) {
            setErrorState({ code: 404, message: "Demo blog not found." });
          } else {
            setBlog(demoBlog);
          }
          return;
        }

        // ✅ REAL BLOG: fetch from backend
        const { data } = await axios.get(
         `${API}/api/blogs/single-blog/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        setBlog(data);
      } catch (error) {
        console.log(error);
        const status = error?.response?.status;

        if (status === 403) {
          setErrorState({
            code: 403,
            message: "This blog is not approved yet. Please check later.",
          });
          return;
        }

        if (status === 404) {
          setErrorState({ code: 404, message: "Blog not found." });
          return;
        }

        setErrorState({
          code: 500,
          message: "Something went wrong while loading the blog.",
        });
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, demoMap]);

  const relatedBlogs = useMemo(() => {
    if (!blog?.category || !blogs?.length) return [];
    return blogs
      .filter((b) => b?.category === blog.category && b?._id !== blog._id)
      .slice(0, 3);
  }, [blogs, blog]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
        Loading blog...
      </div>
    );
  }

  if (errorState.code) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            {errorState.code === 403
              ? "Not Approved Yet"
              : errorState.code === 404
              ? "Not Found"
              : "Error"}
          </h1>
          <p className="text-gray-600 mt-2">{errorState.message}</p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to="/blogs"
              className="px-5 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition"
            >
              Back to Blogs
            </Link>
            <Link
              to="/"
              className="px-5 py-2 rounded-xl border bg-white text-gray-900 font-semibold hover:bg-gray-50 transition"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            {blog?.blogImage?.url && (
              <img
                src={blog.blogImage.url}
                alt={blog?.title}
                className="w-full h-[360px] object-cover"
              />
            )}

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  {blog?.category}
                </span>

                {id?.startsWith("demo-") && (
                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100">
                    Demo Blog
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">
                {blog?.title}
              </h1>

              <div className="flex items-center gap-3 mt-6">
                <img
                  src={blog?.adminPhoto || "/default-avatar.png"}
                  alt="author"
                  className="w-12 h-12 rounded-full border object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {blog?.adminName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {blog?.createdAt
                      ? new Date(blog.createdAt).toDateString()
                      : "Recently"}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <p className="text-gray-700 leading-7 whitespace-pre-line">
                  {blog?.about}
                </p>
              </div>
            </div>
          </div>

          {/* Related real blogs only */}
          {relatedBlogs.length > 0 && !id?.startsWith("demo-") && (
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Related in {blog.category}
                </h2>
                <Link to="/blogs" className="text-sm text-blue-600 font-semibold">
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {relatedBlogs.map((b) => (
                  <Link
                    key={b._id}
                    to={`/blog/${b._id}`}
                    className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                  >
                    <img
                      src={b?.blogImage?.url}
                      alt={b?.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        {b?.category}
                      </span>
                      <h3 className="mt-2 font-semibold text-gray-900 line-clamp-2">
                        {b?.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {b?.about}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
