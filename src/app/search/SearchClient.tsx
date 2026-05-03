"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, X, Trash2, TrendingUp } from "lucide-react";
import styles from "@/styles/pages/search.module.css";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearch } from "@/hooks/useSearch";

interface SearchClientProps {
  trendingSearches: any[];
  popularServices: any[];
}

const SearchClient = ({
  trendingSearches,
  popularServices,
}: SearchClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<any[]>([]);
  // const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 300);
  const { data: results, isLoading } = useSearch(debouncedQuery);

  useEffect(() => {
    const saved = localStorage.getItem("onepe_recent_searches");
    if (saved) setRecentSearches(JSON.parse(saved));
    if (searchInputRef.current) searchInputRef.current.focus();
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    const newSearch = {
      id: Date.now(),
      query: query.trim(),
      timestamp: "Just now",
      icon: "🔍",
    };

    const updated = [
      newSearch,
      ...recentSearches
        .filter((s) => s.query.toLowerCase() !== query.toLowerCase())
        .slice(0, 4),
    ];

    setRecentSearches(updated);
    localStorage.setItem("onepe_recent_searches", JSON.stringify(updated));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleRecentSearchClick = (query: string) => {
    handleSearch(query);
  };

  const handleDeleteRecentSearch = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter((search) => search.id !== id);
    setRecentSearches(updated);
    localStorage.setItem("onepe_recent_searches", JSON.stringify(updated));
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("onepe_recent_searches");
  };

  const buildClickableComponent = () => {
    return <></>;
  };

  return (
    <div className={styles.searchPage}>
      <div className={cn("bg-[var(--color-on-surface)]", styles.searchHeader)}>
        <div className={styles.searchHeaderContent}>
          <form onSubmit={handleSearchSubmit}>
            <div className={styles.searchInputContainer}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search services, bills, recharge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "text-[var(--color-surface)]",
                  styles.searchInput,
                )}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch(searchQuery);
                }}
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

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {isLoading ? (
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
              {/* <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>
                  <Search className={styles.noResultsIconInner} />
                </div>
                <p className={styles.noResultsTitle}>No results found</p>
                <p className={styles.noResultsDescription}>
                  Try searching for services like &ldquo;mobile recharge&rdquo;
                  or &ldquo;electricity bill&rdquo;
                </p>
              </div> */}

              {results?.length > 0 ? (
                <div className={styles.resultsList}>
                  {Object.entries(
                    results.reduce((acc: any, item: any) => {
                      acc[item.type] = acc[item.type] || [];
                      acc[item.type].push(item);
                      return acc;
                    }, {}),
                  ).map(([type, items]: any) => (
                    <div key={type} className={styles.resultGroup}>
                      <h3 className={styles.groupTitle}>{type}</h3>

                      {items.map((item: any) => (
                        <div
                          key={item.id}
                          onClick={() => handleRecentSearchClick(item.title)}
                          className={styles.resultItem}
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>
                    <Search className={styles.noResultsIconInner} />
                  </div>
                  <p className={styles.noResultsTitle}>No results found</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.defaultContent}
            >
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
                          <span className={styles.recentSearchIcon}>
                            {search.icon}
                          </span>
                          <div>
                            <p className={styles.recentSearchQuery}>
                              {search.query}
                            </p>
                            <p className={styles.recentSearchTimestamp}>
                              {search.timestamp}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) =>
                            handleDeleteRecentSearch(search.id, e)
                          }
                          className={styles.deleteRecentButton}
                        >
                          <X className={styles.deleteRecentIcon} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className={styles.trendingTitle}>
                  <TrendingUp className={styles.trendingIcon} />
                  Trending Searches
                </h2>
                <div className={styles.trendingSearches}>
                  {trendingSearches.map((search, index) => (
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
                        <p className={styles.trendingSearchQuery}>
                          {search.query}
                        </p>
                      </div>
                      <div className={styles.trendingStats}>
                        <span className={styles.trendingPercentage}>
                          {search.trend}
                        </span>
                        <TrendingUp className={styles.trendingArrow} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className={styles.popularTitle}>Popular Services</h2>
                <div className={styles.popularServices}>
                  {popularServices.map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleRecentSearchClick(service.name)}
                      className={cn(
                        styles.popularServiceItem,
                        styles[
                          `popularServiceItem${service.color.charAt(0).toUpperCase() + service.color.slice(1)}`
                        ],
                      )}
                    >
                      <div className={styles.popularServiceIcon}>
                        {service.icon}
                      </div>
                      <p className={styles.popularServiceName}>
                        {service.name}
                      </p>
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

export default SearchClient;
