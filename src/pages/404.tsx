import Link from "next/link";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "rgb(247, 250, 252)",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        404 - Page Not Found
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          marginBottom: "2rem",
        }}
      >
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#f97316",
          textDecoration: "none",
          color: "white",
        }}
        href="/"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
