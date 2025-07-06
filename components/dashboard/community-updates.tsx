"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp } from "lucide-react"

export function CommunityUpdates() {
  const updates = [
    {
      id: 1,
      author: "Rajendra Singh",
      avatar: "/farmer-1.jpg",
      time: "2 hours ago",
      content: "Has anyone tried the new drought-resistant wheat variety? I'm considering it for next season.",
      likes: 12,
      comments: 5,
    },
    {
      id: 2,
      author: "Anita Deshmukh",
      avatar: "/farmer-2.jpg",
      time: "Yesterday",
      content: "Workshop on organic farming techniques this Saturday at the community center. All are welcome!",
      likes: 24,
      comments: 8,
    },
    {
      id: 3,
      author: "Prakash Joshi",
      avatar: "/farmer-3.jpg",
      time: "2 days ago",
      content: "Heavy rainfall expected next week. Make sure to secure your crops and equipment.",
      likes: 18,
      comments: 7,
    },
  ]

  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <div key={update.id} className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={update.avatar || "/placeholder.svg"} alt={update.author} />
              <AvatarFallback>{update.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{update.author}</div>
              <div className="text-xs text-muted-foreground">{update.time}</div>
            </div>
          </div>
          <p className="text-sm">{update.content}</p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span className="text-xs">{update.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="text-xs">{update.comments}</span>
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full mt-2">
        View All Updates
      </Button>
    </div>
  )
}
