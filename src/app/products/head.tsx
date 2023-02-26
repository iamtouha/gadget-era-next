const Head = (params: unknown) => {
  console.log(params);

  return (
    <>
      <title>Products | Gadget Era</title>
      <meta
        name="description"
        content="Shop the latest and most stylish watches at Gadget Era. Our collection features a wide range of brands and styles, from classic timepieces to modern smartwatches. Find the perfect watch to fit your lifestyle, at affordable prices. Free shipping available on all orders. Shop now!"
      />
      <meta name="og:image" content="/api/og?text=Categories" />
    </>
  );
};

export default Head;
