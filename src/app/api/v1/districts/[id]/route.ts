export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    "https://raw.githubusercontent.com/fahimreza-dev/bangladesh-geojson/master/bd-postcodes.json",
    { next: { revalidate: 30 * 86400 } }
  );

  const data = (await res.json()) as {
    postcodes: {
      id: string;
      district_id: string;
      postOffice: string;
      postCode: string;
    }[];
  };

  return new Response(
    JSON.stringify(
      data.postcodes
        .filter((item) => item.district_id === params.id)
        .map((item) => ({
          district_id: item.district_id,
          postOffice: item.postOffice,
          postCode: item.postCode,
        }))
        .sort((a, b) => (a.postCode > b.postCode ? 1 : -1))
    ),
    { headers: { "Content-Type": "application/json" } }
  );
}
