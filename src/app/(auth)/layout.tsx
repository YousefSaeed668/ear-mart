import { AuthHeader } from "@/components/auth-components/AuthHeader";
import { MaxWidth } from "@/components/MaxWidth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      <section className="overflow-x-hidden">
        <MaxWidth>{children}</MaxWidth>
        {/* TODO : Make A Separate Footer Component As In The Design */}
        <footer>
          <MaxWidth>
            <div className="flex justify-between items-center py-4 mt-40">
              <div>
                <p className="text-xs text-gray-400">
                  &copy; 2021 All rights reserved
                </p>
              </div>
              <div>
                <a href="#" className="text-xs text-gray-400">
                  Privacy Policy
                </a>
                <a href="#" className="text-xs text-gray-400 ml-4">
                  Terms of Service
                </a>
              </div>
            </div>
          </MaxWidth>
        </footer>
      </section>
    </>
  );
}
