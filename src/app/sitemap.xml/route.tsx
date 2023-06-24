import { getFileUrl } from "@/lib/functions";
import pb from "@/lib/pb";
import type { Brand, Category, Product } from "@/lib/types";

export const revalidate = 0;

export async function GET() {
  const baseUrl = "https://www.gadgeterabd.com";
  const [homepage, products, categories, brands] = await Promise.all([
    pb.collection("homepage").getFirstListItem("", { sort: "created" }),
    pb.collection("products").getFullList<Product>(),
    pb.collection("categories").getFullList<Category>(),
    pb.collection("brands").getFullList<Brand>(),
  ]);
  console.log(homepage);
  const response = new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
       <url>
           <loc>${baseUrl}/</loc>
           <priority>1</priority>
           <changefreq>weekly</changefreq>
       </url>
       <url>
           <loc>${baseUrl}/products/</loc>
           <priority>0.9</priority>
           <changefreq>weekly</changefreq>
       </url>
       <url>
           <loc>${baseUrl}/categories/</loc>
           <priority>0.9</priority>
           <changefreq>weekly</changefreq>
       </url>
       <url>
           <loc>${baseUrl}/brands/</loc>
           <priority>0.9</priority>
           <changefreq>weekly</changefreq>
       </url>
       ${products
         .filter((product) => product.published)
         .map(
           (product) => `
        <url>
            <loc>${baseUrl}/product/${product.key}</loc>
            <lastmod>${new Date(product.updated).toISOString()}</lastmod>
            <priority>0.7</priority>
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
            <lastmod>${new Date(category.updated).toISOString()}</lastmod>
            <priority>0.8</priority>
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
            <lastmod>${new Date(brand.updated).toISOString()}</lastmod>
            <priority>0.8</priority>
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
           <priority>0.2</priority>
       </url>
       <url>
           <loc>${baseUrl}/terms-privacy-policy</loc>
           <lastmod>${new Date("2023-03-04").toISOString()}</lastmod>
           <priority>0.2</priority>
       </url>
    </urlset>
  `.replaceAll("&", "and")
  );
  response.headers.append("content-type", "text/xml");

  return response;
}
