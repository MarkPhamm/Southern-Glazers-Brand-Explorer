import Link from 'next/link';

export default function Sidebar() {
    return (
        <div style={{ width: '20%', padding: '20px' }}>
            <h2>Select Pages</h2>
            <ul>
                <li><Link href="/menu-search">Menu Search</Link></li>
                <li><Link href="/wine-recommendation">Further Wine Recommendation</Link></li>
                <li><Link href="/recipe-creator">Recipe Creator</Link></li>
            </ul>
        </div>
    );
}
