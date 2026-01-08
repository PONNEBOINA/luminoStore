import { useCallback, useEffect, useState } from 'react';
import './ProductShowcase.css';

const filters = [
  { label: 'All Products', value: 'all' },
  { label: 'Apparel', value: 'apparel' },
  { label: 'Accessories', value: 'jewelery' },
  { label: 'Tech', value: 'electronics' },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);

const PAGE_SIZE = 8;
const MAX_LIMIT = 100;

const ProductShowcase = ({ cart, onAddToCart, isSearchOpen }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 1000 });
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const buildQueryString = useCallback(
    (pageToLoad) => {
      const query = new URLSearchParams({
        limit: String(MAX_LIMIT),
        page: String(pageToLoad),
      });
      if (sort === 'priceAsc') {
        query.set('sort', 'price');
        query.set('order', 'asc');
      } else if (sort === 'priceDesc') {
        query.set('sort', 'price');
        query.set('order', 'desc');
      }
      return query.toString();
    },
    [sort],
  );

  const fetchProducts = useCallback(
    async (pageToLoad, append = false) => {
      const queryString = buildQueryString(pageToLoad);
      try {
        append ? setLoadingMore(true) : setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products?${queryString}`);
        if (!res.ok) throw new Error('Unable to load products');
        const data = await res.json();

        const matchesCategory = (product) => {
          if (selectedFilter === 'all') return true;
          if (selectedFilter === 'apparel') {
            return product.category?.toLowerCase().includes('clothing');
          }
          return product.category?.toLowerCase() === selectedFilter;
        };

        const withinPrice = (product) =>
          Number(product.price) >= priceRange.min && Number(product.price) <= priceRange.max;

        const matchesSearch = (product) => {
          if (!searchQuery.trim()) return true;
          const query = searchQuery.toLowerCase();
          return (
            product.title?.toLowerCase().includes(query) ||
            product.description?.toLowerCase().includes(query) ||
            product.category?.toLowerCase().includes(query)
          );
        };

        const processed = data
          .filter((product) => matchesCategory(product) && withinPrice(product) && matchesSearch(product))
          .sort((a, b) => {
            if (sort === 'priceAsc') return a.price - b.price;
            if (sort === 'priceDesc') return b.price - a.price;
            return 0;
          });

        const startIndex = (pageToLoad - 1) * PAGE_SIZE;
        const slice = processed.slice(startIndex, startIndex + PAGE_SIZE);
        const moreAvailable = startIndex + slice.length < processed.length;

        setHasMore(moreAvailable);
        setError('');
        setProducts((prev) => (append ? [...prev, ...slice] : slice));
        if (!append) {
          setExpandedDescriptions({});
        }
      } catch (err) {
        setError(err.message || 'Unable to load products');
      } finally {
        append ? setLoadingMore(false) : setLoading(false);
      }
    },
    [buildQueryString, priceRange.min, priceRange.max, selectedFilter, sort, searchQuery],
  );

  useEffect(() => {
    setPage(1);
    fetchProducts(1, false);
  }, [selectedFilter, priceRange, sort, searchQuery, fetchProducts]);

  const handlePriceChange = (type, value) => {
    const numericValue = Number(value);
    setTempPriceRange((prev) => {
      if (type === 'min') {
        return {
          ...prev,
          min: Math.min(numericValue, prev.max - 1),
        };
      }
      return {
        ...prev,
        max: Math.max(numericValue, prev.min + 1),
      };
    });
  };

  const applyPriceFilter = () => {
    setPriceRange(tempPriceRange);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, true);
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderDescription = (description, id) => {
    const maxLength = 100;
    const isLong = description.length > maxLength;
    const expanded = expandedDescriptions[id];
    const text = expanded || !isLong ? description : `${description.slice(0, maxLength)}…`;

    return (
      <>
        <p className="lumina-product-card__description">{text}</p>
        {isLong && (
          <button
            type="button"
            className="lumina-product-card__toggle"
            onClick={() => toggleDescription(id)}
          >
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </>
    );
  };

  return (
    <section className="lumina-products">
      <div className="lumina-products__intro">
        <p className="lumina-products__eyebrow">Products</p>
        <h1>Discover Our Products</h1>
        <p className="lumina-products__description">
          Browse our latest collection of premium goods designed for the modern lifestyle.
        </p>
        
        {isSearchOpen && (
          <div className="lumina-search-bar">
            <svg viewBox="0 0 20 20" className="lumina-search-icon">
              <path
                d="M14 14l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="9"
                cy="9"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products by name, description, or category..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="lumina-search-input"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="lumina-search-clear"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      <div className="lumina-products__content">
        <aside className="lumina-filters">
          <div className="lumina-filters__group">
            <p className="lumina-filters__title">Category</p>
            <div className="lumina-filter-options">
              {filters.map((filter) => (
                <label key={filter.value} className="lumina-filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedFilter === filter.value}
                    onChange={() => setSelectedFilter(filter.value)}
                    aria-label={filter.label}
                  />
                  <span>{filter.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="lumina-filters__group">
            <p className="lumina-filters__title">Price Range</p>
            <div className="lumina-price-slider">
              <div className="lumina-price-slider__inputs">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={tempPriceRange.min}
                  onChange={(event) => handlePriceChange('min', event.target.value)}
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={tempPriceRange.max}
                  onChange={(event) => handlePriceChange('max', event.target.value)}
                />
              </div>
              <div className="lumina-price-slider__range">
                <span>${tempPriceRange.min}</span>
                <span>${tempPriceRange.max}</span>
              </div>
              <button
                type="button"
                className="lumina-apply-price-btn"
                onClick={applyPriceFilter}
              >
                Apply Price Filter
              </button>
            </div>
          </div>

          <div className="lumina-filters__group">
            <p className="lumina-filters__title">Sort By</p>
            <div className="lumina-select">
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="lumina-product-grid">
          {loading && <p className="lumina-products__status">Loading products…</p>}
          {!loading && error && <p className="lumina-products__status is-error">{error}</p>}
          {!loading &&
            !error &&
            products.map((product) => (
              <article key={product.id} className="lumina-product-card">
                <div className="lumina-product-card__image">
                  {product.category?.toLowerCase().includes('clothing') && (
                    <span className="lumina-product-card__badge">New</span>
                  )}
                  <img src={product.image} alt={product.title} loading="lazy" />
                </div>
                <div className="lumina-product-card__body">
                  <h3>{product.title}</h3>
                  {renderDescription(product.description, product.id)}
                  <div className="lumina-product-card__meta">
                    <span className="lumina-product-card__price">{formatCurrency(product.price)}</span>
                  </div>
                  <div className="lumina-product-card__footer">
                    <span className="lumina-product-card__rating">
                      <span aria-hidden="true">★</span>
                      {product.rating?.rate ?? '4.5'}
                    </span>
                    <button 
                      type="button" 
                      className="lumina-product-card__link"
                      onClick={() => onAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>

      <div className="lumina-products__cta">
        <button
          type="button"
          onClick={handleLoadMore}
          disabled={!hasMore || loading || loadingMore || error}
        >
          {loadingMore
            ? 'Loading...'
            : hasMore
              ? 'Load More Products'
              : 'No More Products'}
        </button>
      </div>
    </section>
  );
};

export default ProductShowcase;
