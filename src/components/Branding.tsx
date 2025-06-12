import styles from './Branding.module.css'

export default function Branding() {
    return (
        <div className={styles.branding}>
            <img src="/img/logo.png" className={styles.logo} alt="Freifahren e. V." />
            <div className={styles.textWrapper}>
                <h1 className={styles.title}>Freifahren e. V.</h1>
                <h2 className={styles.subtitle}>Armut ist kein Verbrechen</h2>
            </div>
        </div>
    )
}