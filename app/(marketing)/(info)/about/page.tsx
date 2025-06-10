import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "About Us",
    description: "Learn about our mission, values, and the team behind our platform.",
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                We&#39;re on a mission to make education, learning, and skill-building easier and more accessible for everyone.
                Whether you&#39;re a student, job seeker, or lifelong learner — this platform is built for you.
            </p>

            <Separator className="mb-8" />

            <Card className="mb-8">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold">Our Mission</h2>
                    <p>
                        Our mission is to empower individuals through knowledge. We believe learning should be intuitive,
                        accessible, and enjoyable. Whether you&#39;re preparing for competitive exams or just expanding your knowledge,
                        we’re here to support your journey.
                    </p>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold">What We Offer</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Curriculum-aligned content for school-level students</li>
                        <li>Preparation materials for BCS, bank jobs, and other competitive exams</li>
                        <li>Progress tracking and interactive quizzes</li>
                        <li>Community-driven learning experiences</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold">Our Values</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium">Accessibility</h3>
                            <p className="text-sm text-muted-foreground">
                                We aim to remove barriers and provide learning opportunities to all.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">Integrity</h3>
                            <p className="text-sm text-muted-foreground">
                                We value honesty and transparency in everything we do.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">User-Centric</h3>
                            <p className="text-sm text-muted-foreground">
                                Every feature is designed with you — the learner — in mind.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-medium">Growth</h3>
                            <p className="text-sm text-muted-foreground">
                                We are continuously improving our platform to serve you better.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6 space-y-4 text-center">
                    <h2 className="text-2xl font-semibold">Join Our Journey</h2>
                    <p>
                        We&#39;re just getting started. If you’re passionate about education, join us as a learner, contributor,
                        or partner. Together, we can create something truly impactful.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
