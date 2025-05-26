import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "Contact Us",
    description: "Have a question or feedback? We'd love to hear from you.",
};

export default function ContactPage() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-2 text-center">Get in Touch</h1>
            <p className="text-muted-foreground text-center mb-6">
                Have a question or suggestion? Fill out the form below and we’ll get back to you.
            </p>
            <Separator className="mb-6" />

            <Card>
                <CardContent className="p-6">
                    <form
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <Input type="text" placeholder="Your Name" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input type="email" placeholder="your@email.com" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Message</label>
                            <Input placeholder="Type your message here..." required />
                        </div>

                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
