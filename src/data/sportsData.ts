// The Long Game - Youth Sports Assessment Framework
// Enhanced data model with categories, height advantages, and regional competition

// ============================================================================
// TYPES
// ============================================================================

export type SportCategory = 
  | "ball-team"      // Soccer, Basketball, Football, etc.
  | "ball-individual" // Tennis, Golf, etc.
  | "racket"         // Tennis, Badminton, Pickleball, Squash
  | "water"          // Swimming, Water Polo, Surfing, Sailing
  | "combat"         // Martial Arts, Wrestling, Fencing
  | "track-field"    // Running, Jumping, Throwing events
  | "gymnastics"     // Gymnastics, Dance, Cheer
  | "winter"         // Skiing, Snowboarding, Hockey
  | "outdoor"        // Rock Climbing, Cycling, Triathlon
  | "precision"      // Golf, Archery, Shooting

export type Gender = "male" | "female";

export type HeightAdvantage = {
  minHeightInches: number | null;  // null = no minimum
  maxHeightInches: number | null;  // null = no maximum
  advantageLevel: "strong" | "moderate" | "neutral" | "disadvantage";
  notes: string;
};

export type RegionType = 
  | "northeast"
  | "southeast" 
  | "midwest"
  | "southwest"
  | "west-coast"
  | "mountain-west"
  | "pacific-northwest";

export interface RegionalCompetition {
  region: RegionType;
  competitionLevel: 1 | 2 | 3 | 4 | 5; // 1=Low, 5=Very High
  programAvailability: 1 | 2 | 3 | 4 | 5; // 1=Rare, 5=Abundant
  notes?: string;
}

export interface Sport {
  id: string;
  name: string;
  category: SportCategory;
  
  // The 5 Scoring Factors (base scores 1-10)
  baseScores: {
    funFactor: number;        // Enjoyment & passion potential
    skillFocus: number;       // Technical development emphasis
    accessibility: number;    // Cost + availability (inverse of barriers)
  };
  
  // Height advantages by gender
  heightAdvantage: {
    male: HeightAdvantage[];
    female: HeightAdvantage[];
  };
  
  // Regional competition data
  regionalCompetition: RegionalCompetition[];
  
  // Cost breakdown
  costRange: {
    entryLevel: { min: number; max: number };   // $/year for recreational
    competitive: { min: number; max: number };  // $/year for travel/club
  };
  
  // Ideal start age range (in years)
  idealStartAge: { min: number; max: number };
  
  // Additional metadata
  collegeOpportunity: 1 | 2 | 3 | 4 | 5;  // Scholarship potential
  lifespanValue: 1 | 2 | 3 | 4 | 5;       // Can play into adulthood
  physicalDemands: {
    cardio: 1 | 2 | 3 | 4 | 5;
    strength: 1 | 2 | 3 | 4 | 5;
    coordination: 1 | 2 | 3 | 4 | 5;
    flexibility: 1 | 2 | 3 | 4 | 5;
  };
  
  notes: string;
}

// ============================================================================
// CATEGORY METADATA
// ============================================================================

export const SPORT_CATEGORIES: Record<SportCategory, { name: string; icon: string; description: string }> = {
  "ball-team": {
    name: "Team Ball Sports",
    icon: "⚽",
    description: "Team sports with a ball - soccer, basketball, football, etc."
  },
  "ball-individual": {
    name: "Individual Ball Sports", 
    icon: "🎾",
    description: "Individual sports with a ball - tennis, golf, etc."
  },
  "racket": {
    name: "Racket Sports",
    icon: "🏸",
    description: "Sports using rackets or paddles"
  },
  "water": {
    name: "Water Sports",
    icon: "🏊",
    description: "Swimming, diving, water polo, surfing, sailing"
  },
  "combat": {
    name: "Combat Sports",
    icon: "🥋",
    description: "Martial arts, wrestling, fencing"
  },
  "track-field": {
    name: "Track & Field",
    icon: "🏃",
    description: "Running, jumping, and throwing events"
  },
  "gymnastics": {
    name: "Gymnastics & Dance",
    icon: "🤸",
    description: "Gymnastics, dance, cheerleading"
  },
  "winter": {
    name: "Winter Sports",
    icon: "⛷️",
    description: "Skiing, snowboarding, ice hockey, skating"
  },
  "outdoor": {
    name: "Outdoor & Adventure",
    icon: "🧗",
    description: "Rock climbing, cycling, hiking"
  },
  "precision": {
    name: "Precision Sports",
    icon: "🎯",
    description: "Golf, archery, shooting sports"
  }
};

// ============================================================================
// REGION MAPPING (ZIP CODE PREFIX TO REGION)
// ============================================================================

export const ZIP_TO_REGION: Record<string, RegionType> = {
  // Northeast (New England + Mid-Atlantic)
  "010": "northeast", "011": "northeast", "012": "northeast", "013": "northeast", // MA
  "014": "northeast", "015": "northeast", "016": "northeast", "017": "northeast",
  "018": "northeast", "019": "northeast", "020": "northeast", "021": "northeast", // MA/RI
  "022": "northeast", "023": "northeast", "024": "northeast", "025": "northeast",
  "026": "northeast", "027": "northeast", "028": "northeast", "029": "northeast",
  "030": "northeast", "031": "northeast", "032": "northeast", "033": "northeast", // NH
  "034": "northeast", "035": "northeast", "036": "northeast", "037": "northeast", // VT
  "038": "northeast", "039": "northeast", "040": "northeast", "041": "northeast", // ME
  "042": "northeast", "043": "northeast", "044": "northeast", "045": "northeast",
  "046": "northeast", "047": "northeast", "048": "northeast", "049": "northeast",
  "050": "northeast", "051": "northeast", "052": "northeast", "053": "northeast", // VT
  "054": "northeast", "055": "northeast", "056": "northeast", "057": "northeast",
  "058": "northeast", "059": "northeast", "060": "northeast", "061": "northeast", // CT
  "062": "northeast", "063": "northeast", "064": "northeast", "065": "northeast",
  "066": "northeast", "067": "northeast", "068": "northeast", "069": "northeast",
  "070": "northeast", "071": "northeast", "072": "northeast", "073": "northeast", // NJ
  "074": "northeast", "075": "northeast", "076": "northeast", "077": "northeast",
  "078": "northeast", "079": "northeast", "080": "northeast", "081": "northeast",
  "082": "northeast", "083": "northeast", "084": "northeast", "085": "northeast",
  "086": "northeast", "087": "northeast", "088": "northeast", "089": "northeast",
  "100": "northeast", "101": "northeast", "102": "northeast", "103": "northeast", // NY
  "104": "northeast", "105": "northeast", "106": "northeast", "107": "northeast",
  "108": "northeast", "109": "northeast", "110": "northeast", "111": "northeast",
  "112": "northeast", "113": "northeast", "114": "northeast", "115": "northeast",
  "116": "northeast", "117": "northeast", "118": "northeast", "119": "northeast",
  "120": "northeast", "121": "northeast", "122": "northeast", "123": "northeast",
  "124": "northeast", "125": "northeast", "126": "northeast", "127": "northeast",
  "128": "northeast", "129": "northeast", "130": "northeast", "131": "northeast",
  "132": "northeast", "133": "northeast", "134": "northeast", "135": "northeast",
  "136": "northeast", "137": "northeast", "138": "northeast", "139": "northeast",
  "140": "northeast", "141": "northeast", "142": "northeast", "143": "northeast",
  "144": "northeast", "145": "northeast", "146": "northeast", "147": "northeast",
  "148": "northeast", "149": "northeast",
  "150": "northeast", "151": "northeast", "152": "northeast", "153": "northeast", // PA
  "154": "northeast", "155": "northeast", "156": "northeast", "157": "northeast",
  "158": "northeast", "159": "northeast", "160": "northeast", "161": "northeast",
  "162": "northeast", "163": "northeast", "164": "northeast", "165": "northeast",
  "166": "northeast", "167": "northeast", "168": "northeast", "169": "northeast",
  "170": "northeast", "171": "northeast", "172": "northeast", "173": "northeast",
  "174": "northeast", "175": "northeast", "176": "northeast", "177": "northeast",
  "178": "northeast", "179": "northeast", "180": "northeast", "181": "northeast",
  "182": "northeast", "183": "northeast", "184": "northeast", "185": "northeast",
  "186": "northeast", "187": "northeast", "188": "northeast", "189": "northeast",
  "190": "northeast", "191": "northeast", "192": "northeast", "193": "northeast",
  "194": "northeast", "195": "northeast", "196": "northeast",
  "197": "northeast", "198": "northeast", "199": "northeast", // DE
  
  // Southeast
  "200": "southeast", "201": "southeast", "202": "southeast", "203": "southeast", // DC/VA
  "204": "southeast", "205": "southeast", "206": "southeast", "207": "southeast",
  "208": "southeast", "209": "southeast", "210": "southeast", "211": "southeast", // MD
  "212": "southeast", "213": "southeast", "214": "southeast", "215": "southeast",
  "216": "southeast", "217": "southeast", "218": "southeast", "219": "southeast",
  "220": "southeast", "221": "southeast", "222": "southeast", "223": "southeast", // VA
  "224": "southeast", "225": "southeast", "226": "southeast", "227": "southeast",
  "228": "southeast", "229": "southeast", "230": "southeast", "231": "southeast",
  "232": "southeast", "233": "southeast", "234": "southeast", "235": "southeast",
  "236": "southeast", "237": "southeast", "238": "southeast", "239": "southeast",
  "240": "southeast", "241": "southeast", "242": "southeast", "243": "southeast", // WV
  "244": "southeast", "245": "southeast", "246": "southeast", "247": "southeast",
  "248": "southeast", "249": "southeast", "250": "southeast", "251": "southeast",
  "252": "southeast", "253": "southeast", "254": "southeast", "255": "southeast",
  "256": "southeast", "257": "southeast", "258": "southeast", "259": "southeast",
  "260": "southeast", "261": "southeast", "262": "southeast", "263": "southeast",
  "264": "southeast", "265": "southeast", "266": "southeast", "267": "southeast",
  "268": "southeast",
  "270": "southeast", "271": "southeast", "272": "southeast", "273": "southeast", // NC
  "274": "southeast", "275": "southeast", "276": "southeast", "277": "southeast",
  "278": "southeast", "279": "southeast", "280": "southeast", "281": "southeast",
  "282": "southeast", "283": "southeast", "284": "southeast", "285": "southeast",
  "286": "southeast", "287": "southeast", "288": "southeast", "289": "southeast",
  "290": "southeast", "291": "southeast", "292": "southeast", "293": "southeast", // SC
  "294": "southeast", "295": "southeast", "296": "southeast", "297": "southeast",
  "298": "southeast", "299": "southeast",
  "300": "southeast", "301": "southeast", "302": "southeast", "303": "southeast", // GA
  "304": "southeast", "305": "southeast", "306": "southeast", "307": "southeast",
  "308": "southeast", "309": "southeast", "310": "southeast", "311": "southeast",
  "312": "southeast", "313": "southeast", "314": "southeast", "315": "southeast",
  "316": "southeast", "317": "southeast", "318": "southeast", "319": "southeast",
  "320": "southeast", "321": "southeast", "322": "southeast", "323": "southeast", // FL
  "324": "southeast", "325": "southeast", "326": "southeast", "327": "southeast",
  "328": "southeast", "329": "southeast", "330": "southeast", "331": "southeast",
  "332": "southeast", "333": "southeast", "334": "southeast", "335": "southeast",
  "336": "southeast", "337": "southeast", "338": "southeast", "339": "southeast",
  "340": "southeast", "341": "southeast", "342": "southeast", "344": "southeast",
  "346": "southeast", "347": "southeast", "349": "southeast",
  "350": "southeast", "351": "southeast", "352": "southeast", "353": "southeast", // AL
  "354": "southeast", "355": "southeast", "356": "southeast", "357": "southeast",
  "358": "southeast", "359": "southeast", "360": "southeast", "361": "southeast",
  "362": "southeast", "363": "southeast", "364": "southeast", "365": "southeast",
  "366": "southeast", "367": "southeast", "368": "southeast", "369": "southeast",
  "370": "southeast", "371": "southeast", "372": "southeast", "373": "southeast", // TN
  "374": "southeast", "375": "southeast", "376": "southeast", "377": "southeast",
  "378": "southeast", "379": "southeast", "380": "southeast", "381": "southeast",
  "382": "southeast", "383": "southeast", "384": "southeast", "385": "southeast",
  "386": "southeast", "387": "southeast", "388": "southeast", "389": "southeast", // MS
  "390": "southeast", "391": "southeast", "392": "southeast", "393": "southeast",
  "394": "southeast", "395": "southeast", "396": "southeast", "397": "southeast",
  "398": "southeast", "399": "southeast",
  "400": "southeast", "401": "southeast", "402": "southeast", "403": "southeast", // KY
  "404": "southeast", "405": "southeast", "406": "southeast", "407": "southeast",
  "408": "southeast", "409": "southeast", "410": "southeast", "411": "southeast",
  "412": "southeast", "413": "southeast", "414": "southeast", "415": "southeast",
  "416": "southeast", "417": "southeast", "418": "southeast",
  
  // Midwest
  "420": "midwest", "421": "midwest", "422": "midwest", "423": "midwest", // KY (part)
  "424": "midwest", "425": "midwest", "426": "midwest", "427": "midwest",
  "430": "midwest", "431": "midwest", "432": "midwest", "433": "midwest", // OH
  "434": "midwest", "435": "midwest", "436": "midwest", "437": "midwest",
  "438": "midwest", "439": "midwest", "440": "midwest", "441": "midwest",
  "442": "midwest", "443": "midwest", "444": "midwest", "445": "midwest",
  "446": "midwest", "447": "midwest", "448": "midwest", "449": "midwest",
  "450": "midwest", "451": "midwest", "452": "midwest", "453": "midwest",
  "454": "midwest", "455": "midwest", "456": "midwest", "457": "midwest",
  "458": "midwest", "459": "midwest",
  "460": "midwest", "461": "midwest", "462": "midwest", "463": "midwest", // IN
  "464": "midwest", "465": "midwest", "466": "midwest", "467": "midwest",
  "468": "midwest", "469": "midwest", "470": "midwest", "471": "midwest",
  "472": "midwest", "473": "midwest", "474": "midwest", "475": "midwest",
  "476": "midwest", "477": "midwest", "478": "midwest", "479": "midwest",
  "480": "midwest", "481": "midwest", "482": "midwest", "483": "midwest", // MI
  "484": "midwest", "485": "midwest", "486": "midwest", "487": "midwest",
  "488": "midwest", "489": "midwest", "490": "midwest", "491": "midwest",
  "492": "midwest", "493": "midwest", "494": "midwest", "495": "midwest",
  "496": "midwest", "497": "midwest", "498": "midwest", "499": "midwest",
  "500": "midwest", "501": "midwest", "502": "midwest", "503": "midwest", // IA
  "504": "midwest", "505": "midwest", "506": "midwest", "507": "midwest",
  "508": "midwest", "509": "midwest", "510": "midwest", "511": "midwest",
  "512": "midwest", "513": "midwest", "514": "midwest", "515": "midwest",
  "516": "midwest", "520": "midwest", "521": "midwest", "522": "midwest",
  "523": "midwest", "524": "midwest", "525": "midwest", "526": "midwest",
  "527": "midwest", "528": "midwest",
  "530": "midwest", "531": "midwest", "532": "midwest", "534": "midwest", // WI
  "535": "midwest", "537": "midwest", "538": "midwest", "539": "midwest",
  "540": "midwest", "541": "midwest", "542": "midwest", "543": "midwest",
  "544": "midwest", "545": "midwest", "546": "midwest", "547": "midwest",
  "548": "midwest", "549": "midwest",
  "550": "midwest", "551": "midwest", "553": "midwest", "554": "midwest", // MN
  "555": "midwest", "556": "midwest", "557": "midwest", "558": "midwest",
  "559": "midwest", "560": "midwest", "561": "midwest", "562": "midwest",
  "563": "midwest", "564": "midwest", "565": "midwest", "566": "midwest",
  "567": "midwest",
  "570": "midwest", "571": "midwest", "572": "midwest", "573": "midwest", // SD
  "574": "midwest", "575": "midwest", "576": "midwest", "577": "midwest",
  "580": "midwest", "581": "midwest", "582": "midwest", "583": "midwest", // ND
  "584": "midwest", "585": "midwest", "586": "midwest", "587": "midwest",
  "588": "midwest",
  "590": "midwest", "591": "midwest", "592": "midwest", "593": "midwest", // MT (part)
  "594": "midwest", "595": "midwest", "596": "midwest", "597": "midwest",
  "598": "midwest", "599": "midwest",
  "600": "midwest", "601": "midwest", "602": "midwest", "603": "midwest", // IL
  "604": "midwest", "605": "midwest", "606": "midwest", "607": "midwest",
  "608": "midwest", "609": "midwest", "610": "midwest", "611": "midwest",
  "612": "midwest", "613": "midwest", "614": "midwest", "615": "midwest",
  "616": "midwest", "617": "midwest", "618": "midwest", "619": "midwest",
  "620": "midwest", "622": "midwest", "623": "midwest", "624": "midwest",
  "625": "midwest", "626": "midwest", "627": "midwest", "628": "midwest",
  "629": "midwest",
  "630": "midwest", "631": "midwest", "633": "midwest", "634": "midwest", // MO
  "635": "midwest", "636": "midwest", "637": "midwest", "638": "midwest",
  "639": "midwest", "640": "midwest", "641": "midwest", "644": "midwest",
  "645": "midwest", "646": "midwest", "647": "midwest", "648": "midwest",
  "649": "midwest", "650": "midwest", "651": "midwest", "652": "midwest",
  "653": "midwest", "654": "midwest", "655": "midwest", "656": "midwest",
  "657": "midwest", "658": "midwest",
  "660": "midwest", "661": "midwest", "662": "midwest", "664": "midwest", // KS
  "665": "midwest", "666": "midwest", "667": "midwest", "668": "midwest",
  "669": "midwest", "670": "midwest", "671": "midwest", "672": "midwest",
  "673": "midwest", "674": "midwest", "675": "midwest", "676": "midwest",
  "677": "midwest", "678": "midwest", "679": "midwest",
  "680": "midwest", "681": "midwest", "683": "midwest", "684": "midwest", // NE
  "685": "midwest", "686": "midwest", "687": "midwest", "688": "midwest",
  "689": "midwest", "690": "midwest", "691": "midwest", "692": "midwest",
  "693": "midwest",
  
  // Southwest
  "700": "southwest", "701": "southwest", "703": "southwest", "704": "southwest", // LA
  "705": "southwest", "706": "southwest", "707": "southwest", "708": "southwest",
  "710": "southwest", "711": "southwest", "712": "southwest", "713": "southwest",
  "714": "southwest", "716": "southwest",
  "717": "southwest", "718": "southwest",
  "719": "southwest", "720": "southwest", "721": "southwest", "722": "southwest", // AR
  "723": "southwest", "724": "southwest", "725": "southwest", "726": "southwest",
  "727": "southwest", "728": "southwest", "729": "southwest",
  "730": "southwest", "731": "southwest", "733": "southwest", "734": "southwest", // OK
  "735": "southwest", "736": "southwest", "737": "southwest", "738": "southwest",
  "739": "southwest", "740": "southwest", "741": "southwest", "743": "southwest",
  "744": "southwest", "745": "southwest", "746": "southwest", "747": "southwest",
  "748": "southwest", "749": "southwest",
  "750": "southwest", "751": "southwest", "752": "southwest", "753": "southwest", // TX
  "754": "southwest", "755": "southwest", "756": "southwest", "757": "southwest",
  "758": "southwest", "759": "southwest", "760": "southwest", "761": "southwest",
  "762": "southwest", "763": "southwest", "764": "southwest", "765": "southwest",
  "766": "southwest", "767": "southwest", "768": "southwest", "769": "southwest",
  "770": "southwest", "771": "southwest", "772": "southwest", "773": "southwest",
  "774": "southwest", "775": "southwest", "776": "southwest", "777": "southwest",
  "778": "southwest", "779": "southwest", "780": "southwest", "781": "southwest",
  "782": "southwest", "783": "southwest", "784": "southwest", "785": "southwest",
  "786": "southwest", "787": "southwest", "788": "southwest", "789": "southwest",
  "790": "southwest", "791": "southwest", "792": "southwest", "793": "southwest",
  "794": "southwest", "795": "southwest", "796": "southwest", "797": "southwest",
  "798": "southwest", "799": "southwest",
  "850": "southwest", "851": "southwest", "852": "southwest", "853": "southwest", // AZ
  "855": "southwest", "856": "southwest", "857": "southwest", "858": "southwest",
  "859": "southwest", "860": "southwest", "863": "southwest", "864": "southwest",
  "865": "southwest", "866": "southwest",
  "870": "southwest", "871": "southwest", "872": "southwest", "873": "southwest", // NM
  "874": "southwest", "875": "southwest", "877": "southwest", "878": "southwest",
  "879": "southwest", "880": "southwest", "881": "southwest", "882": "southwest",
  "883": "southwest", "884": "southwest",
  
  // Mountain West
  "800": "mountain-west", "801": "mountain-west", "802": "mountain-west", // CO
  "803": "mountain-west", "804": "mountain-west", "805": "mountain-west",
  "806": "mountain-west", "807": "mountain-west", "808": "mountain-west",
  "809": "mountain-west", "810": "mountain-west", "811": "mountain-west",
  "812": "mountain-west", "813": "mountain-west", "814": "mountain-west",
  "815": "mountain-west", "816": "mountain-west",
  "820": "mountain-west", "821": "mountain-west", "822": "mountain-west", // WY
  "823": "mountain-west", "824": "mountain-west", "825": "mountain-west",
  "826": "mountain-west", "827": "mountain-west", "828": "mountain-west",
  "829": "mountain-west", "830": "mountain-west", "831": "mountain-west",
  "832": "mountain-west", "833": "mountain-west", "834": "mountain-west", // ID
  "835": "mountain-west", "836": "mountain-west", "837": "mountain-west",
  "838": "mountain-west",
  "840": "mountain-west", "841": "mountain-west", "842": "mountain-west", // UT
  "843": "mountain-west", "844": "mountain-west", "845": "mountain-west",
  "846": "mountain-west", "847": "mountain-west",
  "889": "mountain-west", "890": "mountain-west", "891": "mountain-west", // NV
  "893": "mountain-west", "894": "mountain-west", "895": "mountain-west",
  "896": "mountain-west", "897": "mountain-west", "898": "mountain-west",
  
  // West Coast (California)
  "900": "west-coast", "901": "west-coast", "902": "west-coast", "903": "west-coast",
  "904": "west-coast", "905": "west-coast", "906": "west-coast", "907": "west-coast",
  "908": "west-coast", "910": "west-coast", "911": "west-coast", "912": "west-coast",
  "913": "west-coast", "914": "west-coast", "915": "west-coast", "916": "west-coast",
  "917": "west-coast", "918": "west-coast", "919": "west-coast", "920": "west-coast",
  "921": "west-coast", "922": "west-coast", "923": "west-coast", "924": "west-coast",
  "925": "west-coast", "926": "west-coast", "927": "west-coast", "928": "west-coast",
  "930": "west-coast", "931": "west-coast", "932": "west-coast", "933": "west-coast",
  "934": "west-coast", "935": "west-coast", "936": "west-coast", "937": "west-coast",
  "938": "west-coast", "939": "west-coast", "940": "west-coast", "941": "west-coast",
  "942": "west-coast", "943": "west-coast", "944": "west-coast", "945": "west-coast",
  "946": "west-coast", "947": "west-coast", "948": "west-coast", "949": "west-coast",
  "950": "west-coast", "951": "west-coast", "952": "west-coast", "953": "west-coast",
  "954": "west-coast", "955": "west-coast", "956": "west-coast", "957": "west-coast",
  "958": "west-coast", "959": "west-coast", "960": "west-coast", "961": "west-coast",
  
  // Pacific Northwest
  "970": "pacific-northwest", "971": "pacific-northwest", "972": "pacific-northwest", // OR
  "973": "pacific-northwest", "974": "pacific-northwest", "975": "pacific-northwest",
  "976": "pacific-northwest", "977": "pacific-northwest", "978": "pacific-northwest",
  "979": "pacific-northwest",
  "980": "pacific-northwest", "981": "pacific-northwest", "982": "pacific-northwest", // WA
  "983": "pacific-northwest", "984": "pacific-northwest", "985": "pacific-northwest",
  "986": "pacific-northwest", "988": "pacific-northwest", "989": "pacific-northwest",
  "990": "pacific-northwest", "991": "pacific-northwest", "992": "pacific-northwest",
  "993": "pacific-northwest", "994": "pacific-northwest",
  "995": "pacific-northwest", "996": "pacific-northwest", "997": "pacific-northwest", // AK
  "998": "pacific-northwest", "999": "pacific-northwest",
  "967": "west-coast", "968": "west-coast", // HI (grouped with west coast)
};

export function getRegionFromZip(zipCode: string): RegionType {
  const prefix = zipCode.substring(0, 3);
  return ZIP_TO_REGION[prefix] || "midwest"; // Default to midwest if not found
}

export const REGION_NAMES: Record<RegionType, string> = {
  "northeast": "Northeast",
  "southeast": "Southeast", 
  "midwest": "Midwest",
  "southwest": "Southwest",
  "west-coast": "West Coast",
  "mountain-west": "Mountain West",
  "pacific-northwest": "Pacific Northwest"
};

// ============================================================================
// SPORTS DATA
// ============================================================================

export const SPORTS_DATA: Sport[] = [
  // ==================== TEAM BALL SPORTS ====================
  {
    id: "soccer",
    name: "Soccer",
    category: "ball-team",
    baseScores: {
      funFactor: 9,
      skillFocus: 7,
      accessibility: 8,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height is not a significant factor in soccer" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height is not a significant factor in soccer" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5, notes: "Extremely competitive club scene" },
      { region: "southwest", competitionLevel: 5, programAvailability: 5, notes: "Texas is a hotbed" },
      { region: "northeast", competitionLevel: 4, programAvailability: 5 },
      { region: "southeast", competitionLevel: 4, programAvailability: 4 },
      { region: "midwest", competitionLevel: 3, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 4, programAvailability: 4 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 400 },
      competitive: { min: 2000, max: 5000 }
    },
    idealStartAge: { min: 4, max: 7 },
    collegeOpportunity: 4,
    lifespanValue: 4,
    physicalDemands: { cardio: 5, strength: 3, coordination: 4, flexibility: 3 },
    notes: "Most popular youth sport globally. Excellent for cardiovascular fitness and teamwork."
  },
  {
    id: "basketball",
    name: "Basketball",
    category: "ball-team",
    baseScores: {
      funFactor: 9,
      skillFocus: 8,
      accessibility: 9,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 74, maxHeightInches: null, advantageLevel: "strong", notes: "6'2\"+ highly advantaged at youth level" },
        { minHeightInches: 70, maxHeightInches: 74, advantageLevel: "moderate", notes: "5'10\"-6'2\" good for guard positions" },
        { minHeightInches: 66, maxHeightInches: 70, advantageLevel: "neutral", notes: "5'6\"-5'10\" can succeed as point guard" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "disadvantage", notes: "Under 5'6\" is challenging at higher levels" }
      ],
      female: [
        { minHeightInches: 70, maxHeightInches: null, advantageLevel: "strong", notes: "5'10\"+ highly advantaged" },
        { minHeightInches: 66, maxHeightInches: 70, advantageLevel: "moderate", notes: "5'6\"-5'10\" good for guard/forward" },
        { minHeightInches: 62, maxHeightInches: 66, advantageLevel: "neutral", notes: "5'2\"-5'6\" typical for guards" },
        { minHeightInches: null, maxHeightInches: 62, advantageLevel: "disadvantage", notes: "Under 5'2\" is challenging" }
      ]
    },
    regionalCompetition: [
      { region: "southeast", competitionLevel: 5, programAvailability: 5, notes: "Basketball hotbed" },
      { region: "midwest", competitionLevel: 5, programAvailability: 5, notes: "Strong AAU scene" },
      { region: "northeast", competitionLevel: 4, programAvailability: 5 },
      { region: "west-coast", competitionLevel: 4, programAvailability: 5 },
      { region: "southwest", competitionLevel: 4, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 200 },
      competitive: { min: 1500, max: 4000 }
    },
    idealStartAge: { min: 6, max: 9 },
    collegeOpportunity: 4,
    lifespanValue: 4,
    physicalDemands: { cardio: 5, strength: 4, coordination: 5, flexibility: 3 },
    notes: "Height is a significant advantage. Excellent for coordination and teamwork."
  },
  {
    id: "football",
    name: "Football",
    category: "ball-team",
    baseScores: {
      funFactor: 8,
      skillFocus: 7,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 74, maxHeightInches: null, advantageLevel: "strong", notes: "6'2\"+ ideal for linemen, QB, WR, TE" },
        { minHeightInches: 70, maxHeightInches: 74, advantageLevel: "moderate", notes: "5'10\"-6'2\" good for most positions" },
        { minHeightInches: 66, maxHeightInches: 70, advantageLevel: "neutral", notes: "5'6\"-5'10\" can work for RB, DB, slot WR" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "disadvantage", notes: "Under 5'6\" limited positions" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Flag football growing; height less critical" }
      ]
    },
    regionalCompetition: [
      { region: "southwest", competitionLevel: 5, programAvailability: 5, notes: "Texas football is legendary" },
      { region: "southeast", competitionLevel: 5, programAvailability: 5, notes: "SEC country" },
      { region: "midwest", competitionLevel: 4, programAvailability: 5, notes: "Strong programs" },
      { region: "west-coast", competitionLevel: 4, programAvailability: 4 },
      { region: "northeast", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 150, max: 400 },
      competitive: { min: 500, max: 2000 }
    },
    idealStartAge: { min: 8, max: 11 },
    collegeOpportunity: 5,
    lifespanValue: 2,
    physicalDemands: { cardio: 4, strength: 5, coordination: 4, flexibility: 2 },
    notes: "High injury risk but strong scholarship opportunities. Position-dependent height requirements."
  },
  {
    id: "volleyball",
    name: "Volleyball",
    category: "ball-team",
    baseScores: {
      funFactor: 8,
      skillFocus: 8,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 74, maxHeightInches: null, advantageLevel: "strong", notes: "6'2\"+ ideal for hitters and blockers" },
        { minHeightInches: 70, maxHeightInches: 74, advantageLevel: "moderate", notes: "5'10\"-6'2\" good for setter, libero" },
        { minHeightInches: 66, maxHeightInches: 70, advantageLevel: "neutral", notes: "5'6\"-5'10\" can play libero" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "disadvantage", notes: "Under 5'6\" very limited" }
      ],
      female: [
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "strong", notes: "5'8\"+ highly advantaged" },
        { minHeightInches: 64, maxHeightInches: 68, advantageLevel: "moderate", notes: "5'4\"-5'8\" good for setter, DS" },
        { minHeightInches: 60, maxHeightInches: 64, advantageLevel: "neutral", notes: "5'0\"-5'4\" can play libero" },
        { minHeightInches: null, maxHeightInches: 60, advantageLevel: "disadvantage", notes: "Under 5'0\" challenging" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5, notes: "California dominates" },
      { region: "southwest", competitionLevel: 4, programAvailability: 4 },
      { region: "midwest", competitionLevel: 4, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 3 },
      { region: "northeast", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 300 },
      competitive: { min: 2000, max: 5000 }
    },
    idealStartAge: { min: 9, max: 12 },
    collegeOpportunity: 4,
    lifespanValue: 4,
    physicalDemands: { cardio: 4, strength: 3, coordination: 5, flexibility: 4 },
    notes: "Strong college pathway, especially for tall athletes. Beach volleyball offers alternative path."
  },
  {
    id: "baseball",
    name: "Baseball",
    category: "ball-team",
    baseScores: {
      funFactor: 7,
      skillFocus: 9,
      accessibility: 7,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "moderate", notes: "6'0\"+ helpful for pitchers" },
        { minHeightInches: 66, maxHeightInches: 72, advantageLevel: "neutral", notes: "5'6\"-6'0\" works for all positions" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Shorter players can excel (Altuve, etc.)" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "See softball" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5, notes: "Year-round play" },
      { region: "southwest", competitionLevel: 5, programAvailability: 5, notes: "Texas, Arizona strong" },
      { region: "southeast", competitionLevel: 5, programAvailability: 5 },
      { region: "midwest", competitionLevel: 4, programAvailability: 4 },
      { region: "northeast", competitionLevel: 4, programAvailability: 4, notes: "Weather limits season" },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 300 },
      competitive: { min: 2000, max: 6000 }
    },
    idealStartAge: { min: 5, max: 8 },
    collegeOpportunity: 4,
    lifespanValue: 3,
    physicalDemands: { cardio: 2, strength: 3, coordination: 5, flexibility: 3 },
    notes: "Highly skill-focused. Travel ball is expensive but common path to college."
  },
  {
    id: "softball",
    name: "Softball",
    category: "ball-team",
    baseScores: {
      funFactor: 7,
      skillFocus: 9,
      accessibility: 7,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Primarily a women's sport competitively" }
      ],
      female: [
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "moderate", notes: "5'6\"+ helpful for pitchers, 1B" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Shorter players excel in many positions" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5 },
      { region: "southwest", competitionLevel: 5, programAvailability: 5 },
      { region: "southeast", competitionLevel: 4, programAvailability: 4 },
      { region: "midwest", competitionLevel: 4, programAvailability: 4 },
      { region: "northeast", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 300 },
      competitive: { min: 2000, max: 5000 }
    },
    idealStartAge: { min: 6, max: 9 },
    collegeOpportunity: 4,
    lifespanValue: 3,
    physicalDemands: { cardio: 2, strength: 3, coordination: 5, flexibility: 3 },
    notes: "Strong girls' sport with good college pathways."
  },
  {
    id: "lacrosse",
    name: "Lacrosse",
    category: "ball-team",
    baseScores: {
      funFactor: 8,
      skillFocus: 8,
      accessibility: 5,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "moderate", notes: "6'0\"+ helpful for defense, midfield" },
        { minHeightInches: 66, maxHeightInches: 72, advantageLevel: "neutral", notes: "5'6\"-6'0\" works for attack, midfield" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Shorter players can excel with speed" }
      ],
      female: [
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "moderate", notes: "5'6\"+ helpful but not required" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Speed and stick skills matter most" }
      ]
    },
    regionalCompetition: [
      { region: "northeast", competitionLevel: 5, programAvailability: 5, notes: "Lacrosse heartland (MD, NY, etc.)" },
      { region: "west-coast", competitionLevel: 3, programAvailability: 4, notes: "Growing rapidly" },
      { region: "southeast", competitionLevel: 3, programAvailability: 3 },
      { region: "midwest", competitionLevel: 3, programAvailability: 3 },
      { region: "southwest", competitionLevel: 2, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 500 },
      competitive: { min: 2500, max: 6000 }
    },
    idealStartAge: { min: 7, max: 10 },
    collegeOpportunity: 4,
    lifespanValue: 2,
    physicalDemands: { cardio: 5, strength: 4, coordination: 5, flexibility: 3 },
    notes: "Fastest growing sport. Strong college opportunity, especially in less saturated regions."
  },
  {
    id: "hockey",
    name: "Ice Hockey",
    category: "winter",
    baseScores: {
      funFactor: 9,
      skillFocus: 9,
      accessibility: 3,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "moderate", notes: "6'0\"+ helpful for defense, power forward" },
        { minHeightInches: 66, maxHeightInches: 72, advantageLevel: "neutral", notes: "5'6\"-6'0\" common for forwards" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Smaller players can excel with skill" }
      ],
      female: [
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "moderate", notes: "5'6\"+ helpful" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Skill and skating matter most" }
      ]
    },
    regionalCompetition: [
      { region: "northeast", competitionLevel: 5, programAvailability: 5, notes: "Hockey country" },
      { region: "midwest", competitionLevel: 5, programAvailability: 5, notes: "Minnesota, Michigan strong" },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "west-coast", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 2, programAvailability: 2, notes: "Limited ice rinks" },
      { region: "southeast", competitionLevel: 2, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 500, max: 1500 },
      competitive: { min: 5000, max: 15000 }
    },
    idealStartAge: { min: 5, max: 8 },
    collegeOpportunity: 4,
    lifespanValue: 3,
    physicalDemands: { cardio: 5, strength: 4, coordination: 5, flexibility: 3 },
    notes: "Very expensive but passionate community. Limited access in warm climates."
  },
  
  // ==================== RACKET SPORTS ====================
  {
    id: "tennis",
    name: "Tennis",
    category: "racket",
    baseScores: {
      funFactor: 7,
      skillFocus: 9,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 74, maxHeightInches: null, advantageLevel: "strong", notes: "6'2\"+ big advantage for serve and reach" },
        { minHeightInches: 70, maxHeightInches: 74, advantageLevel: "moderate", notes: "5'10\"-6'2\" competitive, good serve" },
        { minHeightInches: 66, maxHeightInches: 70, advantageLevel: "neutral", notes: "5'6\"-5'10\" can compete with speed" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Shorter players compensate with speed" }
      ],
      female: [
        { minHeightInches: 70, maxHeightInches: null, advantageLevel: "strong", notes: "5'10\"+ big serve advantage" },
        { minHeightInches: 66, maxHeightInches: 70, advantageLevel: "moderate", notes: "5'6\"-5'10\" competitive" },
        { minHeightInches: 62, maxHeightInches: 66, advantageLevel: "neutral", notes: "5'2\"-5'6\" very common" },
        { minHeightInches: null, maxHeightInches: 62, advantageLevel: "neutral", notes: "Speed can compensate" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5 },
      { region: "southeast", competitionLevel: 5, programAvailability: 5, notes: "Florida is a tennis hotbed" },
      { region: "southwest", competitionLevel: 4, programAvailability: 4 },
      { region: "northeast", competitionLevel: 4, programAvailability: 4 },
      { region: "midwest", competitionLevel: 3, programAvailability: 3, notes: "Indoor court limitations" },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 500 },
      competitive: { min: 3000, max: 15000 }
    },
    idealStartAge: { min: 5, max: 8 },
    collegeOpportunity: 4,
    lifespanValue: 5,
    physicalDemands: { cardio: 5, strength: 3, coordination: 5, flexibility: 4 },
    notes: "Excellent lifetime sport. Private coaching is expensive but impactful."
  },
  {
    id: "pickleball",
    name: "Pickleball",
    category: "racket",
    baseScores: {
      funFactor: 8,
      skillFocus: 6,
      accessibility: 9,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height not a significant factor" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height not a significant factor" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 3, programAvailability: 5, notes: "Fastest growing sport" },
      { region: "southwest", competitionLevel: 3, programAvailability: 5, notes: "Popular in retirement areas" },
      { region: "southeast", competitionLevel: 3, programAvailability: 5 },
      { region: "midwest", competitionLevel: 2, programAvailability: 4 },
      { region: "northeast", competitionLevel: 2, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 4 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 150 },
      competitive: { min: 500, max: 2000 }
    },
    idealStartAge: { min: 8, max: 12 },
    collegeOpportunity: 1,
    lifespanValue: 5,
    physicalDemands: { cardio: 3, strength: 2, coordination: 4, flexibility: 2 },
    notes: "Fastest growing sport in America. Low barrier to entry, highly social."
  },
  {
    id: "badminton",
    name: "Badminton",
    category: "racket",
    baseScores: {
      funFactor: 7,
      skillFocus: 8,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 70, maxHeightInches: null, advantageLevel: "moderate", notes: "5'10\"+ helps reach" },
        { minHeightInches: null, maxHeightInches: 70, advantageLevel: "neutral", notes: "Speed compensates" }
      ],
      female: [
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "moderate", notes: "5'6\"+ helps" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Speed compensates" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 3, programAvailability: 4, notes: "Strong Asian community presence" },
      { region: "northeast", competitionLevel: 2, programAvailability: 3 },
      { region: "southeast", competitionLevel: 2, programAvailability: 2 },
      { region: "midwest", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 2, programAvailability: 2 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 1, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 200 },
      competitive: { min: 1000, max: 3000 }
    },
    idealStartAge: { min: 7, max: 10 },
    collegeOpportunity: 2,
    lifespanValue: 5,
    physicalDemands: { cardio: 5, strength: 2, coordination: 5, flexibility: 4 },
    notes: "Olympic sport with niche following in US. Popular in Asian communities."
  },
  
  // ==================== WATER SPORTS ====================
  {
    id: "swimming",
    name: "Swimming",
    category: "water",
    baseScores: {
      funFactor: 6,
      skillFocus: 9,
      accessibility: 7,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 74, maxHeightInches: null, advantageLevel: "strong", notes: "6'2\"+ ideal for most events" },
        { minHeightInches: 70, maxHeightInches: 74, advantageLevel: "moderate", notes: "5'10\"-6'2\" competitive" },
        { minHeightInches: null, maxHeightInches: 70, advantageLevel: "neutral", notes: "Can compete but height helps" }
      ],
      female: [
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "strong", notes: "5'8\"+ ideal" },
        { minHeightInches: 64, maxHeightInches: 68, advantageLevel: "moderate", notes: "5'4\"-5'8\" competitive" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Can compete" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5 },
      { region: "southeast", competitionLevel: 5, programAvailability: 5, notes: "Florida is a powerhouse" },
      { region: "southwest", competitionLevel: 4, programAvailability: 5 },
      { region: "northeast", competitionLevel: 4, programAvailability: 4 },
      { region: "midwest", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 300 },
      competitive: { min: 2000, max: 5000 }
    },
    idealStartAge: { min: 4, max: 7 },
    collegeOpportunity: 4,
    lifespanValue: 5,
    physicalDemands: { cardio: 5, strength: 4, coordination: 4, flexibility: 5 },
    notes: "Excellent lifelong fitness sport. Time commitment is high for competitive swimmers."
  },
  {
    id: "water-polo",
    name: "Water Polo",
    category: "water",
    baseScores: {
      funFactor: 8,
      skillFocus: 8,
      accessibility: 4,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 74, maxHeightInches: null, advantageLevel: "strong", notes: "6'2\"+ highly advantaged" },
        { minHeightInches: 70, maxHeightInches: 74, advantageLevel: "moderate", notes: "5'10\"-6'2\" competitive" },
        { minHeightInches: null, maxHeightInches: 70, advantageLevel: "disadvantage", notes: "Height very important" }
      ],
      female: [
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "strong", notes: "5'8\"+ advantaged" },
        { minHeightInches: 64, maxHeightInches: 68, advantageLevel: "moderate", notes: "5'4\"-5'8\" competitive" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "disadvantage", notes: "Height important" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5, notes: "California dominates" },
      { region: "southwest", competitionLevel: 3, programAvailability: 3 },
      { region: "northeast", competitionLevel: 2, programAvailability: 2 },
      { region: "southeast", competitionLevel: 2, programAvailability: 2 },
      { region: "midwest", competitionLevel: 2, programAvailability: 2 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 2 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 500 },
      competitive: { min: 2000, max: 5000 }
    },
    idealStartAge: { min: 10, max: 13 },
    collegeOpportunity: 4,
    lifespanValue: 2,
    physicalDemands: { cardio: 5, strength: 5, coordination: 4, flexibility: 4 },
    notes: "Niche sport with strong California presence. Excellent college opportunity outside CA."
  },
  {
    id: "surfing",
    name: "Surfing",
    category: "water",
    baseScores: {
      funFactor: 9,
      skillFocus: 8,
      accessibility: 3,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height not a significant factor; body proportion matters more" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height not a significant factor" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5, notes: "California surf culture" },
      { region: "southeast", competitionLevel: 3, programAvailability: 3, notes: "Florida, Carolina coasts" },
      { region: "northeast", competitionLevel: 2, programAvailability: 2 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 1, programAvailability: 1 },
      { region: "midwest", competitionLevel: 1, programAvailability: 1 },
      { region: "mountain-west", competitionLevel: 1, programAvailability: 1 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 500 },
      competitive: { min: 2000, max: 8000 }
    },
    idealStartAge: { min: 7, max: 10 },
    collegeOpportunity: 2,
    lifespanValue: 5,
    physicalDemands: { cardio: 4, strength: 3, coordination: 5, flexibility: 4 },
    notes: "Lifestyle sport with Olympic status. Location-dependent opportunity."
  },
  {
    id: "sailing",
    name: "Sailing",
    category: "water",
    baseScores: {
      funFactor: 7,
      skillFocus: 9,
      accessibility: 3,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: 72, advantageLevel: "moderate", notes: "Smaller sailors (under 6') better for most boats" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Taller sailors better for certain boats" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "moderate", notes: "Smaller sailors (under 5'6\") better for most boats" },
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "neutral", notes: "Boat class dependent" }
      ]
    },
    regionalCompetition: [
      { region: "northeast", competitionLevel: 4, programAvailability: 4, notes: "Strong yacht club scene" },
      { region: "west-coast", competitionLevel: 4, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "midwest", competitionLevel: 2, programAvailability: 2, notes: "Great Lakes sailing" },
      { region: "southwest", competitionLevel: 1, programAvailability: 2 },
      { region: "mountain-west", competitionLevel: 1, programAvailability: 1 }
    ],
    costRange: {
      entryLevel: { min: 300, max: 1000 },
      competitive: { min: 3000, max: 15000 }
    },
    idealStartAge: { min: 8, max: 12 },
    collegeOpportunity: 3,
    lifespanValue: 5,
    physicalDemands: { cardio: 2, strength: 3, coordination: 4, flexibility: 2 },
    notes: "Requires water access. Excellent college sailing programs, often at elite universities."
  },
  {
    id: "rowing",
    name: "Rowing",
    category: "water",
    baseScores: {
      funFactor: 6,
      skillFocus: 8,
      accessibility: 3,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 74, maxHeightInches: null, advantageLevel: "strong", notes: "6'2\"+ ideal for sweep rowing" },
        { minHeightInches: 70, maxHeightInches: 74, advantageLevel: "moderate", notes: "5'10\"-6'2\" competitive" },
        { minHeightInches: null, maxHeightInches: 70, advantageLevel: "disadvantage", notes: "Coxswain role for smaller athletes" }
      ],
      female: [
        { minHeightInches: 70, maxHeightInches: null, advantageLevel: "strong", notes: "5'10\"+ ideal" },
        { minHeightInches: 66, maxHeightInches: 70, advantageLevel: "moderate", notes: "5'6\"-5'10\" competitive" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "disadvantage", notes: "Coxswain role available" }
      ]
    },
    regionalCompetition: [
      { region: "northeast", competitionLevel: 5, programAvailability: 4, notes: "Rowing heartland" },
      { region: "west-coast", competitionLevel: 4, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "midwest", competitionLevel: 3, programAvailability: 2 },
      { region: "southeast", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 2, programAvailability: 2 },
      { region: "mountain-west", competitionLevel: 1, programAvailability: 1 }
    ],
    costRange: {
      entryLevel: { min: 500, max: 1500 },
      competitive: { min: 3000, max: 8000 }
    },
    idealStartAge: { min: 12, max: 15 },
    collegeOpportunity: 5,
    lifespanValue: 3,
    physicalDemands: { cardio: 5, strength: 5, coordination: 4, flexibility: 3 },
    notes: "Strong college recruitment sport. Late start is common and even advantageous."
  },

  // ==================== TRACK & FIELD ====================
  {
    id: "track-sprints",
    name: "Track - Sprints",
    category: "track-field",
    baseScores: {
      funFactor: 7,
      skillFocus: 7,
      accessibility: 9,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 70, maxHeightInches: 76, advantageLevel: "strong", notes: "5'10\"-6'4\" ideal stride length" },
        { minHeightInches: 66, maxHeightInches: 70, advantageLevel: "neutral", notes: "5'6\"-5'10\" can excel with technique" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Shorter runners can be explosive" },
        { minHeightInches: 76, maxHeightInches: null, advantageLevel: "neutral", notes: "Very tall can work in 400m" }
      ],
      female: [
        { minHeightInches: 64, maxHeightInches: 72, advantageLevel: "strong", notes: "5'4\"-6'0\" ideal" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Can still excel" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Tall works for 400m" }
      ]
    },
    regionalCompetition: [
      { region: "southeast", competitionLevel: 5, programAvailability: 5 },
      { region: "southwest", competitionLevel: 5, programAvailability: 5, notes: "Texas track is elite" },
      { region: "west-coast", competitionLevel: 4, programAvailability: 5 },
      { region: "midwest", competitionLevel: 4, programAvailability: 5 },
      { region: "northeast", competitionLevel: 4, programAvailability: 5 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 4 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 150 },
      competitive: { min: 500, max: 2000 }
    },
    idealStartAge: { min: 10, max: 14 },
    collegeOpportunity: 4,
    lifespanValue: 3,
    physicalDemands: { cardio: 4, strength: 4, coordination: 4, flexibility: 4 },
    notes: "Very accessible. Natural ability plays a large role."
  },
  {
    id: "track-distance",
    name: "Track - Distance/Cross Country",
    category: "track-field",
    baseScores: {
      funFactor: 6,
      skillFocus: 7,
      accessibility: 10,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 66, maxHeightInches: 74, advantageLevel: "moderate", notes: "5'6\"-6'2\" ideal range" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "moderate", notes: "Shorter runners often excel" },
        { minHeightInches: 74, maxHeightInches: null, advantageLevel: "neutral", notes: "Tall can work but less common" }
      ],
      female: [
        { minHeightInches: 60, maxHeightInches: 68, advantageLevel: "moderate", notes: "5'0\"-5'8\" ideal range" },
        { minHeightInches: null, maxHeightInches: 60, advantageLevel: "moderate", notes: "Smaller runners often excel" },
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "neutral", notes: "Taller can work" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5, notes: "Colorado is XC hotbed" },
      { region: "northeast", competitionLevel: 4, programAvailability: 5 },
      { region: "midwest", competitionLevel: 4, programAvailability: 5 },
      { region: "mountain-west", competitionLevel: 4, programAvailability: 4, notes: "Altitude training" },
      { region: "pacific-northwest", competitionLevel: 4, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 4 },
      { region: "southwest", competitionLevel: 3, programAvailability: 4 }
    ],
    costRange: {
      entryLevel: { min: 25, max: 100 },
      competitive: { min: 300, max: 1500 }
    },
    idealStartAge: { min: 11, max: 14 },
    collegeOpportunity: 4,
    lifespanValue: 5,
    physicalDemands: { cardio: 5, strength: 2, coordination: 2, flexibility: 3 },
    notes: "Lowest barrier to entry. Great for building mental toughness."
  },
  {
    id: "track-jumps",
    name: "Track - Jumps",
    category: "track-field",
    baseScores: {
      funFactor: 7,
      skillFocus: 8,
      accessibility: 8,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "strong", notes: "6'0\"+ major advantage for high jump" },
        { minHeightInches: 68, maxHeightInches: 72, advantageLevel: "moderate", notes: "5'8\"-6'0\" good for long/triple jump" },
        { minHeightInches: null, maxHeightInches: 68, advantageLevel: "neutral", notes: "Can excel in long jump with speed" }
      ],
      female: [
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "strong", notes: "5'8\"+ advantage for high jump" },
        { minHeightInches: 64, maxHeightInches: 68, advantageLevel: "moderate", notes: "5'4\"-5'8\" good for horizontal jumps" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Can excel with speed/power" }
      ]
    },
    regionalCompetition: [
      { region: "southeast", competitionLevel: 4, programAvailability: 5 },
      { region: "southwest", competitionLevel: 4, programAvailability: 5 },
      { region: "west-coast", competitionLevel: 4, programAvailability: 5 },
      { region: "midwest", competitionLevel: 4, programAvailability: 5 },
      { region: "northeast", competitionLevel: 4, programAvailability: 5 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 4 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 150 },
      competitive: { min: 500, max: 2000 }
    },
    idealStartAge: { min: 11, max: 14 },
    collegeOpportunity: 4,
    lifespanValue: 2,
    physicalDemands: { cardio: 3, strength: 4, coordination: 5, flexibility: 4 },
    notes: "Height is a major factor for high jump. Speed/power for horizontal jumps."
  },
  {
    id: "track-throws",
    name: "Track - Throws",
    category: "track-field",
    baseScores: {
      funFactor: 6,
      skillFocus: 8,
      accessibility: 7,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "strong", notes: "6'0\"+ ideal for shot/disc" },
        { minHeightInches: 68, maxHeightInches: 72, advantageLevel: "neutral", notes: "5'8\"-6'0\" can compete" },
        { minHeightInches: null, maxHeightInches: 68, advantageLevel: "disadvantage", notes: "Height helps significantly" }
      ],
      female: [
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "strong", notes: "5'8\"+ advantaged" },
        { minHeightInches: 64, maxHeightInches: 68, advantageLevel: "neutral", notes: "5'4\"-5'8\" can compete" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "disadvantage", notes: "Height/size helps" }
      ]
    },
    regionalCompetition: [
      { region: "midwest", competitionLevel: 4, programAvailability: 4 },
      { region: "west-coast", competitionLevel: 4, programAvailability: 4 },
      { region: "southwest", competitionLevel: 3, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 4 },
      { region: "northeast", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 150 },
      competitive: { min: 500, max: 2000 }
    },
    idealStartAge: { min: 12, max: 15 },
    collegeOpportunity: 4,
    lifespanValue: 2,
    physicalDemands: { cardio: 2, strength: 5, coordination: 4, flexibility: 3 },
    notes: "Size/strength matter. Good option for larger athletes."
  },

  // ==================== GYMNASTICS & DANCE ====================
  {
    id: "gymnastics",
    name: "Gymnastics",
    category: "gymnastics",
    baseScores: {
      funFactor: 8,
      skillFocus: 10,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 64, maxHeightInches: 70, advantageLevel: "strong", notes: "5'4\"-5'10\" ideal" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "moderate", notes: "Shorter can excel" },
        { minHeightInches: 70, maxHeightInches: null, advantageLevel: "disadvantage", notes: "Taller gymnasts face challenges" }
      ],
      female: [
        { minHeightInches: 58, maxHeightInches: 66, advantageLevel: "strong", notes: "4'10\"-5'6\" ideal" },
        { minHeightInches: null, maxHeightInches: 58, advantageLevel: "moderate", notes: "Shorter common at elite level" },
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "disadvantage", notes: "Taller faces challenges in some events" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5 },
      { region: "southwest", competitionLevel: 5, programAvailability: 5, notes: "Texas is a powerhouse" },
      { region: "midwest", competitionLevel: 4, programAvailability: 4 },
      { region: "southeast", competitionLevel: 4, programAvailability: 4 },
      { region: "northeast", competitionLevel: 4, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 300 },
      competitive: { min: 3000, max: 15000 }
    },
    idealStartAge: { min: 3, max: 6 },
    collegeOpportunity: 4,
    lifespanValue: 2,
    physicalDemands: { cardio: 3, strength: 5, coordination: 5, flexibility: 5 },
    notes: "Early start is critical. Excellent foundation for other sports. High time/cost commitment."
  },
  {
    id: "dance",
    name: "Dance (Competitive)",
    category: "gymnastics",
    baseScores: {
      funFactor: 9,
      skillFocus: 9,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 68, maxHeightInches: 76, advantageLevel: "moderate", notes: "5'8\"-6'4\" ideal for partnering" },
        { minHeightInches: null, maxHeightInches: 68, advantageLevel: "neutral", notes: "Height less critical in most styles" },
        { minHeightInches: 76, maxHeightInches: null, advantageLevel: "neutral", notes: "Can work in most styles" }
      ],
      female: [
        { minHeightInches: 62, maxHeightInches: 68, advantageLevel: "moderate", notes: "5'2\"-5'8\" common for commercial dance" },
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "moderate", notes: "Taller dancers valued in some contexts" },
        { minHeightInches: null, maxHeightInches: 62, advantageLevel: "neutral", notes: "Can excel in many styles" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5, notes: "LA is dance industry hub" },
      { region: "northeast", competitionLevel: 5, programAvailability: 5, notes: "NYC dance scene" },
      { region: "southeast", competitionLevel: 4, programAvailability: 4 },
      { region: "midwest", competitionLevel: 3, programAvailability: 4 },
      { region: "southwest", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 400 },
      competitive: { min: 3000, max: 10000 }
    },
    idealStartAge: { min: 3, max: 7 },
    collegeOpportunity: 3,
    lifespanValue: 5,
    physicalDemands: { cardio: 4, strength: 3, coordination: 5, flexibility: 5 },
    notes: "Artistic expression with athletic demands. Multiple styles offer diverse opportunities."
  },
  {
    id: "cheerleading",
    name: "Cheerleading",
    category: "gymnastics",
    baseScores: {
      funFactor: 8,
      skillFocus: 8,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 68, maxHeightInches: 76, advantageLevel: "strong", notes: "5'8\"-6'4\" ideal for basing" },
        { minHeightInches: null, maxHeightInches: 68, advantageLevel: "neutral", notes: "Shorter can spot/tumble" },
        { minHeightInches: 76, maxHeightInches: null, advantageLevel: "moderate", notes: "Very tall can base" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: 62, advantageLevel: "strong", notes: "Under 5'2\" ideal for flying" },
        { minHeightInches: 62, maxHeightInches: 68, advantageLevel: "moderate", notes: "5'2\"-5'8\" good for basing/back spot" },
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "neutral", notes: "Taller often bases" }
      ]
    },
    regionalCompetition: [
      { region: "southwest", competitionLevel: 5, programAvailability: 5, notes: "Texas cheer is elite" },
      { region: "southeast", competitionLevel: 5, programAvailability: 5 },
      { region: "west-coast", competitionLevel: 4, programAvailability: 5 },
      { region: "midwest", competitionLevel: 4, programAvailability: 4 },
      { region: "northeast", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 500, max: 1500 },
      competitive: { min: 3000, max: 10000 }
    },
    idealStartAge: { min: 5, max: 9 },
    collegeOpportunity: 4,
    lifespanValue: 2,
    physicalDemands: { cardio: 4, strength: 4, coordination: 5, flexibility: 5 },
    notes: "Combines gymnastics, dance, and teamwork. Strong college scholarship opportunities."
  },

  // ==================== COMBAT SPORTS ====================
  {
    id: "martial-arts",
    name: "Martial Arts (Various)",
    category: "combat",
    baseScores: {
      funFactor: 8,
      skillFocus: 9,
      accessibility: 8,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Weight classes normalize; each height has advantages" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Weight classes normalize; each height has advantages" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 4, programAvailability: 5 },
      { region: "northeast", competitionLevel: 4, programAvailability: 5 },
      { region: "southwest", competitionLevel: 3, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 4 },
      { region: "midwest", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 200 },
      competitive: { min: 1500, max: 4000 }
    },
    idealStartAge: { min: 5, max: 9 },
    collegeOpportunity: 2,
    lifespanValue: 5,
    physicalDemands: { cardio: 4, strength: 4, coordination: 5, flexibility: 4 },
    notes: "Great for discipline and self-defense. Many styles: BJJ, Taekwondo, Judo, Karate, etc."
  },
  {
    id: "wrestling",
    name: "Wrestling",
    category: "combat",
    baseScores: {
      funFactor: 7,
      skillFocus: 9,
      accessibility: 7,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Weight classes; leverage varies by height at each weight" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Weight classes; growing girls' wrestling" }
      ]
    },
    regionalCompetition: [
      { region: "midwest", competitionLevel: 5, programAvailability: 5, notes: "Iowa, Ohio, Pennsylvania are powerhouses" },
      { region: "northeast", competitionLevel: 5, programAvailability: 5 },
      { region: "west-coast", competitionLevel: 4, programAvailability: 4 },
      { region: "southwest", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "southeast", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 200 },
      competitive: { min: 1000, max: 3000 }
    },
    idealStartAge: { min: 6, max: 10 },
    collegeOpportunity: 4,
    lifespanValue: 2,
    physicalDemands: { cardio: 5, strength: 5, coordination: 5, flexibility: 4 },
    notes: "Excellent foundation for other sports. Weight classes level playing field. Girls' wrestling growing rapidly."
  },
  {
    id: "fencing",
    name: "Fencing",
    category: "combat",
    baseScores: {
      funFactor: 7,
      skillFocus: 9,
      accessibility: 4,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 70, maxHeightInches: null, advantageLevel: "moderate", notes: "5'10\"+ helps reach" },
        { minHeightInches: null, maxHeightInches: 70, advantageLevel: "neutral", notes: "Speed can compensate" }
      ],
      female: [
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "moderate", notes: "5'6\"+ helps reach" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Speed can compensate" }
      ]
    },
    regionalCompetition: [
      { region: "northeast", competitionLevel: 4, programAvailability: 4, notes: "Strong club scene" },
      { region: "west-coast", competitionLevel: 3, programAvailability: 3 },
      { region: "midwest", competitionLevel: 2, programAvailability: 2 },
      { region: "southeast", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 2, programAvailability: 2 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 2 },
      { region: "mountain-west", competitionLevel: 1, programAvailability: 1 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 500 },
      competitive: { min: 2000, max: 6000 }
    },
    idealStartAge: { min: 8, max: 12 },
    collegeOpportunity: 4,
    lifespanValue: 4,
    physicalDemands: { cardio: 4, strength: 3, coordination: 5, flexibility: 4 },
    notes: "Niche sport with strong college opportunity. Favored at Ivy League schools."
  },

  // ==================== PRECISION SPORTS ====================
  {
    id: "golf",
    name: "Golf",
    category: "precision",
    baseScores: {
      funFactor: 6,
      skillFocus: 10,
      accessibility: 4,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 70, maxHeightInches: 76, advantageLevel: "moderate", notes: "5'10\"-6'4\" common on tour" },
        { minHeightInches: null, maxHeightInches: 70, advantageLevel: "neutral", notes: "Shorter golfers can excel" },
        { minHeightInches: 76, maxHeightInches: null, advantageLevel: "neutral", notes: "Very tall can work" }
      ],
      female: [
        { minHeightInches: 64, maxHeightInches: 72, advantageLevel: "moderate", notes: "5'4\"-6'0\" common" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Can excel" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Can excel" }
      ]
    },
    regionalCompetition: [
      { region: "southeast", competitionLevel: 5, programAvailability: 5, notes: "Florida, Georgia golf hotbeds" },
      { region: "southwest", competitionLevel: 5, programAvailability: 5, notes: "Arizona, Texas year-round" },
      { region: "west-coast", competitionLevel: 4, programAvailability: 5 },
      { region: "midwest", competitionLevel: 3, programAvailability: 3, notes: "Weather limits season" },
      { region: "northeast", competitionLevel: 3, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 300, max: 1000 },
      competitive: { min: 5000, max: 20000 }
    },
    idealStartAge: { min: 6, max: 10 },
    collegeOpportunity: 4,
    lifespanValue: 5,
    physicalDemands: { cardio: 1, strength: 2, coordination: 5, flexibility: 3 },
    notes: "Ultimate lifetime sport. Expensive but excellent for networking. Strong college opportunity."
  },

  // ==================== OUTDOOR/ADVENTURE ====================
  {
    id: "rock-climbing",
    name: "Rock Climbing",
    category: "outdoor",
    baseScores: {
      funFactor: 9,
      skillFocus: 8,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 66, maxHeightInches: 72, advantageLevel: "moderate", notes: "5'6\"-6'0\" good balance of reach and weight" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "moderate", notes: "Shorter climbers often excel (power-to-weight)" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Reach helps but added weight" }
      ],
      female: [
        { minHeightInches: 60, maxHeightInches: 68, advantageLevel: "strong", notes: "5'0\"-5'8\" ideal power-to-weight" },
        { minHeightInches: null, maxHeightInches: 60, advantageLevel: "moderate", notes: "Excellent power-to-weight ratio" },
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "neutral", notes: "Reach helps" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 4, programAvailability: 5 },
      { region: "mountain-west", competitionLevel: 4, programAvailability: 5, notes: "Colorado climbing scene" },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "northeast", competitionLevel: 3, programAvailability: 4 },
      { region: "southwest", competitionLevel: 3, programAvailability: 3 },
      { region: "midwest", competitionLevel: 2, programAvailability: 3 },
      { region: "southeast", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 300 },
      competitive: { min: 1500, max: 5000 }
    },
    idealStartAge: { min: 6, max: 10 },
    collegeOpportunity: 2,
    lifespanValue: 5,
    physicalDemands: { cardio: 3, strength: 5, coordination: 5, flexibility: 4 },
    notes: "Olympic sport with growing youth scene. Excellent problem-solving component."
  },
  {
    id: "skiing",
    name: "Alpine Skiing",
    category: "winter",
    baseScores: {
      funFactor: 9,
      skillFocus: 8,
      accessibility: 2,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 68, maxHeightInches: 76, advantageLevel: "moderate", notes: "5'8\"-6'4\" common for racers" },
        { minHeightInches: null, maxHeightInches: 68, advantageLevel: "neutral", notes: "Shorter can excel in slalom" },
        { minHeightInches: 76, maxHeightInches: null, advantageLevel: "neutral", notes: "Taller for downhill" }
      ],
      female: [
        { minHeightInches: 64, maxHeightInches: 72, advantageLevel: "moderate", notes: "5'4\"-6'0\" common" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Can excel" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Can excel" }
      ]
    },
    regionalCompetition: [
      { region: "mountain-west", competitionLevel: 5, programAvailability: 5, notes: "Colorado, Utah ski country" },
      { region: "pacific-northwest", competitionLevel: 4, programAvailability: 4 },
      { region: "northeast", competitionLevel: 4, programAvailability: 4, notes: "Vermont, New Hampshire" },
      { region: "west-coast", competitionLevel: 3, programAvailability: 3, notes: "Lake Tahoe area" },
      { region: "midwest", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 1, programAvailability: 1 },
      { region: "southeast", competitionLevel: 1, programAvailability: 1 }
    ],
    costRange: {
      entryLevel: { min: 500, max: 1500 },
      competitive: { min: 5000, max: 20000 }
    },
    idealStartAge: { min: 4, max: 7 },
    collegeOpportunity: 3,
    lifespanValue: 5,
    physicalDemands: { cardio: 3, strength: 4, coordination: 5, flexibility: 3 },
    notes: "Very expensive and location-dependent. Excellent family sport."
  },
  {
    id: "figure-skating",
    name: "Figure Skating",
    category: "winter",
    baseScores: {
      funFactor: 8,
      skillFocus: 10,
      accessibility: 4,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 66, maxHeightInches: 72, advantageLevel: "strong", notes: "5'6\"-6'0\" ideal for jumping/pairs" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "moderate", notes: "Shorter excellent for spinning" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "disadvantage", notes: "Taller challenging for jumps" }
      ],
      female: [
        { minHeightInches: 60, maxHeightInches: 66, advantageLevel: "strong", notes: "5'0\"-5'6\" ideal" },
        { minHeightInches: null, maxHeightInches: 60, advantageLevel: "moderate", notes: "Shorter can excel" },
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "disadvantage", notes: "Taller challenging for jumps" }
      ]
    },
    regionalCompetition: [
      { region: "midwest", competitionLevel: 4, programAvailability: 4 },
      { region: "northeast", competitionLevel: 4, programAvailability: 4 },
      { region: "west-coast", competitionLevel: 4, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 },
      { region: "southwest", competitionLevel: 2, programAvailability: 2 },
      { region: "southeast", competitionLevel: 2, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 500 },
      competitive: { min: 5000, max: 25000 }
    },
    idealStartAge: { min: 4, max: 7 },
    collegeOpportunity: 2,
    lifespanValue: 3,
    physicalDemands: { cardio: 4, strength: 4, coordination: 5, flexibility: 5 },
    notes: "Very high commitment. Early start critical for elite level. Smaller body type advantaged."
  },

  // ==================== ADDITIONAL SPORTS ====================
  {
    id: "field-hockey",
    name: "Field Hockey",
    category: "ball-team",
    baseScores: {
      funFactor: 7,
      skillFocus: 8,
      accessibility: 5,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height not a major factor" }
      ],
      female: [
        { minHeightInches: 64, maxHeightInches: 72, advantageLevel: "moderate", notes: "5'4\"-6'0\" common range" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Can excel with speed" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Can play any position" }
      ]
    },
    regionalCompetition: [
      { region: "northeast", competitionLevel: 5, programAvailability: 5, notes: "Heartland of US field hockey" },
      { region: "west-coast", competitionLevel: 3, programAvailability: 3 },
      { region: "southeast", competitionLevel: 3, programAvailability: 3 },
      { region: "midwest", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 2, programAvailability: 2 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 2 },
      { region: "mountain-west", competitionLevel: 1, programAvailability: 1 }
    ],
    costRange: {
      entryLevel: { min: 150, max: 400 },
      competitive: { min: 2000, max: 5000 }
    },
    idealStartAge: { min: 8, max: 12 },
    collegeOpportunity: 4,
    lifespanValue: 3,
    physicalDemands: { cardio: 5, strength: 3, coordination: 5, flexibility: 3 },
    notes: "Primarily women's sport in the US. Strong college opportunity, especially in Northeast."
  },
  {
    id: "squash",
    name: "Squash",
    category: "racket",
    baseScores: {
      funFactor: 7,
      skillFocus: 9,
      accessibility: 4,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 68, maxHeightInches: 76, advantageLevel: "moderate", notes: "5'8\"-6'4\" good reach and mobility" },
        { minHeightInches: null, maxHeightInches: 68, advantageLevel: "neutral", notes: "Speed compensates" },
        { minHeightInches: 76, maxHeightInches: null, advantageLevel: "neutral", notes: "May have tight turns" }
      ],
      female: [
        { minHeightInches: 64, maxHeightInches: 70, advantageLevel: "moderate", notes: "5'4\"-5'10\" typical range" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Can excel" },
        { minHeightInches: 70, maxHeightInches: null, advantageLevel: "neutral", notes: "Can excel" }
      ]
    },
    regionalCompetition: [
      { region: "northeast", competitionLevel: 4, programAvailability: 4, notes: "Strong prep school scene" },
      { region: "west-coast", competitionLevel: 3, programAvailability: 3 },
      { region: "southeast", competitionLevel: 2, programAvailability: 2 },
      { region: "midwest", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 2, programAvailability: 2 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 2 },
      { region: "mountain-west", competitionLevel: 1, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 600 },
      competitive: { min: 3000, max: 8000 }
    },
    idealStartAge: { min: 8, max: 12 },
    collegeOpportunity: 4,
    lifespanValue: 5,
    physicalDemands: { cardio: 5, strength: 3, coordination: 5, flexibility: 4 },
    notes: "Excellent for college recruitment at elite universities. Court access can be limited."
  },
  {
    id: "diving",
    name: "Diving",
    category: "water",
    baseScores: {
      funFactor: 7,
      skillFocus: 10,
      accessibility: 4,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 66, maxHeightInches: 72, advantageLevel: "strong", notes: "5'6\"-6'0\" ideal for rotation" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "moderate", notes: "Shorter divers often excel" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "disadvantage", notes: "Height can slow rotation" }
      ],
      female: [
        { minHeightInches: 60, maxHeightInches: 66, advantageLevel: "strong", notes: "5'0\"-5'6\" ideal" },
        { minHeightInches: null, maxHeightInches: 60, advantageLevel: "moderate", notes: "Smaller frame advantaged" },
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "disadvantage", notes: "Taller can be challenging" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 4, programAvailability: 4 },
      { region: "southwest", competitionLevel: 4, programAvailability: 4 },
      { region: "southeast", competitionLevel: 4, programAvailability: 4 },
      { region: "midwest", competitionLevel: 3, programAvailability: 3 },
      { region: "northeast", competitionLevel: 3, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 2 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 150, max: 400 },
      competitive: { min: 3000, max: 8000 }
    },
    idealStartAge: { min: 6, max: 10 },
    collegeOpportunity: 4,
    lifespanValue: 2,
    physicalDemands: { cardio: 2, strength: 4, coordination: 5, flexibility: 5 },
    notes: "Gymnastics background helpful. Requires pool with diving boards/platforms."
  },
  {
    id: "triathlon",
    name: "Triathlon",
    category: "outdoor",
    baseScores: {
      funFactor: 7,
      skillFocus: 7,
      accessibility: 5,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 68, maxHeightInches: 76, advantageLevel: "moderate", notes: "5'8\"-6'4\" good for all disciplines" },
        { minHeightInches: null, maxHeightInches: 68, advantageLevel: "neutral", notes: "Running can favor shorter" },
        { minHeightInches: 76, maxHeightInches: null, advantageLevel: "neutral", notes: "Cycling can favor taller" }
      ],
      female: [
        { minHeightInches: 62, maxHeightInches: 70, advantageLevel: "moderate", notes: "5'2\"-5'10\" typical range" },
        { minHeightInches: null, maxHeightInches: 62, advantageLevel: "neutral", notes: "Running advantage" },
        { minHeightInches: 70, maxHeightInches: null, advantageLevel: "neutral", notes: "Swimming/cycling advantage" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 4, programAvailability: 4 },
      { region: "southwest", competitionLevel: 4, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 },
      { region: "northeast", competitionLevel: 3, programAvailability: 3 },
      { region: "midwest", competitionLevel: 2, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 500 },
      competitive: { min: 2000, max: 8000 }
    },
    idealStartAge: { min: 10, max: 14 },
    collegeOpportunity: 2,
    lifespanValue: 5,
    physicalDemands: { cardio: 5, strength: 4, coordination: 4, flexibility: 3 },
    notes: "Great lifetime sport. Equipment costs (bike) can be significant."
  },
  {
    id: "snowboarding",
    name: "Snowboarding",
    category: "winter",
    baseScores: {
      funFactor: 9,
      skillFocus: 8,
      accessibility: 2,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height not a major factor" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height not a major factor" }
      ]
    },
    regionalCompetition: [
      { region: "mountain-west", competitionLevel: 5, programAvailability: 5, notes: "Colorado is snowboard central" },
      { region: "pacific-northwest", competitionLevel: 4, programAvailability: 4 },
      { region: "west-coast", competitionLevel: 3, programAvailability: 3, notes: "Lake Tahoe area" },
      { region: "northeast", competitionLevel: 3, programAvailability: 3 },
      { region: "midwest", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 1, programAvailability: 1 },
      { region: "southeast", competitionLevel: 1, programAvailability: 1 }
    ],
    costRange: {
      entryLevel: { min: 400, max: 1000 },
      competitive: { min: 4000, max: 15000 }
    },
    idealStartAge: { min: 6, max: 10 },
    collegeOpportunity: 2,
    lifespanValue: 5,
    physicalDemands: { cardio: 3, strength: 3, coordination: 5, flexibility: 3 },
    notes: "Very location dependent. Great action sport with Olympic pathway."
  },
  {
    id: "skateboarding",
    name: "Skateboarding",
    category: "outdoor",
    baseScores: {
      funFactor: 9,
      skillFocus: 9,
      accessibility: 8,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 64, maxHeightInches: 72, advantageLevel: "moderate", notes: "5'4\"-6'0\" common range" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "moderate", notes: "Lower center of gravity helps" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Taller skaters can excel" }
      ],
      female: [
        { minHeightInches: 60, maxHeightInches: 68, advantageLevel: "moderate", notes: "5'0\"-5'8\" typical" },
        { minHeightInches: null, maxHeightInches: 60, advantageLevel: "moderate", notes: "Can excel" },
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "neutral", notes: "Can excel" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5, notes: "Skateboarding birthplace" },
      { region: "southwest", competitionLevel: 4, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 4 },
      { region: "northeast", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 4 },
      { region: "midwest", competitionLevel: 2, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 300 },
      competitive: { min: 1000, max: 5000 }
    },
    idealStartAge: { min: 6, max: 10 },
    collegeOpportunity: 1,
    lifespanValue: 4,
    physicalDemands: { cardio: 2, strength: 3, coordination: 5, flexibility: 3 },
    notes: "Olympic sport since 2020. Strong culture and accessibility."
  },
  {
    id: "bmx",
    name: "BMX Racing/Freestyle",
    category: "outdoor",
    baseScores: {
      funFactor: 9,
      skillFocus: 8,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 64, maxHeightInches: 72, advantageLevel: "moderate", notes: "5'4\"-6'0\" typical" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Can excel" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Taller riders compete" }
      ],
      female: [
        { minHeightInches: 60, maxHeightInches: 68, advantageLevel: "moderate", notes: "5'0\"-5'8\" typical" },
        { minHeightInches: null, maxHeightInches: 60, advantageLevel: "neutral", notes: "Can excel" },
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "neutral", notes: "Can excel" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 5, programAvailability: 5 },
      { region: "southwest", competitionLevel: 4, programAvailability: 4 },
      { region: "southeast", competitionLevel: 4, programAvailability: 4 },
      { region: "midwest", competitionLevel: 3, programAvailability: 3 },
      { region: "northeast", competitionLevel: 3, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 500 },
      competitive: { min: 2000, max: 8000 }
    },
    idealStartAge: { min: 5, max: 9 },
    collegeOpportunity: 1,
    lifespanValue: 3,
    physicalDemands: { cardio: 4, strength: 4, coordination: 5, flexibility: 3 },
    notes: "Olympic sport. Racing vs freestyle are different disciplines."
  },
  {
    id: "archery",
    name: "Archery",
    category: "precision",
    baseScores: {
      funFactor: 7,
      skillFocus: 9,
      accessibility: 6,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Equipment is sized to archer" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Equipment is sized to archer" }
      ]
    },
    regionalCompetition: [
      { region: "southwest", competitionLevel: 3, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 4 },
      { region: "midwest", competitionLevel: 3, programAvailability: 3 },
      { region: "west-coast", competitionLevel: 2, programAvailability: 3 },
      { region: "northeast", competitionLevel: 2, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 400 },
      competitive: { min: 1000, max: 4000 }
    },
    idealStartAge: { min: 8, max: 12 },
    collegeOpportunity: 3,
    lifespanValue: 5,
    physicalDemands: { cardio: 1, strength: 3, coordination: 5, flexibility: 2 },
    notes: "Excellent focus and discipline sport. Adaptive for various physical abilities."
  },
  {
    id: "equestrian",
    name: "Equestrian",
    category: "outdoor",
    baseScores: {
      funFactor: 8,
      skillFocus: 9,
      accessibility: 2,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: 72, advantageLevel: "moderate", notes: "Smaller riders often preferred" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Depends on horse size" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: 68, advantageLevel: "moderate", notes: "Smaller riders often preferred" },
        { minHeightInches: 68, maxHeightInches: null, advantageLevel: "neutral", notes: "Depends on horse size" }
      ]
    },
    regionalCompetition: [
      { region: "northeast", competitionLevel: 5, programAvailability: 4, notes: "Strong hunter/jumper scene" },
      { region: "west-coast", competitionLevel: 4, programAvailability: 4 },
      { region: "southeast", competitionLevel: 4, programAvailability: 4 },
      { region: "southwest", competitionLevel: 3, programAvailability: 3 },
      { region: "midwest", competitionLevel: 3, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 500, max: 2000 },
      competitive: { min: 10000, max: 50000 }
    },
    idealStartAge: { min: 6, max: 10 },
    collegeOpportunity: 4,
    lifespanValue: 5,
    physicalDemands: { cardio: 2, strength: 3, coordination: 5, flexibility: 3 },
    notes: "Very expensive but strong college opportunity. Multiple disciplines available."
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    category: "racket",
    baseScores: {
      funFactor: 8,
      skillFocus: 9,
      accessibility: 8,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height not a major factor" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Height not a major factor" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 4, programAvailability: 4, notes: "Strong Asian community presence" },
      { region: "northeast", competitionLevel: 3, programAvailability: 4 },
      { region: "southeast", competitionLevel: 2, programAvailability: 3 },
      { region: "midwest", competitionLevel: 2, programAvailability: 3 },
      { region: "southwest", competitionLevel: 2, programAvailability: 3 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 1, programAvailability: 2 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 150 },
      competitive: { min: 1000, max: 3000 }
    },
    idealStartAge: { min: 6, max: 10 },
    collegeOpportunity: 2,
    lifespanValue: 5,
    physicalDemands: { cardio: 3, strength: 2, coordination: 5, flexibility: 3 },
    notes: "Excellent hand-eye coordination developer. Olympic sport with international pathway."
  },
  {
    id: "flag-football",
    name: "Flag Football",
    category: "ball-team",
    baseScores: {
      funFactor: 9,
      skillFocus: 7,
      accessibility: 9,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Speed and agility matter most" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Speed and agility matter most" }
      ]
    },
    regionalCompetition: [
      { region: "southeast", competitionLevel: 4, programAvailability: 5 },
      { region: "southwest", competitionLevel: 4, programAvailability: 5 },
      { region: "west-coast", competitionLevel: 3, programAvailability: 5 },
      { region: "midwest", competitionLevel: 3, programAvailability: 4 },
      { region: "northeast", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 4 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 150 },
      competitive: { min: 500, max: 2000 }
    },
    idealStartAge: { min: 5, max: 10 },
    collegeOpportunity: 2,
    lifespanValue: 4,
    physicalDemands: { cardio: 5, strength: 2, coordination: 4, flexibility: 3 },
    notes: "2028 Olympic sport. Safer alternative to tackle football. Growing rapidly for girls."
  },
  {
    id: "rugby",
    name: "Rugby",
    category: "ball-team",
    baseScores: {
      funFactor: 8,
      skillFocus: 7,
      accessibility: 5,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 68, maxHeightInches: 78, advantageLevel: "moderate", notes: "Position dependent; variety of body types" },
        { minHeightInches: null, maxHeightInches: 68, advantageLevel: "neutral", notes: "Scrum half, wing positions" },
        { minHeightInches: 78, maxHeightInches: null, advantageLevel: "moderate", notes: "Lock, number 8 positions" }
      ],
      female: [
        { minHeightInches: 64, maxHeightInches: 72, advantageLevel: "moderate", notes: "Various body types succeed" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Back positions" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "moderate", notes: "Forward positions" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 3, programAvailability: 4 },
      { region: "northeast", competitionLevel: 3, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 3, programAvailability: 3, notes: "Utah is a rugby hub" },
      { region: "southwest", competitionLevel: 2, programAvailability: 3 },
      { region: "southeast", competitionLevel: 2, programAvailability: 3 },
      { region: "midwest", competitionLevel: 2, programAvailability: 2 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 100, max: 300 },
      competitive: { min: 1000, max: 3000 }
    },
    idealStartAge: { min: 10, max: 14 },
    collegeOpportunity: 3,
    lifespanValue: 3,
    physicalDemands: { cardio: 5, strength: 5, coordination: 4, flexibility: 3 },
    notes: "Growing sport with 7s in Olympics. Multiple body types can succeed."
  },
  {
    id: "ultimate-frisbee",
    name: "Ultimate Frisbee",
    category: "ball-team",
    baseScores: {
      funFactor: 9,
      skillFocus: 6,
      accessibility: 9,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "moderate", notes: "6'0\"+ helps for catching" },
        { minHeightInches: 66, maxHeightInches: 72, advantageLevel: "neutral", notes: "Speed important" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Handler positions" }
      ],
      female: [
        { minHeightInches: 66, maxHeightInches: null, advantageLevel: "moderate", notes: "5'6\"+ helps" },
        { minHeightInches: null, maxHeightInches: 66, advantageLevel: "neutral", notes: "Speed and skills matter" }
      ]
    },
    regionalCompetition: [
      { region: "pacific-northwest", competitionLevel: 4, programAvailability: 5, notes: "Seattle ultimate hub" },
      { region: "west-coast", competitionLevel: 4, programAvailability: 5 },
      { region: "northeast", competitionLevel: 4, programAvailability: 4 },
      { region: "midwest", competitionLevel: 3, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 3 },
      { region: "southwest", competitionLevel: 2, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 25, max: 100 },
      competitive: { min: 500, max: 2000 }
    },
    idealStartAge: { min: 10, max: 14 },
    collegeOpportunity: 2,
    lifespanValue: 5,
    physicalDemands: { cardio: 5, strength: 2, coordination: 4, flexibility: 3 },
    notes: "Spirit of the game culture. Strong college club scene. Very affordable."
  },
  {
    id: "boxing",
    name: "Boxing",
    category: "combat",
    baseScores: {
      funFactor: 7,
      skillFocus: 9,
      accessibility: 7,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Weight classes; reach matters within class" }
      ],
      female: [
        { minHeightInches: null, maxHeightInches: null, advantageLevel: "neutral", notes: "Weight classes; reach matters within class" }
      ]
    },
    regionalCompetition: [
      { region: "west-coast", competitionLevel: 4, programAvailability: 5 },
      { region: "northeast", competitionLevel: 4, programAvailability: 5 },
      { region: "southwest", competitionLevel: 4, programAvailability: 4, notes: "Strong Texas boxing" },
      { region: "midwest", competitionLevel: 3, programAvailability: 4 },
      { region: "southeast", competitionLevel: 3, programAvailability: 4 },
      { region: "pacific-northwest", competitionLevel: 2, programAvailability: 3 },
      { region: "mountain-west", competitionLevel: 2, programAvailability: 3 }
    ],
    costRange: {
      entryLevel: { min: 50, max: 200 },
      competitive: { min: 1000, max: 3000 }
    },
    idealStartAge: { min: 8, max: 12 },
    collegeOpportunity: 2,
    lifespanValue: 3,
    physicalDemands: { cardio: 5, strength: 4, coordination: 5, flexibility: 3 },
    notes: "Great for discipline and fitness. Olympic pathway available."
  },
  {
    id: "cross-country-skiing",
    name: "Cross-Country Skiing",
    category: "winter",
    baseScores: {
      funFactor: 6,
      skillFocus: 7,
      accessibility: 3,
    },
    heightAdvantage: {
      male: [
        { minHeightInches: 70, maxHeightInches: 78, advantageLevel: "moderate", notes: "5'10\"-6'6\" common for elites" },
        { minHeightInches: null, maxHeightInches: 70, advantageLevel: "neutral", notes: "Can excel" },
        { minHeightInches: 78, maxHeightInches: null, advantageLevel: "neutral", notes: "Long limbs help" }
      ],
      female: [
        { minHeightInches: 64, maxHeightInches: 72, advantageLevel: "moderate", notes: "5'4\"-6'0\" common" },
        { minHeightInches: null, maxHeightInches: 64, advantageLevel: "neutral", notes: "Can excel" },
        { minHeightInches: 72, maxHeightInches: null, advantageLevel: "neutral", notes: "Can excel" }
      ]
    },
    regionalCompetition: [
      { region: "mountain-west", competitionLevel: 4, programAvailability: 4 },
      { region: "northeast", competitionLevel: 4, programAvailability: 4, notes: "Vermont, New Hampshire" },
      { region: "midwest", competitionLevel: 4, programAvailability: 3, notes: "Minnesota is strong" },
      { region: "pacific-northwest", competitionLevel: 3, programAvailability: 3 },
      { region: "west-coast", competitionLevel: 2, programAvailability: 2 },
      { region: "southwest", competitionLevel: 1, programAvailability: 1 },
      { region: "southeast", competitionLevel: 1, programAvailability: 1 }
    ],
    costRange: {
      entryLevel: { min: 200, max: 500 },
      competitive: { min: 2000, max: 8000 }
    },
    idealStartAge: { min: 8, max: 12 },
    collegeOpportunity: 4,
    lifespanValue: 5,
    physicalDemands: { cardio: 5, strength: 4, coordination: 3, flexibility: 3 },
    notes: "Excellent aerobic sport. Strong college programs in Nordic regions."
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getSportsByCategory(category: SportCategory): Sport[] {
  return SPORTS_DATA.filter(sport => sport.category === category);
}

export function getHeightAdvantageForChild(
  sport: Sport, 
  gender: Gender, 
  estimatedHeightInches: number
): HeightAdvantage | null {
  const advantages = sport.heightAdvantage[gender];
  
  for (const advantage of advantages) {
    const meetsMin = advantage.minHeightInches === null || estimatedHeightInches >= advantage.minHeightInches;
    const meetsMax = advantage.maxHeightInches === null || estimatedHeightInches <= advantage.maxHeightInches;
    
    if (meetsMin && meetsMax) {
      return advantage;
    }
  }
  
  return null;
}

export function getRegionalCompetition(sport: Sport, region: RegionType): RegionalCompetition | null {
  return sport.regionalCompetition.find(rc => rc.region === region) || null;
}

// Convert height advantage to numeric score (for opportunity calculation)
export function heightAdvantageToScore(advantage: HeightAdvantage | null): number {
  if (!advantage) return 5; // neutral default
  switch (advantage.advantageLevel) {
    case "strong": return 10;
    case "moderate": return 7;
    case "neutral": return 5;
    case "disadvantage": return 2;
    default: return 5;
  }
}

// Calculate composite opportunity score
export function calculateOpportunityScore(
  sport: Sport,
  region: RegionType,
  estimatedHeightInches: number | null,
  gender: Gender
): number {
  const regionalComp = getRegionalCompetition(sport, region);
  
  // Base: inverse of competition level (less competition = more opportunity)
  const competitionScore = regionalComp ? (6 - regionalComp.competitionLevel) * 2 : 5;
  
  // Height advantage if we have predicted height
  let heightScore = 5;
  if (estimatedHeightInches !== null) {
    const heightAdv = getHeightAdvantageForChild(sport, gender, estimatedHeightInches);
    heightScore = heightAdvantageToScore(heightAdv);
  }
  
  // Average them for opportunity score (0-10 scale)
  return Math.round((competitionScore + heightScore) / 2);
}

// ============================================================================
// LOCAL ORGANIZATIONS
// ============================================================================

export interface LocalOrganization {
  id: string;
  name: string;
  sportIds: string[];
  type: 'club' | 'rec' | 'school' | 'private' | 'nonprofit';
  ageRange?: { min: number; max: number };
  competitiveLevel: 'recreational' | 'competitive' | 'elite' | 'all';
  website?: string;
  notes?: string;
  costRange?: { min: number; max: number };
}

// Santa Barbara area organizations
const SB_ORGANIZATIONS: LocalOrganization[] = [
  { id: "sb-soccer-club", name: "Santa Barbara Soccer Club", sportIds: ["soccer"], type: "club", ageRange: { min: 4, max: 18 }, competitiveLevel: "all", website: "https://www.santabarbarasoccerclub.com", notes: "Premier competitive club", costRange: { min: 1200, max: 3500 } },
  { id: "ayso-53", name: "AYSO Region 53", sportIds: ["soccer"], type: "rec", ageRange: { min: 4, max: 14 }, competitiveLevel: "recreational", notes: "Everyone plays philosophy", costRange: { min: 100, max: 200 } },
  { id: "sb-hoops", name: "Santa Barbara Hoops", sportIds: ["basketball"], type: "club", ageRange: { min: 8, max: 18 }, competitiveLevel: "all", notes: "Youth basketball programs", costRange: { min: 200, max: 1500 } },
  { id: "sb-swim-club", name: "Santa Barbara Swim Club", sportIds: ["swimming"], type: "club", ageRange: { min: 5, max: 18 }, competitiveLevel: "competitive", website: "https://sbsc.swimtopia.com", notes: "Year-round competitive swimming", costRange: { min: 1500, max: 3500 } },
  { id: "sb-water-polo", name: "Santa Barbara Water Polo Club", sportIds: ["water-polo"], type: "club", ageRange: { min: 8, max: 18 }, competitiveLevel: "competitive", notes: "Competitive water polo", costRange: { min: 1500, max: 4000 } },
  { id: "sb-tennis-patrons", name: "Santa Barbara Tennis Patrons", sportIds: ["tennis"], type: "nonprofit", ageRange: { min: 5, max: 18 }, competitiveLevel: "all", notes: "Junior development, including free options", costRange: { min: 0, max: 500 } },
  { id: "sbvc", name: "Santa Barbara Volleyball Club", sportIds: ["volleyball"], type: "club", ageRange: { min: 10, max: 18 }, competitiveLevel: "competitive", website: "https://sbvc.org", notes: "Premier competitive volleyball", costRange: { min: 2000, max: 4500 } },
  { id: "westside-ll", name: "Westside Little League", sportIds: ["baseball", "softball"], type: "rec", ageRange: { min: 4, max: 13 }, competitiveLevel: "recreational", notes: "Classic Little League", costRange: { min: 150, max: 300 } },
  { id: "sb-gymnastics", name: "Santa Barbara Gymnastics", sportIds: ["gymnastics"], type: "club", ageRange: { min: 2, max: 18 }, competitiveLevel: "all", website: "https://sbgymnastics.com", notes: "Recreational through competitive", costRange: { min: 150, max: 400 } },
  { id: "paragon-bjj", name: "Paragon BJJ Santa Barbara", sportIds: ["martial-arts"], type: "club", ageRange: { min: 4, max: 18 }, competitiveLevel: "all", notes: "Kids BJJ program", costRange: { min: 150, max: 250 } },
  { id: "sb-track-club", name: "Santa Barbara Track Club", sportIds: ["track-sprints", "track-distance", "track-jumps", "track-throws"], type: "club", ageRange: { min: 7, max: 18 }, competitiveLevel: "competitive", notes: "USATF youth track", costRange: { min: 150, max: 400 } },
  { id: "sb-surf-school", name: "Santa Barbara Surf School", sportIds: ["surfing"], type: "private", ageRange: { min: 5, max: 18 }, competitiveLevel: "all", notes: "Lessons and camps", costRange: { min: 100, max: 500 } },
  { id: "sb-sailing-center", name: "Santa Barbara Sailing Center", sportIds: ["sailing"], type: "club", ageRange: { min: 8, max: 18 }, competitiveLevel: "all", notes: "Youth sailing lessons", costRange: { min: 300, max: 1500 } },
  { id: "sb-golf-club", name: "Santa Barbara Golf Club Juniors", sportIds: ["golf"], type: "rec", ageRange: { min: 6, max: 18 }, competitiveLevel: "all", notes: "Municipal course junior golf", costRange: { min: 200, max: 600 } },
  { id: "sb-lacrosse", name: "Santa Barbara Lacrosse Club", sportIds: ["lacrosse"], type: "club", ageRange: { min: 6, max: 18 }, competitiveLevel: "all", notes: "Boys and girls lacrosse", costRange: { min: 300, max: 1500 } },
  { id: "sb-rock-gym", name: "Santa Barbara Rock Gym", sportIds: ["rock-climbing"], type: "club", ageRange: { min: 5, max: 18 }, competitiveLevel: "all", notes: "Youth climbing teams", costRange: { min: 100, max: 300 } },
  { id: "sb-dance-arts", name: "Santa Barbara Dance Arts", sportIds: ["dance"], type: "club", ageRange: { min: 3, max: 18 }, competitiveLevel: "all", notes: "Multiple dance styles", costRange: { min: 150, max: 500 } },
  { id: "sb-fencing", name: "Santa Barbara Fencing Foundation", sportIds: ["fencing"], type: "club", ageRange: { min: 7, max: 18 }, competitiveLevel: "all", notes: "Olympic-style fencing", costRange: { min: 200, max: 600 } },
  { id: "sb-rowing", name: "Santa Barbara Rowing Association", sportIds: ["rowing"], type: "club", ageRange: { min: 12, max: 18 }, competitiveLevel: "competitive", notes: "Junior rowing program", costRange: { min: 1500, max: 3500 } },
  { id: "sb-parks-rec", name: "City of SB Parks & Recreation", sportIds: ["basketball", "soccer", "baseball", "softball", "volleyball"], type: "rec", ageRange: { min: 4, max: 14 }, competitiveLevel: "recreational", website: "https://www.santabarbaraca.gov/gov/depts/parksrec", notes: "Affordable seasonal leagues", costRange: { min: 50, max: 200 } },
];

// Get organizations for a specific sport (only for Santa Barbara area - ZIP starts with 931)
export function getOrganizationsForSport(sportId: string, zipCode?: string): LocalOrganization[] {
  if (!zipCode || !zipCode.startsWith('931')) {
    return [];
  }
  return SB_ORGANIZATIONS.filter(org => org.sportIds.includes(sportId));
}
