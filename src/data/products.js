

export const CATEGORIES = [
    {
        id: 'roof-sheets',
        name: 'Roof Sheets',
        description: 'Premium Colorbond and Zincalume steel roofing profiles tailored to your needs.',
        image: '/assets/category-roofing.jpg',
        parentNav: 'roofing'
    },
    {
        id: 'roofing-accessories',
        name: 'Roofing Accessories',
        description: 'Essential accessories for professional roofing installations.',
        image: '/assets/category-roofing-acc.jpg',
        parentNav: 'roofing'
    },
    {
        id: 'polycarbonate',
        name: 'Polycarbonate Sheets',
        description: 'Translucent polycarbonate roofing for natural light applications.',
        image: '/assets/category-poly.jpg',
        parentNav: 'roofing'
    },
    {
        id: 'cladding',
        name: 'Cladding',
        description: 'Sleek, modern wall cladding solutions for contemporary architecture.',
        image: '/assets/category-cladding.jpg',
        parentNav: 'cladding'
    },
    {
        id: 'cladding-accessories',
        name: 'Cladding Accessories',
        description: 'Clips, battens, and fixing systems for cladding installations.',
        image: '/assets/category-cladding-acc.jpg',
        parentNav: 'cladding'
    },
    {
        id: 'fascia-gutter',
        name: 'Facia & Gutter',
        description: 'Modern fascia and gutter profiles for effective water management.',
        image: '/assets/category-gutter.jpg',
        parentNav: 'fascia-gutter'
    },
    {
        id: 'fascia-accessories',
        name: 'Fascia Accessories',
        description: 'Brackets, joiners, and fittings for fascia installations.',
        image: '/assets/category-fascia-acc.jpg',
        parentNav: 'fascia-gutter'
    },
    {
        id: 'gutter-accessories',
        name: 'Gutter Accessories',
        description: 'Brackets, stop ends, and fittings for gutter systems.',
        image: '/assets/category-gutter-acc.jpg',
        parentNav: 'fascia-gutter'
    },
    {
        id: 'downpipes',
        name: 'Downpipes',
        description: 'Essential rainwater downpipe systems in various profiles and sizes.',
        image: '/assets/category-downpipe.jpg',
        parentNav: 'downpipe'
    },
    {
        id: 'downpipe-accessories',
        name: 'Downpipes Accessories',
        description: 'Bends, joiners, and connectors for downpipe systems.',
        image: '/assets/category-dp-acc.jpg',
        parentNav: 'downpipe'
    },
    {
        id: 'downpipe-clips',
        name: 'Downpipe Clips',
        description: 'Fixing clips for secure downpipe mounting.',
        image: '/assets/category-dp-clips.jpg',
        parentNav: 'downpipe'
    },
    {
        id: 'downpipe-offsets',
        name: 'Downpipe Offsets',
        description: 'Offset bends and adapters for downpipe runs.',
        image: '/assets/category-dp-offsets.jpg',
        parentNav: 'downpipe'
    },
    {
        id: 'pops',
        name: 'Pops',
        description: 'Pop rivet fasteners for sheet metal work.',
        image: '/assets/category-pops.jpg',
        parentNav: 'accessories'
    },
    {
        id: 'screws',
        name: 'Screws',
        description: 'Roofing and cladding screws with colour-matched heads.',
        image: '/assets/category-screws.jpg',
        parentNav: 'accessories'
    },
    {
        id: 'insulations',
        name: 'Insulations',
        description: 'Thermal and acoustic insulation solutions for roofing and walls.',
        image: '/assets/category-insulation.jpg',
        parentNav: 'accessories'
    },
    {
        id: 'dambuster',
        name: 'Dambuster Products',
        description: 'Specialized dambuster gutter guard and water management products.',
        image: '/assets/category-dambuster.jpg',
        parentNav: 'dambuster'
    }
];

// Navigation structure for the navbar
export const NAV_STRUCTURE = [
    {
        id: 'roofing',
        label: 'Roofing',
        hasDropdown: true,
        items: [
            { id: 'roof-sheets', label: 'Roof Sheets' },
            { id: 'roofing-accessories', label: 'Roofing Accessories' },
            { id: 'polycarbonate', label: 'Polycarbonate Sheets' }
        ]
    },
    {
        id: 'cladding-nav',
        label: 'Cladding',
        hasDropdown: true,
        items: [
            { id: 'cladding', label: 'Cladding' },
            { id: 'cladding-accessories', label: 'Cladding Accessories' }
        ]
    },
    {
        id: 'fascia-gutter-nav',
        label: 'Facia & Gutter',
        hasDropdown: true,
        items: [
            { id: 'fascia-gutter', label: 'Facia & Gutter' },
            { id: 'fascia-accessories', label: 'Fascia Accessories' },
            { id: 'gutter-accessories', label: 'Gutter Accessories' }
        ]
    },
    {
        id: 'downpipe-nav',
        label: 'Downpipe',
        hasDropdown: true,
        items: [
            { id: 'downpipes', label: 'Downpipes' },
            { id: 'downpipe-accessories', label: 'Downpipes Accessories' },
            { id: 'downpipe-clips', label: 'Downpipe Clips' },
            { id: 'downpipe-offsets', label: 'Downpipe Offsets' }
        ]
    },
    {
        id: 'dambuster-nav',
        label: 'Dambuster Products',
        hasDropdown: false,
        linkTo: '/category/dambuster'
    },
    {
        id: 'accessories-nav',
        label: 'Accessories',
        hasDropdown: true,
        items: [
            { id: 'pops', label: 'Pops' },
            { id: 'screws', label: 'Screws' },
            { id: 'insulations', label: 'Insulations' }
        ]
    }
];

export const PRODUCTS = [
    // ===== ROOF SHEETS =====
    {
        id: '5-rib-sheet',
        categoryId: 'roof-sheets',
        categoryName: 'Roof Sheets',
        name: '5-Rib Sheet',
        description: 'A modern, clean-lined profile with high water carrying capacity. Ideal for residential and commercial roofing applications.',
        priceRange: '$11.91 – $32.44',
        rating: 0,
        image: '/assets/product-5rib.jpg',
        badges: [],
        features: ['High water carrying capacity', 'Clean modern lines', 'Easy to install', 'Available in Colorbond & Zincalume']
    },
    {
        id: 'cliplock-700',
        categoryId: 'roof-sheets',
        categoryName: 'Roof Sheets',
        name: 'Cliplock 700',
        description: 'Concealed fix roofing system designed for a sleek, screw-free appearance on large commercial and residential roofs.',
        priceRange: '$12.69 – $39.36',
        rating: 0,
        image: '/assets/product-cliplock.jpg',
        badges: [],
        features: ['Concealed fixing system', 'Screw-free appearance', 'Wide 700mm coverage', 'Suitable for low pitch roofs']
    },
    {
        id: 'corrugated-roof',
        categoryId: 'roof-sheets',
        categoryName: 'Roof Sheets',
        name: 'Corrugated',
        description: 'The iconic Australian roofing profile. Reliable, durable, and perfect for any application from residential to rural.',
        priceRange: '$11.91 – $32.44',
        rating: 0,
        image: '/assets/product-corrugated.jpg',
        badges: [],
        features: ['Classic Australian profile', 'Strong and durable', 'Versatile application', 'Cost-effective solution']
    },
    {
        id: 'wallclad-panel',
        categoryId: 'roof-sheets',
        categoryName: 'Roof Sheets',
        name: 'Wallclad Panel',
        description: 'Durable multi-purpose panel suitable for both wall cladding and roofing applications.',
        priceRange: '$11.00 – $18.49',
        rating: 0,
        image: '/assets/product-wallclad.jpg',
        badges: ['-41%'],
        features: ['Multi-purpose panel', 'Wall and roof application', 'Economical pricing', 'Quick installation']
    },

    // ===== ROOFING ACCESSORIES =====
    {
        id: 'roof-screws-hex',
        categoryId: 'roofing-accessories',
        categoryName: 'Roofing Accessories',
        name: 'Hex Head Roofing Screws',
        description: 'Colour-matched hex head screws for securing roof sheets to steel or timber battens.',
        priceRange: '$12.50 – $45.00',
        rating: 0,
        image: '/assets/product-roof-screws.jpg',
        badges: [],
        features: ['Colour-matched heads', 'Self-drilling tip', 'EPDM washer included', 'Corrosion resistant']
    },
    {
        id: 'ridge-capping',
        categoryId: 'roofing-accessories',
        categoryName: 'Roofing Accessories',
        name: 'Ridge Capping',
        description: 'Standard ridge capping to seal and protect the ridge line of your roof.',
        priceRange: '$15.00 – $35.00',
        rating: 0,
        image: '/assets/product-ridge-cap.jpg',
        badges: [],
        features: ['Weather-tight seal', 'Custom cut to length', 'Colour matched to roof', 'Standard and vented options']
    },
    {
        id: 'barge-capping',
        categoryId: 'roofing-accessories',
        categoryName: 'Roofing Accessories',
        name: 'Barge Capping',
        description: 'Barge capping for neat edge finishing on gable ends.',
        priceRange: '$12.00 – $28.00',
        rating: 0,
        image: '/assets/product-barge-cap.jpg',
        badges: [],
        features: ['Clean edge finish', 'Wind protection', 'Custom formed', 'Colorbond colour range']
    },

    // ===== POLYCARBONATE SHEETS =====
    {
        id: 'poly-5-rib',
        categoryId: 'polycarbonate',
        categoryName: 'Polycarbonate Sheets',
        name: '5-Rib Polycarbonate',
        description: 'Polycarbonate 5-Rib profile. Matches the metal 5-rib profile for mixed roof applications.',
        priceRange: '$27.21 – $122.46',
        rating: 0,
        image: '/assets/product-poly-5rib.jpg',
        badges: [],
        features: ['Matches metal 5-rib profile', 'UV protected', 'Impact resistant', 'Natural light transmission']
    },
    {
        id: 'poly-corrugated',
        categoryId: 'polycarbonate',
        categoryName: 'Polycarbonate Sheets',
        name: 'Corrugated Polycarbonate',
        description: 'Corrugated polycarbonate sheet for skylights and covered areas.',
        priceRange: '$19.66 – $108.77',
        rating: 0,
        image: '/assets/product-poly-corr.jpg',
        badges: [],
        features: ['Matches corrugated profile', 'Clear and tinted options', 'Hail resistant', '10 year warranty']
    },
    {
        id: 'poly-greca',
        categoryId: 'polycarbonate',
        categoryName: 'Polycarbonate Sheets',
        name: 'Greca Polycarbonate',
        description: 'Greca profile polycarbonate sheet with excellent light diffusion.',
        priceRange: '$19.66 – $108.77',
        rating: 0,
        image: '/assets/product-poly-greca.jpg',
        badges: [],
        features: ['Greca profile match', 'Excellent light diffusion', 'High impact strength', 'Easy to cut and install']
    },

    // ===== CLADDING =====
    {
        id: 'interlocking',
        categoryId: 'cladding',
        categoryName: 'Cladding',
        name: 'Interlocking',
        description: 'Interlocking cladding panel for a seamless, modern wall finish.',
        priceRange: '$11.00 – $41.66',
        rating: 0,
        image: '/assets/product-interlocking.jpg',
        badges: [],
        features: ['Seamless finish', 'Interlocking joint', 'Concealed fixings', 'Modern aesthetic']
    },
    {
        id: 'nailstrip',
        categoryId: 'cladding',
        categoryName: 'Cladding',
        name: 'Nailstrip',
        description: 'Nailstrip cladding system. Easy to install with simple nail fixing mechanism.',
        priceRange: '$11.00 – $41.66',
        rating: 0,
        image: '/assets/product-nailstrip.jpg',
        badges: [],
        features: ['Simple nail fixing', 'No clips required', 'Clean vertical lines', 'Quick installation']
    },
    {
        id: 'snap-lock',
        categoryId: 'cladding',
        categoryName: 'Cladding',
        name: 'Snap Lock',
        description: 'Snap lock cladding system with concealed fixing for a premium, clean finish.',
        priceRange: '$11.00 – $41.66',
        rating: 0,
        image: '/assets/product-snaplock.jpg',
        badges: [],
        features: ['Snap-together joints', 'Concealed fixings', 'Premium finish', 'Weather-tight']
    },
    {
        id: 'standing-seam',
        categoryId: 'cladding',
        categoryName: 'Cladding',
        name: 'Standing Seam',
        description: 'Standing seam cladding system for high-end architectural applications.',
        priceRange: '$11.00 – $41.66',
        rating: 0,
        image: '/assets/product-standing-seam.jpg',
        badges: [],
        features: ['Architectural grade', 'Mechanically seamed', 'No exposed fasteners', 'Superior weatherproofing']
    },

    // ===== CLADDING ACCESSORIES =====
    {
        id: 'cladding-battens',
        categoryId: 'cladding-accessories',
        categoryName: 'Cladding Accessories',
        name: 'Cladding Battens 6m',
        description: '6m cladding battens for sub-framing cladding systems.',
        priceRange: '$25.35 – $31.20',
        rating: 0,
        image: '/assets/product-battens.jpg',
        badges: [],
        features: ['6m lengths', 'Galvanised steel', 'Pre-punched holes', 'Suits all cladding profiles']
    },
    {
        id: 'fixed-clips',
        categoryId: 'cladding-accessories',
        categoryName: 'Cladding Accessories',
        name: 'Fixed Clips',
        description: 'Fixed clips for securing cladding panels to sub-frame.',
        priceRange: '$167.05 – $221.39',
        rating: 0,
        image: '/assets/product-fixed-clips.jpg',
        badges: [],
        features: ['Stainless steel', 'Non-slip grip', 'For fixed-point connections', 'Sold per box']
    },
    {
        id: 'sliding-clips',
        categoryId: 'cladding-accessories',
        categoryName: 'Cladding Accessories',
        name: 'Sliding Clips',
        description: 'Sliding clips to allow thermal movement in cladding systems.',
        priceRange: '$336.70 – $361.01',
        rating: 0,
        image: '/assets/product-sliding-clips.jpg',
        badges: [],
        features: ['Allows thermal expansion', 'Prevents buckling', 'Stainless steel', 'Sold per box']
    },

    // ===== FACIA & GUTTER =====
    {
        id: 'fascia-board',
        categoryId: 'fascia-gutter',
        categoryName: 'Facia & Gutter',
        name: 'Fascia Board',
        description: 'Fascia board for gutter systems. Available in a full range of Colorbond colours.',
        priceRange: '$5.85 – $18.72',
        rating: 0,
        image: '/assets/product-fascia.jpg',
        badges: [],
        features: ['Custom cut to length', 'Full Colorbond range', 'Pre-formed profile', 'UV resistant']
    },
    {
        id: 'og-gutter',
        categoryId: 'fascia-gutter',
        categoryName: 'Facia & Gutter',
        name: 'OG Gutter',
        description: 'OG profile gutter — the most popular gutter profile in Australia.',
        priceRange: '$17.10 – $33.22',
        rating: 0,
        image: '/assets/product-og-gutter.jpg',
        badges: [],
        features: ['Most popular profile', 'High water capacity', 'Suits most fascia types', 'Colorbond range']
    },
    {
        id: 'quad-gutter',
        categoryId: 'fascia-gutter',
        categoryName: 'Facia & Gutter',
        name: 'Quad Gutter',
        description: 'Quad profile gutter with clean square lines for modern homes.',
        priceRange: '$5.70 – $18.72',
        rating: 0,
        image: '/assets/product-quad-gutter.jpg',
        badges: [],
        features: ['Modern square profile', 'Clean lines', 'Compact design', 'Suits contemporary homes']
    },
    {
        id: 'squareline-gutter',
        categoryId: 'fascia-gutter',
        categoryName: 'Facia & Gutter',
        name: 'Squareline Gutter',
        description: 'Squareline profile gutter with high front for a sleek, modern aesthetic.',
        priceRange: '$8.22 – $16.48',
        rating: 0,
        image: '/assets/product-squareline.jpg',
        badges: [],
        features: ['High front profile', 'Sleek modern look', 'Large capacity', 'Conceals roof edge']
    },

    // ===== FASCIA ACCESSORIES =====
    {
        id: 'fascia-brackets',
        categoryId: 'fascia-accessories',
        categoryName: 'Fascia Accessories',
        name: 'Fascia Brackets',
        description: 'Mounting brackets for fascia board installations.',
        priceRange: '$2.50 – $8.50',
        rating: 0,
        image: '/assets/product-fascia-brackets.jpg',
        badges: [],
        features: ['Heavy duty', 'Galvanised finish', 'Easy to install', 'Suits all fascia sizes']
    },
    {
        id: 'fascia-joiners',
        categoryId: 'fascia-accessories',
        categoryName: 'Fascia Accessories',
        name: 'Fascia Joiners',
        description: 'Joining pieces for connecting fascia board lengths.',
        priceRange: '$3.00 – $6.00',
        rating: 0,
        image: '/assets/product-fascia-joiners.jpg',
        badges: [],
        features: ['Seamless join', 'Colour matched', 'Weather sealed', 'Quick click-in']
    },

    // ===== GUTTER ACCESSORIES =====
    {
        id: 'gutter-brackets',
        categoryId: 'gutter-accessories',
        categoryName: 'Gutter Accessories',
        name: 'Gutter Brackets',
        description: 'Internal and external gutter brackets for secure mounting.',
        priceRange: '$2.00 – $6.50',
        rating: 0,
        image: '/assets/product-gutter-brackets.jpg',
        badges: [],
        features: ['Internal & external options', 'Zinc plated', 'Strong hold', 'Suits OG & Quad profiles']
    },
    {
        id: 'gutter-stop-ends',
        categoryId: 'gutter-accessories',
        categoryName: 'Gutter Accessories',
        name: 'Gutter Stop Ends',
        description: 'Stop ends to cap the ends of gutter runs.',
        priceRange: '$3.50 – $7.00',
        rating: 0,
        image: '/assets/product-stop-ends.jpg',
        badges: [],
        features: ['Left and right hand', 'Colour matched', 'Riveted or pop fixed', 'Watertight seal']
    },
    {
        id: 'gutter-outlets',
        categoryId: 'gutter-accessories',
        categoryName: 'Gutter Accessories',
        name: 'Gutter Outlets',
        description: 'Drop outlet fittings to connect gutter to downpipe.',
        priceRange: '$5.00 – $12.00',
        rating: 0,
        image: '/assets/product-gutter-outlets.jpg',
        badges: [],
        features: ['Suits all gutter profiles', 'Pop rivet or silicone fix', 'Multiple sizes', 'Colorbond range']
    },

    // ===== DOWNPIPES =====
    {
        id: 'downpipe-100x50',
        categoryId: 'downpipes',
        categoryName: 'Downpipes',
        name: 'Downpipe - 100 x 50 Rectangular',
        description: 'Standard rectangular downpipe. Ideal for residential applications with a clean, compact profile.',
        priceRange: '$18.20 – $60.22',
        basePricePerMeter: 18.20,
        priceType: 'variable',
        rating: 0,
        image: '/assets/product-dp-rect-1.jpg',
        badges: [],
        features: ['Compact profile', 'Standard residential size', 'Easy to install', 'Full colour range'],
        options: {
            colorCategory: ['Colorbond', 'Zincalume', 'Galvanised'],
            color: [
                { name: 'Basalt', hex: '#696969' }, { name: 'Cove', hex: '#708090' }, { name: 'Dune', hex: '#CDC8B1' },
                { name: 'Evening Haze', hex: '#DCDCDC' }, { name: 'Gully', hex: '#8B8B83' }, { name: 'Ironstone', hex: '#363636' },
                { name: 'Jasper', hex: '#8B7355' }, { name: 'Mangrove', hex: '#6B8E23' }, { name: 'Monument', hex: '#2F4F4F' },
                { name: 'Night Sky', hex: '#000000' }, { name: 'Paperbark', hex: '#FFEFD5' }, { name: 'Shale Grey', hex: '#BEBEBE' },
                { name: 'Surfmist', hex: '#F0F8FF' }, { name: 'Terrain', hex: '#8B4513' }, { name: 'Wallaby', hex: '#778899' },
                { name: 'Windspray', hex: '#778899' }
            ],
            length: ['1.8m', '2.4m', '3.0m', '3.6m', '4.0m']
        }
    },
    {
        id: 'downpipe-100x75',
        categoryId: 'downpipes',
        categoryName: 'Downpipes',
        name: 'Downpipe - 100 x 75 Rectangular',
        description: 'Larger rectangular downpipe with higher water capacity for bigger roof areas.',
        priceRange: '$22.18 – $74.02',
        rating: 0,
        image: '/assets/product-dp-rect-2.jpg',
        badges: [],
        features: ['Higher water capacity', 'Suits larger roofs', 'Rectangular profile', 'Full colour range']
    },
    {
        id: 'downpipe-100-round',
        categoryId: 'downpipes',
        categoryName: 'Downpipes',
        name: 'Downpipe 100mm Round',
        description: 'Standard round downpipe in 100mm diameter for classic installations.',
        priceRange: '$79.02 – $147.46',
        rating: 0,
        image: '/assets/product-dp-round-100.jpg',
        badges: [],
        features: ['Classic round profile', '100mm diameter', 'Heritage & modern use', 'Durable finish']
    },
    {
        id: 'downpipe-75-round',
        categoryId: 'downpipes',
        categoryName: 'Downpipes',
        name: 'Downpipe 75mm Round',
        description: 'Compact 75mm round downpipe suitable for smaller roof catchments.',
        priceRange: '$29.88 – $200.18',
        rating: 0,
        image: '/assets/product-dp-round-75.jpg',
        badges: [],
        features: ['Compact 75mm size', 'Suits small areas', 'Round profile', 'Easy to connect']
    },
    {
        id: 'downpipe-90-round',
        categoryId: 'downpipes',
        categoryName: 'Downpipes',
        name: 'Downpipe 90mm Round',
        description: '90mm round downpipe profile — the mid-range option for most applications.',
        priceRange: '$33.90 – $147.90',
        rating: 0,
        image: '/assets/product-dp-round-90.jpg',
        badges: [],
        features: ['Mid-range 90mm size', 'Versatile application', 'Round profile', 'Standard fittings available']
    },

    // ===== DOWNPIPE ACCESSORIES =====
    {
        id: 'dp-bends',
        categoryId: 'downpipe-accessories',
        categoryName: 'Downpipes Accessories',
        name: 'Downpipe Bends',
        description: 'Standard 90° and 45° bends for downpipe direction changes.',
        priceRange: '$8.00 – $22.00',
        rating: 0,
        image: '/assets/product-dp-bends.jpg',
        badges: [],
        features: ['45° and 90° options', 'All downpipe sizes', 'Colour matched', 'Press-fit connection']
    },
    {
        id: 'dp-joiners',
        categoryId: 'downpipe-accessories',
        categoryName: 'Downpipes Accessories',
        name: 'Downpipe Joiners',
        description: 'Joining sleeves for connecting downpipe lengths.',
        priceRange: '$5.50 – $12.00',
        rating: 0,
        image: '/assets/product-dp-joiners.jpg',
        badges: [],
        features: ['Slip-on connection', 'All sizes available', 'Secure fit', 'Colorbond range']
    },

    // ===== DOWNPIPE CLIPS =====
    {
        id: 'dp-clip-rect',
        categoryId: 'downpipe-clips',
        categoryName: 'Downpipe Clips',
        name: 'Rectangular Downpipe Clips',
        description: 'Wall mounting clips for rectangular downpipe profiles.',
        priceRange: '$2.50 – $5.00',
        rating: 0,
        image: '/assets/product-dp-clip-rect.jpg',
        badges: [],
        features: ['Suits rectangular DP', 'Zinc or Colorbond', 'Screw fixing', 'Spring clip design']
    },
    {
        id: 'dp-clip-round',
        categoryId: 'downpipe-clips',
        categoryName: 'Downpipe Clips',
        name: 'Round Downpipe Clips',
        description: 'Wall mounting clips for round downpipe profiles.',
        priceRange: '$2.50 – $5.00',
        rating: 0,
        image: '/assets/product-dp-clip-round.jpg',
        badges: [],
        features: ['Suits round DP', '75mm, 90mm, 100mm sizes', 'Easy install', 'Colour matched options']
    },

    // ===== DOWNPIPE OFFSETS =====
    {
        id: 'dp-offset-rect',
        categoryId: 'downpipe-offsets',
        categoryName: 'Downpipe Offsets',
        name: 'Rectangular Downpipe Offset',
        description: 'Offset piece for rectangular downpipe to clear eaves or obstacles.',
        priceRange: '$15.00 – $35.00',
        rating: 0,
        image: '/assets/product-dp-offset-rect.jpg',
        badges: [],
        features: ['Clear eaves & soffits', 'Standard offset lengths', 'Rectangular profile', 'Colour matched']
    },
    {
        id: 'dp-offset-round',
        categoryId: 'downpipe-offsets',
        categoryName: 'Downpipe Offsets',
        name: 'Round Downpipe Offset',
        description: 'Offset piece for round downpipe to clear eaves or obstacles.',
        priceRange: '$15.00 – $35.00',
        rating: 0,
        image: '/assets/product-dp-offset-round.jpg',
        badges: [],
        features: ['Clear eaves & soffits', 'Standard offset lengths', 'Round profile', 'All diameters available']
    },

    // ===== POPS =====
    {
        id: 'pop-rivets-std',
        categoryId: 'pops',
        categoryName: 'Pops',
        name: 'Standard Pop Rivets',
        description: 'Standard aluminium pop rivets for general sheet metal work.',
        priceRange: '$8.00 – $25.00',
        rating: 0,
        image: '/assets/product-pop-rivets.jpg',
        badges: [],
        features: ['Aluminium body', 'Steel mandrel', 'Multiple sizes', 'Sold per box of 250']
    },
    {
        id: 'pop-rivets-coloured',
        categoryId: 'pops',
        categoryName: 'Pops',
        name: 'Coloured Pop Rivets',
        description: 'Colour-matched pop rivets for a clean, professional finish.',
        priceRange: '$12.00 – $35.00',
        rating: 0,
        image: '/assets/product-pop-coloured.jpg',
        badges: [],
        features: ['Colour matched heads', 'Full Colorbond range', 'Professional finish', 'Sold per box']
    },

    // ===== SCREWS =====
    {
        id: 'roofing-screws-type17',
        categoryId: 'screws',
        categoryName: 'Screws',
        name: 'Type 17 Roofing Screws',
        description: 'Self-drilling timber point screws for fixing roofing to timber purlins.',
        priceRange: '$18.00 – $55.00',
        rating: 0,
        image: '/assets/product-screws-type17.jpg',
        badges: [],
        features: ['Type 17 timber point', 'Self-drilling', 'EPDM sealing washer', 'Colour matched']
    },
    {
        id: 'tek-screws',
        categoryId: 'screws',
        categoryName: 'Screws',
        name: 'Tek Screws (Metal to Metal)',
        description: 'Self-drilling tek screws for fixing to steel purlins and battens.',
        priceRange: '$20.00 – $60.00',
        rating: 0,
        image: '/assets/product-tek-screws.jpg',
        badges: [],
        features: ['Self-drilling point', 'Metal to metal fixing', 'High tensile strength', 'Colour matched heads']
    },

    // ===== INSULATIONS =====
    {
        id: 'sisalation',
        categoryId: 'insulations',
        categoryName: 'Insulations',
        name: 'Sisalation',
        description: 'Reflective foil insulation for under-roof applications. Reduces heat transfer and condensation.',
        priceRange: '$85.00 – $150.00',
        rating: 0,
        image: '/assets/product-sisalation.jpg',
        badges: [],
        features: ['Reflective foil', 'Vapour barrier', 'Reduces condensation', '30m roll']
    },
    {
        id: 'anticon-blanket',
        categoryId: 'insulations',
        categoryName: 'Insulations',
        name: 'Anticon Blanket',
        description: 'Acoustic and thermal insulation blanket that bonds directly to the underside of metal roofing.',
        priceRange: '$120.00 – $250.00',
        rating: 0,
        image: '/assets/product-anticon.jpg',
        badges: [],
        features: ['Acoustic dampening', 'Thermal insulation', 'Anti-condensation', 'Factory bonded option']
    },

    // ===== DAMBUSTER PRODUCTS =====
    {
        id: 'dambuster-gutter-guard',
        categoryId: 'dambuster',
        categoryName: 'Dambuster Products',
        name: 'Dambuster Gutter Guard',
        description: 'Premium gutter guard system to prevent leaves and debris from blocking gutters.',
        priceRange: '$12.00 – $28.00',
        rating: 0,
        image: '/assets/product-dambuster.jpg',
        badges: [],
        features: ['Prevents leaf blockage', 'Easy to install', 'Suits all gutter types', 'Australian made']
    },
    {
        id: 'dambuster-downpipe-guard',
        categoryId: 'dambuster',
        categoryName: 'Dambuster Products',
        name: 'Dambuster Downpipe Strainer',
        description: 'Downpipe strainer to prevent debris entering downpipe system.',
        priceRange: '$8.00 – $15.00',
        rating: 0,
        image: '/assets/product-dambuster-dp.jpg',
        badges: [],
        features: ['Prevents blockages', 'Easy removal for cleaning', 'Multiple sizes', 'Durable plastic']
    }
];
