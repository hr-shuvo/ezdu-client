// app/terms/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "Terms & Conditions",
    description: "Understand the rules and responsibilities when using our platform.",
};

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-4">Terms & Conditions</h1>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                Please read these Terms and Conditions carefully before using our website or services.
            </p>

            <Separator className="mb-8" />

            <Card>
                <CardContent className="p-6 space-y-6 text-sm leading-6 text-muted-foreground">
                    <div>
                        <h2 className="text-base font-semibold text-foreground mb-1">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy.
                            If you do not agree with any part of the terms, you must not use our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-foreground mb-1">2. Use of the Platform</h2>
                        <p>
                            You agree to use the site for lawful purposes only. You may not use it in any way that violates
                            applicable laws or regulations.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-foreground mb-1">3. User Accounts</h2>
                        <p>
                            If you create an account, you are responsible for maintaining the confidentiality of your credentials
                            and for all activities that occur under your account.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-foreground mb-1">4. Intellectual Property</h2>
                        <p>
                            All content, logos, and materials on the site are the intellectual property of the platform or its
                            licensors. You may not reproduce or distribute any content without permission.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-foreground mb-1">5. Termination</h2>
                        <p>
                            We reserve the right to terminate or suspend your access to our services at any time without prior notice
                            if you violate these Terms.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-foreground mb-1">6. Changes to Terms</h2>
                        <p>
                            We may update these Terms from time to time. We encourage you to review this page periodically
                            for changes.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-foreground mb-1">7. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please reach out via our <a href="/contact" className="underline text-primary">Contact page</a>.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
