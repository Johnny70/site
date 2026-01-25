import './App.css';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components for better performance
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <div>
                    <SkipToContent />
                    <div className="container">
                        <Header />
                        <main id="main-content">
                            <Suspense
                                fallback={
                                    <div className="loading-container">
                                        <p>Loading...</p>
                                    </div>
                                }
                            >
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </main>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
