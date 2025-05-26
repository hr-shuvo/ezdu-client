// app/policy/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "Privacy Policy",
    description: "Read about how we collect, use, and protect your information.",
};

export default function PolicyPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <Separator className="mb-6" />

            <Card>
                <CardContent className="p-6 space-y-4 text-sm leading-6 text-muted-foreground">
                    <p>
                        We value your privacy. This policy explains how we collect, use, and protect your information when
                        you use our services.
                    </p>

                    <h2 className="text-base font-semibold text-foreground mt-6">1. Information Collection</h2>
                    <p>
                        We may collect personal information such as your name, email, and usage data when you use our site
                        or contact us.
                    </p>

                    <h2 className="text-base font-semibold text-foreground mt-6">2. How We Use Your Information</h2>
                    <p>
                        Your data helps us improve our services, respond to your requests, and communicate updates. We never
                        sell your data.
                    </p>

                    <h2 className="text-base font-semibold text-foreground mt-6">3. Data Protection</h2>
                    <p>
                        We use secure technologies and procedures to protect your personal data from unauthorized access or
                        disclosure.
                    </p>

                    <h2 className="text-base font-semibold text-foreground mt-6">4. Cookies</h2>
                    <p>
                        We may use cookies to personalize your experience. You can disable cookies in your browser settings.
                    </p>

                    <h2 className="text-base font-semibold text-foreground mt-6">5. Changes to This Policy</h2>
                    <p>
                        This policy may be updated periodically. We&#39;ll notify users of significant changes through our site.
                    </p>

                    <p>
                        If you have questions about this policy, please contact us through the contact page.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
