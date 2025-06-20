// app/site/page.tsx
'use client';

import {
  getFeaturedLists,
  getLatestPosts,
  getTrendingLists,
  getPolls,
  getCategoriesWithSubcategories
} from "@/lib/sanity/queries";
import HeroSection from "@/components/HeroSection";
import TrendingLists from "@/components/TrendingLists";
import LatestPosts from "@/components/LatestPosts";
import PollDisplay from "@/components/PollDisplay";
import CreatePollForm from "@/components/CreatePollForm";
import { Sidebar } from "@/components/Sidebar";
import {
  transformList,
  transformPost,
  transformPoll,
  transformCategory
} from "@/lib/sanity/transform";
import { Category, List, Post, Poll } from "@/types";

export default async function Home() {
  // Fetch all data in parallel with proper typing
  const [
    trending,
    latest,
    featured,
    polls,
    categories
  ] = await Promise.allSettled([
    getTrendingLists() as Promise<unknown[]>,
    getLatestPosts() as Promise<unknown[]>,
    getFeaturedLists() as Promise<unknown[]>,
    getPolls() as Promise<unknown[]>,
    getCategoriesWithSubcategories() as Promise<unknown[]>
  ]);

  // Transform and handle errors with proper types
  const featuredLists: List[] = featured.status === "fulfilled" ? featured.value.map(transformList) : [];
  const trendingLists: List[] = trending.status === "fulfilled" ? trending.value.map(transformList) : [];
  const latestPosts: Post[] = latest.status === "fulfilled" ? latest.value.map(transformPost) : [];
  const allPolls: Poll[] = polls.status === "fulfilled" ? polls.value.map(transformPoll) : [];
 // app/site/page.tsx
// app/site/page.tsx
const categoryList = categories.status === "fulfilled" ? 
  categories.value.map((item: unknown) => transformCategory(item)) : [];

  // Get the most recent poll
  const latestPoll: Poll | null = allPolls.length > 0 ? allPolls[0] : null;

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        categories={categoryList} 
        isOpen={true} 
        onClose={() => {}} 
      />
      
      <main className="flex-1 px-4 md:px-8 py-6">
        <HeroSection lists={featuredLists} />
        <TrendingLists lists={trendingLists} />
        
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <LatestPosts posts={latestPosts} />
          </div>
          
          <div className="space-y-8">
            {latestPoll ? (
              <PollDisplay poll={latestPoll} className="sticky top-4" />
            ) : (
              <div className="border rounded-lg p-6 bg-background">
                <p>No active polls available</p>
              </div>
            )}
            <CreatePollForm className="sticky top-[400px]" />
          </div>
        </div>
      </main>
    </div>
  );
}