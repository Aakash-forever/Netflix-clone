const links = [
  "FAQ",
  "Help Center",
  "Account",
  "Media Center",
  "Investor Relations",
  "Jobs",
  "Redeem Gift Cards",
  "Buy Gift Cards",
  "Ways to Watch",
  "Terms of Use",
  "Privacy",
  "Cookie Preferences",
  "Corporate Information",
  "Contact Us",
  "Speed Test",
  "Legal Notices",
  "Only on Netflix",
];

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-8 mt-8 text-sm text-gray-400 border-t border-white/10">
      <div className="mb-6">
        <a href="#" className="hover:underline">
          Questions? Contact us.
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {links.map((label, i) => (
          <a key={i} href="#" className="hover:underline">
            {label}
          </a>
        ))}
      </div>

      <button className="border border-white/30 px-3 py-1 rounded-sm text-gray-200 hover:border-white">
        English
      </button>

      <div className="mt-4 text-xs text-gray-500">Netflix Clone 2026</div>
    </footer>
  );
}
