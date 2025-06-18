import { Language } from '@/lib/content'
import styles from './Branding.module.css'

export default function Branding({ language }: { language: Language }) {
    return (
        <div className={styles.branding}>
            <img src="/img/logo.png" className={styles.logo} alt="Freifahren e. V." />
            <div className={styles.textWrapper}>
                <h1 className={styles.title}>Freifahren e. V.</h1>
                <h2 className={styles.subtitle}>{language === 'de' ? 'Armut ist kein Verbrechen' : 'Poverty is not a crime'}</h2>
            </div>
        </div>
    )
}