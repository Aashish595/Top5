import { getFeaturedLists, getLatestPosts, getTrendingLists } from '@/lib/sanity/queries'
import HeroSection from '@/components/HeroSection'
import TrendingLists from '@/components/TrendingLists'
import LatestPosts from '@/components/LatestPosts'
import PollSection from '@/components/PollSection'
import DesktopSidebar from '@/components/DesktopSidebar'

export default async function Home() {
  const [trendingLists, latestPosts, featuredLists] = await Promise.all([
    getTrendingLists(),
    getLatestPosts(),
    getFeaturedLists(),
  ])

  return (
    <div className="flex">
      <DesktopSidebar />
      <div className="flex-1">
        <HeroSection lists={featuredLists} />
        <TrendingLists lists={trendingLists} />
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <LatestPosts posts={latestPosts} />
          <PollSection />
        </div>
      </div>
    </div>
  )
}