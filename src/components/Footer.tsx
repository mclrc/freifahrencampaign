import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <hr />
      <div className={styles.footerContent}>
        <div>
          <ul>
            <li>Freifahren e. V.</li>
            <li>Czarnikauer Straße 10<br />10499 Berlin</li>
          </ul>
        </div>
        <div>
          <ul>
            <li><a href="mailto:info@freifahren.org">📧 info@freifahren.org</a></li>
            <li><a href="https://instagram.com/frei.fahren">📷 Instagram</a></li>
            <li><a href="https://github.com/freifahren">🛠️ Github</a></li>
          </ul>
        </div>
      </div>
      <p className={styles.copyright}>©{new Date().getFullYear()} Freifahren e. V.</p>
    </footer>
  );
} 