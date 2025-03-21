import path from "path";
import { readFile } from "fs/promises";
import { loadLinks } from "../models/shortener.model.js";


export const getShortenerPage = async (req, res) => {
  try {
    // Read the HTML file as a string
    const file = await readFile(path.join("views", "index.html"), "utf-8");

    const links=await loadLinks();
    // Generate the list items or a fallback message
    const urlList = links.length
      ? links.map(({shortCode, url}) => {
            const truncatedURL = url.length > 30 ? `${url.slice(0, 30)}...` : url;
            return `<li>
                      <a href="/${shortCode}" target="_blank">
                        ${req.protocol}://${req.get("host")}/${shortCode}
                      </a> - ${truncatedURL}
                    </li>`;
          })
          .join("")
      : "<li>No URLs found</li>"; // Fallback message if there are no links

    // Replace the placeholder in the HTML file
    const content = file.replaceAll("{{ shortened_urls }}", urlList);

    return res.send(content);
  } catch (err) {
    console.error("Error loading shortener:", err);
    return res.status(500).send("Internal Server Error");
  }
};
