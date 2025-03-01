import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I start a typing test?</AccordionTrigger>
            <AccordionContent>
              To begin a typing test, click on the "Start Typing" button in the navigation. You'll be directed to the practice area, where you can select from different typing challenges and exercises.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is TypeBlaze free to use?</AccordionTrigger>
            <AccordionContent>
              Yes! TypeBlaze is completely free to use, offering a variety of typing challenges at no cost. In the future, we may introduce optional premium features for an even better experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How is typing speed measured?</AccordionTrigger>
            <AccordionContent>
              Typing speed is measured in words per minute (WPM). A word is considered as five characters, including spaces. Your final WPM score accounts for errors and accuracy adjustments.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I compete with my friends?</AccordionTrigger>
            <AccordionContent>
              Absolutely! You can create private game rooms and invite your friends for live typing races. Additionally, your scores can be compared on our global and friend leaderboards.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How can I improve my typing speed?</AccordionTrigger>
            <AccordionContent>
              Consistent practice is the key! Use our daily challenges, personalized drills, and skill-building exercises to refine your typing. Prioritizing accuracy will naturally help you increase speed over time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      
    </div>
  )
}
