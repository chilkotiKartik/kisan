"use client";

import Link from "next/link"
import { useTranslation } from "@/hooks/use-translation"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-green-600 text-white p-1 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                  <path d="M21 12a9 9 0 0 0-9-9v9h9z" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <span className="text-xl font-bold">KisanSetu</span>
            </Link>
            <p className="text-gray-400">{t("footer_description")}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">{t("quick_links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  {t("about_us")}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white">
                  {t("how_it_works")}
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-white">
                  {t("community")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  {t("contact_us")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">{t("legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  {t("terms_of_service")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-400 hover:text-white">
                  {t("refund_policy")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white">
                  {t("cookie_policy")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">{t("contact")}</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-green-500">Email:</span>
                <a href="mailto:info@kisansetu.com" className="text-gray-400 hover:text-white">
                  info@kisansetu.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500">{t("phone")}:</span>
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500">{t("address")}:</span>
                <span className="text-gray-400">123 Farmer Road, Agri Tech Park, Pune, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 KisanSetu. {t("all_rights_reserved")}</p>
        </div>
      </div>
    </footer>
  )
}
