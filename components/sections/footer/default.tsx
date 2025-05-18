import { FaFacebookF, FaTwitter } from "react-icons/fa";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "../../ui/footer";
import Link from "next/link";
import Image from "next/image";

export default function FooterSection() {
  return (
    <footer className="w-full bg-background px-4">
      <div className="mx-auto max-w-container">
        <Footer>
          <FooterContent className="flex justify-between">

            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div>
                <Image
                  src={'/common/1.png'}
                  alt="logo"
                  height={42}
                  width={80}
                  className="mr-4 rounded-md"
                />
              </div>

              <div className="flex items-center gap-2 ml-3">
                {/*<Link href='https://discord.gg/kRZa3WmwSM' target="_blank"> <FaDiscord /></Link>*/}
                <Link href='#'><FaFacebookF /></Link>
                <Link href='#'><FaTwitter /></Link>
              </div>
            </FooterColumn>

            <FooterColumn>
              <h2 className="text-md pt-1 font-semibold">Resource</h2>
              <Link href="/" className="text-sm text-muted-foreground">FAQs</Link>
              <Link href="/" className="text-sm text-muted-foreground">Guides</Link>
            </FooterColumn>

            <FooterColumn>
              <h2 className="text-md pt-1 font-semibold">Company</h2>
              <Link href="https://www.facebook.com/profile.php?id=61576033716497&sk=about" className="text-sm text-muted-foreground"> About</Link>
              <Link href="/" className="text-sm text-muted-foreground">Careers</Link>
              <Link href="/" className="text-sm text-muted-foreground">Blog</Link>
            </FooterColumn>

            <FooterColumn>
              <h2 className="text-md pt-1 font-semibold">Contact</h2>
              {/*<Link href='https://discord.gg/kRZa3WmwSM' target="_blank" className="text-sm text-muted-foreground ">Discord</Link>*/}
              <Link href="#" className="text-sm text-muted-foreground">Twitter</Link>
              <Link href="https://www.facebook.com/share/19MNpPPQMh/?mibextid=wwXIfr" className="text-sm text-muted-foreground">Facebook</Link>
            </FooterColumn>


          </FooterContent>


          <FooterBottom>
            <div>© 2025 ezduonline.com - All rights reserved</div>
            <div className="flex items-center gap-4">
              <Link href="/policy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
