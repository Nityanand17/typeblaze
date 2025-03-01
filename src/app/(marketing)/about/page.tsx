export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About TypeBlaze</h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-200">
          <p>
            TypeBlaze is an innovative platform designed to enhance typing proficiency through interactive challenges and exciting competitions. Our goal is to make typing practice both engaging and rewarding while fostering a sense of community.
          </p>
          <p>
            Launched in October 2024, TypeBlaze has rapidly gained popularity among students, professionals, and typing enthusiasts eager to refine their keyboard skills. Our dedicated team continuously works on introducing fresh challenges, optimizing user experience, and building a vibrant, supportive environment.
          </p>
          <p>
            We at TypeBlaze understand the importance of strong typing abilities in today's digital era. Whether you're just starting your typing journey or striving to set new records, TypeBlaze provides a variety of tools and challenges to help you succeed.
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Live multiplayer typing battles</li>
            <li>Customized practice modes</li>
            <li>Daily challenges with competitive leaderboards</li>
            <li>Comprehensive performance tracking</li>
            <li>Engaging typing games with unique themes</li>
          </ul>
        </div>
      </main>
      
    </div>
  )
}