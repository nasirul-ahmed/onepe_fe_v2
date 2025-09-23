"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, X, Trash2, TrendingUp } from "lucide-react";

// Mock data - replace with your actual data structure
const mockRecentSearches = [
  { id: 1, query: "Mobile recharge", timestamp: "2 hours ago", icon: "📱" },
  { id: 2, query: "Electricity bill", timestamp: "1 day ago", icon: "⚡" },
  { id: 3, query: "DTH recharge", timestamp: "2 days ago", icon: "📺" },
  { id: 4, query: "Gas booking", timestamp: "3 days ago", icon: "🔥" },
  { id: 5, query: "Internet bill", timestamp: "1 week ago", icon: "🌐" },
];

const mockTrendingSearches = [
  { id: 1, query: "Mobile recharge", trend: "+12%" },
  { id: 2, query: "Electricity bill payment", trend: "+8%" },
  { id: 3, query: "DTH recharge", trend: "+15%" },
  { id: 4, query: "Fastag recharge", trend: "+20%" },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(mockRecentSearches);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto focus on search input when page loads
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setIsSearching(true);
      // Add your search logic here
      console.log("Searching for:", query);
      
      // Simulate API call
      setTimeout(() => {
        setIsSearching(false);
        // Add to recent searches (you'd save this to localStorage or API)
        const newSearch = {
          id: Date.now(),
          query: query.trim(),
          timestamp: "Just now",
          icon: "🔍"
        };
        setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
      }, 1000);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleDeleteRecentSearch = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(search => search.id !== id));
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="min-h-screen bg-surface pb-16">
      {/* Search Input Header */}
      <div className="bg-surface/80 backdrop-blur-lg border-b border-border sticky top-16 z-40">
        <div className="px-4 py-4">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search services, bills, recharge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-10 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface placeholder-secondary transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary h-4 w-4" />
              
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-border transition-colors"
                >
                  <X className="h-4 w-4 text-secondary" />
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                />
                <span className="text-secondary">Searching...</span>
              </div>
            </motion.div>
          ) : searchQuery ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-lg font-semibold text-on-surface mb-4">
                Search Results for &ldquo;{searchQuery}&rdquo;
              </h2>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-secondary mb-2">No results found</p>
                <p className="text-sm text-secondary">
                  Try searching for services like &ldquo;mobile recharge&rdquo; or &ldquo;electricity bill&rdquo;
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-on-surface flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Recent Searches
                    </h2>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={clearAllRecentSearches}
                      className="text-sm text-secondary hover:text-error transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear All
                    </motion.button>
                  </div>
                  
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <motion.div
                        key={search.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleRecentSearchClick(search.query)}
                        className="flex items-center justify-between p-3 bg-muted rounded-xl hover:bg-border transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{search.icon}</span>
                          <div>
                            <p className="text-on-surface font-medium">{search.query}</p>
                            <p className="text-sm text-secondary">{search.timestamp}</p>
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleDeleteRecentSearch(search.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-error/10 transition-all"
                        >
                          <X className="w-4 h-4 text-secondary hover:text-error" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <h2 className="text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Trending Searches
                </h2>
                
                <div className="grid gap-3">
                  {mockTrendingSearches.map((search, index) => (
                    <motion.div
                      key={search.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleRecentSearchClick(search.query)}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-success/5 to-primary/5 rounded-xl hover:from-success/10 hover:to-primary/10 transition-all cursor-pointer border border-success/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <p className="text-on-surface font-medium">{search.query}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-success font-medium">{search.trend}</span>
                        <TrendingUp className="w-4 h-4 text-success" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-lg font-semibold text-on-surface mb-4">Popular Services</h2>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Mobile Recharge", icon: "📱", color: "from-blue-500/10 to-blue-600/10" },
                    { name: "Electricity Bill", icon: "⚡", color: "from-yellow-500/10 to-orange-500/10" },
                    { name: "DTH Recharge", icon: "📺", color: "from-purple-500/10 to-pink-500/10" },
                    { name: "Gas Booking", icon: "🔥", color: "from-red-500/10 to-red-600/10" },
                  ].map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleRecentSearchClick(service.name)}
                      className={`p-4 bg-gradient-to-br ${service.color} rounded-xl hover:scale-105 transition-all cursor-pointer border border-border`}
                    >
                      <div className="text-2xl mb-2">{service.icon}</div>
                      <p className="text-on-surface font-medium text-sm">{service.name}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchPage;