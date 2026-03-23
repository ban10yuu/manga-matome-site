'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mangaList } from '@/data/manga';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/category/all?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a12] text-white border-b-2 border-[#ff3a4f]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
            <span className="text-[#ff3a4f] text-2xl leading-none">▶</span>
            <span className="text-white">
              マンガ考察
              <span className="text-[#ff3a4f]">ラボ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link href="/" className="text-gray-300 hover:text-[#ff3a4f] transition-colors">
              ホーム
            </Link>
            <div className="group relative">
              <button className="text-gray-300 hover:text-[#ff3a4f] transition-colors flex items-center gap-1">
                作品一覧
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-64 bg-[#16161f] border-2 border-[#2a2a3a] rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-96 overflow-y-auto">
                {mangaList.map(manga => (
                  <Link
                    key={manga.slug}
                    href={`/manga/${manga.slug}`}
                    className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#ff3a4f]/10 hover:border-l-2 hover:border-[#ff3a4f] border-l-2 border-transparent transition-all"
                  >
                    {manga.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/category/theory" className="text-gray-300 hover:text-[#ff3a4f] transition-colors">
              伏線考察
            </Link>
            <Link href="/category/character" className="text-gray-300 hover:text-[#ff3a4f] transition-colors">
              キャラ考察
            </Link>
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="検索..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-40 bg-[#16161f] border border-[#2a2a3a] rounded-l px-3 py-1.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#ff3a4f] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#ff3a4f] px-3 py-1.5 text-sm font-bold rounded-r hover:bg-[#e52e42] transition-colors"
            >
              ▶
            </button>
          </form>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-300"
            aria-label="メニュー"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[#2a2a3a] mt-2 pt-4">
            <form onSubmit={handleSearch} className="flex mb-4">
              <input
                type="text"
                placeholder="検索..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-[#16161f] border border-[#2a2a3a] rounded-l px-4 py-2 text-sm placeholder-gray-500 outline-none"
              />
              <button type="submit" className="bg-[#ff3a4f] px-4 py-2 text-sm font-bold rounded-r">
                ▶
              </button>
            </form>
            <Link href="/" className="block py-2 text-gray-300 hover:text-[#ff3a4f]" onClick={() => setMenuOpen(false)}>
              ホーム
            </Link>
            <Link href="/category/theory" className="block py-2 text-gray-300 hover:text-[#ff3a4f]" onClick={() => setMenuOpen(false)}>
              伏線考察
            </Link>
            <Link href="/category/character" className="block py-2 text-gray-300 hover:text-[#ff3a4f]" onClick={() => setMenuOpen(false)}>
              キャラ考察
            </Link>
            <div className="mt-3 border-t border-[#2a2a3a] pt-3">
              <p className="text-xs text-gray-400 mb-2 font-bold">作品一覧</p>
              <div className="grid grid-cols-2 gap-1">
                {mangaList.slice(0, 10).map(manga => (
                  <Link
                    key={manga.slug}
                    href={`/manga/${manga.slug}`}
                    className="text-sm py-1.5 text-gray-400 hover:text-[#ff3a4f]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {manga.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
