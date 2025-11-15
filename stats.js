// Statistics System for Bäderbook
// Tracks visitor statistics using localStorage

// Generate or get unique visitor ID
function getVisitorId() {
    let visitorId = localStorage.getItem('baederbook_visitor_id');
    if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('baederbook_visitor_id', visitorId);
    }
    return visitorId;
}

// Track page visit
function trackVisit() {
    const visitorId = getVisitorId();
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    
    // Get existing statistics
    let stats = getStoredStatistics();
    
    // Increment total visitors (only once per unique visitor)
    if (!stats.uniqueVisitorIds.includes(visitorId)) {
        stats.uniqueVisitorIds.push(visitorId);
        stats.totalVisitors = stats.uniqueVisitorIds.length;
    }
    
    // Increment page views (every visit)
    stats.pageViews++;
    
    // Track daily visits
    if (!stats.dailyVisits[today]) {
        stats.dailyVisits[today] = 0;
    }
    stats.dailyVisits[today]++;
    stats.todayVisitors = stats.dailyVisits[today] || 0;
    
    // Track visit history
    const visitRecord = {
        visitorId: visitorId,
        timestamp: now.getTime(),
        date: today
    };
    stats.visitHistory.push(visitRecord);
    
    // Keep only last 1000 visits to prevent localStorage from getting too large
    if (stats.visitHistory.length > 1000) {
        stats.visitHistory = stats.visitHistory.slice(-1000);
    }
    
    // Update first and last visit
    if (!stats.firstVisit) {
        stats.firstVisit = formatDate(now);
    }
    stats.lastVisit = formatDate(now);
    
    // Save statistics
    saveStatistics(stats);
    
    return stats;
}

// Get stored statistics
function getStoredStatistics() {
    const stored = localStorage.getItem('baederbook_statistics');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing statistics:', e);
        }
    }
    
    // Return default statistics
    return {
        totalVisitors: 0,
        uniqueVisitors: 0,
        pageViews: 0,
        todayVisitors: 0,
        uniqueVisitorIds: [],
        dailyVisits: {},
        visitHistory: [],
        firstVisit: null,
        lastVisit: null
    };
}

// Save statistics
function saveStatistics(stats) {
    try {
        localStorage.setItem('baederbook_statistics', JSON.stringify(stats));
    } catch (e) {
        console.error('Error saving statistics:', e);
    }
}

// Get statistics with calculated values
function getStatistics() {
    const stats = getStoredStatistics();
    
    // Calculate unique visitors
    stats.uniqueVisitors = stats.uniqueVisitorIds.length;
    
    // Calculate today's visitors
    const today = new Date().toISOString().split('T')[0];
    stats.todayVisitors = stats.dailyVisits[today] || 0;
    
    // Calculate average per day
    const dailyValues = Object.values(stats.dailyVisits);
    if (dailyValues.length > 0) {
        const totalDays = Object.keys(stats.dailyVisits).length;
        const totalVisits = dailyValues.reduce((sum, val) => sum + val, 0);
        stats.avgPerDay = Math.round(totalVisits / totalDays);
    } else {
        stats.avgPerDay = 0;
    }
    
    // Calculate week visitors
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    stats.weekVisitors = stats.visitHistory.filter(visit => {
        const visitDate = new Date(visit.timestamp);
        return visitDate >= weekAgo;
    }).length;
    
    // Calculate month visitors
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    stats.monthVisitors = stats.visitHistory.filter(visit => {
        const visitDate = new Date(visit.timestamp);
        return visitDate >= monthAgo;
    }).length;
    
    // Format dates
    if (stats.firstVisit) {
        stats.firstVisit = formatDate(new Date(stats.firstVisit));
    }
    if (stats.lastVisit) {
        stats.lastVisit = formatDate(new Date(stats.lastVisit));
    }
    
    return stats;
}

// Format date for display
function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Initialize tracking on page load (only on public pages, not on stats page)
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Don't track visits to the statistics page itself
    if (currentPage !== 'statistiken.html' && currentPage !== 'login.html') {
        trackVisit();
    }
});

