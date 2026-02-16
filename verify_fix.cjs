
const lucide = require('lucide-react');
const icons = ['RefreshCw', 'CirclePlay', 'ChevronRight', 'Box', 'ShieldCheck', 'Search', 'MapPin', 'CheckCircle'];
icons.forEach(icon => {
    if (lucide[icon]) {
        console.log(`${icon} exists.`);
    } else {
        console.error(`${icon} MISSING.`);
    }
});
