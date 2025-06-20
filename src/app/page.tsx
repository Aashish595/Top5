import { getFeaturedLists, getLatestPosts, getTrendingLists, getPolls } from '@/lib/sanity/queries'
import HeroSection from '@/components/HeroSection'
import TrendingLists from '@/components/TrendingLists'
import LatestPosts from '@/components/LatestPosts'
import PollDisplay from '@/components/PollDisplay'
import CreatePollForm from '@/components/CreatePollForm'
import DesktopSidebar from '@/components/DesktopSidebar'

export default async function Home() {
  // Fetch all data in parallel
  const [trending, latest, featured, polls] = await Promise.allSettled([
    getTrendingLists(),
    getLatestPosts(),
    getFeaturedLists(),
    getPolls()
  ])

  // Handle potential errors
  const featuredLists = featured.status === 'fulfilled' ? featured.value : []
  const trendingLists = trending.status === 'fulfilled' ? trending.value : []
  const latestPosts = latest.status === 'fulfilled' ? latest.value : []
  const allPolls = polls.status === 'fulfilled' ? polls.value : []

  // Get the most recent poll
  const latestPoll = allPolls.length > 0 
    ? allPolls[0] 
    : null

  return (
    <div className="flex">
      <DesktopSidebar />
      
      <div className="flex-1 px-4 md:px-8 py-6">
        {/* Hero Section */}
        <HeroSection lists={featuredLists} />
        
        {/* Trending Lists */}
        <TrendingLists lists={trendingLists} />
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Posts */}
          <div className="lg:col-span-2 space-y-8">
            <LatestPosts posts={latestPosts} />
          </div>
          
          {/* Right Column - Polls */}
          <div className="space-y-8">
            {latestPoll ? (
              <PollDisplay 
                poll={latestPoll} 
                className="sticky top-4"
              />
            ) : (
              <div className="border rounded-lg p-6 bg-background">
                <p>No active polls available</p>
              </div>
            )}
            
            {/* Poll Creation Form (for admins/moderators) */}
            <CreatePollForm className="sticky top-[400px]" />
          </div>
        </div>
      </div>
    </div>
  )
}