import { VehicleModel } from '../types';

export const CANDIDATE_VEHICLES: VehicleModel[] = [
  {
    id: "candidate-model-a",
    candidateCode: "Candidate Model A",
    genericName: "Desert SUV Concept",
    brand: "Candidate Supplier A (Chery/Jetour Channel)",
    model: "Model A - Expedition 4x4",
    trim: "Desert Overland Spec",
    year: 2026,
    category: "suv_4x4",
    categoryLabel: {
      en: "Rugged Premium 4x4",
      fr: "4x4 Tout-Terrain Premium",
      ar: "دفع رباعي فاخر للطرق الوعرة"
    },
    drivetrain: "Intelligent All-Wheel Drive with Rear E-Locker",
    powertrain: "2.0T TGDI + BorgWarner 6th Gen XWD",
    engine: "2.0L Turbocharged 4-Cylinder Petrol",
    powerHp: 254,
    torqueNm: 390,
    fuelType: "Petrol",
    fuelCapacity: "70 Liters (92+ RON compatible)",
    groundClearanceMm: 220,
    seatingCapacity: 5,
    pipelineStage: "Approved for validation",
    evidenceClassification: "REPORTED",
    sandAndHeatSuitability: {
      score: 9.4,
      airFiltration: "Dual-cyclone high-capacity desert sand pre-filter",
      coolingRating: "High-ambient tropicalized radiator tested to 52°C",
      desertTerrainCapability: "Approach angle 28°, Departure angle 30°, Wading depth 700mm"
    },
    indicativeFobUsd: {
      min: 19800,
      max: 23500
    },
    dutyRatePct: 0.20,
    vatRatePct: 0.16,
    estimatedFreightUsd: 2400,
    localPortAndDocUsd: 950,
    availabilityStatus: "Supplier RFP Shortlist",
    leadTimeWeeks: "6-8 weeks",
    warrantyYears: 5,
    warrantyKm: 150000,
    multilingualInfotainment: ["Arabic", "French", "English"],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 82,
    whatIsKnown: {
      en: [
        "Supplier proposal received via Brother Ling channel (ref: SUP-001)",
        "Desert testing completed in Turpan high-heat trials",
        "Factory-installed Arabic & French interface verified"
      ],
      fr: [
        "Proposition fournisseur reçue via le canal Brother Ling (réf: SUP-001)",
        "Essais désertiques validés en conditions de forte chaleur à Tourfan",
        "Interface d'origine en arabe et français vérifiée"
      ],
      ar: [
        "تم استلام عرض المورد عبر قناة الأخ لينغ (مرجع: SUP-001)",
        "تمت تجربة المركبة بنجاح في الظروف الصحراوية الحارة بتوربان",
        "واجهة النظام تدعم اللغتين العربية والفرنسية أصلياً"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Local customs tariff classification and HS code confirmation (CLM-003)",
        "Spare parts warehouse stocking agreement in Nouakchott",
        "Formal warranty claims administrator agreement"
      ],
      fr: [
        "Confirmation du code SH et de la tarification douanière locale (CLM-003)",
        "Accord de stockage de pièces de rechange à Nouakchott",
        "Désignation formelle de l'administrateur des garanties"
      ],
      ar: [
        "تأكيد التصنيف الجمركي والرمز المنسق محلياً (CLM-003)",
        "اتفاقية تخزين قطع الغيار الأساسية في نواكشوط",
        "اعتماد الجهة الرسمية لإدارة مطالبات الضمان محلياً"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Boxy, modern off-road SUV engineered for high heat, fine desert sand, and unpaved coastal tracks. Features BorgWarner intelligent torque distribution and dual-screen cockpit.",
      fr: "Modèle de démonstration fictif : SUV tout-terrain moderne cubique conçu pour les fortes chaleurs, le sable fin et les pistes côtières. Transmission intégrale BorgWarner intelligente.",
      ar: "نموذج تجريبي توضيحي: سيارة دفع رباعي عصرية صلبة مصممة خصيصاً للحرارة الشديدة والرمال الصحراوية الناعمة، مع نظام دفع رباعي ذكي."
    },
    recommendedMauritaniaUseCase: {
      en: "Urban executive prestige in Nouakchott + weekend desert expeditions to Adrar, Chinguetti, and coastal tracks.",
      fr: "Prestige urbain à Nouakchott + expéditions vers l'Adrar, Chinguetti et pistes côtières du banc d'Arguin.",
      ar: "استخدام تنفيذي راقٍ في نواكشوط ورحلات استكشافية إلى أدرار وشنقيط والطرق الساحلية."
    }
  },
  {
    id: "candidate-model-b",
    candidateCode: "Candidate Model B",
    genericName: "Heavy-Duty Overland 4x4",
    brand: "Candidate Supplier B (GWM Tank Syndicate)",
    model: "Model B - Conqueror Ladder-Frame",
    trim: "Severe Duty Expedition",
    year: 2026,
    category: "suv_4x4",
    categoryLabel: {
      en: "Body-on-Frame Expedition 4x4",
      fr: "4x4 Châssis Échelle Expédition",
      ar: "شاسيه سلمي لرحلات الصحراء"
    },
    drivetrain: "Part-Time 4x4 with Low-Range & Dual Mechanical Lockers",
    powertrain: "2.0T Petrol with 8-Speed ZF Automatic",
    engine: "2.0L Turbo 4-Cylinder Petrol",
    powerHp: 227,
    torqueNm: 387,
    fuelType: "Petrol",
    fuelCapacity: "80 Liters (Auxiliary 45L tank option)",
    groundClearanceMm: 224,
    seatingCapacity: 5,
    pipelineStage: "Approved for validation",
    evidenceClassification: "REPORTED",
    sandAndHeatSuitability: {
      score: 9.6,
      airFiltration: "Heavy dust washable filtration with snorkel-ready intake",
      coolingRating: "Severe duty tropical cooling package with auxiliary transmission cooler",
      desertTerrainCapability: "Tank Turn feature, Crawl Control, 33° approach, 34° departure"
    },
    indicativeFobUsd: {
      min: 24500,
      max: 28900
    },
    dutyRatePct: 0.20,
    vatRatePct: 0.16,
    estimatedFreightUsd: 2500,
    localPortAndDocUsd: 950,
    availabilityStatus: "Supplier RFP Shortlist",
    leadTimeWeeks: "7-9 weeks",
    warrantyYears: 5,
    warrantyKm: 150000,
    multilingualInfotainment: ["Arabic", "French", "English"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 79,
    whatIsKnown: {
      en: [
        "Proven body-on-frame platform with heavy-duty solid rear axle",
        "Proposal includes ZF transmission diagnostic support tool",
        "Front and rear electronic differential locks tested on dunes"
      ],
      fr: [
        "Plateforme robuste à châssis échelle avec pont arrière rigide",
        "Proposition incluant l'outil de diagnostic pour boîte ZF",
        "Blocages de différentiel avant et arrière testés sur dunes"
      ],
      ar: [
        "شاسيه سلمي قوي مجرب مع محور خلفي صلب للأعمال الشاقة",
        "العرض يتضمن أداة فحص ناقل الحركة ZF",
        "أقفال تفاضلية أمامية وخلفية إلكترونية مجربة في الكثبان"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Local mechanic training on ZF 8-speed electronic valve body",
        "Verification of high-sulfur local petrol compatibility",
        "Stocking minimum order quantity for specialized suspension bushings"
      ],
      fr: [
        "Formation des mécaniciens locaux sur la boîte 8 rapports ZF",
        "Vérification de la compatibilité avec le carburant local",
        "Quantité minimale de commande pour les bagues de suspension"
      ],
      ar: [
        "تدريب الميكانيكيين المحليين على صيانة ناقل الحركة 8 سرعات",
        "التحقق من التوافق التام مع جودة الوقود المحلي",
        "تحديد الحد الأدنى لطلب قطع نظام التعليق المعزز"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Pure ladder-chassis expedition 4x4 offering genuine alternative to legacy Japanese off-roaders. Heavy-duty suspension, dual lockers, and tropical cooling package.",
      fr: "Modèle de démonstration fictif : Véritable 4x4 d'expédition à châssis échelle, alternative robuste aux 4x4 traditionnels. Suspensions renforcées et double blocage.",
      ar: "نموذج تجريبي توضيحي: مركبة استكشافية حقيقية بشاسيه سلمي قوي بديلة للسيارات اليابانية التقليدية، مع نظام تعليق فائق التحمل."
    },
    recommendedMauritaniaUseCase: {
      en: "Mining site access (Akjoujt, Tasiast), desert overland transport, and heavy institutional duty cycles.",
      fr: "Accès aux sites miniers (Akjoujt, Tasiast), traversées sahariennes et flottes institutionnelles exigeantes.",
      ar: "الوصول إلى مواقع التعدين (أكجوجت، تازيازت) والرحلات عبر الصحراء والاستخدام المؤسسي الشاق."
    }
  },
  {
    id: "candidate-model-c",
    candidateCode: "Candidate Model C",
    genericName: "Family Crossover Candidate",
    brand: "Candidate Supplier A (Chery Family Fleet)",
    model: "Model C - Grand Horizon 7-Seat",
    trim: "Executive AWD 7-Seater",
    year: 2026,
    category: "family",
    categoryLabel: {
      en: "Executive 7-Passenger Crossover",
      fr: "Crossover Familial 7 Places",
      ar: "كروس أوفر عائلي 7 مقاعد"
    },
    drivetrain: "On-Demand All-Wheel Drive",
    powertrain: "2.0T TGDI + 7-Speed Dual Clutch",
    engine: "2.0L Turbocharged 4-Cylinder",
    powerHp: 254,
    torqueNm: 390,
    fuelType: "Petrol",
    fuelCapacity: "57 Liters",
    groundClearanceMm: 200,
    seatingCapacity: 7,
    pipelineStage: "Cost review",
    evidenceClassification: "REPORTED",
    sandAndHeatSuitability: {
      score: 8.5,
      airFiltration: "N95 equivalent cabin filter + sealed engine bay dust shielding",
      coolingRating: "Dual-zone independent high-capacity AC with dedicated 3rd-row ceiling blower",
      desertTerrainCapability: "AWD with 6 terrain modes, 19° approach, 20° departure"
    },
    indicativeFobUsd: {
      min: 17500,
      max: 20900
    },
    dutyRatePct: 0.20,
    vatRatePct: 0.16,
    estimatedFreightUsd: 2300,
    localPortAndDocUsd: 950,
    availabilityStatus: "Supplier RFP Shortlist",
    leadTimeWeeks: "5-7 weeks",
    warrantyYears: 5,
    warrantyKm: 150000,
    multilingualInfotainment: ["Arabic", "French", "English"],
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 84,
    whatIsKnown: {
      en: [
        "Shared engine platform with Candidate Model A (parts pooling advantage)",
        "Standard dual rear independent AC blowers for extreme summer heat",
        "High family buyer interest recorded in initial Nouakchott interviews"
      ],
      fr: [
        "Moteur partagé avec le Modèle A (synergie de stock de pièces)",
        "Double climatisation arrière indépendante pour les fortes chaleurs",
        "Fort intérêt familial enregistré lors des entretiens à Nouakchott"
      ],
      ar: [
        "محرك مشترك مع النموذج A مما يسهل توحيد قطع الغيار",
        "مكيف خلفي مزدوج مستقل لتحمل حرارة الصيف الشديدة",
        "اهتمام عائلي كبير مسجل في مقابلات نواكشوط الأولية"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Testing suspension durability on corrugated washboard roads",
        "Confirming 3rd-row headroom with local family buyer profiles",
        "Evaluating bank hire-purchase financing integration"
      ],
      fr: [
        "Test d'endurance de la suspension sur pistes en tôle ondulée",
        "Validation de la garde au toit au 3ème rang pour les familles locales",
        "Évaluation des accords de crédit-bail avec les banques locales"
      ],
      ar: [
        "اختبار متانة نظام التعليق على المسالك الترابية الوعرة",
        "التحقق من مساحة الرأس في الصف الثالث للعائلات",
        "تقييم حلول التمويل البنكي بالتقسيط للمشترين المؤهلين"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Spacious 7-passenger crossover offering executive comfort, dual rear air-conditioning blowers, and shared powertrain architecture with Model A for efficient parts stocking.",
      fr: "Modèle de démonstration fictif : Crossover spacieux 7 places offrant un confort exécutif, une climatisation renforcée et des pièces communes avec le Modèle A.",
      ar: "نموذج تجريبي توضيحي: كروس أوفر فسيح بـ 7 مقاعد مع تكييف هواء خلفي قوي ومحرك موحد مع النموذج A لتسهيل الصيانة."
    },
    recommendedMauritaniaUseCase: {
      en: "Large family transportation, hotel airport VIP shuttles, corporate staff transit on paved highways.",
      fr: "Transport familial, navettes VIP aéroportuaires et déplacements d'entreprises sur axes goudronnés.",
      ar: "النقل العائلي المريح، نقل كبار الشخصيات من المطار، وتنقلات موظفي الشركات على الطرق المعبدة."
    }
  },
  {
    id: "candidate-model-d",
    candidateCode: "Candidate Model D",
    genericName: "Executive Sedan Candidate",
    brand: "Candidate Supplier D (Changan International)",
    model: "Model D - Sovereign Sedan",
    trim: "Executive Luxury Edition",
    year: 2026,
    category: "sedan",
    categoryLabel: {
      en: "Executive Highway Sedan",
      fr: "Berline Routière Exécutive",
      ar: "سيدان تنفيذية للطرق السريعة"
    },
    drivetrain: "Front-Wheel Drive with Electronic Stability Program",
    powertrain: "1.5T Turbo Petrol + 7-Speed Wet DCT",
    engine: "1.5L Direct Injection Turbo",
    powerHp: 188,
    torqueNm: 300,
    fuelType: "Petrol",
    fuelCapacity: "55 Liters",
    groundClearanceMm: 165,
    seatingCapacity: 5,
    pipelineStage: "Evidence review",
    evidenceClassification: "ASSUMPTION",
    sandAndHeatSuitability: {
      score: 7.8,
      airFiltration: "Triple-stage HEPA cabin air purifier",
      coolingRating: "Tropicalized condenser with high-volume electric fan",
      desertTerrainCapability: "Designed strictly for paved roads; reinforced underbody splash guard"
    },
    indicativeFobUsd: {
      min: 14200,
      max: 17500
    },
    dutyRatePct: 0.20,
    vatRatePct: 0.16,
    estimatedFreightUsd: 2100,
    localPortAndDocUsd: 900,
    availabilityStatus: "Technical Screening",
    leadTimeWeeks: "4-6 weeks",
    warrantyYears: 5,
    warrantyKm: 150000,
    multilingualInfotainment: ["Arabic", "French", "English"],
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 74,
    whatIsKnown: {
      en: [
        "Highly competitive FOB price relative to used Japanese sedans",
        "Fuel economy rated at 6.1 L/100km on paved highways",
        "Includes full ADAS driver-assist package"
      ],
      fr: [
        "Prix FOB très compétitif par rapport aux berlines d'occasion",
        "Consommation économique de 6,1 L/100km sur route",
        "Équipé du pack complet d'aides à la conduite ADAS"
      ],
      ar: [
        "سعر تصدير منافس جداً مقارنة بسيارات السيدان المستعملة",
        "استهلاك وقود اقتصادي 6.1 لتر/100 كم على الطرق المعبدة",
        "مجهزة بأنظمة مساعدة السائق المتقدمة"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Low ground clearance risk on poorly maintained urban secondary roads",
        "Driver acceptance versus legacy European/Japanese sedans",
        "Windshield availability for gravel impact replacements"
      ],
      fr: [
        "Risque lié à la faible garde au sol sur routes secondaires dégradées",
        "Acceptabilité par rapport aux berlines d'occasion allemandes",
        "Disponibilité des pare-brise face aux projections de gravillons"
      ],
      ar: [
        "مخاطر الخلوص الأرضي المنخفض في الشوارع الحضرية غير المعبدة",
        "تقبل السائقين مقارنة بسيارات السيدان الأوروبية واليابانية",
        "توفر الزجاج الأمامي لتعويض التلف الناتج عن الحصى"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Aerodynamic executive sedan for urban ministries, corporate fleets, and intercity highway commuting between Nouakchott and Nouadhibou.",
      fr: "Modèle de démonstration fictif : Berline exécutive profilée destinée aux ministères, entreprises et liaisons routières Nouakchott-Nouadhibou.",
      ar: "نموذج تجريبي توضيحي: سيدان تنفيذية أنيقة مخصصة للوزارات والشركات والرحلات السريعة بين نواكشوط ونواذيبو."
    },
    recommendedMauritaniaUseCase: {
      en: "Government department staff transit, diplomatic car pools, banking executive urban daily usage.",
      fr: "Déplacements administratifs ministériels, flottes diplomatiques et banques à Nouakchott.",
      ar: "تنقلات موظفي الوزارات، الأساطيل الدبلوماسية، والاستخدام التنفيذي في البنوك بنواكشوط."
    }
  },
  {
    id: "candidate-model-e",
    candidateCode: "Candidate Model E",
    genericName: "Fleet Pickup Candidate",
    brand: "Candidate Supplier B (GWM Commercial Division)",
    model: "Model E - Workhorse 4x4 Double Cab",
    trim: "Heavy-Duty Utility 4WD",
    year: 2026,
    category: "pickup_commercial",
    categoryLabel: {
      en: "Commercial Fleet Pickup",
      fr: "Pick-up Utilitaire Professionnel",
      ar: "بيك آب تجاري للأساطيل"
    },
    drivetrain: "Selectable 4WD with Heavy-Duty Leaf Spring Rear Suspension",
    powertrain: "2.0T High-Torque Turbo Diesel + 6-Speed Manual",
    engine: "2.0L Common Rail Diesel",
    powerHp: 163,
    torqueNm: 400,
    fuelType: "Diesel",
    fuelCapacity: "78 Liters",
    groundClearanceMm: 232,
    seatingCapacity: 5,
    pipelineStage: "Approved for validation",
    evidenceClassification: "REPORTED",
    sandAndHeatSuitability: {
      score: 9.5,
      airFiltration: "Heavy-duty dual cyclone pre-cleaner with water separator",
      coolingRating: "Tropical high-capacity radiator with viscous clutch fan",
      desertTerrainCapability: "Payload 1050 kg, 3-ton towing capacity, reinforced steel bed liner"
    },
    indicativeFobUsd: {
      min: 16800,
      max: 19800
    },
    dutyRatePct: 0.15, // Commercial vehicle reduced tariff rate
    vatRatePct: 0.16,
    estimatedFreightUsd: 2600,
    localPortAndDocUsd: 950,
    availabilityStatus: "Supplier RFP Shortlist",
    leadTimeWeeks: "6-8 weeks",
    warrantyYears: 3,
    warrantyKm: 100000,
    multilingualInfotainment: ["French", "English", "Arabic"],
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 88,
    whatIsKnown: {
      en: [
        "Proven heavy-duty diesel engine compatible with 50ppm/500ppm sulfur fuels",
        "Beneficiary of Mauritania commercial vehicle tariff incentive (15% vs 20%)",
        "Robust mechanical transfer case and manual gearbox ease local mechanic repair"
      ],
      fr: [
        "Moteur diesel éprouvé compatible avec le carburant commercial local",
        "Bénéficie du tarif douanier réduit pour véhicules utilitaires (15% au lieu de 20%)",
        "Boîte manuelle et transfert mécanique facilement réparables par les ateliers locaux"
      ],
      ar: [
        "محرك ديزل قوي متوافق مع الديزل المتوفر محلياً",
        "يستفيد من التعرفة الجمركية المخفضة للمركبات التجارية (15% بدلاً من 20%)",
        "ناقل حركة يدوي ودفع رباعي ميكانيكي يسهل صيانتهما محلياً"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Mining sector roll-over protection structure (ROPS) certification",
        "Fleet telemetry integration with local Mauritanian cellular carriers (Mauritel/Chinguitel)",
        "Volume discount brackets for orders exceeding 15 units"
      ],
      fr: [
        "Certification des arceaux de sécurité (ROPS) pour les sites miniers",
        "Intégration télématique avec les opérateurs télécom locaux (Mauritel/Chinguitel)",
        "Grille de remises quantitatives pour commandes de plus de 15 unités"
      ],
      ar: [
        "شهادة قفص الحماية من الانقلاب (ROPS) الخاصة بمواقع التعدين",
        "ربط أجهزة التتبع مع شبكات الاتصال المحلية الموريتانية",
        "جدول خصومات الكميات للطلبات التي تتجاوز 15 وحدة"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Rugged 1-ton double-cab diesel pickup engineered for contractors, telecom tower maintenance, logistics companies, and agricultural operators along the Senegal River valley.",
      fr: "Modèle de démonstration fictif : Pick-up diesel 1 tonne double cabine conçu pour les chantiers, la maintenance télécom et les opérations agricoles du fleuve Sénégal.",
      ar: "نموذج تجريبي توضيحي: بيك آب ديزل حمولة 1 طن كابينة مزدوجة مخصص للمقاولات وصيانة أبراج الاتصالات والزراعة في وادي نهر السنغال."
    },
    recommendedMauritaniaUseCase: {
      en: "Telecom tower maintenance across Trarza/Brakna, construction site supervision, mining contractor transport.",
      fr: "Maintenance des relais télécoms, suivi de chantiers de BTP et transport pour sous-traitants miniers.",
      ar: "صيانة أبراج الاتصالات في الترارزة والبراكنة، الإشراف على مشاريع البناء، ومقاولي التعدين."
    }
  },
  {
    id: "candidate-model-f",
    candidateCode: "Candidate Model F",
    genericName: "Light Commercial Van Candidate",
    brand: "Candidate Supplier D (Changan Transfleet)",
    model: "Model F - Cargo Master Van",
    trim: "High-Roof Commercial 15-Seat / Cargo",
    year: 2026,
    category: "van_commercial",
    categoryLabel: {
      en: "Light Commercial Cargo & Transit Van",
      fr: "Fourgon Utilitaire & Transport Urbain",
      ar: "فان تجاري للبضائع ونقل الركاب"
    },
    drivetrain: "Rear-Wheel Drive with Heavy-Duty Axle",
    powertrain: "2.5T Turbo Diesel + 6-Speed Manual",
    engine: "2.5L Commercial Turbo Diesel",
    powerHp: 150,
    torqueNm: 360,
    fuelType: "Diesel",
    fuelCapacity: "75 Liters",
    groundClearanceMm: 195,
    seatingCapacity: 15,
    pipelineStage: "Cost review",
    evidenceClassification: "PROPOSAL",
    sandAndHeatSuitability: {
      score: 8.7,
      airFiltration: "Standard commercial paper filter with cyclonic trap",
      coolingRating: "Front heavy-duty radiator with dual auxiliary fans",
      desertTerrainCapability: "Designed for paved and hard-packed unpaved roads"
    },
    indicativeFobUsd: {
      min: 18200,
      max: 21500
    },
    dutyRatePct: 0.15,
    vatRatePct: 0.16,
    estimatedFreightUsd: 3100,
    localPortAndDocUsd: 1100,
    availabilityStatus: "Supplier RFP Shortlist",
    leadTimeWeeks: "6-8 weeks",
    warrantyYears: 3,
    warrantyKm: 120000,
    multilingualInfotainment: ["French", "English", "Arabic"],
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 78,
    whatIsKnown: {
      en: [
        "15-passenger or 8.5 m³ cargo configurations available from same chassis",
        "High roof allows stand-up passenger entry and voluminous freight loading",
        "Simple mechanical diesel injection minimizes electronic failure points"
      ],
      fr: [
        "Configuration 15 places ou fourgon 8,5 m³ sur le même châssis",
        "Toit surélevé facilitant l'accès des passagers et le chargement volumineux",
        "Injection diesel simple réduisant les pannes électroniques"
      ],
      ar: [
        "متاح بتجهيز 15 راكباً أو شاحنة بضائع سعة 8.5 متر مكعب",
        "سقف مرتفع يتيح وقوف الركاب وسهولة تحميل البضائع الضخمة",
        "حقن ديزل ميكانيكي يقلل من الأعطال الإلكترونية في الأجواء الحارة"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Compliance with Mauritanian Ministry of Transport passenger licensing standards",
        "Air conditioning ducting balance between front cab and rear passenger rows",
        "Local brake pad replacement supply chain"
      ],
      fr: [
        "Conformité aux normes de transport de passagers du Ministère mauritanien",
        "Équilibrage de la climatisation entre la cabine avant et l'arrière",
        "Approvisionnement local en plaquettes de freins renforcées"
      ],
      ar: [
        "التوافق مع متطلبات وزارة النقل الموريتانية لنقل الركاب",
        "توزيع تبريد المكيف بين المقصورة الأمامية والمقاعد الخلفية",
        "سلسلة توريد أقمشة الفرامل المعززة محلياً"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Multi-purpose light commercial platform configured either as a 15-passenger intercity transit shuttle or 8.5m³ refrigerated delivery van for urban supermarkets and pharmacies in Nouakchott.",
      fr: "Modèle de démonstration fictif : Utilitaire polyvalent proposé en navette 15 places ou fourgonnette de livraison urbaine pour la distribution à Nouakchott.",
      ar: "نموذج تجريبي توضيحي: مركبة تجارية خفيفة متعددة الأغراض مهيأة لنقل 15 راكباً بين المدن أو شاحنة توزيع بضائع للمؤسسات في نواكشوط."
    },
    recommendedMauritaniaUseCase: {
      en: "Intercity passenger transport between Nouakchott-Rosso-Boghé, pharmaceutical distribution, food logistics.",
      fr: "Transport interurbain Nouakchott-Rosso-Boghé, distribution pharmaceutique et logistique alimentaire.",
      ar: "النقل بين المدن (نواكشوط - روصو - بوغي)، توزيع الأدوية، واللوجستيات الغذائية."
    }
  },
  {
    id: "candidate-model-g",
    candidateCode: "Candidate Model G",
    genericName: "Urban Hybrid Candidate",
    brand: "Candidate Supplier C (BYD Commercial / DM-i)",
    model: "Model G - EcoCross DM-i Hybrid",
    trim: "Dual Motor Intelligent (DM-i) Super Hybrid",
    year: 2026,
    category: "hybrid",
    categoryLabel: {
      en: "Super Hybrid Efficiency Crossover",
      fr: "Crossover Super Hybride Rechargeable",
      ar: "كروس أوفر هجين فائق الكفاءة"
    },
    drivetrain: "Front-Wheel Electric Drive with High-Efficiency Petrol Generator",
    powertrain: "1.5L Dedicated Hybrid Engine + EHS Electric Transmission",
    engine: "1.5L Atkinson Cycle High-Efficiency Petrol (43.04% thermal efficiency)",
    powerHp: 218,
    torqueNm: 325,
    fuelType: "Hybrid (HEV/PHEV)",
    fuelCapacity: "60 Liters + 18.3 kWh Blade Battery (1100 km combined range)",
    groundClearanceMm: 205,
    seatingCapacity: 5,
    pipelineStage: "Service review",
    evidenceClassification: "PROPOSAL",
    sandAndHeatSuitability: {
      score: 8.9,
      airFiltration: "Dual HEPA filtration with active electrostatic dust precipitation",
      coolingRating: "Pulse self-heating & liquid cooling battery thermal management",
      desertTerrainCapability: "Urban and intercity gravel road capability; instant electric torque"
    },
    indicativeFobUsd: {
      min: 22000,
      max: 26500
    },
    dutyRatePct: 0.15, // Potential clean energy duty concession under evaluation
    vatRatePct: 0.16,
    estimatedFreightUsd: 2500,
    localPortAndDocUsd: 950,
    availabilityStatus: "Technical Screening",
    leadTimeWeeks: "7-9 weeks",
    warrantyYears: 6,
    warrantyKm: 150000,
    multilingualInfotainment: ["Arabic", "French", "English"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 68,
    whatIsKnown: {
      en: [
        "Extraordinary fuel economy (4.4 L/100km) dramatically cuts fuel bills for high-mileage urban driving",
        "Blade battery passes nail penetration safety tests without combustion",
        "Vehicle-to-Load (V2L) 3.3kW outlet can power home appliances during local blackouts"
      ],
      fr: [
        "Consommation exceptionnelle (4,4 L/100km) réduisant drastiquement le budget carburant",
        "Batterie Blade ultra-sécurisée contre les perforations et la surchauffe",
        "Prise V2L 3,3 kW permettant d'alimenter un foyer en cas de délestage électrique"
      ],
      ar: [
        "استهلاك وقود استثنائي (4.4 لتر/100 كم) يقلل تكاليف الوقود في القيادة الحضرية المكثفة",
        "بطارية Blade فائقة الأمان اجتازت اختبارات الاختراق دون اشتعال",
        "مخرج طاقة V2L بقدرة 3.3 كيلوواط يتيح تشغيل الأجهزة المنزلية أثناء انقطاع الكهرباء"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Requires certified high-voltage safety training for local mechanics (gating requirement)",
        "Insulated diagnostic equipment required before demonstration unit deployment",
        "Local customs confirmation of hybrid tariff treatment"
      ],
      fr: [
        "Nécessite une formation certifiée haute tension pour les mécaniciens locaux",
        "Équipements de diagnostic isolés requis avant tout déploiement",
        "Confirmation douanière du traitement fiscal spécifique aux véhicules hybrides"
      ],
      ar: [
        "يتطلب تدريباً معتمداً على السلامة الكهربائية للجهد العالي للميكانيكيين المحليين",
        "توفير أدوات فحص معزولة كهربائياً قبل وصول الوحدة التجريبية",
        "تأكيد المعاملة الجمركية الخاصة بالسيارات الهجينة من إدارة الجمارك"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Advanced plug-in hybrid crossover delivering 1,100 km of combined cruising range. Uses electric power in urban stop-and-go traffic and high-efficiency petrol on highways.",
      fr: "Modèle de démonstration fictif : Crossover hybride rechargeable de pointe offrant 1 100 km d'autonomie combinée. Électrique en ville et thermique ultra-efficace sur route.",
      ar: "نموذج تجريبي توضيحي: كروس أوفر هجين متطور بمدى إجمالي يصل إلى 1,100 كم، يوفر قيادة كهربائية في المدينة واستهلاك بنزين فائق الكفاءة على الطرق السريعة."
    },
    recommendedMauritaniaUseCase: {
      en: "Professional daily commuters in Nouakchott, urban taxi fleets, corporate ESG mobility programs.",
      fr: "Trajets quotidiens professionnels à Nouakchott, flottes de taxis urbains et programmes RSE d'entreprises.",
      ar: "التنقلات المهنية اليومية في نواكشوط، أساطيل التاكسي الحضري، ومشاريع التنقل المستدام للشركات."
    }
  },
  {
    id: "candidate-model-h",
    candidateCode: "Candidate Model H",
    genericName: "Municipal EV Pilot Candidate",
    brand: "Candidate Supplier C (BYD Commercial)",
    model: "Model H - City Express EV",
    trim: "Urban Delivery / Institutional Pilot",
    year: 2026,
    category: "ev",
    categoryLabel: {
      en: "Battery Electric Municipal Pilot",
      fr: "Véhicule Électrique Pilote Municipal",
      ar: "مركبة كهربائية تجريبية للمدن"
    },
    drivetrain: "Single Permanent Magnet Synchronous Motor (Front-Wheel Drive)",
    powertrain: "100 kW Electric Drive + 48 kWh LFP Blade Battery",
    engine: "Permanent Magnet Synchronous Motor (134 hp)",
    powerHp: 134,
    torqueNm: 220,
    fuelType: "Battery Electric (BEV)",
    fuelCapacity: "48 kWh LFP Battery (305 km WLTP Urban Range)",
    groundClearanceMm: 170,
    seatingCapacity: 5,
    pipelineStage: "Service review",
    evidenceClassification: "PROPOSAL",
    sandAndHeatSuitability: {
      score: 7.2,
      airFiltration: "Sealed electric drive compartment with dust ingress IP67 rating",
      coolingRating: "Direct refrigerant cooling system for battery pack in 50°C ambient",
      desertTerrainCapability: "Restricted to paved municipal roads and fixed depot routes"
    },
    indicativeFobUsd: {
      min: 15500,
      max: 18500
    },
    dutyRatePct: 0.10, // Proposed clean technology duty relief
    vatRatePct: 0.16,
    estimatedFreightUsd: 2200,
    localPortAndDocUsd: 900,
    availabilityStatus: "Awaiting Supplier Quotation",
    leadTimeWeeks: "8-10 weeks",
    warrantyYears: 8,
    warrantyKm: 160000,
    multilingualInfotainment: ["Arabic", "French", "English"],
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 54,
    whatIsKnown: {
      en: [
        "Lowest per-kilometer operating cost of any candidate model (~$0.02/km on domestic electricity)",
        "Zero tailpipe emissions ideal for port authority or municipal urban campus",
        "Supports standard CCS2 DC fast-charging up to 60 kW"
      ],
      fr: [
        "Coût d'exploitation au kilomètre le plus bas de la gamme (~0,02 $/km sur tarif électrique local)",
        "Zéro émission à l'échappement, idéal pour les enceintes portuaires ou campus municipaux",
        "Compatible avec la recharge rapide standard CCS2 DC jusqu'à 60 kW"
      ],
      ar: [
        "أقل تكلفة تشغيل لكل كيلومتر بين جميع النماذج المرشحة (~0.02 دولار/كم بالكهرباء المنزلية)",
        "صفر انبعاثات مما يجعله مثالياً للموانئ أو المجمعات الحضرية المغلقة",
        "يدعم الشحن السريع بالتيار المستمر CCS2 حتى 60 كيلوواط"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Grid reliability and dedicated charging depot installation required",
        "Mechanic high-voltage rescue certification not yet established locally",
        "Severe battery degradation risk under unshaded 45°C+ parking conditions"
      ],
      fr: [
        "Fiabilité du réseau électrique et installation d'un dépôt de recharge dédié requises",
        "Certification des secours et mécaniciens haute tension non encore disponible",
        "Risque de dégradation de la batterie sous stationnement prolongé en plein soleil à +45°C"
      ],
      ar: [
        "ضرورة توفير استقرار الشبكة الكهربائية وإنشاء محطة شحن مخصصة في نقطة الانطلاق",
        "عدم وجود كادر محلي مدرب على إجراءات السلامة من حوادث الجهد العالي حتى الآن",
        "مخاطر تأثر عمر البطارية بسبب الوقوف الطويل تحت أشعة الشمس المباشرة وحرارة تفوق 45°"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Pure electric compact vehicle proposed strictly as an institutional or municipal pilot within Nouakchott, where fixed depot charging and predictable daily routes can be governed safely.",
      fr: "Modèle de démonstration fictif : Véhicule compact 100% électrique proposé pour un projet pilote municipal à Nouakchott avec recharge sécurisée en dépôt.",
      ar: "نموذج تجريبي توضيحي: مركبة كهربائية مدمجة مقترحة حصرياً كمشروع تجريبي لمؤسسة أو بلدية في نواكشوط مع شحن محدد في نقطة الانطلاق ومسارات محكومة."
    },
    recommendedMauritaniaUseCase: {
      en: "Controlled municipal airport shuttles, Port of Nouakchott internal service runs, postal courier pilot.",
      fr: "Navettes internes de l'Aéroport de Nouakchott, service interne du Port Autonome, courrier postal.",
      ar: "حافلات النقل الداخلي بمطار نواكشوط، الخدمات الداخلية لميناء نواكشوط، وتوزيع البريد."
    }
  },
  {
    id: "candidate-model-i",
    candidateCode: "Candidate Model I",
    genericName: "Certified Pre-Owned Desert SUV",
    brand: "Candidate Supplier B (Certified Pre-Owned Channel)",
    model: "Model I - Refurbished Expedition SUV",
    trim: "Certified Inspected Pre-Owned (35,000 km)",
    year: 2024,
    category: "certified_used",
    categoryLabel: {
      en: "Certified Pre-Owned 4x4",
      fr: "4x4 d'Occasion Certifié & Reconditionné",
      ar: "دفع رباعي مستعمل معتمد ومفحوص"
    },
    drivetrain: "Part-Time 4x4 with Mechanical Low-Range",
    powertrain: "2.0T Petrol with 8-Speed Automatic",
    engine: "2.0L Turbo 4-Cylinder Petrol",
    powerHp: 227,
    torqueNm: 387,
    fuelType: "Petrol",
    fuelCapacity: "80 Liters",
    groundClearanceMm: 224,
    seatingCapacity: 5,
    pipelineStage: "Evidence review",
    evidenceClassification: "VERIFIED",
    sandAndHeatSuitability: {
      score: 9.3,
      airFiltration: "Brand new replacement heavy-dust filter and intake inspection",
      coolingRating: "Complete coolant flush and pressure-tested radiator core",
      desertTerrainCapability: "Dual differential locks, verified 120-point chassis integrity inspection"
    },
    indicativeFobUsd: {
      min: 16500,
      max: 18900
    },
    dutyRatePct: 0.20,
    vatRatePct: 0.16,
    estimatedFreightUsd: 2500,
    localPortAndDocUsd: 1100, // Slightly higher customs appraisal buffer for used imports
    availabilityStatus: "Supplier RFP Shortlist",
    leadTimeWeeks: "5-7 weeks",
    warrantyYears: 2,
    warrantyKm: 60000,
    multilingualInfotainment: ["Arabic", "French", "English"],
    image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 85,
    whatIsKnown: {
      en: [
        "120-point factory certification report with digital OBD scan logs provided",
        "Meets Mauritania used-vehicle age limits (< 8 years of age)",
        "Includes 2-year / 60,000 km powertrain warranty backed by supplier"
      ],
      fr: [
        "Rapport de certification 120 points avec historiques de diagnostics OBD fournis",
        "Conforme aux limites d'âge pour l'importation de véhicules d'occasion (< 8 ans)",
        "Garantie groupe motopropulseur de 2 ans / 60 000 km adossée au fournisseur"
      ],
      ar: [
        "تقرير فحص فني معتمد من 120 نقطة مع سجلات الفحص الإلكتروني OBD",
        "متوافق مع الشروط الموريتانية لاستيراد السيارات المستعملة (أقل من 8 سنوات)",
        "ضمان لمدة عامين / 60,000 كم على المحرك وناقل الحركة من المورد"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Verification of Mauritanian customs Argus minimum valuation practices (ref CLM-004)",
        "Pre-shipment SGS / Bureau Veritas inspection certificate requirements",
        "Specific customs broker confirmation of used car valuation matrix"
      ],
      fr: [
        "Vérification des pratiques d'évaluation douanière à l'Argus (réf CLM-004)",
        "Exigences de certificat d'inspection avant embarquement (SGS / Bureau Veritas)",
        "Validation par le transitaire du barème officiel d'évaluation"
      ],
      ar: [
        "التحقق من معايير التقييم الجمركي الموريتاني للسيارات المستعملة (مرجع CLM-004)",
        "متطلبات شهادة الفحص المسبق قبل الشحن (SGS أو Bureau Veritas)",
        "تأكيد المخلص الجمركي لجدول التقييم الفعلي للسيارات المستعملة"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Professionally certified pre-owned 2024 model with low mileage (35,000 km), full service history, and replacement wear items. Offers genuine rugged capability at accessible entry cost.",
      fr: "Modèle de démonstration fictif : Véhicule d'occasion certifié 2024 avec faible kilométrage (35 000 km), historique d'entretien complet et pièces d'usure neuves. Capacité tout-terrain à prix accessible.",
      ar: "نموذج تجريبي توضيحي: سيارة مستعملة معتمدة موديل 2024 بعداد منخفض (35,000 كم)، مع سجل صيانة كامل وتجديد القطع الاستهلاكية، بسعر مناسب."
    },
    recommendedMauritaniaUseCase: {
      en: "Budget-conscious entrepreneurs, private mining contractors, regional NGO project field officers.",
      fr: "Entrepreneurs au budget maîtrisé, sous-traitants miniers privés, coordinateurs régionaux d'ONG.",
      ar: "رواد الأعمال بميزانيات محددة، مقاولو التعدين، ومسؤولو المشاريع الإقليمية للمنظمات غير الحكومية."
    }
  },
  {
    id: "candidate-model-j",
    candidateCode: "Candidate Model J",
    genericName: "Compact Utility Crossover",
    brand: "Candidate Supplier A (Chery Compact)",
    model: "Model J - TrailCross Compact",
    trim: "All-Road 1.5T AWD",
    year: 2026,
    category: "suv_4x4",
    categoryLabel: {
      en: "Compact Utility Crossover",
      fr: "Crossover Compact Tout-Chemin",
      ar: "كروس أوفر مدمج متعدد الاستخدامات"
    },
    drivetrain: "Intelligent All-Wheel Drive with Snow/Sand Terrain Modes",
    powertrain: "1.5T Turbo Petrol + CVT with 9-Speed Simulated Steps",
    engine: "1.5L Turbocharged 4-Cylinder Petrol",
    powerHp: 156,
    torqueNm: 230,
    fuelType: "Petrol",
    fuelCapacity: "51 Liters",
    groundClearanceMm: 196,
    seatingCapacity: 5,
    pipelineStage: "Approved for validation",
    evidenceClassification: "REPORTED",
    sandAndHeatSuitability: {
      score: 8.8,
      airFiltration: "Standard dual-stage cabin and intake dust protection",
      coolingRating: "Reinforced tropical AC compressor with rapid cabin pull-down",
      desertTerrainCapability: "Sand mode electronic throttle mapping, 21° approach angle"
    },
    indicativeFobUsd: {
      min: 13500,
      max: 16200
    },
    dutyRatePct: 0.20,
    vatRatePct: 0.16,
    estimatedFreightUsd: 2100,
    localPortAndDocUsd: 900,
    availabilityStatus: "Supplier RFP Shortlist",
    leadTimeWeeks: "5-7 weeks",
    warrantyYears: 5,
    warrantyKm: 150000,
    multilingualInfotainment: ["Arabic", "French", "English"],
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80",
    serviceReadinessScore: 81,
    whatIsKnown: {
      en: [
        "Highly accessible entry price point for young professionals and small business owners",
        "Compact footprint easy to navigate and park in congested downtown Nouakchott",
        "Proven 1.5T engine with widespread global production exceeding 2 million units"
      ],
      fr: [
        "Prix d'entrée très accessible pour les jeunes cadres et commerçants",
        "Gabarit compact facilitant la conduite et le stationnement au centre de Nouakchott",
        "Moteur 1.5T éprouvé produit à plus de 2 millions d'exemplaires dans le monde"
      ],
      ar: [
        "سعر دخول منافس ومتاح للمهنيين الشباب ورواد الأعمال المحليين",
        "أبعاد مدمجة تسهل القيادة والوقوف في شوارع وسط نواكشوط المزدحمة",
        "محرك 1.5T مجرب تم إنتاج أكثر من مليوني وحدة منه عالمياً"
      ]
    },
    whatIsStillOpen: {
      en: [
        "Long-term CVT transmission heat endurance in prolonged slow sand crawling",
        "Door seal longevity in high harmattan seasonal dust storms",
        "Confirmation of front suspension ball joint availability"
      ],
      fr: [
        "Endurance thermique de la boîte CVT lors de franchissements lents dans le sable",
        "Résistance des joints de portières face aux tempêtes de sable de l'Harmattan",
        "Disponibilité locale des rotules de suspension avant"
      ],
      ar: [
        "تحمل ناقل الحركة CVT للحرارة عند السير البطيء والمستمر في الرمال",
        "متانة عوازل الأبواب لمقاومة عواصف الهرمطان الرملية الموسمية",
        "تأكيد توفر مفاصل وأذرع التعليق الأمامي محلياً"
      ]
    },
    description: {
      en: "Fictional demonstration candidate: Accessible compact crossover combining generous 196mm ground clearance with fuel-efficient urban commuting. Designed for young professionals, NGO field staff, and urban entrepreneurs.",
      fr: "Modèle de démonstration fictif : Crossover compact économique alliant une garde au sol généreuse de 196 mm et une faible consommation urbaine. Idéal pour jeunes professionnels et entrepreneurs.",
      ar: "نموذج تجريبي توضيحي: كروس أوفر مدمج واقتصادي يجمع بين خلوص أرضي 196 مم واستهلاك وقود منخفض، مناسب للشباب ورواد الأعمال."
    },
    recommendedMauritaniaUseCase: {
      en: "Young professional daily commuter in Nouakchott, NGO medical field supervisors, small business owners.",
      fr: "Trajets quotidiens de jeunes cadres à Nouakchott, superviseurs de santé d'ONG, commerçants.",
      ar: "التنقل اليومي للمهنيين في نواكشوط، مشرفو الفرق الميدانية للمنظمات، ورواد الأعمال."
    }
  }
];
