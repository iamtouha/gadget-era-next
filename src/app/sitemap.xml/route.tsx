import { getFileUrl } from "@/utils/functions";
import pb from "@/utils/pb";
import type { Brand, Category, Product } from "@/utils/types";

export async function GET() {
  const baseUrl = "https://www.gadgeterabd.com";
  const [products, categories, brands] = await Promise.all([
    pb.collection("products").getFullList<Product>(),
    pb.collection("categories").getFullList<Category>(),
    pb.collection("brands").getFullList<Brand>(),
  ]);
  const response = new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
       <url>
           <loc>${baseUrl}/</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <priority>1</priority>
           <changefreq>weekly</changefreq>
       </url>
       <url>
           <loc>${baseUrl}/products/</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <priority>0.8</priority>
           <changefreq>weekly</changefreq>
       </url>
       <url>
           <loc>${baseUrl}/categories/</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <priority>0.8</priority>
           <changefreq>weekly</changefreq>
       </url>
       <url>
           <loc>${baseUrl}/brands/</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <priority>0.8</priority>
           <changefreq>weekly</changefreq>
       </url>
       ${products
         .filter((product) => product.published)
         .map(
           (product) => `
        <url>
            <loc>${baseUrl}/product/${product.key}</loc>
            <lastmod>${product.updated}</lastmod>
            <priority>1</priority>
            <changefreq>weekly</changefreq>
            ${product.images
              .map(
                (img) => `
                  <image:image>
                      <image:loc>${getFileUrl(
                        "products",
                        product.id,
                        img
                      )}</image:loc>
                      <image:caption>${product.name}</image:caption>
                  </image:image>
              `
              )
              .join(" ")}
        </url> 
        `
         )
         .join(" ")}
       ${categories
         .filter((category) => category.published)
         .map(
           (category) => `
        <url>
            <loc>${baseUrl}/categories/${category.key}</loc>
            <lastmod>${category.updated}</lastmod>
            <priority>1</priority>
            <changefreq>weekly</changefreq>
            <image:image>
                <image:loc>${getFileUrl(
                  "categories",
                  category.id,
                  category.cover
                )}</image:loc>
                <image:caption>${category.name}</image:caption>
            </image:image>
        </url> 
        `
         )
         .join(" ")}
       ${brands
         .filter((brand) => brand.published)
         .map(
           (brand) => `
        <url>
            <loc>${baseUrl}/brands/${brand.key}</loc>
            <lastmod>${brand.updated}</lastmod>
            <priority>1</priority>
            <changefreq>weekly</changefreq>
            <image:image>
                <image:loc>${getFileUrl(
                  "brands",
                  brand.id,
                  brand.logo
                )}</image:loc>
                <image:caption>${brand.name}</image:caption>
            </image:image>
        </url> 
        `
         )
         .join(" ")}
       <url>
           <loc>${baseUrl}/terms-and-conditions</loc>
           <lastmod>${new Date("2023-03-04").toISOString()}</lastmod>
           <priority>0.5</priority>
       </url>
       <url>
           <loc>${baseUrl}/terms-privacy-policy</loc>
           <lastmod>${new Date("2023-03-04").toISOString()}</lastmod>
           <priority>0.5</priority>
       </url>
    </urlset>
  `
  );
  response.headers.append("content-type", "text/xml");

  return response;
}
