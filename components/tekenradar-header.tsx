import Link from "next/link";
import Container from "./container";
import Image from "next/image";


const TekenradarHeader: React.FC = () => {
    return (
        <header className="bg-secondary">
            <Container>
                <div className='flex p-4 pt-0'>
                    <Link
                        href="/"
                        className='cursor-pointer'
                    >
                        <Image
                            src="/static/images/tekenradar-logo-cut.png"
                            alt="Tekenradar Logo"
                            width={220}
                            height={75}
                        />
                    </Link>
                </div>
            </Container>
        </header>
    );
};

export default TekenradarHeader;