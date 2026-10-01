export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      © {currentYear} CampusEats · BICS 3301, IIUM
    </footer>
  );
}