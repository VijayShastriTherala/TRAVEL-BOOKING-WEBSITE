import React, { useMemo, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";

const destinations = [
  { id: "bali", name: "Bali", country: "Indonesia", category: "Beach", days: "7 days", price: 1299, rating: "4.9", tag: "BEST SELLER", image: "photo-1537996194471-e657df975ab4", description: "Slow mornings, emerald rice terraces, and sunsets that stay with you." },
  { id: "amalfi", name: "Amalfi Coast", country: "Italy", category: "Coastal", days: "6 days", price: 1849, rating: "4.8", tag: "LIMITED SPOTS", image: "photo-1533587851505-d119e13fa0d7", description: "Find your Italian summer along the most beautiful stretch of coastline." },
  { id: "kyoto", name: "Kyoto", country: "Japan", category: "Culture", days: "8 days", price: 2199, rating: "5.0", tag: "CULTURAL PICK", image: "photo-1493976040374-85c8e12f0c0e", description: "Temple paths, tiny tea houses, and the quiet magic of old Japan." },
  { id: "patagonia", name: "Patagonia", country: "Argentina", category: "Adventure", days: "9 days", price: 2499, rating: "4.9", tag: "ADVENTURE", image: "photo-1464822759023-fed622ff2c3b", description: "Big skies and bigger horizons at the end of the world." },
  { id: "santorini", name: "Santorini", country: "Greece", category: "Beach", days: "5 days", price: 1599, rating: "4.8", tag: "ISLAND ESCAPE", image: "photo-1533105079780-92b9be482077", description: "Whitewashed lanes, blue horizons, and a slower kind of summer." },
  { id: "marrakech", name: "Marrakech", country: "Morocco", category: "Culture", days: "5 days", price: 999, rating: "4.7", tag: "LOCAL FAVORITE", image: "photo-1539020140153-e479b8c22e70", description: "Get lost in the color, scent, and warm welcome of the red city." },
];

const imageUrl = (image, width = 900) => `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=85`;
const money = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Roamly home"><span className="brand-mark">r</span>roamly<span className="brand-dot">.</span></Link>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>☰</button>
      <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} onClick={() => setMenuOpen(false)}>
        <Link to="/destinations">Explore</Link>
        <a href="/#how-it-works">How it works</a>
        <Link to="/bookings">My bookings</Link>
      </nav>
      <Link className="nav-cta" to="/destinations">Plan a trip <span>↗</span></Link>
    </header>
  );
}

function Footer() {
  return <footer className="footer"><Link className="brand" to="/"><span className="brand-mark">r</span>roamly<span className="brand-dot">.</span></Link><span>Made for the places that stay with you.</span><span>© 2025 Roamly Travel Co.</span></footer>;
}

function DestinationCard({ place, index = 0 }) {
  return (
    <Link className="destination-card" to={`/package/${place.id}`}>
      <div className="card-image-wrap"><img src={imageUrl(place.image, 700)} alt={`${place.name}, ${place.country}`} loading="lazy" /><span className="card-tag">{place.tag}</span><span className="card-arrow">↗</span></div>
      <div className="card-content"><div><h3>{place.name}</h3><p>{place.country} <span>·</span> {place.days}</p></div><div className="card-price"><span>from</span><strong>{money(place.price)}</strong></div></div>
      <div className="card-rating"><span>★</span> {place.rating} <span className="rating-note">· handpicked for you</span></div>
    </Link>
  );
}

function Home() {
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-photo" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> A LITTLE LESS ORDINARY</span>
            <h1>Find your<br /> <em>somewhere.</em></h1>
            <p>Thoughtful trips, made for the way you want to feel.</p>
            <form className="search-panel" onSubmit={(event) => { event.preventDefault(); navigate(`/destinations${destination ? `?search=${encodeURIComponent(destination)}` : ""}`); }}>
              <label className="search-field"><span className="field-icon">⌖</span><span><small>WHERE TO?</small><input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Anywhere you dream" /></span></label>
              <span className="search-divider" />
              <label className="search-field"><span className="field-icon">▦</span><span><small>WHEN?</small><select value={month} onChange={(event) => setMonth(event.target.value)}><option value="">Pick a month</option>{["January","February","March","April","May","June","July","August","September","October","November","December"].map((item) => <option key={item}>{item}</option>)}</select></span></label>
              <button className="search-button" type="submit">Find my trip <span>↗</span></button>
            </form>
          </div>
          <span className="hero-caption">01 / 06 &nbsp; · &nbsp; UBUD, BALI</span>
          <span className="hero-side-note">MADE FOR THE MOMENTS IN BETWEEN</span>
        </section>

        <section className="intro-strip">
          <p>Not just a trip.<br /><em>A feeling.</em></p>
          <span>We bring the world a little closer with considered trips, local favorites, and the kind of moments you’ll tell stories about.</span>
          <span className="intro-stamp">✳ &nbsp; GO YOUR<br />&nbsp;&nbsp;&nbsp;&nbsp;OWN WAY</span>
        </section>

        <section className="section destinations-section" id="destinations">
          <div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> THE GOOD PLACES</span><h2>Somewhere<br /><em>on your mind?</em></h2></div><Link className="text-link" to="/destinations">See all destinations <span>↗</span></Link></div>
          <div className="destination-grid">{destinations.slice(0, 3).map((place, index) => <DestinationCard key={place.id} place={place} index={index} />)}</div>
        </section>

        <section className="quote-band" id="how-it-works"><span className="quote-star">✳</span><p>“The best souvenirs are<br />the versions of yourself<br /><em>you bring home.</em>”</p><span className="quote-credit">— SOMEONE, SOMEWHERE</span></section>

        <section className="section packages-section"><div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT CHAPTER</span><h2>Good trips.<br /><em>Great stories.</em></h2></div><Link className="text-link" to="/destinations">Explore all trips <span>↗</span></Link></div><div className="destination-grid">{destinations.slice(3, 6).map((place, index) => <DestinationCard key={place.id} place={place} index={index} />)}</div></section>

        <section className="newsletter"><div><span className="eyebrow">A POSTCARD FROM US</span><h2>A little inspiration<br /><em>goes a long way.</em></h2></div><Link className="button button-light" to="/destinations">Find your somewhere <span>↗</span></Link><span className="newsletter-spark">✳</span></section>
      </main>
      <Footer />
    </>
  );
}

function Destinations() {
  const params = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => destinations.filter((place) => (category === "All" || place.category === category) && `${place.name} ${place.country}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : 0), [category, search, sort]);
  return <><main className="listing-page"><div className="listing-heading"><span className="eyebrow"><span className="eyebrow-line" /> THE WORLD, YOUR WAY</span><h1>Find your<br /><em>kind of away.</em></h1><p>Good places, thoughtfully put together. All that’s missing is you.</p></div><div className="filters"><label className="filter-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a place or country" aria-label="Search destinations" /></label><div className="category-filters">{["All", "Beach", "Coastal", "Culture", "Adventure"].map((item) => <button key={item} className={category === item ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(item)}>{item}</button>)}</div><select className="sort-select" aria-label="Sort destinations" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div><p className="results-count">{filtered.length} thoughtfully planned {filtered.length === 1 ? "trip" : "trips"}</p>{filtered.length ? <div className="destination-grid">{filtered.map((place, index) => <DestinationCard key={place.id} place={place} index={index} />)}</div> : <div className="empty-state"><span>✳</span><h2>No trips found just yet.</h2><p>Try a different search or pick another kind of away.</p><button className="text-link" onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters ↗</button></div>}</main><Footer /></>;
}

function PackageDetails() {
  const { id } = useParams();
  const place = destinations.find((item) => item.id === id);
  if (!place) return <NotFound />;
  return <><main className="detail-page"><Link to="/destinations" className="back-link">← All destinations</Link><div className="detail-hero"><img src={imageUrl(place.image, 1600)} alt={`${place.name}, ${place.country}`} /><div className="detail-hero-content"><span className="eyebrow">{place.tag}</span><h1>{place.name}<br /><em>{place.country}</em></h1><p>{place.description}</p></div></div><div className="detail-layout"><div className="detail-copy"><span className="eyebrow"><span className="eyebrow-line" /> THE LITTLE DETAILS</span><h2>A trip to remember.<br /><em>Room to be you.</em></h2><p>Designed for curious minds and slow mornings, this handpicked journey gives you the best of {place.name} without the overwhelm. Thoughtful stays, local secrets, and just enough space to make the days your own.</p><div className="inclusions"><span>✳ &nbsp; Handpicked stays</span><span>✳ &nbsp; Local-led experiences</span><span>✳ &nbsp; Flexible free time</span><span>✳ &nbsp; 24/7 trip support</span></div></div><aside className="booking-card"><span className="eyebrow">YOUR NEXT CHAPTER</span><div className="booking-price">{money(place.price)} <small>/ person</small></div><div className="booking-meta"><span>◷ &nbsp; {place.days}</span><span>★ &nbsp; {place.rating} guest rating</span></div><Link className="button button-dark" to={`/book/${place.id}`}>Make it yours <span>↗</span></Link><p>A little deposit secures your place.</p></aside></div></main><Footer /></>;
}

function BookingForm() {
  const { id } = useParams();
  const place = destinations.find((item) => item.id === id);
  const navigate = useNavigate();
  const [travelers, setTravelers] = useState(2);
  const [form, setForm] = useState({ name: "", email: "", date: "", notes: "" });
  const [error, setError] = useState("");
  if (!place) return <NotFound />;
  const total = place.price * Number(travelers);
  function submitBooking(event) {
    event.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.date || Number(travelers) < 1) {
      setError("Please check your details and enter a valid email address.");
      return;
    }
    const booking = { ...form, id: `${Date.now()}`, destinationId: place.id, destination: place.name, country: place.country, image: place.image, travelers: Number(travelers), total, days: place.days, createdAt: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem("roamly-bookings") || "[]");
    localStorage.setItem("roamly-bookings", JSON.stringify([booking, ...saved]));
    navigate("/bookings?confirmed=1");
  }
  return <><main className="form-page"><Link to={`/package/${place.id}`} className="back-link">← Back to {place.name}</Link><div className="form-heading"><span className="eyebrow"><span className="eyebrow-line" /> IT STARTS HERE</span><h1>Make it<br /><em>happen.</em></h1><p>Just a few details, and your next story is underway.</p></div><div className="form-layout"><form className="booking-form" onSubmit={submitBooking} noValidate><h2>Your details</h2><p className="form-note">So we know who to make this trip wonderful for.</p><label>Full name<input required autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label><label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label><div className="form-row"><label>Departure date<input required type="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label><label>Travelers<select value={travelers} onChange={(event) => setTravelers(event.target.value)}>{Array.from({ length: 10 }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count} {count === 1 ? "traveler" : "travelers"}</option>)}</select></label></div><label>A note for us <span className="optional">(optional)</span><textarea rows="3" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Special requests, big plans, little details..." /></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-dark submit-button" type="submit">Confirm my trip <span>↗</span></button><p className="secure-note">✳ &nbsp; No payment taken today. Good things are ahead.</p></form><aside className="trip-summary"><img src={imageUrl(place.image, 750)} alt={place.name} /><span className="eyebrow">YOUR PICK</span><h2>{place.name}, {place.country}</h2><p>{place.days} <span>·</span> Handpicked escape</p><div className="summary-rule" /><div className="price-breakdown"><span>{money(place.price)} × {travelers} {Number(travelers) === 1 ? "traveler" : "travelers"}</span><strong>{money(total)}</strong></div><div className="price-breakdown total"><span>Total trip price</span><strong>{money(total)}</strong></div></aside></div></main><Footer /></>;
}

function MyBookings() {
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem("roamly-bookings") || "[]"));
  const confirmed = new URLSearchParams(window.location.search).get("confirmed");
  function cancelBooking(id) {
    const updated = bookings.filter((booking) => booking.id !== id);
    setBookings(updated);
    localStorage.setItem("roamly-bookings", JSON.stringify(updated));
  }
  return <><main className="listing-page bookings-page"><div className="listing-heading"><span className="eyebrow"><span className="eyebrow-line" /> THE GOOD PART IS COMING</span><h1>Your next<br /><em>great story.</em></h1><p>Everywhere you’re going, all in one place.</p></div>{confirmed && <div className="confirmation-banner"><span>✳</span><div><strong>It’s happening!</strong><p>Your trip is booked. Your next chapter starts here.</p></div></div>}{bookings.length ? <div className="booking-list">{bookings.map((booking) => <article className="booking-item" key={booking.id}><img src={imageUrl(booking.image, 500)} alt={booking.destination} /><div className="booking-item-details"><span className="eyebrow">CONFIRMED TRIP</span><h2>{booking.destination}, {booking.country}</h2><p>{booking.days} <span>·</span> {booking.travelers} {booking.travelers === 1 ? "traveler" : "travelers"}</p><p>Departing {new Date(`${booking.date}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p></div><div className="booking-item-price"><strong>{money(booking.total)}</strong><button onClick={() => cancelBooking(booking.id)}>Cancel booking</button></div></article>)}</div> : <div className="empty-state"><span>✳</span><h2>Nothing on the calendar. Yet.</h2><p>Your next favorite place is one good decision away.</p><Link className="button button-dark" to="/destinations">Find your somewhere <span>↗</span></Link></div>}</main><Footer /></>;
}

function NotFound() {
  return <main className="not-found"><span className="eyebrow">A LITTLE DETOUR</span><h1>We can’t find<br /><em>that somewhere.</em></h1><Link className="button button-dark" to="/">Back to the good stuff <span>↗</span></Link></main>;
}

export default function App() {
  return <><Header /><Routes><Route path="/" element={<Home />} /><Route path="/destinations" element={<Destinations />} /><Route path="/package/:id" element={<PackageDetails />} /><Route path="/book/:id" element={<BookingForm />} /><Route path="/bookings" element={<MyBookings />} /><Route path="*" element={<NotFound />} /></Routes></>;
}
