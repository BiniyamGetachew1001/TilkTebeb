import { BookOpen, Briefcase, Laptop, Moon, Smartphone, Wifi } from "lucide-react"

export function FeatureSection() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Premium Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed to enhance your reading and business planning experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-lg glass dark:glass-dark card-3d">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 gold-icon" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Reading</h3>
            <p className="text-muted-foreground">
              Adjustable font size, night mode, scroll/pagination options, highlighting, and note-taking features.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg glass dark:glass-dark card-3d">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 gold-icon" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Business Plan Marketplace</h3>
            <p className="text-muted-foreground">
              Browse and unlock premium business plans for different business sizes with detailed, structured guidance.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg glass dark:glass-dark card-3d">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Moon className="h-6 w-6 gold-icon" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Night Mode</h3>
            <p className="text-muted-foreground">
              Comfortable reading experience in low-light environments with our customizable dark theme.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg glass dark:glass-dark card-3d">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Wifi className="h-6 w-6 gold-icon" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Offline Reading</h3>
            <p className="text-muted-foreground">
              Cache last-read content for offline access. Recently opened books stay available without internet.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg glass dark:glass-dark card-3d">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Laptop className="h-6 w-6 gold-icon" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Modern UI/UX</h3>
            <p className="text-muted-foreground">
              Clean, modern interface with smooth animations and easy navigation for a seamless reading experience.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg glass dark:glass-dark card-3d">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
              <Smartphone className="h-6 w-6 gold-icon" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile-Friendly</h3>
            <p className="text-muted-foreground">
              Responsive design optimized for reading on any device, from desktop to smartphone.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

