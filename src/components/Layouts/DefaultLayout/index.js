import Header from '~/components/Layouts/components/Header';
import Footer from '~/components/Layouts/components/Footer';
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
