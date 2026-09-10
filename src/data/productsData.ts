import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'detox-plus',
    slug: 'detox-plus',
    name: 'Detox Plus',
    category: 'Cleansing / Immunity',
    shortDescription: 'Comprehensive full-body cellular cleanser, liver & kidney revitalizer, and anti-parasitic formula.',
    keyIndications: [
      'Full body toxin flush & heavy metal elimination',
      'Liver & kidney cellular restoration',
      'Accelerated malaria & typhoid recovery',
      'Blood sugar stabilization & metabolic reboot',
      'Healthy weight management & anti-parasitic defense'
    ],
    fullBenefits: [
      'Flushes accumulated endotoxins from bloodstream, lymphatic channels, and colon',
      'Enhances natural hepatic enzyme production to support optimal liver filtration',
      'Fortifies kidney nephron performance and reduces systemic uric acid accumulation',
      'Eliminates intestinal worms, parasites, and cellular debris',
      'Restores vital energy levels and clears brain fog caused by metabolic toxicity'
    ],
    dosage: 'Take 20ml to 30ml first thing in the morning on an empty stomach and 30ml before bedtime with warm water.',
    presentation: '500ml Oral Liquid Suspension / Herbal Elixir Bottle',
    activeBotanicals: ['Moringa Oleifera', 'Phyllanthus Niruri', 'Curcuma Longa', 'Ginger Root Extract', 'Aloe Ferox'],
    retailPrice: 13500,
    memberPrice: 10000,
    pv: 10,
    featured: true,
    nafdacApproved: true,
    imageAccent: '#059669',
    imageUrl: 'https://i.ibb.co/kVZ0nvRj/Milnapath-International.jpg',
    bannerUrl: 'https://i.ibb.co/WNXKR6QV/Whats-App-Image-2026-09-08-at-1-48-05-PM-1.jpg',
    youtubeVideoId: 'XMDeYpqpcjs'
  },
  {
    id: 'gastro-pro',
    slug: 'gastro-pro',
    name: 'Gastro-Pro',
    category: 'Gastrointestinal',
    shortDescription: 'Targeted gastrointestinal therapy for rapid ulcer healing, acid reflux suppression, and lining repair.',
    keyIndications: [
      'Gastric and duodenal ulcer healing',
      'Acid Reflux (GERD) & chronic heartburn',
      'Acute gastritis and stomach inflammation',
      'Acute intestinal colic & bloating',
      'Rapid stomach burning & pain relief within minutes'
    ],
    fullBenefits: [
      'Forms a protective bio-mucosal film over irritated and ulcerated stomach linings',
      'Suppresses dangerous H. pylori bacterial activity in the stomach mucosal folds',
      'Neutralizes excess stomach hydrochloric acid without disrupting vital digestive enzymes',
      'Relieves agonizing abdominal cramps and spasmodic intestinal colic',
      'Restores natural peristaltic rhythm for smooth, painless bowel movements'
    ],
    dosage: 'Take 2 tablespoons 30 minutes before breakfast and 2 tablespoons before dinner, or as needed for acute spasms.',
    presentation: '250ml Concentrated Bio-Suspension',
    activeBotanicals: ['Glycyrrhiza Glabra (Deglycyrrhizinated Licorice)', 'Marshmallow Root', 'Chamomile Extract', 'Slippery Elm Bark'],
    retailPrice: 14000,
    memberPrice: 11000,
    pv: 12,
    featured: true,
    nafdacApproved: true,
    imageAccent: '#0D9488',
    imageUrl: 'https://i.ibb.co/23CXqDPS/Milnapath-International-1.jpg',
    bannerUrl: 'https://i.ibb.co/m5cFN210/Whats-App-Image-2026-09-08-at-1-48-05-PM-3.jpg'
  },
  {
    id: 'nakom-oil',
    slug: 'nakom-oil',
    name: 'Nakom Oil',
    category: 'Total Wellness',
    shortDescription: 'Multi-purpose transdermal & oral therapeutic oil for severe inflammation, fertility, and joint restoration.',
    keyIndications: [
      'Potent deep-tissue anti-inflammatory action',
      'Bronchial asthma therapy & respiratory ease',
      'Severe joint, arthritis & rheumatism pain relief',
      'Assists unblocking fallopian tubes & dissolving ovarian cysts',
      'Elevates healthy sperm count and seminal motility'
    ],
    fullBenefits: [
      'Deep transdermal absorption quickly penetrates cartilage and synovial fluids',
      'Promotes micro-circulation around female reproductive organs to dissolve micro-adhesions',
      'Relaxes spastic bronchial smooth muscles to clear airways during wheezing',
      'Nourishes testicular cells with micro-lipids to support spermatogenesis',
      'Provides instant relief when massaged into strained necks, lumbar regions, and knees'
    ],
    dosage: 'Oral: 1 teaspoon morning & night. Topical: Warm 5-10 drops in palms and massage vigorously into affected area.',
    presentation: '100ml Pure Herbal Cold-Pressed Therapeutic Oil',
    activeBotanicals: ['Nigella Sativa (Black Seed Oil)', 'Eucalyptus Globulus', 'Gaultheria Procumbens', 'Frankincense Resin Extract'],
    retailPrice: 15000,
    memberPrice: 12000,
    pv: 12,
    featured: true,
    nafdacApproved: true,
    imageAccent: '#D97706',
    imageUrl: 'https://i.ibb.co/h1DdVWv9/Milnapath-International.png',
    bannerUrl: 'https://i.ibb.co/84nYrhhd/Whats-App-Image-2026-09-08-at-1-48-06-PM-2.jpg'
  },
  {
    id: 'gynomil',
    slug: 'gynomil',
    name: 'Gynomil',
    category: "Women's Health",
    shortDescription: 'Master female wellness formulation for hormonal harmony, fibroid shrinkage, and ovulation boosting.',
    keyIndications: [
      'Female hormonal rebalancing (Estrogen/Progesterone)',
      'Natural ovulation stimulation & egg quality boost',
      'Non-invasive uterine fibroid & cyst shrinkage',
      'Regulates erratic or ceased menstrual cycles',
      'Relief from Endometriosis, Pelvic Inflammatory Disease (PID) & painful PMS'
    ],
    fullBenefits: [
      'Stimulates pituitary-gonadal axis to normalize follicular development and ovulation',
      'Enhances pelvic blood flow to purge stagnant clots and calm chronic inflammation',
      'Promotes regression of benign uterine smooth muscle growths (fibroids)',
      'Clears persistent bacterial and yeast infections associated with untreated PID',
      'Alleviates severe monthly menstrual cramps, mood swings, and breast tenderness'
    ],
    dosage: 'Take 2 capsules twice daily with meals. For severe cycles, take alongside warm water.',
    presentation: '60 Herbal Gel Capsules Bottle',
    activeBotanicals: ['Vitex Agnus-Castus (Chasteberry)', 'Dong Quai', 'Red Clover Herb', 'Wild Yam', 'Cohosh Root'],
    retailPrice: 16500,
    memberPrice: 13000,
    pv: 15,
    featured: true,
    nafdacApproved: true,
    imageAccent: '#EC4899',
    imageUrl: 'https://i.ibb.co/4RQW6RBL/Milnapath-International-1.png',
    bannerUrl: 'https://i.ibb.co/d4bQCXsk/Whats-App-Image-2026-09-08-at-1-48-03-PM-1.jpg'
  },
  {
    id: 'peptic-tea',
    slug: 'peptic-tea',
    name: 'Peptic Tea',
    category: 'Digestive Health',
    shortDescription: 'Targeted herbal infusion combating Helicobacter pylori, chronic bloating, and gut mucosal breakdown.',
    keyIndications: [
      'Combats Helicobacter pylori microbial colonisation',
      'Stomach & duodenal lining cellular regeneration',
      'Relieves chronic abdominal gas, fullness & severe bloating',
      'Significantly enhances digestive nutrient absorption',
      'Eliminates foul breath resulting from sluggish digestion'
    ],
    fullBenefits: [
      'Rich in bioactive polyphenols that bind and inhibit pathogenic gut bacteria',
      'Soothes the enteric nervous system to alleviate stress-induced stomach churning',
      'Encourages balanced gut flora and beneficial intestinal lactobacilli',
      'Accelerates healing of micro-fissures along the gastrointestinal tract',
      'Promotes comfortable, calm digestion after heavy, rich African meals'
    ],
    dosage: 'Infuse 1 tea bag in 250ml of freshly boiled water for 7-10 minutes. Drink warm twice daily after meals.',
    presentation: 'Box of 20 Hermetically Sealed Bio-Active Tea Bags',
    activeBotanicals: ['Matricaria Chamomilla', 'Cymbopogon Citratus (Lemongrass)', 'Fennel Seed', 'Peppermint Leaf'],
    retailPrice: 10500,
    memberPrice: 8000,
    pv: 8,
    featured: false,
    nafdacApproved: true,
    imageAccent: '#16A34A',
    imageUrl: 'https://i.ibb.co/S452zXJy/Milnapath-International-3.png',
    bannerUrl: 'https://i.ibb.co/0jgHK9kv/Whats-App-Image-2026-09-08-at-1-48-06-PM.jpg'
  },
  {
    id: 'body-lotion-soap',
    slug: 'body-lotion-soap',
    name: 'Body Lotion & Organic Soap Duo',
    category: 'Natural Skin Care',
    shortDescription: '100% natural botanical skincare duo that repairs broken skin barriers and restores radiant glow.',
    keyIndications: [
      '100% natural organic botanicals without hydroquinone or steroids',
      'Repairs chemical-damaged skin barriers & bleached spots',
      'Clears eczema, dermatitis, chronic body acne & fungal rashes',
      'Deep non-comedogenic moisture retention & antioxidant shield',
      'Restores youthful, even-toned radiant African skin complexion'
    ],
    fullBenefits: [
      'Calms hyperpigmentation by naturally suppressing erratic tyrosinase activity',
      'Replenishes ceramides and essential fatty acids to stop trans-epidermal water loss',
      'Organic antiseptic soap removes dirt, fungal spores, and sebum without stripping lipids',
      'Fades stretch marks, dark knuckles, and discoloration from harsh chemicals',
      'Safe for whole family use, including sensitive pediatric skin'
    ],
    dosage: 'Lather soap over damp skin during bath; rinse thoroughly. Apply lotion all over skin immediately while pores are open.',
    presentation: '250ml Body Lotion Bottle + 150g Organic Botanical Cleansing Bar',
    activeBotanicals: ['Raw Butyrospermum Parkii (Shea Butter)', 'Cold-Pressed Neem Oil', 'Centella Asiatica', 'Vitamin E (Tocopherol)'],
    retailPrice: 12500,
    memberPrice: 9500,
    pv: 10,
    featured: false,
    nafdacApproved: true,
    imageAccent: '#F59E0B',
    imageUrl: 'https://i.ibb.co/sd7HRcMP/Milnapath-International-4.png',
    bannerUrl: 'https://i.ibb.co/HksqhQ5/Whats-App-Image-2026-09-08-at-1-48-04-PM.jpg'
  },
  {
    id: 'control-oil',
    slug: 'control-oil',
    name: 'Control Oil',
    category: 'Protection / Wellness',
    shortDescription: 'Natural non-hormonal reproductive shield and antimicrobial intimate therapeutic lubricant.',
    keyIndications: [
      'Natural non-hormonal family planning support',
      'Rapidly immobilizes spermatozoa upon contact',
      'Zero long-term fertility complications or hormonal disruptions',
      'Natural intimate lubricant and tissue nourisher',
      'Anti-microbial and anti-fungal barrier protection'
    ],
    fullBenefits: [
      'Provides a safe, non-toxic alternative to synthetic hormonal birth control pills and injections',
      'Does not interfere with female endocrine cycles, menses, or future conception desires',
      'Inactivates sperm motility through surface tension botanicals within seconds',
      'Prevents post-coital friction, burning, and candidiasis overgrowths',
      'Maintains ideal acidic vaginal pH balance naturally'
    ],
    dosage: 'Instill 3-5 drops deep into the vaginal vault 10-15 minutes prior to intimate contact.',
    presentation: '50ml Precision Dropper Bottle',
    activeBotanicals: ['Azadirachta Indica Extract', 'Pongamia Pinnata Seed Oil', 'Melaleuca Alternifolia', 'Pure Virgin Coconut Oil'],
    retailPrice: 14500,
    memberPrice: 11000,
    pv: 12,
    featured: false,
    nafdacApproved: true,
    imageAccent: '#6366F1',
    imageUrl: 'https://i.ibb.co/zTckQvFZ/Milnapath-International-5.png',
    bannerUrl: 'https://i.ibb.co/bjCnztgG/Whats-App-Image-2026-09-08-at-1-48-04-PM-2.jpg'
  },
  {
    id: 'rejuvenating-drink',
    slug: 'rejuvenating-drink',
    name: 'Rejuvenating Drink (Stem Cell)',
    category: 'Stem Cell / Anti-Aging',
    shortDescription: 'Cutting-edge botanical stem cell formula activating endogenous cellular regeneration & longevity.',
    keyIndications: [
      'Stimulates endogenous stem cell proliferation and organ repair',
      'Reverses oxidative skin wrinkles & premature cellular aging',
      'Massive immune system fortification against degenerate illnesses',
      'Natural cellular analgesic combating chronic joint stiffness',
      'Accelerates post-operative recovery and tissue repair'
    ],
    fullBenefits: [
      'Re-awakens dormant adult stem cells in the bone marrow to regenerate damaged tissues',
      'Eliminates intracellular reactive oxygen species (ROS) and cellular senescence',
      'Boosts natural killer (NK) cell response and macrophage defense capability',
      'Enhances collagen synthesis to tighten sagging skin and strengthen hair roots',
      'Sharpens mental acuity, physical stamina, and deep restorative sleep patterns'
    ],
    dosage: 'Drink 30ml twice daily before breakfast and before retiring to bed. Shake well before use.',
    presentation: '750ml High-Bioavailability Liquid Stem Cell Tonic',
    activeBotanicals: ['Malus Domestica (Swiss Apple Stem Cells)', 'Solar Vitis (Grape Stem Extract)', 'Resveratrol', 'Acai Berry', 'Aronia Melanocarpa'],
    retailPrice: 20000,
    memberPrice: 16000,
    pv: 18,
    featured: false,
    nafdacApproved: true,
    imageAccent: '#8B5CF6',
    imageUrl: 'https://i.ibb.co/C3mNWQ3h/Milnapath-International-6.png',
    bannerUrl: 'https://i.ibb.co/67SnyVkG/Whats-App-Image-2026-09-08-at-1-48-04-PM-1.jpg'
  },
  {
    id: 'glucomil',
    slug: 'glucomil',
    name: 'Glucomil',
    category: 'Metabolic Balance',
    shortDescription: 'Pancreatic restorative blend for healthy blood sugar regulation, kidney toning, and insulin sensitivity.',
    keyIndications: [
      'Normalizes elevated fasting & postprandial blood glucose',
      'Re-energizes beta-cells in the pancreas to produce natural insulin',
      'Tones and safeguards kidneys against diabetic nephropathy',
      'Controls excessive nocturia (frequent night urination) & thirst',
      'Combats chronic diabetic lethargy, blurred vision & neuropathy'
    ],
    fullBenefits: [
      'Upregulates cellular glucose transporters (GLUT-4) for rapid sugar clearance from blood',
      'Decreases intestinal absorption of dietary sugars and excessive carbohydrates',
      'Protects peripheral nerves from diabetic burning sensations in soles and palms',
      'Prevents dangerous vascular damage and diabetic retinopathy',
      'Supports healthy weight stabilization without sudden hypoglycemic crashes'
    ],
    dosage: 'Take 2 capsules morning and night with warm water 20 minutes before meals.',
    presentation: '60 High-Potency Botanical Capsules',
    activeBotanicals: ['Gymnema Sylvestre (Sugar Destroyer)', 'Momordica Charantia (Bitter Melon)', 'Cinnamomum Cassia', 'Berberine HCL'],
    retailPrice: 16000,
    memberPrice: 12500,
    pv: 14,
    featured: false,
    nafdacApproved: true,
    youtubeVideoId: '7aY5zbwP31o',
    imageAccent: '#0284C7',
    imageUrl: 'https://i.ibb.co/YFYPGCqd/Milnapath-International-7.png',
    bannerUrl: 'https://i.ibb.co/7tKZZhL0/Whats-App-Image-2026-09-08-at-1-48-05-PM.jpg'
  },
  {
    id: 'd-man',
    slug: 'd-man',
    name: 'D-Man',
    category: "Men's Vitality",
    shortDescription: 'Premium virility & prostate formula designed to boost testosterone, stamina, and seminal parameters.',
    keyIndications: [
      'Reverses erectile dysfunction, soft erections & performance anxiety',
      'Elevates sperm motility, morphology, and overall semen count',
      'Prostate health support (combats benign prostatic hyperplasia - BPH)',
      'Overcomes premature ejaculation & extends male physical stamina',
      'Boosts free serum testosterone and youthful morning erections'
    ],
    fullBenefits: [
      'Stimulates nitric oxide synthase to engorge penile corpora cavernosa with arterial blood',
      'Shrinks enlarged prostate glands, easing painful, hesitant urinary streams',
      'Optimizes testicular Leydig cell function to ramp up natural testosterone synthesis',
      'Enhances endurance, libido, and rapid post-coital refractory recovery',
      'Zero cardiovascular strain or headache side effects common in synthetic pills'
    ],
    dosage: 'Take 2 capsules daily with warm water or milk in the evening. For intense activity, take 2 capsules 1 hour prior.',
    presentation: '60 Pure Herbal Capsules Bottle',
    activeBotanicals: ['Lepidium Meyenii (Maca Root)', 'Epimedium (Horny Goat Weed)', 'Tongkat Ali (Eurycoma Longifolia)', 'Tribulus Terrestris', 'Saw Palmetto'],
    retailPrice: 17500,
    memberPrice: 14000,
    pv: 16,
    featured: true,
    nafdacApproved: true,
    imageAccent: '#B45309',
    imageUrl: 'https://i.ibb.co/Jw8GkkFf/Milnapath-International-2.png',
    bannerUrl: 'https://i.ibb.co/XrJsbRHj/Whats-App-Image-2026-09-08-at-1-48-05-PM-2.jpg',
    youtubeVideoId: 'VRgVgYKakBs'
  },
  {
    id: 'blood-building-tea',
    slug: 'blood-building-tea',
    name: 'Blood Building Tea',
    category: 'Hematology / Blood Support',
    shortDescription: 'Natural organic iron and flavonoid-rich tonic to speed erythropoiesis and support sickle-cell wellness.',
    keyIndications: [
      'Rapid stimulation of Red Blood Cell (RBC) & hemoglobin formation',
      'Treats microcytic anemia, chronic dizziness & postpartum blood loss',
      'Comprehensive supportive care for Sickle Cell crises and pain management',
      'Deep systemic blood purifier clearing metabolic impurities',
      'Recharges oxygen-carrying capacity to end chronic shortness of breath'
    ],
    fullBenefits: [
      'Furnishes plant-based non-constipating organic chelated iron and bioflavonoids',
      'Stimulates renal erythropoietin secretion to prompt new red blood cell synthesis',
      'Hydrates erythrocytes to diminish painful sickling episodes in vulnerable patients',
      'Neutralizes free radical damage in capillaries and micro-vascular networks',
      'Restores pink, healthy nail beds, gums, and vibrant facial complexion'
    ],
    dosage: 'Brew 1 tea bag in boiling water for 10 minutes. Consume twice daily before meals. May add honey or lemon.',
    presentation: 'Box of 20 Hermetic Medicinal Tea Bags',
    activeBotanicals: ['Sorghum Bicolor Leaf Sheath', 'Hibiscus Sabdariffa', 'Moringa Leaf Concentrate', 'Urtica Dioica (Stinging Nettle)'],
    retailPrice: 11500,
    memberPrice: 9000,
    pv: 9,
    featured: false,
    nafdacApproved: true,
    imageAccent: '#BE123C',
    imageUrl: 'https://i.ibb.co/9mDBJWfb/Milnapath-International-8.png',
    bannerUrl: 'https://i.ibb.co/3V8jKtS/Whats-App-Image-2026-09-08-at-1-48-05-PM-4.jpg'
  },
  {
    id: 'malaria-typhoid-shield',
    slug: 'malaria-typhoid-shield',
    name: 'Malaria / Typhoid Shield',
    category: 'Infection Defense',
    shortDescription: 'Potent botanical shield eradicating Plasmodium parasites and stubborn Salmonella typhi bacteria.',
    keyIndications: [
      'Rapidly eradicates Plasmodium falciparum malaria parasites',
      'Clears resistant Salmonella typhi & paratyphi bacteria from bloodstream & stool',
      'Quenches recurrent high body fever, chills, and nighttime shivering',
      'Eliminates bitter mouth taste, persistent nausea, and restores hearty appetite',
      'Ends severe backache, joint weakness, and post-malarial fatigue'
    ],
    fullBenefits: [
      'Disrupts the cellular membrane of parasite trophozoites in red blood cells',
      'Neutralizes bacterial endotoxins that cause prolonged typhoid fever spikes',
      'Protects hepatic parenchyma from infectious enlargement and stress',
      'Prevents frequent monthly malarial recurrences through systemic immune priming',
      'Safe, gentle on the stomach, and free from conventional drug resistance'
    ],
    dosage: 'Take 30ml 3 times daily after food for 5 consecutive days. Drink plenty of fresh clean water.',
    presentation: '350ml Concentrated Bio-Active Liquid Elixir',
    activeBotanicals: ['Artemisia Annua (Sweet Wormwood)', 'Azadirachta Indica (Dogonyaro)', 'Enantia Chlorantha', 'Nauclea Latifolia'],
    retailPrice: 13500,
    memberPrice: 10500,
    pv: 11,
    featured: false,
    nafdacApproved: true,
    imageAccent: '#047857',
    imageUrl: 'https://i.ibb.co/HTyw6ZBS/Milnapath-International-9.png',
    bannerUrl: 'https://i.ibb.co/W4MPfbP7/Whats-App-Image-2026-09-08-at-1-48-06-PM-1.jpg'
  }
];

export const CATEGORIES = [
  'All',
  'Cleansing / Immunity',
  'Gastrointestinal',
  'Total Wellness',
  "Women's Health",
  'Digestive Health',
  'Natural Skin Care',
  'Protection / Wellness',
  'Stem Cell / Anti-Aging',
  'Metabolic Balance',
  "Men's Vitality",
  'Hematology / Blood Support',
  'Infection Defense'
] as const;
