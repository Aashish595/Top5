"use client"

import { useState } from "react"
import { ArrowLeft, Star, Users, Heart, Share2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

const postData = {
  id: 1,
  title: "Top 5 Movies of 2024",
  category: "Movies",
  categoryColor: "bg-orange-500",
  coverImage: "/placeholder.svg?height=400&width=800",
  author: "John Doe",
  publishDate: "December 15, 2024",
  views: "125K",
  rating: 4.8,
  description: "The most anticipated and highest-rated movies this year that you absolutely cannot miss.",
  items: [
    {
      rank: 1,
      title: "Dune: Part Two",
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Denis Villeneuve's epic conclusion to the Dune saga delivers breathtaking visuals and compelling storytelling.",
      rating: 9.2,
      details: "Starring Timothée Chalamet and Zendaya, this sci-fi masterpiece has redefined the genre.",
    },
    {
      rank: 2,
      title: "Oppenheimer",
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Christopher Nolan's biographical thriller about the father of the atomic bomb is both haunting and brilliant.",
      rating: 9.0,
      details: "Cillian Murphy delivers a career-defining performance in this historical drama.",
    },
    {
      rank: 3,
      title: "Spider-Man: Across the Spider-Verse",
      image: "/placeholder.svg?height=200&width=300",
      description: "The animated sequel pushes the boundaries of visual storytelling to new heights.",
      rating: 8.9,
      details: "A multiverse adventure that combines stunning animation with heartfelt storytelling.",
    },
    {
      rank: 4,
      title: "Guardians of the Galaxy Vol. 3",
      image: "/placeholder.svg?height=200&width=300",
      description: "James Gunn's emotional farewell to the beloved cosmic team delivers laughs and tears.",
      rating: 8.7,
      details: "The perfect conclusion to the Guardians trilogy with exceptional character development.",
    },
    {
      rank: 5,
      title: "John Wick: Chapter 4",
      image: "/placeholder.svg?height=200&width=300",
      description: "Keanu Reeves returns for another stylish and action-packed adventure.",
      rating: 8.5,
      details: "Incredible action sequences and cinematography make this a worthy addition to the franchise.",
    },
  ],
}

const relatedPosts = [
  {
    id: 2,
    title: "Top 5 Action Movies of All Time",
    category: "Movies",
    categoryColor: "bg-orange-500",
    image: "/placeholder.svg?height=150&width=200",
    views: "89K",
  },
  {
    id: 3,
    title: "Best Sci-Fi Movies to Watch",
    category: "Movies",
    categoryColor: "bg-orange-500",
    image: "/placeholder.svg?height=150&width=200",
    views: "76K",
  },
  {
    id: 4,
    title: "Top 5 Netflix Originals",
    category: "Movies",
    categoryColor: "bg-orange-500",
    image: "/placeholder.svg?height=150&width=200",
    views: "112K",
  },
]

export default function SinglePost() {
  const [userVote, setUserVote] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lists
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <div className="mb-8">
            <Badge className={`${postData.categoryColor} text-white mb-4`}>{postData.category}</Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{postData.title}</h1>

            <p className="text-xl text-muted-foreground mb-6">{postData.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <span>By {postData.author}</span>
              <span>{postData.publishDate}</span>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{postData.views} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{postData.rating}</span>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Cover Image */}
            <div className="relative overflow-hidden rounded-xl mb-8">
              <Image
                src={postData.coverImage || "/placeholder.svg"}
                alt={postData.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>

          {/* Top 5 List */}
          <div className="space-y-8 mb-12">
            {postData.items.map((item) => (
              <Card key={item.rank} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-80">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={300}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                        {item.rank}
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <p className="text-sm">{item.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Embedded Video */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Watch the Trailer Compilation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Video Player Placeholder</p>
                  <p className="text-sm text-muted-foreground">Trailer compilation would be embedded here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voting Poll */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Which movie do you think deserves #1?</CardTitle>
              <p className="text-muted-foreground">Cast your vote and see what others think!</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {postData.items.slice(0, 3).map((item, index) => (
                <div key={item.rank} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="movie-vote"
                        value={item.rank}
                        checked={userVote === item.rank}
                        onChange={() => setUserVote(item.rank)}
                        className="w-4 h-4"
                      />
                      <span>{item.title}</span>
                    </label>
                    <span className="text-muted-foreground">{35 - index * 10}%</span>
                  </div>
                  <Progress value={35 - index * 10} className="h-2" />
                </div>
              ))}
              <Button className="w-full mt-4" disabled={!userVote}>
                Submit Vote
              </Button>
            </CardContent>
          </Card>

          <Separator className="mb-12" />

          {/* Related Posts */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Related Top 5 Lists</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className={`absolute top-3 left-3 ${post.categoryColor} text-white`}>
                        {post.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{post.views}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
