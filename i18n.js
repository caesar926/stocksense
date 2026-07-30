// i18n.js
// Central translation system. Every static UI string lives here under a key.
// Elements in index.html are tagged data-i18n="key" (for text content)
// or data-i18n-placeholder="key" (for input placeholders).
// Dynamic strings generated in stock.js use the t('key') helper below.
//
// NOTE: Igbo/Hausa/Yoruba translations here are AI-generated. They should be
// reviewed by a native speaker before relying on them in front of judges or
// real shop owners — business/technical terms are the riskiest to get wrong.

const LANG_KEY = 'stocksense_lang_v1';

const TRANSLATIONS = {
  en: {
    tagline: "Know What You Have. Know What You Need.",
    navStock: "Stock", navRestock: "Restock", navProfit: "Profit", navScore: "ShopScore", navDaily: "Daily",

    statTotalProducts: "Total Products", statInInventory: "in inventory",
    statStockValue: "Stock Value", statBuyingCost: "buying cost",
    statLowStock: "Low Stock", statNeedRestocking: "need restocking",
    statExpiringSoon: "Expiring Soon", statWithin30: "within 30 days",
    searchPlaceholder: "Search products...",
    btnAdd: "+ Add",

    cardTopSellers: "Your Top Sellers",
    aiRestockTitle: "AI Restock Advisor", aiPoweredBy: "Powered by Gemini AI",
    aiRestockDesc: "Get personalised restocking recommendations based on your actual sales data and stock levels.",
    btnGenerateAdvice: "Generate Smart Advice",

    cardWeeklySales: "Weekly Sales",
    chartTip: "Saturday is your best day. Consider stocking up on Fridays.",
    cardProfitableProducts: "Most Profitable Products",
    cardCostRevenue: "Cost vs Revenue",
    costTotalRevenue: "Total Revenue", costOfGoods: "Cost of Goods", netProfit: "Net Profit",

    scoreTitle: "Your ShopScore", scoreOutOf: "out of 100",
    cardScoreBreakdown: "Score Breakdown",
    aiAssessmentTitle: "AI Business Assessment",
    aiAssessmentDesc: "Get a personalised assessment of your business health and steps to improve your ShopScore.",
    btnGetAssessment: "Get My Assessment",

    statTodayRevenue: "Today's Revenue", statTodayProfit: "Today's Profit",
    statUnitsSold: "Units Sold", statLowStockAlerts: "Low Stock Alerts",
    cardBestSeller: "Today's Best Seller", noSalesToday: "No sales recorded yet today.",
    aiDailyTitle: "Daily Business Briefing",
    aiDailyDesc: "Get an AI-generated summary of today's performance, trends vs yesterday, and a recommendation for tomorrow.",
    btnGenerateDaily: "Generate Daily Summary",

    cardTransactionHistory: "Transaction History",
    transactionHistoryDesc: "See every sale you've recorded, grouped by day with daily totals.",
    btnViewHistory: "View Transaction History",
    noTransactions: "No transactions recorded yet. Sales you record will show up here, grouped by day.",

    modalAddTitle: "Add / Restock Product",
    modalAddSub: "If a product with the same name and brand already exists, this adds to its stock instead of creating a duplicate.",
    labelProductName: "Product Name *", labelBrand: "Brand (optional)",
    labelQuantity: "Quantity *", labelMinQty: "Min Qty Alert",
    labelBuyPrice: "Buying Price (₦) *", labelSellPrice: "Selling Price (₦) *",
    labelCategory: "Category", labelExpiry: "Expiry Date (optional)",
    btnSaveProduct: "Save Product", btnCancel: "Cancel",
    catFood: "Food", catDrinks: "Drinks", catHousehold: "Household", catPersonalCare: "Personal Care", catOther: "Other",

    modalSellTitle: "Record Sale", labelQtySold: "Quantity Sold", btnConfirmSale: "Confirm Sale",

    modalHistoryTitle: "Transaction History",
    modalHistorySub: "Every sale, grouped by day. Tap a day to see individual transactions.",
    btnClose: "Close",

    loginTab: "Log In", signupTab: "Create Account",
    labelEmail: "Email", labelPassword: "Password",
    labelYourName: "Your Name", labelShopName: "Shop Name",
    btnLogin: "Log In", btnCreateAccount: "Create Account",

    unitsLeft: "units left", recordSale: "Record Sale",
    noProductsMatch: "No products match",

    itemsLow: "items low", allGood: "All good",
    productsNeedRestocking: "products need restocking",
    productsExpiringSoon: "products expiring soon",
    leftMin: "left (min", badgeLow: "Low Stock", badgeExpiringSoon: "Expiring Soon", badgeExpired: "Expired", expShort: "Exp:",
    unitsSoldMargin: "units sold", marginWord: "margin",

    statAllTime: "all time", statAfterCost: "after cost", statOverall: "overall", statEstimated: "estimated",
    profitTotalRevenue: "Total Revenue", profitTotalProfit: "Total Profit", profitMargin: "Profit Margin", profitThisWeek: "This Week",

    sigStockConsistency: "Stock Consistency", sigSalesDiscipline: "Sales Discipline",
    sigProfitTrajectory: "Profit Trajectory", sigRestockEfficiency: "Restock Efficiency", sigLossManagement: "Loss Management",
    lblGoodStanding: "Good Standing", lblNeedsImprovement: "Needs Improvement", lblAtRisk: "At Risk",
    captionEligible: "You may be eligible for OPay business loans.",
    captionKeepImproving: "Keep improving to unlock credit eligibility.",
    captionFocusConsistency: "Focus on consistency to build your score.",
    loanEligibleTitle: "Loan Eligible",
    loanEligibleText: "Your ShopScore qualifies you to apply for an OPay business loan. Share your score with any lender as proof of your business health.",
    btnShareScore: "Share My ShopScore",
    loanBuildingTitle: "Building Eligibility",
    loanBuildingText1: "You need a score of 70+ for loan eligibility. You are",
    loanBuildingText2: "points away. Consistent record-keeping will get you there.",
    toastScoreShared: "ShopScore shared! Present this to your lender.",

    trendVsYesterday: "vs yesterday", trendNoData: "No data for yesterday yet", trendSame: "Same as yesterday",

    toastFillFields: "Fill all required fields", toastProductAdded: "Product added successfully",
    toastInvalidQty: "Invalid quantity", toastSaleRecorded: "Sale recorded —", toastEarned: "earned",
    toastRestocked: "Restocked", toastNowUnits: "— now", toastUnits: "units"
  },

  ig: {
    tagline: "Mara Ihe I Nwere. Mara Ihe I Chọrọ.",
    navStock: "Ngwaahịa", navRestock: "Nweghachi", navProfit: "Uru", navScore: "ShopScore", navDaily: "Kwa Ụbọchị",

    statTotalProducts: "Ngwaahịa Niile", statInInventory: "dị n'ụlọ ahịa",
    statStockValue: "Ọnụ Ahịa Ngwaahịa", statBuyingCost: "ego ịzụta",
    statLowStock: "Ngwaahịa Na-agwụ", statNeedRestocking: "chọrọ nweghachi",
    statExpiringSoon: "Na-erughị Oge Ọzọ", statWithin30: "n'ime ụbọchị 30",
    searchPlaceholder: "Chọọ ngwaahịa...",
    btnAdd: "+ Tinye",

    cardTopSellers: "Ngwaahịa Kacha Ere",
    aiRestockTitle: "Onye Ndụmọdụ AI Nweghachi", aiPoweredBy: "Site na Gemini AI",
    aiRestockDesc: "Nweta ndụmọdụ nweghachi kwesịrị ekwesị dabere na data ahịa gị n'ezie.",
    btnGenerateAdvice: "Nweta Ndụmọdụ",

    cardWeeklySales: "Ahịa Izu Uka",
    chartTip: "Satọde bụ ụbọchị kacha mma gị. Tụlee inweghachi na Fraịde.",
    cardProfitableProducts: "Ngwaahịa Na-enye Uru Kachasị",
    cardCostRevenue: "Ego Ezuru vs Ego Batara",
    costTotalRevenue: "Ego Batara Niile", costOfGoods: "Ego E ji Zụta", netProfit: "Uru Ozuzu",

    scoreTitle: "ShopScore Gị", scoreOutOf: "n'ime 100",
    cardScoreBreakdown: "Nkọwa Akara",
    aiAssessmentTitle: "Nyocha Azụmahịa AI",
    aiAssessmentDesc: "Nweta nyocha ahụike azụmahịa gị na usoro iji melite ShopScore gị.",
    btnGetAssessment: "Nweta Nyocha M",

    statTodayRevenue: "Ego Batara Taa", statTodayProfit: "Uru Taa",
    statUnitsSold: "Ọnụọgụ E Rere", statLowStockAlerts: "Ọkwa Ngwaahịa Na-agwụ",
    cardBestSeller: "Ngwaahịa Kacha Ere Taa", noSalesToday: "Ọ nweghị ahịa e dere taa.",
    aiDailyTitle: "Akụkọ Azụmahịa Kwa Ụbọchị",
    aiDailyDesc: "Nweta nchịkọta AI nke omume taa, ntụle megide ụnyaahụ, na aro maka echi.",
    btnGenerateDaily: "Nweta Nchịkọta Kwa Ụbọchị",

    cardTransactionHistory: "Akụkọ Azụmahịa",
    transactionHistoryDesc: "Hụ ahịa niile ị dere, ekekọtara site n'ụbọchị.",
    btnViewHistory: "Lee Akụkọ Azụmahịa",
    noTransactions: "Ọ dịbeghị azụmahịa e dekọrọ. Ahịa ị ga-ede ga-apụta ebe a.",

    modalAddTitle: "Tinye / Nweghachi Ngwaahịa",
    modalAddSub: "Ọ bụrụ na ngwaahịa nwere otu aha na akara ahịa adịla, nke a ga-agbakwunye n'ọnụọgụ ya kama ịmepụta ọzọ.",
    labelProductName: "Aha Ngwaahịa *", labelBrand: "Akara Ahịa (nhọrọ)",
    labelQuantity: "Ọnụọgụ *", labelMinQty: "Ọkwa Ngwaahịa Na-agwụ",
    labelBuyPrice: "Ego Ịzụta (₦) *", labelSellPrice: "Ego Ire (₦) *",
    labelCategory: "Ụdị", labelExpiry: "Ụbọchị Ọ Ga-erughị (nhọrọ)",
    btnSaveProduct: "Chekwaa Ngwaahịa", btnCancel: "Kagbuo",
    catFood: "Nri", catDrinks: "Ihe Ọñụñụ", catHousehold: "Ihe Ụlọ", catPersonalCare: "Nlekọta Onwe", catOther: "Ọzọ",

    modalSellTitle: "Dee Ahịa", labelQtySold: "Ọnụọgụ E Rere", btnConfirmSale: "Kwenye Ahịa",

    modalHistoryTitle: "Akụkọ Azụmahịa",
    modalHistorySub: "Ahịa niile, ekekọtara site n'ụbọchị. Pịa ụbọchị ka ị hụ azụmahịa ọ bụla.",
    btnClose: "Mechie",

    loginTab: "Banye", signupTab: "Mepụta Akaụntụ",
    labelEmail: "Email", labelPassword: "Okwuntughe",
    labelYourName: "Aha Gị", labelShopName: "Aha Ụlọ Ahịa",
    btnLogin: "Banye", btnCreateAccount: "Mepụta Akaụntụ",

    unitsLeft: "ọnụọgụ fọdụrụ", recordSale: "Dee Ahịa",
    noProductsMatch: "Ọ nweghị ngwaahịa dabara na",

    itemsLow: "ngwaahịa na-agwụ", allGood: "Ihe niile dị mma",
    productsNeedRestocking: "ngwaahịa chọrọ nweghachi",
    productsExpiringSoon: "ngwaahịa na-erughị oge ọzọ",
    leftMin: "fọdụrụ (opekata mpe", badgeLow: "Ngwaahịa Na-agwụ", badgeExpiringSoon: "Na-erughị Oge", badgeExpired: "Agwụla", expShort: "Ụbọchị ọ ga-erughị:",
    unitsSoldMargin: "ọnụọgụ e rere", marginWord: "uru",

    statAllTime: "oge niile", statAfterCost: "mgbe e wepụsịrị ego e ji zụta", statOverall: "n'ozuzu", statEstimated: "atụmatụ",
    profitTotalRevenue: "Ego Batara Niile", profitTotalProfit: "Uru Niile", profitMargin: "Ọkara Uru", profitThisWeek: "Izu A",

    sigStockConsistency: "Ịnọgide Na Ngwaahịa", sigSalesDiscipline: "Ntụziaka Ahịa",
    sigProfitTrajectory: "Ụzọ Uru", sigRestockEfficiency: "Ịma Nweghachi", sigLossManagement: "Njikwa Mfu",
    lblGoodStanding: "Ọnọdụ Dị Mma", lblNeedsImprovement: "Chọrọ Mmelite", lblAtRisk: "Nọ N'ihe Ize Ndụ",
    captionEligible: "Ị nwere ike ịtozu maka mgbazinye ego OPay.",
    captionKeepImproving: "Gaa n'ihu na-emeziwanye iji nweta mgbazinye ego.",
    captionFocusConsistency: "Lekwasị anya n'ịnọgide ka ị wuliwanye akara gị.",
    loanEligibleTitle: "Tozuru Maka Mgbazinye",
    loanEligibleText: "ShopScore gị na-eme ka ị tozuo ịrịọ mgbazinye ego azụmahịa OPay. Kekọrịta akara gị na onye ọ bụla na-agbazinye ego dịka ihe akaebe ahụike azụmahịa gị.",
    btnShareScore: "Kekọrịta ShopScore M",
    loanBuildingTitle: "Ịrụ Ọtọ Maka Mgbazinye",
    loanBuildingText1: "Ị chọrọ akara 70+ iji tozuo. Ị fọdụrụ",
    loanBuildingText2: "akara. Ịnọgide na-edekọ ihe ga-eme ka ị ruo ebe ahụ.",
    toastScoreShared: "Ekekọrịtala ShopScore! Gosi onye na-agbazinye ego nke a.",

    trendVsYesterday: "n'ọnụ ụnyaahụ", trendNoData: "Ọ dịbeghị data ụnyaahụ", trendSame: "Otu ihe ka ụnyaahụ",

    toastFillFields: "Dejuo ebe niile chọrọ", toastProductAdded: "Etinyela ngwaahịa nke ọma",
    toastInvalidQty: "Ọnụọgụ ezighi ezi", toastSaleRecorded: "Edekọla ahịa —", toastEarned: "e nwetara",
    toastRestocked: "Enweghachila", toastNowUnits: "— ugbu a", toastUnits: "ọnụọgụ"
  },

  ha: {
    tagline: "San Abin Da Kake Da Shi. San Abin Da Kake Bukata.",
    navStock: "Kaya", navRestock: "Sake Cika", navProfit: "Riba", navScore: "ShopScore", navDaily: "Kullum",

    statTotalProducts: "Jimlar Kaya", statInInventory: "a rumbu",
    statStockValue: "Darajar Kaya", statBuyingCost: "kudin saye",
    statLowStock: "Kaya Ya Ragu", statNeedRestocking: "suna bukatar sake cikawa",
    statExpiringSoon: "Za Su Kare", statWithin30: "cikin kwana 30",
    searchPlaceholder: "Nemo kaya...",
    btnAdd: "+ Ƙara",

    cardTopSellers: "Kayan Da Suka Fi Sayarwa",
    aiRestockTitle: "Mai Ba Da Shawara AI", aiPoweredBy: "Ta Amfani da Gemini AI",
    aiRestockDesc: "Samu shawarwarin sake cikawa dangane da bayanan sayarwa da kaya na gaske.",
    btnGenerateAdvice: "Samo Shawara",

    cardWeeklySales: "Sayarwar Mako",
    chartTip: "Asabar ita ce ranar ka mafi kyau. Ka yi la'akari da sake cikawa ranar Jumma'a.",
    cardProfitableProducts: "Kayan Da Suka Fi Ba Da Riba",
    cardCostRevenue: "Kudin Ciniki da Kudin Shiga",
    costTotalRevenue: "Jimlar Kudin Shiga", costOfGoods: "Kudin Sayen Kaya", netProfit: "Ribar Gaske",

    scoreTitle: "ShopScore Naka", scoreOutOf: "daga cikin 100",
    cardScoreBreakdown: "Bayanin Maki",
    aiAssessmentTitle: "Kimanta Kasuwanci Ta AI",
    aiAssessmentDesc: "Samu kimantawar lafiyar kasuwancinka da matakan inganta ShopScore naka.",
    btnGetAssessment: "Samo Kimantawa Ta",

    statTodayRevenue: "Kudin Shiga Yau", statTodayProfit: "Ribar Yau",
    statUnitsSold: "Yawan Da Aka Sayar", statLowStockAlerts: "Gargaɗin Kaya Da Ya Ragu",
    cardBestSeller: "Mafi Sayarwa Yau", noSalesToday: "Babu tallace-tallacen da aka rubuta yau.",
    aiDailyTitle: "Rahoton Kasuwanci Na Yau da Kullum",
    aiDailyDesc: "Samu taƙaitaccen bayani na yadda kasuwancinka yayi yau, kwatanta da jiya, da shawara don gobe.",
    btnGenerateDaily: "Samo Taƙaitaccen Bayani",

    cardTransactionHistory: "Tarihin Ciniki",
    transactionHistoryDesc: "Duba kowace tallace-tallacen da ka rubuta, an tsara su bisa rana.",
    btnViewHistory: "Duba Tarihin Ciniki",
    noTransactions: "Babu wani ciniki da aka rubuta tukuna. Tallace-tallacen da za ka rubuta za su bayyana anan.",

    modalAddTitle: "Ƙara / Sake Cika Kaya",
    modalAddSub: "Idan kaya mai suna da alama iri ɗaya ya riga ya kasance, wannan zai ƙara wa yawansa maimakon ƙirƙirar sabo.",
    labelProductName: "Sunan Kaya *", labelBrand: "Alama (na zaɓi)",
    labelQuantity: "Yawa *", labelMinQty: "Ƙarancin Kaya Don Gargaɗi",
    labelBuyPrice: "Kudin Saye (₦) *", labelSellPrice: "Kudin Sayarwa (₦) *",
    labelCategory: "Nau'i", labelExpiry: "Ranar Ƙarewa (na zaɓi)",
    btnSaveProduct: "Ajiye Kaya", btnCancel: "Soke",
    catFood: "Abinci", catDrinks: "Abin Sha", catHousehold: "Kayan Gida", catPersonalCare: "Kula da Kai", catOther: "Wani",

    modalSellTitle: "Rubuta Tallace-tallace", labelQtySold: "Yawan Da Aka Sayar", btnConfirmSale: "Tabbatar Ciniki",

    modalHistoryTitle: "Tarihin Ciniki",
    modalHistorySub: "Kowane ciniki, an tsara su bisa rana. Danna rana don ganin cinikai daban-daban.",
    btnClose: "Rufe",

    loginTab: "Shiga", signupTab: "Ƙirƙiri Asusun",
    labelEmail: "Imel", labelPassword: "Kalmar Sirri",
    labelYourName: "Sunanka", labelShopName: "Sunan Shago",
    btnLogin: "Shiga", btnCreateAccount: "Ƙirƙiri Asusun",

    unitsLeft: "raguwar yawa", recordSale: "Rubuta Ciniki",
    noProductsMatch: "Babu kayan da suka dace da",

    itemsLow: "kaya sun ragu", allGood: "Komai yana lafiya",
    productsNeedRestocking: "kaya suna bukatar sake cikawa",
    productsExpiringSoon: "kaya za su kare",
    leftMin: "sun rage (mafi ƙanci", badgeLow: "Kaya Ya Ragu", badgeExpiringSoon: "Za Su Kare", badgeExpired: "Ya Kare", expShort: "Ranar ƙarewa:",
    unitsSoldMargin: "an sayar", marginWord: "riba",

    statAllTime: "duk lokaci", statAfterCost: "bayan cirewa kudin saye", statOverall: "gaba ɗaya", statEstimated: "kimantawa",
    profitTotalRevenue: "Jimlar Kudin Shiga", profitTotalProfit: "Jimlar Riba", profitMargin: "Kason Riba", profitThisWeek: "Wannan Makon",

    sigStockConsistency: "Daidaiton Kaya", sigSalesDiscipline: "Tsarin Sayarwa",
    sigProfitTrajectory: "Yanayin Riba", sigRestockEfficiency: "Ƙwarewar Sake Cikawa", sigLossManagement: "Sarrafa Hasara",
    lblGoodStanding: "Kyakkyawan Matsayi", lblNeedsImprovement: "Yana Bukatar Ingantawa", lblAtRisk: "Cikin Hatsari",
    captionEligible: "Kana iya cancantar samun rancen kasuwanci na OPay.",
    captionKeepImproving: "Ci gaba da ingantawa don buɗe hanyar cancantar rance.",
    captionFocusConsistency: "Mai da hankali kan daidaito don gina makinka.",
    loanEligibleTitle: "Ya Cancanci Rance",
    loanEligibleText: "ShopScore naka ya cancantar ka nemi rancen kasuwanci na OPay. Raba makinka da duk wanda zai ba ka rance a matsayin shaidar lafiyar kasuwancinka.",
    btnShareScore: "Raba ShopScore Na",
    loanBuildingTitle: "Ana Gina Cancanta",
    loanBuildingText1: "Kana bukatar maki 70+ don cancanci. Ka rage",
    loanBuildingText2: "maki. Ci gaba da rubutawa akai-akai zai kai ka can.",
    toastScoreShared: "An raba ShopScore! Nuna wa mai bada rance wannan.",

    trendVsYesterday: "idan aka kwatanta da jiya", trendNoData: "Babu bayanan jiya tukuna", trendSame: "Daidai da jiya",

    toastFillFields: "Ka cika dukkan bukatattun filayen", toastProductAdded: "An ƙara kaya cikin nasara",
    toastInvalidQty: "Yawan da ba daidai ba", toastSaleRecorded: "An rubuta ciniki —", toastEarned: "aka samu",
    toastRestocked: "An sake cika", toastNowUnits: "— yanzu", toastUnits: "yawa"
  },

  yo: {
    tagline: "Mọ Ohun Tí O Ní. Mọ Ohun Tí O Nílò.",
    navStock: "Ọjà", navRestock: "Tún Kó", navProfit: "Èrè", navScore: "ShopScore", navDaily: "Ojoojúmọ́",

    statTotalProducts: "Àpapọ̀ Ọjà", statInInventory: "nínú ilé ìtajà",
    statStockValue: "Iye Ọjà", statBuyingCost: "owó ríra",
    statLowStock: "Ọjà Ń Tán", statNeedRestocking: "nílò àtúnkó",
    statExpiringSoon: "Ń Sún Mọ́ Ìparí", statWithin30: "láàrin ọjọ́ 30",
    searchPlaceholder: "Wá ọjà...",
    btnAdd: "+ Ṣàfikún",

    cardTopSellers: "Ọjà Tí Ó Ta Jùlọ",
    aiRestockTitle: "Olùdámọ̀ràn Àtúnkó AI", aiPoweredBy: "Nípasẹ̀ Gemini AI",
    aiRestockDesc: "Gba àwọn ìmọ̀ràn àtúnkó tí ó bá àwọn dátà títà àti ọjà rẹ mu ní tòótọ́.",
    btnGenerateAdvice: "Ṣẹ̀dá Ìmọ̀ràn",

    cardWeeklySales: "Títà Ọ̀sẹ̀",
    chartTip: "Sátidé ni ọjọ́ tí ó dára jùlọ fún ọ. Ronú láti tún kó ní ọjọ́ Friday.",
    cardProfitableProducts: "Ọjà Tí Ó Ń Mú Èrè Jùlọ",
    cardCostRevenue: "Owó Ná vs Owó Tí Ó Wọlé",
    costTotalRevenue: "Àpapọ̀ Owó Tí Ó Wọlé", costOfGoods: "Owó Rírà Ọjà", netProfit: "Èrè Gidi",

    scoreTitle: "ShopScore Rẹ", scoreOutOf: "nínú 100",
    cardScoreBreakdown: "Ìtúpalẹ̀ Ìwọ̀n",
    aiAssessmentTitle: "Àyẹ̀wò Òwò AI",
    aiAssessmentDesc: "Gba àyẹ̀wò ìlera òwò rẹ àti àwọn ìgbésẹ̀ láti mú ShopScore rẹ dára sí i.",
    btnGetAssessment: "Gba Àyẹ̀wò Mi",

    statTodayRevenue: "Owó Tí Ó Wọlé Lónìí", statTodayProfit: "Èrè Lónìí",
    statUnitsSold: "Iye Tí A Tà", statLowStockAlerts: "Ìkìlọ̀ Ọjà Tí Ń Tán",
    cardBestSeller: "Ọjà Tí Ó Ta Jùlọ Lónìí", noSalesToday: "Kò sí títà tí a ti kọ sílẹ̀ lónìí.",
    aiDailyTitle: "Ìròyìn Òwò Ojoojúmọ́",
    aiDailyDesc: "Gba àkótán tí AI ṣe nípa bí ọjà ṣe tà lónìí, ìfiwéra pẹ̀lú àná, àti ìmọ̀ràn fún ọ̀la.",
    btnGenerateDaily: "Ṣẹ̀dá Àkótán Ojoojúmọ́",

    cardTransactionHistory: "Ìtàn Àwọn Títà",
    transactionHistoryDesc: "Wo gbogbo títà tí o ti kọ sílẹ̀, tí a ṣètò nípa ọjọ́.",
    btnViewHistory: "Wo Ìtàn Àwọn Títà",
    noTransactions: "Kò sí títà tí a ti kọ sílẹ̀ síbẹ̀. Àwọn títà tí o bá kọ yóò farahàn níbí.",

    modalAddTitle: "Ṣàfikún / Tún Kó Ọjà",
    modalAddSub: "Tí ọjà tí orúkọ àti àmì rẹ̀ bá ti wà tẹ́lẹ̀, èyí yóò ṣàfikún sí iye rẹ̀ dípò dídá òmíràn.",
    labelProductName: "Orúkọ Ọjà *", labelBrand: "Àmì (àṣàyàn)",
    labelQuantity: "Iye *", labelMinQty: "Ìwọ̀n Ìkìlọ̀ Ọjà Tí Ń Tán",
    labelBuyPrice: "Owó Rírà (₦) *", labelSellPrice: "Owó Títà (₦) *",
    labelCategory: "Ẹ̀ka", labelExpiry: "Ọjọ́ Ìparí (àṣàyàn)",
    btnSaveProduct: "Fi Ọjà Pamọ́", btnCancel: "Fagilé",
    catFood: "Oúnjẹ", catDrinks: "Ohun Mímu", catHousehold: "Nǹkan Ilé", catPersonalCare: "Ìtọ́jú Ara", catOther: "Òmíràn",

    modalSellTitle: "Kọ Títà Sílẹ̀", labelQtySold: "Iye Tí A Tà", btnConfirmSale: "Jẹ́rìí Sí Títà",

    modalHistoryTitle: "Ìtàn Àwọn Títà",
    modalHistorySub: "Gbogbo títà, tí a ṣètò nípa ọjọ́. Tẹ ọjọ́ kan láti rí àwọn títà lọ́tọ̀ọ̀tọ̀.",
    btnClose: "Ti",

    loginTab: "Wọlé", signupTab: "Ṣẹ̀dá Àkọọ́lẹ̀",
    labelEmail: "Ímeèlì", labelPassword: "Ọ̀rọ̀ Ìpamọ́",
    labelYourName: "Orúkọ Rẹ", labelShopName: "Orúkọ Ilé Ìtajà",
    btnLogin: "Wọlé", btnCreateAccount: "Ṣẹ̀dá Àkọọ́lẹ̀",

    unitsLeft: "iye tí ó kù", recordSale: "Kọ Títà Sílẹ̀",
    noProductsMatch: "Kò sí ọjà tí ó bá",

    itemsLow: "ọjà ń tán", allGood: "Ohun gbogbo dára",
    productsNeedRestocking: "ọjà nílò àtúnkó",
    productsExpiringSoon: "ọjà ń sún mọ́ ìparí",
    leftMin: "kù (ìwọ̀nba", badgeLow: "Ọjà Ń Tán", badgeExpiringSoon: "Ń Sún Mọ́ Ìparí", badgeExpired: "Ti Parí", expShort: "Ọjọ́ ìparí:",
    unitsSoldMargin: "won tà", marginWord: "èrè",

    statAllTime: "gbogbo àkókò", statAfterCost: "lẹ́yìn yíyọ owó rírà", statOverall: "ní gbogbogbò", statEstimated: "iṣirò",
    profitTotalRevenue: "Àpapọ̀ Owó Tí Ó Wọlé", profitTotalProfit: "Àpapọ̀ Èrè", profitMargin: "Ìdá Èrè", profitThisWeek: "Ọ̀sẹ̀ Yìí",

    sigStockConsistency: "Ìṣọ̀kan Ọjà", sigSalesDiscipline: "Ìlànà Títà",
    sigProfitTrajectory: "Ìtọ́sọ́nà Èrè", sigRestockEfficiency: "Agbára Àtúnkó", sigLossManagement: "Ìṣàkóso Òfò",
    lblGoodStanding: "Ipò Dídára", lblNeedsImprovement: "Nílò Ìmúdàgbà", lblAtRisk: "Wà Nínú Ewu",
    captionEligible: "O lè yẹ fún àwìn òwò OPay.",
    captionKeepImproving: "Tẹ̀síwájú láti mú dára sí i láti ṣí ọ̀nà àwìn.",
    captionFocusConsistency: "Fojú sí ìṣọ̀kan láti kọ́ ìwọ̀n rẹ.",
    loanEligibleTitle: "Ó Yẹ Fún Àwìn",
    loanEligibleText: "ShopScore rẹ mú ọ yẹ láti bèèrè àwìn òwò OPay. Fi ìwọ̀n rẹ hàn sí olùfúnni àwìn kankan gẹ́gẹ́ bí ẹ̀rí ìlera òwò rẹ.",
    btnShareScore: "Fi ShopScore Mi Hàn",
    loanBuildingTitle: "Ń Kọ́ Yíyẹ",
    loanBuildingText1: "O nílò ìwọ̀n 70+ láti yẹ. O ṣẹ́kù",
    loanBuildingText2: "ìwọ̀n. Kíkọ ìwé nígbà gbogbo yóò mú ọ dé ibẹ̀.",
    toastScoreShared: "A ti fi ShopScore hàn! Fi hàn sí olùfúnni àwìn.",

    trendVsYesterday: "ní ìfiwéra pẹ̀lú àná", trendNoData: "Kò sí dátà àná síbẹ̀", trendSame: "Bákan náà pẹ̀lú àná",

    toastFillFields: "Kún gbogbo àwọn ààyè tí a nílò", toastProductAdded: "A ti ṣàfikún ọjà pẹ̀lú àṣeyọrí",
    toastInvalidQty: "Iye tí kò tọ́", toastSaleRecorded: "A ti kọ títà sílẹ̀ —", toastEarned: "jèrè",
    toastRestocked: "Ti tún kó", toastNowUnits: "— nísisìyí", toastUnits: "iye"
  }
};

const LANG_NAMES = { en: "English", ig: "Igbo", ha: "Hausa", yo: "Yoruba" };

function getLang(){
  try{return localStorage.getItem(LANG_KEY)||'en';}catch(e){return 'en';}
}

function setLang(code){
  try{localStorage.setItem(LANG_KEY,code);}catch(e){}
  applyTranslations();
}

function t(key){
  const lang=getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
}

function applyTranslations(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent=t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    el.placeholder=t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('.lang-btn').forEach(b=>{
    b.classList.toggle('active',b.dataset.lang===getLang());
  });
  if(typeof renderStock==='function')renderStock(document.getElementById('searchInput')?.value||'');
  if(typeof renderRestock==='function' && document.getElementById('tab-restock')?.classList.contains('active'))renderRestock();
  if(typeof renderProfit==='function' && document.getElementById('tab-profit')?.classList.contains('active'))renderProfit();
  if(typeof renderScore==='function' && document.getElementById('tab-score')?.classList.contains('active'))renderScore();
  if(typeof renderDaily==='function' && document.getElementById('tab-daily')?.classList.contains('active'))renderDaily();
}

document.addEventListener('DOMContentLoaded',applyTranslations);
