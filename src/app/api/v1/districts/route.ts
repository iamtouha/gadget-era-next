export async function GET() {
  const res = await fetch(
    "https://raw.githubusercontent.com/fahimreza-dev/bangladesh-geojson/master/bd-districts.json",
    { next: { revalidate: 30 * 86400 } }
  );

  const data = (await res.json()) as {
    districts: { id: string; name: string }[];
  };

  return new Response(
    JSON.stringify(
      data.districts
        .map((data) => ({ id: data.id, name: data.name }))
        .sort((a, b) => (a.name > b.name ? 1 : -1))
    ),
    { headers: { "Content-Type": "application/json" } }
  );
}
