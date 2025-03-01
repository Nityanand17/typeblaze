import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h1>
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 mb-8">
            Have any questions, suggestions, or feedback? We'd love to hear from you! Fill out the form below, and our team will get back to you as soon as possible.
          </p>
          <form className="space-y-6">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is your inquiry about?" />
            </div>
            <div>
              <Label htmlFor="message">Your Message</Label>
              <Textarea id="message" placeholder="Write your message here..." rows={5} />
            </div>
            <Button type="submit" className="w-full dark:bg-gray-500 bg-yellow-500 text-white">Send Message</Button>
          </form>
        </div>
      </main>
      
    </div>
  )
}
