"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, X, Trash2, TrendingUp } from "lucide-react";
import styles from '@/styles/pages/search.module.css';
import { cn } from '@/lib/utils';

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
    <div className={styles.searchPage}>
      {/* Search Input Header */}
      <div className={styles.searchHeader}>
        <div className={styles.searchHeaderContent}>
          <form onSubmit={handleSearchSubmit}>
            <div className={styles.searchInputContainer}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search services, bills, recharge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <Search className={styles.searchIcon} />
              
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className={styles.clearButton}
                >
                  <X className={styles.clearIcon} />
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.loadingContainer}
            >
              <div className={styles.loadingContent}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className={styles.loadingSpinner}
                />
                <span className={styles.loadingText}>Searching...</span>
              </div>
            </motion.div>
          ) : searchQuery ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className={styles.resultsTitle}>
                Search Results for &ldquo;{searchQuery}&rdquo;
              </h2>
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>
                  <Search className={styles.noResultsIconInner} />
                </div>
                <p className={styles.noResultsTitle}>No results found</p>
                <p className={styles.noResultsDescription}>
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
              className={styles.defaultContent}
            >
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                      <Clock className={styles.sectionIcon} />
                      Recent Searches
                    </h2>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={clearAllRecentSearches}
                      className={styles.clearAllButton}
                    >
                      <Trash2 className={styles.clearAllIcon} />
                      Clear All
                    </motion.button>
                  </div>
                  
                  <div className={styles.recentSearches}>
                    {recentSearches.map((search, index) => (
                      <motion.div
                        key={search.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleRecentSearchClick(search.query)}
                        className={styles.recentSearchItem}
                      >
                        <div className={styles.recentSearchContent}>
                          <span className={styles.recentSearchIcon}>{search.icon}</span>
                          <div>
                            <p className={styles.recentSearchQuery}>{search.query}</p>
                            <p className={styles.recentSearchTimestamp}>{search.timestamp}</p>
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => handleDeleteRecentSearch(search.id, e)}
                          className={styles.deleteRecentButton}
                        >
                          <X className={styles.deleteRecentIcon} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <h2 className={styles.trendingTitle}>
                  <TrendingUp className={styles.trendingIcon} />
                  Trending Searches
                </h2>
                
                <div className={styles.trendingSearches}>
                  {mockTrendingSearches.map((search, index) => (
                    <motion.div
                      key={search.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleRecentSearchClick(search.query)}
                      className={styles.trendingSearchItem}
                    >
                      <div className={styles.trendingSearchContent}>
                        <div className={styles.trendingDot} />
                        <p className={styles.trendingSearchQuery}>{search.query}</p>
                      </div>
                      <div className={styles.trendingStats}>
                        <span className={styles.trendingPercentage}>{search.trend}</span>
                        <TrendingUp className={styles.trendingArrow} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className={styles.popularTitle}>Popular Services</h2>
                
                <div className={styles.popularServices}>
                  {[
                    { name: "Mobile Recharge", icon: "📱", color: "blue" },
                    { name: "Electricity Bill", icon: "⚡", color: "yellow" },
                    { name: "DTH Recharge", icon: "📺", color: "purple" },
                    { name: "Gas Booking", icon: "🔥", color: "red" },
                  ].map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleRecentSearchClick(service.name)}
                      className={cn(styles.popularServiceItem, styles[`popularServiceItem${service.color.charAt(0).toUpperCase() + service.color.slice(1)}`])}
                    >
                      <div className={styles.popularServiceIcon}>{service.icon}</div>
                      <p className={styles.popularServiceName}>{service.name}</p>
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