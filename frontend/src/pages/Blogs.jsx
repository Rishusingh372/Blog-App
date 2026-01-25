import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Blogs() {
  const { blogs } = useAuth();

  // ✅ Demo fallback (same style as Home)
  const demoBlogs = useMemo(
    () => [
      {
        _id: "demo-1",
        title: "How to Build a MERN Blog App (Step-by-Step)",
        category: "Coding",
        about:
          "Learn how to create a complete MERN blog app with authentication, CRUD, image upload, and admin approval workflow.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=60",
        },
      },
      {
        _id: "demo-2",
        title: "Cricket Mindset: Consistency Beats Motivation",
        category: "Sports",
        about:
          "A practical guide on how consistency can transform your performance—whether in cricket, study, or career.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&auto=format&fit=crop&q=60",
        },
      },
      {
        _id: "demo-3",
        title: "Money Habits That Actually Work for Students",
        category: "Business",
        about:
          "Simple money rules for students—budgeting, saving, and building habits that keep you stress-free.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=60",
        },
      },
      {
        _id: "demo-4",
        title: "Entertainment Picks: Web Series You’ll Finish in a Weekend",
        category: "Entertainment",
        about:
          "Handpicked web series suggestions with quick summaries—perfect weekend binge list.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1200&auto=format&fit=crop&q=60",
        },
      },
      {
        _id: "demo-5",
        title: "Devotion & Discipline: Daily Routine for Peace",
        category: "Devotion",
        about:
          "A gentle routine you can follow daily for mental peace—small steps, big changes.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=1200&auto=format&fit=crop&q=60",
        },
      },
      {
        _id: "demo-6",
        title: "React + Tailwind UI: Make Your App Look Premium",
        category: "Coding",
        about:
          "Upgrade your UI with Tailwind best practices, layout patterns, and clean component design.",
        adminName: "Demo Author",
        adminPhoto:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
        blogImage: {
          url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=60",
        },
      },
    ],
    [],
  );

  // ✅ if no approved blogs yet
  const list = blogs && blogs.length > 0 ? blogs : demoBlogs;
  const isDemo = !(blogs && blogs.length > 0);

  const categories = [
    "All",
    "Devotion",
    "Sports",
    "Coding",
    "Entertainment",
    "Business",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredBlogs = useMemo(() => {
    const q = query.trim().toLowerCase();

    return list.filter((b) => {
      const matchCategory =
        selectedCategory === "All" ? true : b.category === selectedCategory;

      const matchQuery = !q
        ? true
        : (b.title || "").toLowerCase().includes(q) ||
          (b.category || "").toLowerCase().includes(q) ||
          (b.adminName || "").toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [list, selectedCategory, query]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Blogs</h1>
              <p className="text-sm text-gray-500 mt-1">
                Browse stories by category, search, and explore new creators.
              </p>
              {isDemo && (
                <p className="text-xs text-yellow-700 mt-2 bg-yellow-50 border border-yellow-100 inline-block px-3 py-1 rounded-full">
                  Showing demo content (no approved blogs yet)
                </p>
              )}
            </div>

            {/* Search */}
            <div className="w-full md:w-96">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, category, author..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full border text-sm transition
                    ${
                      active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <img
                src={blog?.blogImage?.url}
                alt={blog?.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {blog?.category}
                  </span>
                </div>

                <h2 className="mt-3 text-lg font-bold text-gray-900 line-clamp-2">
                  {blog?.title}
                </h2>

                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {blog?.about}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={blog?.adminPhoto || "/default-avatar.png"}
                    alt="author"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {blog?.adminName || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">Creator</p>
                  </div>
                </div>

                <div className="mt-5">
                  {/* ✅ demo -> open /blogs; real -> open detail */}
                  <Link
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition"
                  >
                    Read Blog
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {!filteredBlogs.length && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 font-semibold">
                No blogs found for your search.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Try changing category or clearing the search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
