=========================================
        🧢 CAP Uniform Builder
=========================================
This project is a Civil Air Patrol Uniform Builder Tool. 
It provides structured data, business logic, and a UI for selecting and displaying uniform components (badges, insignia, cloth/metal items, etc.), along with direct links to Vanguard for ordering.

v0.1.2 - Added ABUs, CFUs, Class As, Class Bs and Vanguard links
v0.1.1 - Full formUI uniform builder and dynamic data mapping
v0.1.0 - Initial release with (old) formUI and Class B static data
v0.0.0 - Project start (August 11 2025)
-----------------------------------------
📂 Project Structure
/js
  /data
    uniformData.js        # Static data lists for all uniform items
    uniformBadgeMap.js    # Rules mapping badges/pins/insignia to uniforms
  uniformLogic.js         # Rules for what grade/gender/uniforms apply to which member
  formUI.js               # Builds dropdowns & inputs from uniformData.js
  uniformImage.js         # Assembles results into a visual uniform builder
index.html                # Entry point with container elements
README.txt                # This file

-----------------------------------------
🗂️ Data Format
Each uniform item is stored as a single JSON object:
{
  "type": null,              // Uniform Type
  "wearer": "Female",        // Gender/member type (Male/Female OR Cadet/Senior/All)
  "group": "Female Skirt",   // Group name (items with same group appear as dropdown/checkbox)
  "value": "female_skirt",   // Shorthand ID (use CAPS acronyms, e.g., FEMALE_ABU_SKIRT)
  "label": "Skirt",          // Text display for UI
  "level": null,             // Type level (basic/intermediate/advanced OR technician/master/senior)
  "image": "/images.svg",    // Image path
  "link": "vanguardmil.com", // Vanguard product link
  "reference": null          // Regulation reference (CAPR 39-1, etc.)
  "required": true           // Auto-add this item to uniform
}

-----------------------------------------
🚀 Features
• Static uniform data lists
• Logic-based badge & item mapping
• Dynamic dropdowns & checkboxes
• Real-time visual uniform builder
• Vanguard item links for ordering

-----------------------------------------
🛠️ Usage
$ git clone <repo>
$ open index.html

# Add/modify items in /js/data/uniformData.js
# Update logic rules in uniformLogic.js or uniformBadgeMap.js
# Open browser to preview uniform builder

-----------------------------------------
Example Flow:

1) User selects grade & gender
   → formUI.js populates dropdowns

2) Logic checks:
   → uniformLogic.js applies grade/gender rules
   → uniformBadgeMap.js maps required badges and uniform items

3) UI updates:
   → Grouped items appear as dropdowns or checkboxes
   → Each item shows label, value, image, and Vanguard link

4) Visual build:
   → uniformImage.js renders the selected uniform

5) Direct ordering:
   → Vanguard links included for each item

-----------------------------------------
📖 Notes
Items in the same group will render as a dropdown or checkbox list.
Each item can have different variations (cloth/metal, gender-specific, etc.).
Regulation references (reference) can be used to tie items directly back to CAPR 39-1.

-----------------------------------------
Contact / Author Info:

Author: James Ruddat
Email: james@ruddatfam.net
GitHub: https://github.com/JamesRuddat
linkedin: https://www.linkedin.com/in/james-ruddat-103b48290/

-----------------------------------------
Acknowledgements / References:

• CAPR 39-1 - CAP Uniform Regulations
• Vanguard Mil - Uniform item source
• Inspiration: https://www.mcchord.org/rack_builder/ and https://www.reddit.com/user/idklmao1010/

=========================================