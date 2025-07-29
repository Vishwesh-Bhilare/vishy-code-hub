// Define your notes structure here
const notesStructure = {
  cpp: {
    basics: "notes/cpp/basics.md",
    stl: {
      vector: "notes/cpp/stl/vector.md",
      map: "notes/cpp/stl/map.md"
    }
  },
  python: {
    basics: "notes/python/basics.md",
    oop: "notes/python/oop.md"
  }
};

const noteTreeEl = document.getElementById("note-tree");
const noteContentEl = document.getElementById("note-content");

// Recursively build sidebar tree
function buildTree(data, parentEl) {
  Object.entries(data).forEach(([key, value]) => {
    const li = document.createElement("li");
    li.textContent = key;

    if (typeof value === "string") {
      li.addEventListener("click", () => loadNote(value));
    } else if (typeof value === "object") {
      const nestedUl = document.createElement("ul");
      nestedUl.style.marginLeft = "1rem";
      buildTree(value, nestedUl);
      li.appendChild(nestedUl);
    }

    parentEl.appendChild(li);
  });
}

// Load .md file and render as HTML
async function loadNote(path) {
  try {
    const res = await fetch(path);
    const markdown = await res.text();
    const html = marked.parse(markdown);
    noteContentEl.innerHTML = html;
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  } catch (err) {
    noteContentEl.innerHTML = "<p>Error loading note.</p>";
    console.error(err);
  }
}

// Build the sidebar tree on load
buildTree(notesStructure, noteTreeEl);
