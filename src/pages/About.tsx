import {
    PhilosophyScroll,
    MissionReveal,
    FutureVision,
    AboutCTA,
    ScrollProgress,
} from '@/components/about';

export function About() {
    return (
        <div className="relative min-h-screen bg-canvas dark:bg-navy-900">
            <ScrollProgress />
            <main>
                <PhilosophyScroll />
                <MissionReveal />
                <AboutCTA />
            </main>
        </div>
    );
}
