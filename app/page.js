import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <Image src="/images/wines.jpg" alt="Wines" width={1000} height={500} />
      <h1 style={{ fontSize: '45px', color: 'red', textAlign: 'center' }}>
        List of Recommended Alcohols
      </h1>

      <aside style={{ marginTop: '20px' }}>
        <h3>Select Pages</h3>
        <ul>
          <li>
            <Link href="/menu">Menu Search</Link>
          </li>
          <li>
            <Link href="/recommendation">Further Wine Recommendation</Link>
          </li>
          <li>
            <Link href="/recipe">Recipe Creator</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
