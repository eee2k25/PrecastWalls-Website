"""
Sri Venkateshwara Precast Walls — Streamlit app
Deploy on Streamlit Community Cloud with main file: streamlit.py
Run locally:  streamlit run streamlit.py --server.address 0.0.0.0
"""

from __future__ import annotations

import math
import os
from pathlib import Path
from urllib.parse import quote

import pandas as pd
import requests
import streamlit as st

ROOT = Path(__file__).parent
IMG = ROOT / "public" / "images"

PHONE = "9014386019"
WHATSAPP = f"https://wa.me/91{PHONE}"
EMAILS = ["tagilimallesh5@gmail.com", "mekganesh6@gmail.com"]
MAP_LINK = "https://maps.app.goo.gl/J4XGPpWChiZeW77t7"
ADDRESS = "Kattedan, Rajendra Nagar, Hyderabad, Telangana 500077"
LEADS_API = os.environ.get("LEADS_API_URL", "").strip()
GALLERY_API = os.environ.get("GALLERY_API_URL", "").strip()

DESIGNS = {
    "Plain RCC": {"id": "plain", "rate": 85, "note": "Farm & plot boundaries. M30 panels, H-poles."},
    "Designer / Jali": {"id": "designer", "rate": 125, "note": "Cutout patterns, temple motifs, residential fronts."},
    "Solar / Security": {"id": "solar", "rate": 110, "note": "Y-angle + barbed option. Fast perimeter for parks."},
    "Industrial Heavy": {"id": "industrial", "rate": 130, "note": "Thicker panels, higher poles, factory & godown yards."},
}

SPECS = [
    ("Concrete grade", "M30 (factory-cured)"),
    ("Steel", "High-tensile / prestressed"),
    ("Panel length", "6.0 – 7.0 ft (≈ 2 m)"),
    ("Panel thickness", "50 mm (2 in)"),
    ("Pole section", "H / I column, 150 × 150 mm"),
    ("Wall height", "5 – 10 ft"),
    ("Finish", "Plain, designer jali, security cap"),
    ("Design life", "30+ years, no plaster"),
    ("Relocatable", "Yes — panels unslot and move"),
    ("Install rate", "Up to 500 running ft / day"),
]

GALLERY = [
    ("150-acre government boundary", "Commercial", "govt-boundary.jpg"),
    ("Hyderabad factory yard", "Factory", "factory-yard.jpg"),
    ("Panel assembly on farm", "Assembly", "install-crane.jpg"),
    ("Agricultural plot, Telangana", "Agricultural", "hero-wall.jpg"),
    ("Solar farm perimeter", "Commercial", "solar-farm.jpg"),
    ("Designer jali residence", "Commercial", "designer-jali.jpg"),
    ("Residential plot fencing", "Agricultural", "residential-plot.jpg"),
    ("Plain RCC running wall", "Assembly", "plain-wall.jpg"),
    ("M30 panel close-up", "Factory", "panel-closeup.jpg"),
]

PROJECT_TYPES = [
    "Individual Plot",
    "Agricultural Farm",
    "Commercial/Industrial",
    "Solar Farm",
    "Government Project",
]

LANGS = {
    "English": "en",
    "తెలుగు": "te",
    "हिन्दी": "hi",
    "தமிழ்": "ta",
    "ಕನ್ನಡ": "kn",
    "മലയാളം": "ml",
}

T = {
    "en": {
        "brand": "SRI VENKATESHWARA",
        "sub": "Precast Walls",
        "nav": ["🏠 Home", "🧱 Products", "🧮 Quote Estimator", "🖼️ Gallery", "⚙️ How We Work", "📅 Book Site Visit"],
        "tag": "Serving all of South India",
        "title": "Sri Venkateshwara Precast Walls",
        "caption": "Factory-cast compound walls. We manufacture, transport and assemble — usually in days, not weeks.",
        "about_t": "Engineered in Hyderabad. Slotted on your boundary.",
        "about": "We cast M30 panels and high-tensile poles in-house, then run our own fleet to your site. Brick walls take weeks of labour, water and curing. Precast slots together — up to 500 running feet in a day — and the panels can be unslotted and moved if the plot changes.",
        "info": "Free site survey across Telangana & Andhra Pradesh. Ballpark quote in 24 hours.",
        "milestone": "The 150-acre government contract",
        "milestone_b": "A full government land parcel, enclosed with high-grade precast. Durability, survey precision and a hard deadline — delivered ahead of schedule.",
        "products_t": "Products & specifications",
        "products_c": "M30 concrete. High-tensile steel. Factory-cured, then slotted.",
        "quote_t": "Quote Estimator",
        "quote_c": "Move the sliders for a ballpark installed cost. Final number after a free site survey.",
        "running": "Running feet of wall",
        "height": "Wall height (feet)",
        "design": "Wall design",
        "location": "Site location (optional)",
        "warn": "This is not a final quotation. We confirm after measuring your perimeter.",
        "send": "Send this estimate on WhatsApp",
        "gallery_t": "Project gallery",
        "process_t": "How we work",
        "steps": [
            ("01  ·  Consultation", "Share location and land size. We talk through height, design and access for the truck."),
            ("02  ·  Site survey", "Our team measures the exact perimeter and checks soil so poles sit true."),
            ("03  ·  Factory cast", "M30 panels and poles are cast to your run length. Designer moulds if you chose a pattern."),
            ("04  ·  Assembly", "We deliver on our fleet and slot panels with a hydra + crew. Typical 500 ft / day."),
        ],
        "book_t": "Book a free site visit",
        "book_c": "We measure, then we manufacture. No obligation.",
        "name": "Full name",
        "phone": "Phone number",
        "site": "Site location",
        "size": "Approx. land size",
        "ptype": "Project type",
        "submit": "Confirm site visit",
        "footer": "Sri Venkateshwara Precast Walls · Hyderabad",
    },
    "te": {
        "brand": "శ్రీ వెంకటేశ్వర",
        "sub": "ప్రీకాస్ట్ గోడలు",
        "nav": ["🏠 హోమ్", "🧱 ఉత్పత్తులు", "🧮 ధర అంచనా", "🖼️ గ్యాలరీ", "⚙️ పని విధానం", "📅 సైట్ విజిట్"],
        "tag": "దక్షిణ భారతదేశం అంతా సేవ",
        "title": "శ్రీ వెంకటేశ్వర ప్రీకాస్ట్ గోడలు",
        "caption": "ఫ్యాక్టరీలో తయారైన కాంపౌండ్ గోడలు. తయారీ, రవాణా, అమరిక — వారాలు కాదు, రోజుల్లో.",
        "about_t": "హైదరాబాద్‌లో తయారీ. మీ సరిహద్దులో అమరిక.",
        "about": "M30 ప్యానెల్స్ మరియు హై-టెన్సైల్ పోల్స్ మా ఫ్యాక్టరీలో తయారు చేసి, స్వంత వాహనాలతో సైట్‌కు తీసుకువస్తాం.",
        "info": "తెలంగాణ & ఆంధ్రప్రదేశ్‌లో ఉచిత సైట్ సర్వే. 24 గంటల్లో అంచనా ధర.",
        "milestone": "150 ఎకరాల ప్రభుత్వ ప్రాజెక్ట్",
        "milestone_b": "పెద్ద ప్రభుత్వ భూమిని హై-గ్రేడ్ ప్రీకాస్ట్‌తో సురక్షితం చేశాం.",
        "products_t": "ఉత్పత్తులు & స్పెసిఫికేషన్లు",
        "products_c": "M30 కాంక్రీట్. హై-టెన్సైల్ స్టీల్. ఫ్యాక్టరీలో క్యూర్.",
        "quote_t": "ధర అంచనా",
        "quote_c": "స్లైడర్లు కదిపితే అంచనా ధర వస్తుంది. ఖచ్చితమైన ధర ఉచిత సైట్ సర్వే తర్వాత.",
        "running": "గోడ పొడవు (అడుగులు)",
        "height": "గోడ ఎత్తు (అడుగులు)",
        "design": "గోడ డిజైన్",
        "location": "సైట్ స్థానం (ఐచ్ఛికం)",
        "warn": "ఇది తుది కోట్ కాదు. కొలత తర్వాత నిర్ధారిస్తాం.",
        "send": "ఈ అంచనా వాట్సాప్‌కు పంపండి",
        "gallery_t": "ప్రాజెక్ట్ గ్యాలరీ",
        "process_t": "మా పని విధానం",
        "steps": [
            ("01  ·  సంప్రదింపు", "లొకేషన్, భూమి పరిమాణం చెప్పండి."),
            ("02  ·  సైట్ సర్వే", "కచ్చితమైన పరిధి కొలుస్తాం."),
            ("03  ·  ఫ్యాక్టరీ తయారీ", "మీ పొడవుకు M30 ప్యానెల్స్ కాస్ట్ చేస్తాం."),
            ("04  ·  అమరిక", "స్వంత వాహనాలతో తీసుకువచ్చి అమరుస్తాం."),
        ],
        "book_t": "ఉచిత సైట్ విజిట్ బుక్ చేయండి",
        "book_c": "ముందు కొలుస్తాం, తర్వాత తయారు చేస్తాం.",
        "name": "పూర్తి పేరు",
        "phone": "ఫోన్ నంబర్",
        "site": "సైట్ స్థానం",
        "size": "సుమారు భూమి పరిమాణం",
        "ptype": "ప్రాజెక్ట్ రకం",
        "submit": "సైట్ విజిట్ నిర్ధారించండి",
        "footer": "శ్రీ వెంకటేశ్వర ప్రీకాస్ట్ గోడలు · హైదరాబాద్",
    },
    "hi": {
        "brand": "श्री वेंकटेश्वर",
        "sub": "प्रीकास्ट दीवारें",
        "nav": ["🏠 होम", "🧱 उत्पाद", "🧮 कीमत अनुमान", "🖼️ गैलरी", "⚙️ कार्यप्रवाह", "📅 साइट विजिट"],
        "tag": "पूरे दक्षिण भारत में सेवा",
        "title": "श्री वेंकटेश्वर प्रीकास्ट दीवारें",
        "caption": "फैक्ट्री में बनी कंपाउंड दीवारें। निर्माण, परिवहन, लगाने का काम — दिनों में।",
        "about_t": "हैदराबाद में इंजीनियरिंग। आपकी बाउंड्री पर स्लॉट।",
        "about": "M30 पैनल और हाई-टेंसाइल पोल खुद बनाते हैं, अपने बेड़े से साइट पर पहुँचाते हैं।",
        "info": "तेलंगाना और आंध्र प्रदेश में मुफ्त साइट सर्वे।",
        "milestone": "150 एकड़ सरकारी कॉन्ट्रैक्ट",
        "milestone_b": "पूरी सरकारी ज़मीन हाई-ग्रेड प्रीकास्ट से घेरी।",
        "products_t": "उत्पाद और स्पेसिफिकेशन",
        "products_c": "M30 कंक्रीट। हाई-टेंसाइल स्टील।",
        "quote_t": "कीमत अनुमान",
        "quote_c": "स्लाइडर हिलाएँ, अनुमान देखें। अंतिम कीमत मुफ्त सर्वे के बाद।",
        "running": "दीवार की लंबाई (फीट)",
        "height": "ऊँचाई (फीट)",
        "design": "डिज़ाइन",
        "location": "साइट स्थान (वैकल्पिक)",
        "warn": "यह अंतिम कोट नहीं है। नाप के बाद पुष्टि होगी।",
        "send": "यह अनुमान व्हाट्सएप पर भेजें",
        "gallery_t": "प्रोजेक्ट गैलरी",
        "process_t": "हम कैसे काम करते हैं",
        "steps": [
            ("01  ·  बातचीत", "लोकेशन और ज़मीन बताएँ।"),
            ("02  ·  साइट सर्वे", "पेरिमीटर नापते हैं।"),
            ("03  ·  फैक्ट्री कास्ट", "आपकी लंबाई के पैनल ढालते हैं।"),
            ("04  ·  असेंबली", "हाइड्रा से स्लॉट करते हैं।"),
        ],
        "book_t": "मुफ्त साइट विजिट बुक करें",
        "book_c": "पहले नाप, फिर निर्माण।",
        "name": "पूरा नाम",
        "phone": "फ़ोन नंबर",
        "site": "साइट स्थान",
        "size": "लगभग ज़मीन का आकार",
        "ptype": "प्रोजेक्ट प्रकार",
        "submit": "साइट विजिट पक्का करें",
        "footer": "श्री वेंकटेश्वर प्रीकास्ट दीवारें · हैदराबाद",
    },
    "ta": {
        "brand": "ஸ்ரீ வெங்கடேஸ்வரா",
        "sub": "ப்ரீகாஸ்ட் சுவர்கள்",
        "nav": ["🏠 முகப்பு", "🧱 தயாரிப்புகள்", "🧮 விலை மதிப்பீடு", "🖼️ கேலரி", "⚙️ செயல்முறை", "📅 தள வருகை"],
        "tag": "தென்னிந்தியா முழுவதும் சேவை",
        "title": "ஸ்ரீ வெங்கடேஸ்வரா ப்ரீகாஸ்ட் சுவர்கள்",
        "caption": "தொழிற்சாலையில் தயாரிக்கப்பட்ட கம்பவுண்ட் சுவர்கள் — நாட்களில் பொருத்துதல்.",
        "about_t": "ஹைதராபாத்தில் தயாரிப்பு. உங்கள் எல்லையில் பொருத்துதல்.",
        "about": "M30 பேனல்கள் மற்றும் தூண்களை நாங்களே வார்ப்பு செய்து தளத்துக்கு கொண்டு செல்கிறோம்.",
        "info": "தெலங்காணா & ஆந்திராவில் இலவச தள அளவீடு.",
        "milestone": "150 ஏக்கர் அரசு ஒப்பந்தம்",
        "milestone_b": "பெரிய அரசு நிலத்தை உயர்தர ப்ரீகாஸ்ட்டால் சூழ்ந்தோம்.",
        "products_t": "தயாரிப்புகள் & விவரக்குறிப்பு",
        "products_c": "M30 காங்கிரீட். ஹை-டென்சைல் ஸ்டீல்.",
        "quote_t": "விலை மதிப்பீடு",
        "quote_c": "ஸ்லைடர்களை நகர்த்தி மதிப்பீடு பாருங்கள்.",
        "running": "சுவர் நீளம் (அடி)",
        "height": "உயரம் (அடி)",
        "design": "வடிவமைப்பு",
        "location": "தள இடம் (விருப்பம்)",
        "warn": "இது இறுதி கோட் அல்ல.",
        "send": "இந்த மதிப்பீட்டை வாட்ஸ்அப்பில் அனுப்பு",
        "gallery_t": "திட்ட கேலரி",
        "process_t": "எப்படி வேலை செய்கிறோம்",
        "steps": [
            ("01  ·  ஆலோசனை", "இடம் மற்றும் நில அளவைச் சொல்லுங்கள்."),
            ("02  ·  தள அளவீடு", "சுற்றளவை துல்லியமாக அளக்கிறோம்."),
            ("03  ·  தொழிற்சாலை வார்ப்பு", "M30 பேனல்கள் வார்க்கப்படும்."),
            ("04  ·  பொருத்துதல்", "ஹைட்ராவுடன் பொருத்துகிறோம்."),
        ],
        "book_t": "இலவச தள வருகை பதிவு",
        "book_c": "முதலில் அளப்போம், பிறகு தயாரிப்போம்.",
        "name": "முழு பெயர்",
        "phone": "தொலைபேசி எண்",
        "site": "தள இடம்",
        "size": "தோராய நில அளவு",
        "ptype": "திட்ட வகை",
        "submit": "தள வருகையை உறுதிசெய்",
        "footer": "ஸ்ரீ வெங்கடேஸ்வரா ப்ரீகாஸ்ட் சுவர்கள் · ஹைதராபாத்",
    },
    "kn": {
        "brand": "ಶ್ರೀ ವೆಂಕಟೇಶ್ವರ",
        "sub": "ಪ್ರೀಕಾಸ್ಟ್ ಗೋಡೆಗಳು",
        "nav": ["🏠 ಮುಖಪುಟ", "🧱 ಉತ್ಪನ್ನಗಳು", "🧮 ಬೆಲೆ ಅಂದಾಜು", "🖼️ ಗ್ಯಾಲರಿ", "⚙️ ಕಾರ್ಯವಿಧಾನ", "📅 ಸೈಟ್ ಭೇಟಿ"],
        "tag": "ದಕ್ಷಿಣ ಭಾರತದಾದ್ಯಂತ ಸೇವೆ",
        "title": "ಶ್ರೀ ವೆಂಕಟೇಶ್ವರ ಪ್ರೀಕಾಸ್ಟ್ ಗೋಡೆಗಳು",
        "caption": "ಫ್ಯಾಕ್ಟರಿಯಲ್ಲಿ ತಯಾರಿಸಿದ ಕಾಂಪೌಂಡ್ ಗೋಡೆಗಳು — ದಿನಗಳಲ್ಲಿ ಜೋಡಣೆ.",
        "about_t": "ಹೈದರಾಬಾದ್‌ನಲ್ಲಿ ತಯಾರಿಕೆ. ನಿಮ್ಮ ಗಡಿಯಲ್ಲಿ ಜೋಡಣೆ.",
        "about": "M30 ಪ್ಯಾನೆಲ್‌ಗಳು ಮತ್ತು ಕಂಬಗಳನ್ನು ನಾವೇ ಎರಕ ಹೊಯ್ದು ಸೈಟ್‌ಗೆ ತರುತ್ತೇವೆ.",
        "info": "ತೆಲಂಗಾಣ & ಆಂಧ್ರಪ್ರದೇಶದಲ್ಲಿ ಉಚಿತ ಸೈಟ್ ಸರ್ವೆ.",
        "milestone": "150 ಎಕರೆ ಸರ್ಕಾರಿ ಒಪ್ಪಂದ",
        "milestone_b": "ದೊಡ್ಡ ಸರ್ಕಾರಿ ಭೂಮಿಯನ್ನು ಪ್ರೀಕಾಸ್ಟ್‌ನಿಂದ ಸುತ್ತುವರಿದೆವು.",
        "products_t": "ಉತ್ಪನ್ನಗಳು & ವಿವರಗಳು",
        "products_c": "M30 ಕಾಂಕ್ರೀಟ್. ಹೈ-ಟೆನ್ಸೈಲ್ ಸ್ಟೀಲ್.",
        "quote_t": "ಬೆಲೆ ಅಂದಾಜು",
        "quote_c": "ಸ್ಲೈಡರ್ ಜರುಗಿಸಿ ಅಂದಾಜು ನೋಡಿ.",
        "running": "ಗೋಡೆಯ ಉದ್ದ (ಅಡಿ)",
        "height": "ಎತ್ತರ (ಅಡಿ)",
        "design": "ವಿನ್ಯಾಸ",
        "location": "ಸೈಟ್ ಸ್ಥಳ (ಐಚ್ಛಿಕ)",
        "warn": "ಇದು ಅಂತಿಮ ಕೋಟ್ ಅಲ್ಲ.",
        "send": "ಈ ಅಂದಾಜನ್ನು ವಾಟ್ಸಾಪ್‌ಗೆ ಕಳುಹಿಸಿ",
        "gallery_t": "ಪ್ರಾಜೆಕ್ಟ್ ಗ್ಯಾಲರಿ",
        "process_t": "ನಾವು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತೇವೆ",
        "steps": [
            ("01  ·  ಸಮಾಲೋಚನೆ", "ಸ್ಥಳ ಮತ್ತು ಭೂಮಿ ಗಾತ್ರ ಹೇಳಿ."),
            ("02  ·  ಸೈಟ್ ಸರ್ವೆ", "ಪರಿಧಿಯನ್ನು ನಿಖರವಾಗಿ ಅಳೆಯುತ್ತೇವೆ."),
            ("03  ·  ಫ್ಯಾಕ್ಟರಿ ಎರಕ", "M30 ಪ್ಯಾನೆಲ್ ಎರಕ ಹೊಯ್ಯುತ್ತೇವೆ."),
            ("04  ·  ಜೋಡಣೆ", "ಹೈಡ್ರಾದಿಂದ ಜೋಡಿಸುತ್ತೇವೆ."),
        ],
        "book_t": "ಉಚಿತ ಸೈಟ್ ಭೇಟಿ ಬುಕ್ ಮಾಡಿ",
        "book_c": "ಮೊದಲು ಅಳತೆ, ನಂತರ ತಯಾರಿಕೆ.",
        "name": "ಪೂರ್ಣ ಹೆಸರು",
        "phone": "ಫೋನ್ ಸಂಖ್ಯೆ",
        "site": "ಸೈಟ್ ಸ್ಥಳ",
        "size": "ಅಂದಾಜು ಭೂಮಿ ಗಾತ್ರ",
        "ptype": "ಯೋಜನೆಯ ಪ್ರಕಾರ",
        "submit": "ಸೈಟ್ ಭೇಟಿ ಖಚಿತಪಡಿಸಿ",
        "footer": "ಶ್ರೀ ವೆಂಕಟೇಶ್ವರ ಪ್ರೀಕಾಸ್ಟ್ ಗೋಡೆಗಳು · ಹೈದರಾಬಾದ್",
    },
    "ml": {
        "brand": "ശ്രീ വെങ്കിടേശ്വര",
        "sub": "പ്രീകാസ്റ്റ് മതിലുകൾ",
        "nav": ["🏠 ഹോം", "🧱 ഉൽപ്പന്നങ്ങൾ", "🧮 വില കണക്ക്", "🖼️ ഗാലറി", "⚙️ പ്രവർത്തനരീതി", "📅 സൈറ്റ് സന്ദർശനം"],
        "tag": "ദക്ഷിണേന്ത്യയിലുടനീളം സേവനം",
        "title": "ശ്രീ വെങ്കിടേശ്വര പ്രീകാസ്റ്റ് മതിലുകൾ",
        "caption": "ഫാക്ടറിയിൽ നിർമ്മിച്ച കോമ്പൗണ്ട് മതിലുകൾ — ദിവസങ്ങളിൽ സ്ഥാപനം.",
        "about_t": "ഹൈദരാബാദിൽ നിർമ്മാണം. നിങ്ങളുടെ അതിർത്തിയിൽ സ്ഥാപനം.",
        "about": "M30 പാനലുകളും തൂണുകളും ഞങ്ങൾ തന്നെ കാസ്റ്റ് ചെയ്ത് സൈറ്റിലെത്തിക്കുന്നു.",
        "info": "തെലങ്കാനയിലും ആന്ധ്രയിലും സൗജന്യ സൈറ്റ് സർവേ.",
        "milestone": "150 ഏക്കർ സർക്കാർ കരാർ",
        "milestone_b": "വലിയ സർക്കാർ ഭൂമി ഹൈ-ഗ്രേഡ് പ്രീകാസ്റ്റ് കൊണ്ട് ചുറ്റി.",
        "products_t": "ഉൽപ്പന്നങ്ങളും സ്പെസിഫിക്കേഷനും",
        "products_c": "M30 കോൺക്രീറ്റ്. ഹൈ-ടെൻസൈൽ സ്റ്റീൽ.",
        "quote_t": "വില കണക്ക്",
        "quote_c": "സ്ലൈഡർ നീക്കി കണക്ക് കാണുക.",
        "running": "മതിൽ നീളം (അടി)",
        "height": "ഉയരം (അടി)",
        "design": "ഡിസൈൻ",
        "location": "സൈറ്റ് സ്ഥലം (ഓപ്ഷണൽ)",
        "warn": "ഇത് അന്തിമ ക്വോട്ടല്ല.",
        "send": "ഈ കണക്ക് വാട്ട്‌സ്ആപ്പിലേക്ക് അയയ്ക്കുക",
        "gallery_t": "പ്രോജക്റ്റ് ഗാലറി",
        "process_t": "ഞങ്ങൾ എങ്ങനെ പ്രവർത്തിക്കുന്നു",
        "steps": [
            ("01  ·  കൂടിയാലോചന", "ലൊക്കേഷനും ഭൂമി വലുപ്പവും പറയുക."),
            ("02  ·  സൈറ്റ് സർവേ", "പെരിമീറ്റർ കൃത്യമായി അളക്കും."),
            ("03  ·  ഫാക്ടറി കാസ്റ്റ്", "M30 പാനൽ കാസ്റ്റ് ചെയ്യും."),
            ("04  ·  സ്ഥാപനം", "ഹൈഡ്രയോടെ സ്ലോട്ട് ചെയ്യും."),
        ],
        "book_t": "സൗജന്യ സൈറ്റ് സന്ദർശനം ബുക്ക് ചെയ്യുക",
        "book_c": "ആദ്യം അളക്കും, പിന്നെ നിർമ്മിക്കും.",
        "name": "പൂർണ്ണ നാമം",
        "phone": "ഫോൺ നമ്പർ",
        "site": "സൈറ്റ് ലൊക്കേഷൻ",
        "size": "ഏകദേശ ഭൂമി വലുപ്പം",
        "ptype": "പ്രോജക്റ്റ് തരം",
        "submit": "സൈറ്റ് സന്ദർശനം സ്ഥിരീകരിക്കുക",
        "footer": "ശ്രീ വെങ്കിടേശ്വര പ്രീകാസ്റ്റ് മതിലുകൾ · ഹൈദരാബാദ്",
    },
}


def inr(n: float) -> str:
    return f"₹{n:,.0f}"


def photo(name: str) -> Path | None:
    p = IMG / name
    return p if p.exists() else None


def estimate(running: int, height: int, rate: int) -> dict:
    sqft = running * height
    installed = sqft * rate
    bays = max(1, math.ceil(running / 6.5))
    poles = bays + 1
    rows = max(3, math.ceil(height / 1.5))
    panels = bays * rows
    days = max(1, -(-running // 500))
    transport = round(running * 3.5) if running > 400 else 0
    total = installed + transport
    return {
        "sqft": sqft,
        "rate": rate,
        "installed": installed,
        "transport": transport,
        "total": total,
        "low": round(total * 0.92),
        "high": round(total * 1.08),
        "days": days,
        "poles": poles,
        "panels": panels,
    }


def wall_svg(height_ft: int, design: str) -> str:
    rows = max(3, round(height_ft / 1.5))
    bays = 6
    pole_w, bay_w, row_h, ground = 14, 70, 22, 28
    width = pole_w * (bays + 1) + bay_w * bays + 40
    height = rows * row_h + 70
    start_x, top_y = 20, 24
    fill = "#6d6f73" if "Industrial" in design else "#9aa0a6"
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%">',
        f'<rect width="{width}" height="{height}" fill="#f3efe6"/>',
        f'<rect x="0" y="{height - ground}" width="{width}" height="{ground}" fill="#cbb892"/>',
    ]
    for b in range(bays):
        for r in range(rows):
            x = start_x + pole_w + b * (bay_w + pole_w)
            y = top_y + r * row_h
            parts.append(
                f'<rect x="{x}" y="{y}" width="{bay_w}" height="{row_h - 2}" fill="{fill}" stroke="#5c6168" stroke-width="0.8"/>'
            )
            if "Jali" in design and 0 < r < rows - 1:
                for k in (10, 28, 46):
                    parts.append(
                        f'<rect x="{x + k}" y="{y + 5}" width="12" height="8" fill="#d9d3c6" opacity="0.85"/>'
                    )
    for i in range(bays + 1):
        x = start_x + i * (bay_w + pole_w)
        parts.append(
            f'<rect x="{x}" y="{top_y - 8}" width="{pole_w}" height="{rows * row_h + 18}" fill="#7d8288" stroke="#4e5358" stroke-width="0.8"/>'
        )
        if "Solar" in design:
            parts.append(
                f'<polygon points="{x},{top_y - 8} {x + pole_w / 2},{top_y - 22} {x + pole_w},{top_y - 8}" fill="#5a5e63"/>'
            )
    parts.append(
        f'<text x="{width / 2}" y="{height - 8}" text-anchor="middle" font-size="11" fill="#6b6254">{height_ft} ft · {design}</text></svg>'
    )
    return "".join(parts)


def load_gallery() -> list[tuple[str, str, Path | None]]:
    items: list[tuple[str, str, Path | None]] = [
        (title, cat, photo(fn)) for title, cat, fn in GALLERY
    ]
    if GALLERY_API:
        try:
            data = requests.get(GALLERY_API, timeout=6).json()
            if isinstance(data, list) and data:
                remote = []
                for row in data:
                    remote.append((row.get("title", "Work"), row.get("category", "All"), row.get("image_url")))
                return remote  # type: ignore[return-value]
        except Exception:
            pass
    return items


def page_home(t: dict) -> None:
    st.caption(t["tag"])
    st.title(t["title"])
    st.markdown(t["caption"])
    hero = photo("hero-wall.jpg")
    if hero:
        st.image(str(hero), use_container_width=True)

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Acres secured", "150+", "Govt boundary")
    c2.metric("Plot owners", "500+", "Telangana & AP")
    c3.metric("Install speed", "500 ft/day", "Vs weeks for brick")
    c4.metric("Design life", "30+ yrs", "No plaster")

    st.info(t["info"])
    st.subheader(t["about_t"])
    left, right = st.columns(2)
    with left:
        st.write(t["about"])
        st.link_button("WhatsApp", WHATSAPP, type="primary")
        st.link_button("Call +91 " + PHONE, f"tel:+91{PHONE}")
    with right:
        inst = photo("install-crane.jpg")
        if inst:
            st.image(str(inst), use_container_width=True)

    st.divider()
    st.subheader(t["milestone"])
    m1, m2 = st.columns([2, 3])
    with m1:
        st.write(t["milestone_b"])
        a, b = st.columns(2)
        a.metric("Run", "150k+ ft")
        b.metric("On site", "45 days")
    with m2:
        g = photo("govt-boundary.jpg")
        if g:
            st.image(str(g), use_container_width=True)

    st.subheader("Recent completed works")
    cols = st.columns(3)
    for i, fn in enumerate(
        ["hero-wall.jpg", "factory-yard.jpg", "install-crane.jpg", "solar-farm.jpg", "designer-jali.jpg", "govt-boundary.jpg"]
    ):
        p = photo(fn)
        if p:
            cols[i % 3].image(str(p), use_container_width=True)


def page_products(t: dict) -> None:
    st.title(t["products_t"])
    st.caption(t["products_c"])
    tab_names = list(DESIGNS.keys())
    tabs = st.tabs(tab_names)
    images = {
        "Plain RCC": "plain-wall.jpg",
        "Designer / Jali": "designer-jali.jpg",
        "Solar / Security": "solar-farm.jpg",
        "Industrial Heavy": "factory-yard.jpg",
    }
    for name, tab in zip(tab_names, tabs):
        d = DESIGNS[name]
        with tab:
            col1, col2 = st.columns(2)
            p = photo(images[name])
            if p:
                col1.image(str(p), use_container_width=True)
            col2.subheader(name)
            col2.write(d["note"])
            col2.metric("Indicative rate", f"{inr(d['rate'])} / sq ft")
            col2.metric("Height", "5–10 ft")
            col2.info("Final rate after site survey. Use Quote Estimator for a ballpark.")

    st.subheader("Technical sheet")
    st.dataframe(pd.DataFrame(SPECS, columns=["Item", "Spec"]), hide_index=True, use_container_width=True)


def page_quote(t: dict) -> None:
    st.title(t["quote_t"])
    st.caption(t["quote_c"])
    st.warning(t["warn"])

    left, right = st.columns(2)
    with left:
        running = st.slider(t["running"], 50, 5000, 400, 10)
        height = st.slider(t["height"], 5, 10, 7, 1)
        design = st.selectbox(t["design"], list(DESIGNS.keys()))
        location = st.text_input(t["location"], placeholder="Village, district or maps link")
        st.markdown(wall_svg(height, design), unsafe_allow_html=True)

    rate = DESIGNS[design]["rate"]
    e = estimate(running, height, rate)
    with right:
        a, b = st.columns(2)
        a.metric("Estimated installed cost", inr(e["total"]), f"{inr(e['rate'])} / sq ft")
        b.metric("Typical range", inr(e["low"]), inr(e["high"]))
        c, d = st.columns(2)
        c.metric("Installation window", f"{e['days']} days", "~500 ft / day")
        d.metric("Square feet", f"{e['sqft']:,}", f"{e['poles']} poles")

        st.subheader("Cost breakdown")
        st.dataframe(
            pd.DataFrame(
                [
                    ["Supply + install", f"{e['sqft']} sq ft", inr(e["installed"])],
                    ["Extra transport", f"{running} ft" if running > 400 else "included", inr(e["transport"])],
                    ["Poles", e["poles"], "in rate"],
                    ["Panels", e["panels"], "in rate"],
                    ["Total (indicative)", "", inr(e["total"])],
                ],
                columns=["Item", "Qty", "Amount"],
            ),
            hide_index=True,
            use_container_width=True,
        )
        msg = (
            f"*Quote estimate — Sri Venkateshwara Precast*\n"
            f"Running ft: {running}\nHeight: {height} ft\nDesign: {design}\n"
            f"Location: {location or '—'}\n"
            f"Est. range: {inr(e['low'])} – {inr(e['high'])}\nDays: {e['days']}"
        )
        st.link_button(t["send"], f"{WHATSAPP}?text={quote(msg)}", type="primary")


def page_gallery(t: dict) -> None:
    st.title(t["gallery_t"])
    cats = ["All", "Factory", "Assembly", "Agricultural", "Commercial"]
    cat = st.radio("Category", cats, horizontal=True, index=0)
    items = load_gallery()
    shown = [i for i in items if cat == "All" or i[1] == cat]
    if not shown:
        st.write("No images in this category yet.")
        return
    cols = st.columns(3)
    for i, (title, category, src) in enumerate(shown):
        with cols[i % 3]:
            if isinstance(src, Path) and src:
                st.image(str(src), use_container_width=True, caption=f"{title} · {category}")
            elif isinstance(src, str) and src.startswith("http"):
                st.image(src, use_container_width=True, caption=f"{title} · {category}")


def page_process(t: dict) -> None:
    st.title(t["process_t"])
    imgs = ["hero-wall.jpg", "install-crane.jpg", "factory-yard.jpg", "panel-closeup.jpg"]
    for (title, body), fn in zip(t["steps"], imgs):
        with st.expander(title, expanded=title.startswith("01")):
            c1, c2 = st.columns([2, 1])
            c1.write(body)
            p = photo(fn)
            if p:
                c2.image(str(p), use_container_width=True)


def page_contact(t: dict) -> None:
    st.title(t["book_t"])
    st.caption(t["book_c"])
    left, right = st.columns(2)
    with left:
        with st.form("visit"):
            name = st.text_input(t["name"])
            phone = st.text_input(t["phone"])
            location = st.text_input(t["site"])
            size = st.text_input(t["size"], placeholder="e.g. 5 acres or 200 running ft")
            ptype = st.selectbox(t["ptype"], PROJECT_TYPES)
            submitted = st.form_submit_button(t["submit"], type="primary")
        if submitted:
            if not (name and phone and location and size):
                st.error("Please fill every field.")
            else:
                payload = {
                    "name": name,
                    "phone": phone,
                    "location": location,
                    "land_size": size,
                    "project_type": ptype,
                }
                saved = False
                if LEADS_API:
                    try:
                        r = requests.post(LEADS_API, json=payload, timeout=8)
                        saved = r.ok
                    except Exception:
                        saved = False
                msg = (
                    f"*New Site Visit Request*\n*Name:* {name}\n*Phone:* {phone}\n"
                    f"*Location:* {location}\n*Land Size:* {size}\n*Project:* {ptype}"
                )
                wa = f"{WHATSAPP}?text={quote(msg)}"
                if saved:
                    st.success("Saved. Open WhatsApp to message the team.")
                else:
                    st.success("Ready. Open WhatsApp to send this visit request.")
                st.link_button("Open WhatsApp", wa, type="primary")

    with right:
        st.info(ADDRESS)
        st.markdown(f"**Direct line**  \n[{PHONE}](tel:+91{PHONE})")
        st.markdown(f"**Maps**  \n[View on Google Maps]({MAP_LINK})")
        for em in EMAILS:
            st.markdown(f"[{em}](mailto:{em})")
        st.components.v1.iframe(
            "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3801.328373111409!2d78.58784707517174!3d17.681944383253733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDQwJzU1LjAiTiA3OMKwMzUnMjUuNSJF!5e0!3m2!1sen!2sin",
            height=280,
        )


def main() -> None:
    st.set_page_config(
        page_title="Sri Venkateshwara Precast Walls",
        page_icon="🧱",
        layout="wide",
        initial_sidebar_state="expanded",
    )
    st.markdown(
        """
        <style>
          .stApp { font-family: "Source Sans 3", "Source Sans Pro", sans-serif; }
          [data-testid="stSidebar"] { background: #F0F2F6; }
          div[data-testid="stMetricValue"] { font-weight: 650; }
        </style>
        """,
        unsafe_allow_html=True,
    )

    with st.sidebar:
        st.markdown("### 🧱 " + "Sri Venkateshwara")
        st.caption("Precast Walls · Hyderabad")
        lang_label = st.selectbox("Language", list(LANGS.keys()))
        t = T[LANGS[lang_label]]
        st.markdown(f"**{t['brand']}**  \n{t['sub']}")
        page = st.radio("Navigate", t["nav"], label_visibility="collapsed")
        st.divider()
        st.caption("Telangana · AP · KA · TN")
        st.link_button("📞 Call " + PHONE, f"tel:+91{PHONE}")
        st.link_button("💬 WhatsApp", WHATSAPP)
        st.caption(EMAILS[0])

    idx = t["nav"].index(page)
    pages = [page_home, page_products, page_quote, page_gallery, page_process, page_contact]
    pages[idx](t)
    st.divider()
    st.caption(f"© {pd.Timestamp.now().year}  {t['footer']}")


if __name__ == "__main__":
    main()
else:
    main()
