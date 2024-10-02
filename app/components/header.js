import Image from 'next/image';

export default function Header({ title }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
            <h1 style={{ fontSize: '50px', color: 'red' }}>{title}</h1>
        </div>
    );
}
