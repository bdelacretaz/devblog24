// Map some names from the original content
// to get the correct image filenames
const authorNamesMap = {
  "Zuri Klaschka (they/them)" : "Zuri Klaschka",
  "Bianca Costache (Teşilă)" : "Bianca Costache"
};

// Must be consistent with the mapping from
// names to image filenames used when importing
export function getAuthorId(name) {
  const mapped = authorNamesMap[name];
  const n = mapped ? mapped : name;
  return n.toLowerCase().replace(/[^a-zA-Z0-9]/g,'-');
}

