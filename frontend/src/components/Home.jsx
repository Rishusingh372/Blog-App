import React, { useMemo } from "react";
import { useAuth } from "../context/AuthProvider";
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Creator from "../Home/Creator";
import Devotional from "../Home/Devotional";
import { Link } from "react-router-dom";

function Home() {
  const { blogs } = useAuth();

  // ✅ 6 Demo blogs (fallback when no blogs from backend)
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
    []
  );

  // ✅ Use backend blogs if available else demo blogs
  const homeBlogs = blogs && blogs.length > 0 ? blogs : demoBlogs;

  // ✅ categories quick nav
  const categories = ["Devotion", "Sports", "Coding", "Entertainment", "Business"];

  return (
    <div className="bg-gray-50">
      {/* Top Hero section */}
      <section className="container mx-auto px-4 pt-8 pb-6">
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h1 className="text-3xl md:text-4xl font-bold">
              Discover Stories, Ideas & Knowledge
            </h1>
            <p className="mt-2 text-white/90 max-w-2xl">
              Post your blogs. If you are a user, your blog will be visible after
              admin approval.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/blogs"
                className="px-5 py-2 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition"
              >
                Explore Blogs
              </Link>
              <Link
                to="/dashboard"
                className="px-5 py-2 rounded-xl bg-black/20 border border-white/30 text-white font-semibold hover:bg-black/30 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>

          {/* Category chips */}
          <div className="p-4 md:p-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/blogs"
                className="text-sm px-4 py-2 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Cards */}
      <section className="container mx-auto px-4">
        {/* If real blogs exist, show your Hero component (uses useAuth blogs) */}
        {blogs && blogs.length > 0 ? (
          <Hero />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
            {homeBlogs.slice(0, 4).map((b) => (
              <div
                key={b._id}
                className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={b.blogImage.url}
                  alt={b.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {b.category}
                  </span>
                  <h3 className="mt-2 font-semibold text-gray-900 line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {b.about}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src={b.adminPhoto}
                      alt="author"
                      className="w-8 h-8 rounded-full border object-cover"
                    />
                    <p className="text-sm text-gray-700">{b.adminName}</p>
                  </div>

                  <div className="mt-4">
                    {/* demo items don't have detail route, so send to /blogs */}
                    <Link
                      to={blogs?.length ? `/blog/${b._id}` : "/blogs"}
                      className="inline-flex text-sm font-semibold text-blue-600 hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trending section */}
      <section className="container mx-auto px-4 py-6">
        {blogs && blogs.length > 0 ? (
          <Trending />
        ) : (
          <div className="bg-white border rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Trending</h2>
              <Link to="/blogs" className="text-sm text-blue-600 font-semibold">
                View all →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {homeBlogs.slice(0, 6).map((b) => (
                <div
                  key={b._id}
                  className="border rounded-2xl overflow-hidden bg-white hover:shadow-lg transition"
                >
                  <img
                    src={b.blogImage.url}
                    alt={b.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {b.category}
                    </span>
                    <h3 className="mt-2 font-semibold line-clamp-2">{b.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {b.about}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Showing demo content because no approved blogs are available yet.
            </p>
          </div>
        )}
      </section>

      {/* Creators */}
      <section className="container mx-auto px-4 py-6">
        <Creator />
      </section>

      {/* Devotional category section */}
      <section className="container mx-auto px-4 pb-10">
        <Devotional />
      </section>
    </div>
  );
}

export default Home;
