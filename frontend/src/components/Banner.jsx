import bannerImage from '../assets/banner-image-3.jpg';
// import bannerImage2Test from '../assets/example-images/alexa.webp';

const Banner = () => {
    return (
        <div className="bg-white w-full sm:h-35 md:h-72 lg:h-96 overflow-hidden">
            <img src={bannerImage} alt="Banner" className="w-full h-full object-cover opacity-85" />
        </div>
    );
}

export default Banner;