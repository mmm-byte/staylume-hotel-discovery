/**
 * App.jsx
 * ----------------------------------------------------------------------------
 * The application shell. Wires the useHotels hook to two views:
 *
 *   - When no hotel is selected, render <FilterDashboard />.
 *   - When a hotel is selected, render <HotelDetail />.
 *
 * The header is sticky and exposes a wordmark + global property counter.
 * The footer is full-width with realistic-feeling fake nav links to reinforce
 * the "real booking site" feel called out in the reviewer feedback.
 */

import { useHotels } from './store/useHotels';
import * as HotelMeta from './store/useHotels';
import FilterDashboard from './components/FilterDashboard';
import HotelDetail from './components/HotelDetail';

export default function App() {
  // Pull every state slot and action from the central hook.
  const {
    hotels,
    filtered,
    filters,
    defaultFilters,
    setFilters,
    resetFilters,
    selectedHotel,
    selectHotel,
    checkIn,
    checkOut,
    setDates,
  } = useHotels();

  return (
    <div className="app-shell" data-testid="app-shell">
      {/* -------- Sticky header with top search bar -------- */}
      <header className="app-header" role="banner">
        <div className="container app-header__inner">
          <a
            href="#"
            className="app-brand"
            onClick={(event) => {
              event.preventDefault();
              selectHotel(null);
            }}
            data-testid="brand-link"
          >
            <svg className="app-brand__mark" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="7" fill="var(--c-accent)"/>
              <path d="M8 22h16v3H8z" fill="var(--c-primary)"/>
              <path d="M9 22V12l4.5-4h5L23 12v10" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="16" cy="14" r="2" fill="#fff"/>
            </svg>
            <span className="app-brand__word">Staylume</span>
          </a>

          {/* Top search bar — lives in the header so it's always reachable */}
          <form
            className="top-search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <span className="top-search__icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              className="top-search__input"
              placeholder="Search hotels, cities, or keywords…"
              aria-label="Search hotels"
              value={filters.search || ''}
              onChange={(event) => setFilters({ search: event.target.value })}
              data-testid="top-search-input"
            />
            {filters.search && (
              <button
                type="button"
                className="top-search__clear"
                onClick={() => setFilters({ search: '' })}
                aria-label="Clear search"
                data-testid="top-search-clear"
              >×</button>
            )}
          </form>

          <a className="app-header__link" href="#stays">Explore stays <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      {/* -------- Main content -------- */}
      <main className="app-main">
        <div className="container">
          {selectedHotel ? (
            <HotelDetail
              hotel={selectedHotel}
              onBack={() => selectHotel(null)}
              checkIn={checkIn}
              checkOut={checkOut}
              onChangeDates={setDates}
            />
          ) : (
            <FilterDashboard
              hotels={hotels}
              filtered={filtered}
              filters={filters}
              defaultFilters={defaultFilters}
              meta={HotelMeta}
              onChangeFilter={setFilters}
              onReset={resetFilters}
              onSelect={selectHotel}
              checkIn={checkIn}
              checkOut={checkOut}
              onChangeDates={setDates}
            />
          )}
        </div>
      </main>

      {/* -------- Footer -------- */}
      <footer className="app-footer">
        <div className="container">
          <div className="app-footer__grid">
            <div>
              <div className="app-footer__brand">Staylume</div>
              <p className="app-footer__tag">
                Find a stay that feels like part of the trip. Explore distinctive properties in cities around the world.
              </p>
            </div>
            <a className="app-footer__source" href="https://github.com/mmm-byte/Hotel-discovery-frontend" target="_blank" rel="noreferrer">
              Built for curious travelers <span aria-hidden="true">↗</span>
              <small>Explore the project on GitHub</small>
            </a>
          </div>
          <div className="app-footer__bottom">
            <span>© 2026 Staylume</span>
            <span className="spacer" />
            <span>Mock data — no real bookings.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
