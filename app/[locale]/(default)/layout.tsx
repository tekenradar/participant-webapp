import Footer from "@/components/footer";
import Navbar from "@/components/navbar/Navbar";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>
}

export default async function RootLayout(props: LayoutProps) {
    const { locale } = await props.params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main
                className="flex-1"
                role="main"
                id="main"
                tabIndex={-1}
            >
                {props.children}
            </main>
            <Footer />
        </>
    );
}
