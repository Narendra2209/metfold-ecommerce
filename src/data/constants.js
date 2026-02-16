// Standard Colorbond (22 Colors)
export const COLORBOND_COLORS = [
    { name: 'Basalt', hex: '#696969' },
    { name: 'Classic Cream', hex: '#F0EAD6' },
    { name: 'Cottage Green', hex: '#006400' },
    { name: 'Deep Ocean', hex: '#00008B' },
    { name: 'Dune', hex: '#BCAFA3' },
    { name: 'Evening Haze', hex: '#CDBE9F' },
    { name: 'Gully', hex: '#8B7D6B' },
    { name: 'Ironstone', hex: '#36454F' },
    { name: 'Jasper', hex: '#8B7355' },
    { name: 'Mangrove', hex: '#556B2F' },
    { name: 'Manor Red', hex: '#800000' },
    { name: 'Monument', hex: '#333333' },
    { name: 'Night Sky', hex: '#1C1C1C' },
    { name: 'Pale Eucalypt', hex: '#8FBC8F' },
    { name: 'Paperbark', hex: '#EEE8AA' },
    { name: 'Shale Grey', hex: '#A9A9A9' },
    { name: 'Surfmist', hex: '#F5F5F5' },
    { name: 'Terrain', hex: '#A52A2A' },
    { name: 'Wallaby', hex: '#645452' },
    { name: 'Windspray', hex: '#778899' },
    { name: 'Woodland Grey', hex: '#4F4F4F' },
    { name: 'Dover White', hex: '#F0F4F8' }, // Added to make 22
];

// Colorbond Matt (6 Colors)
export const COLORBOND_MATT_COLORS = [
    { name: 'Monument', hex: '#333333' },
    { name: 'Basalt', hex: '#696969' },
    { name: 'Shale Grey', hex: '#A9A9A9' },
    { name: 'Dune', hex: '#BCAFA3' },
    { name: 'Surfmist', hex: '#F5F5F5' },
    { name: 'Bluegum', hex: '#7C8A94' },
];

// Colorbond Ultra (6 Colors)
export const COLORBOND_ULTRA_COLORS = [
    { name: 'Monument', hex: '#333333' },
    { name: 'Wallaby', hex: '#645452' },
    { name: 'Windspray', hex: '#778899' },
    { name: 'Dune', hex: '#BCAFA3' },
    { name: 'Surfmist', hex: '#F5F5F5' },
    { name: 'Woodland Grey', hex: '#4F4F4F' },
];

// Singles
export const ZINCALUME_COLOR = [{ name: 'Zincalume', hex: '#B0C4DE' }];
export const GALVANISED_COLOR = [{ name: 'Galvanised', hex: '#A9A9A9' }];

export const FINISH_TYPES = [
    'Colorbond',
    'Colorbond Matt',
    'Colorbond Ultra',
    'Zincalume',
    'Galvanised'
];

export const THICKNESS_OPTIONS = ['0.42 BMT', '0.48 BMT', '0.55 BMT'];

// Helper to get colors based on finish
export const getColorsForFinish = (finish) => {
    switch (finish) {
        case 'Colorbond': return COLORBOND_COLORS;
        case 'Colorbond Matt': return COLORBOND_MATT_COLORS;
        case 'Colorbond Ultra': return COLORBOND_ULTRA_COLORS;
        case 'Zincalume': return ZINCALUME_COLOR;
        case 'Galvanised': return GALVANISED_COLOR;
        default: return [];
    }
};
